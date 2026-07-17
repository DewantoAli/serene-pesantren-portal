import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck } from "lucide-react";

// Local wrapper for beta supabase.auth.oauth namespace
type OAuthDetails = {
  client?: { name?: string; client_uri?: string };
  redirect_uri?: string;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthResult = { data: OAuthDetails | null; error: { message: string } | null };
const oauth = (supabase.auth as unknown as {
  oauth: {
    getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
    approveAuthorization: (id: string) => Promise<OAuthResult>;
    denyAuthorization: (id: string) => Promise<OAuthResult>;
  };
}).oauth;

const OAuthConsent: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        navigate(`/admin?next=${encodeURIComponent(next)}`, { replace: true });
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId, navigate]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-islamic-navy to-islamic-teal p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Tidak dapat memuat permintaan otorisasi</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-islamic-navy to-islamic-teal">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </main>
    );
  }

  const clientName = details.client?.name ?? "aplikasi eksternal";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-islamic-navy to-islamic-teal p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <ShieldCheck className="h-10 w-10 text-islamic-teal" />
          </div>
          <CardTitle>Hubungkan {clientName} ke akun Anda</CardTitle>
          <CardDescription>
            {clientName} akan dapat menggunakan tools Irsyadul Haq atas nama Anda selama Anda tetap login.
            Ini tidak melewati kebijakan akses aplikasi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {details.scope && (
            <p className="text-xs text-muted-foreground break-all">
              Cakupan: <span className="font-mono">{details.scope}</span>
            </p>
          )}
          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1 bg-islamic-teal hover:bg-islamic-teal/90"
              onClick={() => decide(true)}
              disabled={busy}
            >
              {busy ? "Memproses..." : "Setujui"}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => decide(false)}
              disabled={busy}
            >
              Tolak
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default OAuthConsent;
