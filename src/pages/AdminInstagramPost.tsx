import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Instagram, Upload, Loader2, CheckCircle, ExternalLink, Image as ImageIcon, ShieldCheck, AlertTriangle } from 'lucide-react';
import StorageImageUploader from '@/components/ui/StorageImageUploader';

interface PostResult {
  success: boolean;
  postId?: string;
  instagramUrl?: string;
  error?: string;
  details?: any;
  hint?: string;
}

interface TokenTestResult {
  success: boolean;
  tokenInfo?: {
    isValid: boolean;
    appId?: string;
    expiresAt?: string;
    scopes?: string[];
  };
  user?: { id: string; name: string } | null;
  pages?: Array<{
    id: string;
    name: string;
    instagramAccount?: { id: string; username: string } | null;
  }>;
  instagramAccountsFound?: number;
  errors?: any;
}

const AdminInstagramPost: React.FC = () => {
  const { user, isEditor, loading } = useAuth();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [postResult, setPostResult] = useState<PostResult | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [tokenTestResult, setTokenTestResult] = useState<TokenTestResult | null>(null);

  useEffect(() => {
    if (!loading && (!user || !isEditor)) {
      navigate('/admin');
    }
  }, [user, isEditor, loading, navigate]);

  const handleTestToken = async () => {
    setIsTesting(true);
    setTokenTestResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/instagram-post?test=true`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      );

      const data = await response.json();
      setTokenTestResult(data);

      if (data.instagramAccountsFound > 0) {
        toast.success('Token valid dan Instagram terkoneksi!');
      } else if (data.tokenInfo?.isValid) {
        toast.warning('Token valid tapi tidak ada Instagram Business Account');
      } else {
        toast.error('Token tidak valid atau error');
      }
    } catch (error: any) {
      console.error('Error testing token:', error);
      setTokenTestResult({
        success: false,
        errors: { network: error.message }
      });
      toast.error('Gagal menguji token');
    } finally {
      setIsTesting(false);
    }
  };

  const handlePost = async () => {
    if (!imageUrl) {
      toast.error('Silakan upload gambar terlebih dahulu');
      return;
    }

    setIsPosting(true);
    setPostResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/instagram-post`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageUrl,
            caption,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setPostResult({
          success: true,
          postId: data.postId,
          instagramUrl: data.instagramUrl,
        });
        toast.success('Berhasil posting ke Instagram! 🎉');
        // Reset form
        setImageUrl('');
        setCaption('');
      } else {
        setPostResult({
          success: false,
          error: data.error || 'Gagal posting ke Instagram',
          details: data.details,
          hint: data.hint,
        });
        toast.error(data.error || 'Gagal posting ke Instagram');
      }
    } catch (error: any) {
      console.error('Error posting to Instagram:', error);
      setPostResult({
        success: false,
        error: 'Terjadi kesalahan jaringan',
        details: error.message,
      });
      toast.error('Terjadi kesalahan saat posting');
    } finally {
      setIsPosting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-islamic-teal"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/kegiatan">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-display font-bold text-islamic-navy flex items-center gap-2">
                <Instagram className="h-6 w-6 text-pink-500" />
                Post ke Instagram
              </h1>
              <p className="text-sm text-muted-foreground">Upload foto dan caption untuk posting ke Instagram</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleTestToken}
            disabled={isTesting}
          >
            {isTesting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <ShieldCheck className="h-4 w-4 mr-2" />
            )}
            Test Token
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        {/* Token Test Result Card */}
        {tokenTestResult && (
          <Card className={tokenTestResult.instagramAccountsFound && tokenTestResult.instagramAccountsFound > 0 ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                {tokenTestResult.instagramAccountsFound && tokenTestResult.instagramAccountsFound > 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
                Hasil Test Token
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {/* Token Info */}
              {tokenTestResult.tokenInfo && (
                <div className="space-y-1">
                  <p><strong>Token Valid:</strong> {tokenTestResult.tokenInfo.isValid ? '✅ Ya' : '❌ Tidak'}</p>
                  <p><strong>Expired:</strong> {tokenTestResult.tokenInfo.expiresAt}</p>
                  <p><strong>Permissions:</strong> {tokenTestResult.tokenInfo.scopes?.join(', ') || 'Tidak ada'}</p>
                </div>
              )}
              
              {/* User Info */}
              {tokenTestResult.user && (
                <div>
                  <p><strong>Facebook User:</strong> {tokenTestResult.user.name} (ID: {tokenTestResult.user.id})</p>
                </div>
              )}
              
              {/* Pages */}
              {tokenTestResult.pages && tokenTestResult.pages.length > 0 ? (
                <div>
                  <p className="font-medium">Facebook Pages:</p>
                  <ul className="list-disc list-inside ml-2">
                    {tokenTestResult.pages.map((page) => (
                      <li key={page.id}>
                        {page.name} 
                        {page.instagramAccount ? (
                          <span className="text-green-600"> → @{page.instagramAccount.username}</span>
                        ) : (
                          <span className="text-yellow-600"> (Tidak ada IG terhubung)</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-yellow-700">
                  <p>⚠️ Tidak ada Facebook Page ditemukan.</p>
                  <p className="text-xs mt-1">Pastikan token memiliki izin <code>pages_show_list</code> dan akun memiliki Facebook Page.</p>
                </div>
              )}
              
              {/* Errors */}
              {(tokenTestResult.errors?.debug || tokenTestResult.errors?.me || tokenTestResult.errors?.pages) && (
                <details className="mt-2">
                  <summary className="text-xs cursor-pointer text-red-600">Lihat Error Detail</summary>
                  <pre className="text-xs bg-red-100 p-2 rounded mt-1 overflow-x-auto">
                    {JSON.stringify(tokenTestResult.errors, null, 2)}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Buat Post Instagram
            </CardTitle>
            <CardDescription>
              Upload gambar dan tulis caption. Gambar harus dalam format JPEG dan berukuran minimal 320px.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Gambar *</Label>
              <StorageImageUploader
                value={imageUrl}
                onChange={setImageUrl}
              />
              {imageUrl && (
                <div className="mt-2 p-2 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground truncate">
                    URL: {imageUrl}
                  </p>
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <Label htmlFor="caption">Caption (Opsional)</Label>
              <Textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Tulis caption untuk post Instagram..."
                rows={4}
                maxLength={2200}
              />
              <p className="text-xs text-muted-foreground text-right">
                {caption.length}/2200 karakter
              </p>
            </div>

            {/* Post Button */}
            <Button
              onClick={handlePost}
              disabled={!imageUrl || isPosting}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white"
              size="lg"
            >
              {isPosting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Memposting ke Instagram...
                </>
              ) : (
                <>
                  <Instagram className="h-5 w-5 mr-2" />
                  Post ke Instagram
                </>
              )}
            </Button>

            {/* Result Card */}
            {postResult && (
              <Card className={postResult.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
                <CardContent className="pt-4">
                  {postResult.success ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Berhasil diposting!</span>
                      </div>
                      <p className="text-sm text-green-600">
                        Post ID: {postResult.postId}
                      </p>
                      {postResult.instagramUrl && (
                        <Button variant="outline" size="sm" asChild className="mt-2">
                          <a href={postResult.instagramUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Lihat di Instagram
                          </a>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-medium text-red-700">
                        {postResult.error}
                      </p>
                      {postResult.hint && (
                        <p className="text-sm text-red-600">
                          💡 {postResult.hint}
                        </p>
                      )}
                      {postResult.details && (
                        <details className="mt-2">
                          <summary className="text-xs text-red-500 cursor-pointer">
                            Detail Error
                          </summary>
                          <pre className="text-xs bg-red-100 p-2 rounded mt-1 overflow-x-auto">
                            {JSON.stringify(postResult.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-medium text-sm">Tips untuk posting:</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Gunakan gambar dengan format JPEG untuk hasil terbaik</li>
                <li>Ukuran gambar minimal 320x320 pixel</li>
                <li>Caption bisa menggunakan hashtag dan emoji</li>
                <li>Gambar harus diupload terlebih dahulu sebelum posting</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminInstagramPost;
