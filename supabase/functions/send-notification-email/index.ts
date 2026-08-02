import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1';

const BodySchema = z.object({
  type: z.enum(['pendaftaran', 'pengajuan']).default('pendaftaran'),
  name: z.string().min(1).max(200),
  phone: z.string().max(50).optional(),
  email: z.string().email().optional(),
  program: z.string().max(200).optional(),
  details: z.record(z.string(), z.string()).optional(),
  recipient: z.string().email().optional(),
});

function encodeHeader(value: string) {
  // RFC 2047 encoding so non-ASCII subjects render correctly
  return `=?UTF-8?B?${btoa(unescape(encodeURIComponent(value)))}?=`;
}

function buildRaw(to: string, subject: string, html: string) {
  const message = [
    `To: ${to}`,
    `Subject: ${encodeHeader(subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    btoa(unescape(encodeURIComponent(html))),
  ].join('\r\n');

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
    const rows: Array<[string, string]> = [
      ['Nama', data.name],
      ...(data.phone ? ([['No. HP/WhatsApp', data.phone]] as Array<[string, string]>) : []),
      ...(data.email ? ([['Email', data.email]] as Array<[string, string]>) : []),
      ...(data.program ? ([['Program', data.program]] as Array<[string, string]>) : []),
      ...Object.entries(data.details ?? {}),
      ['Waktu', new Date().toLocaleString('id-ID', { timeZone: 'Asia/Makassar' })],
    ];

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#faf7ef;padding:24px;">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7e0cd;">
          <div style="background:#1a5c47;padding:20px 24px;">
            <h1 style="margin:0;color:#ffffff;font-size:18px;">${esc(label)}</h1>
            <p style="margin:4px 0 0;color:#d4a53a;font-size:13px;">Pondok Pesantren Islam Irsyadulhaq</p>
          </div>
          <div style="padding:24px;">
            <p style="margin:0 0 16px;color:#334155;font-size:14px;">Ada ${esc(label.toLowerCase())} yang masuk melalui website:</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0f172a;">
              ${rows
                .map(
                  ([k, v]) =>
                    `<tr><td style="padding:8px 0;color:#64748b;width:40%;">${esc(k)}</td><td style="padding:8px 0;font-weight:600;">${esc(v)}</td></tr>`
                )
                .join('')}
            </table>
          </div>
        </div>
      </div>`;

    const sendMail = async (to: string, subject: string, bodyHtml: string) => {
      const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          'X-Connection-Api-Key': GOOGLE_MAIL_API_KEY,
        },
        body: JSON.stringify({ raw: buildRaw(to, subject, bodyHtml) }),
      });
      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`[${res.status}]: ${errorBody}`);
      }
      return await res.json();
    };

    // 1) Notifikasi ke pengurus pesantren
    const result = await sendMail(recipient, `[${label}] ${data.name}`, html);

    // 2) Email konfirmasi otomatis ke calon santri
    let confirmationId: string | null = null;
    if (data.email) {
      const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Makassar' });
      const confirmHtml = `
        <div style="font-family:Arial,Helvetica,sans-serif;background:#faf7ef;padding:24px;">
          <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7e0cd;">
            <div style="background:#1a5c47;padding:20px 24px;">
              <h1 style="margin:0;color:#ffffff;font-size:18px;">Pendaftaran Anda Telah Kami Terima</h1>
              <p style="margin:4px 0 0;color:#d4a53a;font-size:13px;">Pondok Pesantren Islam Irsyadulhaq</p>
            </div>
            <div style="padding:24px;">
              <p style="margin:0 0 8px;color:#0f172a;font-size:15px;">Assalamu'alaikum ${esc(data.name)},</p>
              <p style="margin:0 0 16px;color:#334155;font-size:14px;line-height:1.6;">
                Terima kasih telah mendaftar di Pondok Pesantren Islam Irsyadulhaq.
                Pengajuan Anda telah kami terima pada <strong>${esc(waktu)} WITA</strong> dan sedang dalam proses peninjauan.
                Tim penerimaan kami akan menghubungi Anda melalui nomor/email yang terdaftar.
              </p>
              <h2 style="margin:24px 0 8px;font-size:14px;color:#1a5c47;">Ringkasan Data Pendaftaran</h2>
              <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0f172a;">
                ${rows
                  .map(
                    ([k, v]) =>
                      `<tr><td style="padding:8px 0;color:#64748b;width:40%;">${esc(k)}</td><td style="padding:8px 0;font-weight:600;">${esc(v)}</td></tr>`
                  )
                  .join('')}
              </table>
              <p style="margin:20px 0 0;color:#64748b;font-size:12px;line-height:1.6;">
                Mohon periksa kembali data di atas. Jika ada kekeliruan, silakan balas email ini.
                Email ini dikirim otomatis sebagai bukti pengajuan pendaftaran Anda.
              </p>
            </div>
          </div>
        </div>`;
      try {
        const confirm = await sendMail(
          data.email,
          `Konfirmasi ${label} - ${data.name}`,
          confirmHtml
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
