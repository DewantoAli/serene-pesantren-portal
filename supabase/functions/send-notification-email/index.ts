import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';
import { generatePpdbPdf } from './ppdbPdf.ts';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1';

const BodySchema = z.object({
  type: z.enum(['pendaftaran', 'pengajuan']).default('pendaftaran'),
  name: z.string().min(1).max(200),
  phone: z.string().max(50).optional(),
  email: z.string().email().optional(),
  nik: z.string().max(50).optional(),
  program: z.string().max(200).optional(),
  details: z.record(z.string(), z.string()).optional(),
  recipient: z.string().email().optional(),
});

function encodeHeader(value: string) {
  // RFC 2047 encoding so non-ASCII subjects render correctly
  return `=?UTF-8?B?${btoa(unescape(encodeURIComponent(value)))}?=`;
}

function b64(bytes: Uint8Array) {
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

function chunk(s: string, n = 76) {
  return (s.match(new RegExp(`.{1,${n}}`, 'g')) ?? []).join('\r\n');
}

interface Attachment {
  filename: string;
  mimeType: string;
  data: Uint8Array;
}

function buildRaw(to: string, subject: string, html: string, attachments: Attachment[] = []) {
  const htmlPart = [
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    chunk(btoa(unescape(encodeURIComponent(html)))),
  ].join('\r\n');

  let message: string;
  if (attachments.length === 0) {
    message = [
      `To: ${to}`,
      `Subject: ${encodeHeader(subject)}`,
      'MIME-Version: 1.0',
      htmlPart,
    ].join('\r\n');
  } else {
    const boundary = `bnd_${crypto.randomUUID().replace(/-/g, '')}`;
    const parts = [
      `--${boundary}`,
      htmlPart,
      ...attachments.flatMap((a) => [
        `--${boundary}`,
        `Content-Type: ${a.mimeType}; name="${a.filename}"`,
        `Content-Disposition: attachment; filename="${a.filename}"`,
        'Content-Transfer-Encoding: base64',
        '',
        chunk(b64(a.data)),
      ]),
      `--${boundary}--`,
      '',
    ];
    message = [
      `To: ${to}`,
      `Subject: ${encodeHeader(subject)}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      '',
      ...parts,
    ].join('\r\n');
  }

  return btoa(unescape(encodeURIComponent(message)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}


function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
  );
}

// ---- Template CMS (public.page_content, page_key = 'email') ----
const DEFAULTS: Record<string, string> = {
  brand_name: 'Pondok Pesantren Islam Irsyadulhaq',
  admin_subject: '[{{label}}] {{nama}}',
  admin_heading: '{{label}}',
  admin_intro: 'Ada {{label_kecil}} yang masuk melalui website:',
  confirm_subject: 'Konfirmasi {{label}} - {{nama}}',
  confirm_heading: 'Pendaftaran Anda Telah Kami Terima',
  confirm_greeting: "Assalamu'alaikum {{nama}},",
  confirm_body:
    'Terima kasih telah mendaftar di Pondok Pesantren Islam Irsyadulhaq. Pengajuan Anda telah kami terima pada {{waktu}} WITA dan sedang dalam proses peninjauan. Tim penerimaan kami akan menghubungi Anda melalui nomor/email yang terdaftar.',
  confirm_summary_title: 'Ringkasan Data Pendaftaran',
  confirm_footer:
    'Mohon periksa kembali data di atas. Jika ada kekeliruan, silakan balas email ini. Email ini dikirim otomatis sebagai bukti pengajuan pendaftaran Anda.',
};

async function loadTemplates(): Promise<Record<string, string>> {
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_ANON_KEY');
  const out = { ...DEFAULTS };
  if (!url || !key) return out;
  try {
    const res = await fetch(
      `${url}/rest/v1/page_content?page_key=eq.email&select=content_key,value`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    );
    if (res.ok) {
      const rows = (await res.json()) as Array<{ content_key: string; value: string }>;
      rows.forEach((r) => {
        if (r.value && r.value.trim().length > 0) out[r.content_key] = r.value;
      });
    }
  } catch (err) {
    console.error('Gagal memuat template email:', err);
  }
  return out;
}

function fill(tpl: string, vars: Record<string, string>) {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, k: string) => vars[k] ?? '');
}

function paragraphs(text: string, style: string) {
  return text
    .split(/\n{2,}|\n/)
    .filter((p) => p.trim().length > 0)
    .map((p) => `<p style="${style}">${esc(p.trim())}</p>`)
    .join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const GOOGLE_MAIL_API_KEY = Deno.env.get('GOOGLE_MAIL_API_KEY');
    if (!LOVABLE_API_KEY || !GOOGLE_MAIL_API_KEY) {
      return new Response(JSON.stringify({ error: 'Gmail connector belum dikonfigurasi' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = parsed.data;
    const recipient =
      data.recipient ?? Deno.env.get('NOTIFICATION_RECIPIENT_EMAIL') ?? 'me';

    const label = data.type === 'pendaftaran' ? 'Pendaftaran Santri Baru' : 'Pengajuan Baru';
    const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Makassar' });
    const rows: Array<[string, string]> = [
      ['Nama', data.name],
      ...(data.phone ? ([['No. HP/WhatsApp', data.phone]] as Array<[string, string]>) : []),
      ...(data.email ? ([['Email', data.email]] as Array<[string, string]>) : []),
      ...(data.program ? ([['Program', data.program]] as Array<[string, string]>) : []),
      ...Object.entries(data.details ?? {}),
      ['Waktu', waktu],
    ];

    const tpl = await loadTemplates();
    const vars: Record<string, string> = {
      label,
      label_kecil: label.toLowerCase(),
      nama: data.name,
      email: data.email ?? '',
      hp: data.phone ?? '',
      program: data.program ?? '',
      waktu,
      brand: tpl.brand_name,
    };

    const tableHtml = `<table style="width:100%;border-collapse:collapse;font-size:14px;color:#0f172a;">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 0;color:#64748b;width:40%;">${esc(k)}</td><td style="padding:8px 0;font-weight:600;">${esc(v)}</td></tr>`
        )
        .join('')}
    </table>`;

    const shell = (heading: string, inner: string) => `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#faf7ef;padding:24px;">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7e0cd;">
          <div style="background:#1a5c47;padding:20px 24px;">
            <h1 style="margin:0;color:#ffffff;font-size:18px;">${esc(heading)}</h1>
            <p style="margin:4px 0 0;color:#d4a53a;font-size:13px;">${esc(tpl.brand_name)}</p>
          </div>
          <div style="padding:24px;">${inner}</div>
        </div>
      </div>`;

    const html = shell(
      fill(tpl.admin_heading, vars),
      `${paragraphs(fill(tpl.admin_intro, vars), 'margin:0 0 16px;color:#334155;font-size:14px;line-height:1.6;')}${tableHtml}`
    );

    const sendMail = async (
      to: string,
      subject: string,
      bodyHtml: string,
      attachments: Attachment[] = []
    ) => {
      const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          'X-Connection-Api-Key': GOOGLE_MAIL_API_KEY,
        },
        body: JSON.stringify({ raw: buildRaw(to, subject, bodyHtml, attachments) }),
      });
      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`[${res.status}]: ${errorBody}`);
      }
      return await res.json();
    };

    // Lampiran PDF rincian biaya PPDB (hasil generate dari dokumen pesantren)
    let attachments: Attachment[] = [];
    if (data.type === 'pendaftaran') {
      try {
        const pdfBytes = await generatePpdbPdf({
          nama: data.name,
          nik: data.nik,
          hp: data.phone,
          waktu,
        });
        const safeName = data.name.replace(/[^\p{L}\p{N} _-]/gu, '').trim().replace(/\s+/g, '-');
        attachments = [
          {
            filename: `Biaya-PPDB-${safeName || 'Calon-Santri'}.pdf`,
            mimeType: 'application/pdf',
            data: pdfBytes,
          },
        ];
      } catch (err) {
        console.error('Gagal membuat lampiran PDF PPDB:', err);
      }
    }

    // 1) Notifikasi ke pengurus pesantren
    const result = await sendMail(recipient, fill(tpl.admin_subject, vars), html, attachments);

    // 2) Email konfirmasi otomatis ke calon santri
    let confirmationId: string | null = null;
    if (data.email) {
      const confirmHtml = shell(
        fill(tpl.confirm_heading, vars),
        `<p style="margin:0 0 8px;color:#0f172a;font-size:15px;">${esc(fill(tpl.confirm_greeting, vars))}</p>
         ${paragraphs(fill(tpl.confirm_body, vars), 'margin:0 0 16px;color:#334155;font-size:14px;line-height:1.6;')}
         <h2 style="margin:24px 0 8px;font-size:14px;color:#1a5c47;">${esc(fill(tpl.confirm_summary_title, vars))}</h2>
         ${tableHtml}
         ${attachments.length > 0 ? `<p style="margin:16px 0 0;color:#1a5c47;font-size:13px;">Terlampir file PDF rincian biaya dan alur PPDB.</p>` : ''}
         ${paragraphs(fill(tpl.confirm_footer, vars), 'margin:20px 0 0;color:#64748b;font-size:12px;line-height:1.6;')}`
      );
      try {
        const confirm = await sendMail(
          data.email,
          fill(tpl.confirm_subject, vars),
          confirmHtml,
          attachments
        );
        confirmationId = confirm.id ?? null;
      } catch (err) {
        console.error('Gagal mengirim email konfirmasi ke pendaftar:', err);
      }
    }


    return new Response(JSON.stringify({ success: true, id: result.id, confirmationId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('send-notification-email error:', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
