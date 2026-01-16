import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Facebook, Instagram, Youtube, ExternalLink, CheckCircle2, AlertCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

const SocialMediaGuide: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Berhasil disalin!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/kegiatan">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-display font-bold text-islamic-navy">Panduan Integrasi Social Media</h1>
            <p className="text-sm text-muted-foreground">Setup posting otomatis ke Facebook, Instagram, dan YouTube</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sebelum Memulai</CardTitle>
            <CardDescription>
              Integrasi langsung dengan API social media memerlukan beberapa persyaratan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800">Persyaratan Penting:</p>
                <ul className="list-disc list-inside text-amber-700 mt-2 space-y-1">
                  <li><strong>Facebook/Instagram:</strong> Memerlukan Facebook Page (bukan profil pribadi) dan akun Instagram Business</li>
                  <li><strong>YouTube:</strong> Memerlukan akun Google/YouTube dengan channel yang sudah aktif</li>
                  <li>Semua platform memerlukan verifikasi developer account</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-4 text-center">
                  <Facebook className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-blue-800">Facebook</p>
                  <p className="text-xs text-blue-600">Graph API</p>
                </CardContent>
              </Card>
              <Card className="border-pink-200 bg-pink-50">
                <CardContent className="pt-4 text-center">
                  <Instagram className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                  <p className="font-medium text-pink-800">Instagram</p>
                  <p className="text-xs text-pink-600">Via Facebook API</p>
                </CardContent>
              </Card>
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-4 text-center">
                  <Youtube className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="font-medium text-red-800">YouTube</p>
                  <p className="text-xs text-red-600">Data API v3</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Facebook Guide */}
        <Card className="mb-6 border-blue-200">
          <CardHeader className="bg-blue-50">
            <div className="flex items-center gap-3">
              <Facebook className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-blue-800">Panduan Facebook API</CardTitle>
                <CardDescription>Setup posting otomatis ke Facebook Page</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="fb-step-1">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    Buat Facebook Developer Account
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>
                      Buka <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline inline-flex items-center gap-1">
                        developers.facebook.com <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>Login dengan akun Facebook Anda</li>
                    <li>Klik <strong>"Get Started"</strong> atau <strong>"My Apps"</strong></li>
                    <li>Lengkapi verifikasi developer (mungkin perlu nomor telepon)</li>
                  </ol>
                  <div className="p-3 bg-blue-50 rounded text-sm">
                    <p className="font-medium">💡 Tips:</p>
                    <p>Gunakan akun Facebook yang sama dengan yang mengelola Facebook Page pesantren</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fb-step-2">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    Buat Facebook App
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Di dashboard developer, klik <strong>"Create App"</strong></li>
                    <li>Pilih tipe: <strong>"Business"</strong></li>
                    <li>Isi nama app: <code className="bg-gray-100 px-2 py-1 rounded">Irsyadul Haq Social</code></li>
                    <li>Pilih Business Portfolio (atau buat baru)</li>
                    <li>Klik <strong>"Create App"</strong></li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fb-step-3">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    Setup Facebook Login & Permissions
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Di dashboard app, klik <strong>"Add Product"</strong></li>
                    <li>Tambahkan <strong>"Facebook Login"</strong></li>
                    <li>Pergi ke <strong>App Settings → Basic</strong></li>
                    <li>Catat <strong>App ID</strong> dan <strong>App Secret</strong></li>
                    <li>
                      Pergi ke <strong>App Review → Permissions</strong> dan minta akses untuk:
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li><code className="bg-gray-100 px-1 rounded">pages_manage_posts</code> - untuk posting ke Page</li>
                        <li><code className="bg-gray-100 px-1 rounded">pages_read_engagement</code> - untuk membaca engagement</li>
                        <li><code className="bg-gray-100 px-1 rounded">pages_show_list</code> - untuk melihat daftar Page</li>
                      </ul>
                    </li>
                  </ol>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded text-sm">
                    <p className="font-medium text-amber-800">⚠️ Perhatian:</p>
                    <p className="text-amber-700">Proses review permissions bisa memakan waktu 1-7 hari kerja</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fb-step-4">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    Dapatkan Page Access Token
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>
                      Buka <a href="https://developers.facebook.com/tools/explorer" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline inline-flex items-center gap-1">
                        Graph API Explorer <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>Pilih app Anda dari dropdown</li>
                    <li>Klik <strong>"Generate Access Token"</strong></li>
                    <li>Pilih permissions yang diperlukan</li>
                    <li>Pilih Facebook Page yang akan digunakan</li>
                    <li>Copy <strong>Page Access Token</strong></li>
                  </ol>
                  <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                    <p className="font-medium text-green-800">✅ Untuk Long-Lived Token:</p>
                    <p className="text-green-700">
                      Gunakan endpoint: <code className="bg-gray-100 px-1 rounded text-xs">GET /oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_TOKEN</code>
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fb-step-5">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
                    Informasi yang Perlu Diberikan ke Saya
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <p className="text-sm">Setelah selesai setup, beritahu saya informasi berikut:</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-100 rounded flex justify-between items-center">
                      <span className="text-sm font-mono">Facebook App ID</span>
                    </div>
                    <div className="p-3 bg-gray-100 rounded flex justify-between items-center">
                      <span className="text-sm font-mono">Facebook App Secret</span>
                    </div>
                    <div className="p-3 bg-gray-100 rounded flex justify-between items-center">
                      <span className="text-sm font-mono">Facebook Page ID</span>
                    </div>
                    <div className="p-3 bg-gray-100 rounded flex justify-between items-center">
                      <span className="text-sm font-mono">Page Access Token (Long-Lived)</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Instagram Guide */}
        <Card className="mb-6 border-pink-200">
          <CardHeader className="bg-pink-50">
            <div className="flex items-center gap-3">
              <Instagram className="h-8 w-8 text-pink-600" />
              <div>
                <CardTitle className="text-pink-800">Panduan Instagram API - Step by Step</CardTitle>
                <CardDescription>Setup posting otomatis ke Instagram Business (@pondokpesantrenirsyadulhaq)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg mb-4">
              <p className="text-sm text-pink-800">
                <strong>📌 Catatan Penting:</strong> Instagram API untuk posting hanya tersedia untuk akun Instagram Business/Creator yang terhubung dengan Facebook Page. API ini menggunakan infrastruktur Facebook Graph API yang sama.
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
              <p className="text-sm text-green-800">
                <strong>✅ Akun Instagram Anda:</strong>{' '}
                <a href="https://www.instagram.com/pondokpesantrenirsyadulhaq" target="_blank" rel="noopener noreferrer" className="underline">
                  @pondokpesantrenirsyadulhaq
                </a>
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full" defaultValue="ig-step-1">
              <AccordionItem value="ig-step-1">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    Konversi ke Instagram Business Account
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                    <p className="font-medium text-blue-800">💡 Mungkin sudah selesai?</p>
                    <p className="text-blue-700">Jika akun @pondokpesantrenirsyadulhaq sudah menjadi Business Account, lewati langkah ini.</p>
                  </div>
                  
                  <p className="text-sm font-medium">Cara mengecek apakah sudah Business Account:</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Buka profil Instagram @pondokpesantrenirsyadulhaq</li>
                    <li>Klik <strong>Edit Profile</strong></li>
                    <li>Jika ada tombol <strong>"Switch to Personal Account"</strong>, berarti sudah Business ✅</li>
                  </ol>

                  <p className="text-sm font-medium mt-4">Jika belum Business Account, ikuti langkah ini:</p>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Buka aplikasi Instagram di HP</li>
                    <li>Login ke akun <strong>@pondokpesantrenirsyadulhaq</strong></li>
                    <li>Tap ikon profil (pojok kanan bawah)</li>
                    <li>Tap <strong>≡</strong> (hamburger menu) di pojok kanan atas</li>
                    <li>Pilih <strong>Settings and privacy</strong></li>
                    <li>Scroll ke bawah, tap <strong>Account type and tools</strong></li>
                    <li>Tap <strong>Switch to professional account</strong></li>
                    <li>Pilih kategori yang sesuai (misal: <strong>Education</strong> atau <strong>Religious Organization</strong>)</li>
                    <li>Pilih <strong>Business</strong> (bukan Creator)</li>
                    <li>Ikuti langkah selanjutnya hingga selesai</li>
                  </ol>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded text-sm mt-4">
                    <p className="font-medium text-green-800">✅ Selesai!</p>
                    <p className="text-green-700">Jika sudah menjadi Business Account, lanjutkan ke Langkah 2.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ig-step-2">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    Hubungkan Instagram ke Facebook Page
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded text-sm">
                    <p className="font-medium text-amber-800">⚠️ Penting!</p>
                    <p className="text-amber-700">Instagram harus terhubung dengan Facebook Page untuk bisa menggunakan API. Gunakan Facebook Page: <strong>Irsyadul Haq Manado</strong></p>
                  </div>

                  <p className="text-sm font-medium">Cara menghubungkan dari Instagram:</p>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Buka aplikasi Instagram</li>
                    <li>Pergi ke profil → <strong>Edit Profile</strong></li>
                    <li>Scroll ke bawah, tap <strong>Page</strong> atau <strong>Connect Facebook Page</strong></li>
                    <li>Login ke Facebook jika diminta</li>
                    <li>Pilih Facebook Page: <strong>Irsyadul Haq Manado</strong></li>
                    <li>Tap <strong>Done</strong></li>
                  </ol>

                  <p className="text-sm font-medium mt-4">Cara alternatif dari Facebook Page:</p>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>
                      Buka{' '}
                      <a href="https://www.facebook.com/irsyadulhaq.manado/settings" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline inline-flex items-center gap-1">
                        Facebook Page Settings <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>Di sidebar kiri, klik <strong>Linked accounts</strong> atau <strong>Instagram</strong></li>
                    <li>Klik <strong>Connect account</strong></li>
                    <li>Masukkan username dan password Instagram @pondokpesantrenirsyadulhaq</li>
                    <li>Berikan izin yang diminta</li>
                  </ol>

                  <div className="p-3 bg-green-50 border border-green-200 rounded text-sm mt-4">
                    <p className="font-medium text-green-800">✅ Cara mengecek sudah terhubung:</p>
                    <p className="text-green-700">Di Instagram Edit Profile → bagian "Page" akan terlihat nama Facebook Page yang terhubung.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ig-step-3">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    Buat Facebook Developer Account & App
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <p className="text-sm font-medium">Langkah 3a: Daftar sebagai Facebook Developer</p>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>
                      Buka{' '}
                      <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline inline-flex items-center gap-1">
                        developers.facebook.com <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>Klik <strong>Get Started</strong> atau <strong>Log In</strong></li>
                    <li>Login dengan akun Facebook yang mengelola Page Irsyadul Haq Manado</li>
                    <li>Setujui Developer Agreement</li>
                    <li>Verifikasi akun dengan nomor telepon jika diminta</li>
                  </ol>

                  <p className="text-sm font-medium mt-4">Langkah 3b: Buat App Baru</p>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Di dashboard developer, klik <strong>My Apps</strong> (kanan atas)</li>
                    <li>Klik <strong>Create App</strong></li>
                    <li>Pilih use case: <strong>Other</strong> → klik Next</li>
                    <li>Pilih app type: <strong>Business</strong> → klik Next</li>
                    <li>
                      Isi detail app:
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>App name: <code className="bg-gray-100 px-2 py-1 rounded">Irsyadul Haq Social Posting</code></li>
                        <li>App contact email: email Anda</li>
                        <li>Business Account: pilih atau buat baru</li>
                      </ul>
                    </li>
                    <li>Klik <strong>Create App</strong></li>
                  </ol>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm mt-4">
                    <p className="font-medium text-blue-800">📝 Catat Informasi App:</p>
                    <p className="text-blue-700">Setelah app dibuat, pergi ke <strong>App Settings → Basic</strong> dan catat:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 text-blue-700">
                      <li><strong>App ID</strong></li>
                      <li><strong>App Secret</strong> (klik Show untuk melihat)</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ig-step-4">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    Setup Instagram Graph API di App
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Di dashboard App, cari bagian <strong>Add products to your app</strong></li>
                    <li>Cari <strong>Instagram Graph API</strong> dan klik <strong>Set Up</strong></li>
                    <li>Pergi ke <strong>App Settings → Basic</strong></li>
                    <li>Scroll ke bawah, isi <strong>Privacy Policy URL</strong>: masukkan URL website pesantren</li>
                    <li>Klik <strong>Save Changes</strong></li>
                  </ol>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded text-sm mt-4">
                    <p className="font-medium text-amber-800">⚠️ Tentang App Mode:</p>
                    <p className="text-amber-700">App dalam mode "Development" hanya bisa digunakan oleh admin/tester. Untuk production, perlu menjalani App Review (bisa memakan waktu beberapa hari).</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ig-step-5">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
                    Dapatkan Access Token & Instagram Business ID
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <p className="text-sm font-medium">Langkah 5a: Buka Graph API Explorer</p>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>
                      Buka{' '}
                      <a href="https://developers.facebook.com/tools/explorer" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline inline-flex items-center gap-1">
                        Graph API Explorer <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>Di dropdown <strong>Meta App</strong>, pilih app yang baru dibuat (Irsyadul Haq Social Posting)</li>
                    <li>Klik <strong>Generate Access Token</strong></li>
                    <li>
                      Di popup, centang permissions berikut:
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li><code className="bg-gray-100 px-1 rounded">pages_show_list</code></li>
                        <li><code className="bg-gray-100 px-1 rounded">pages_read_engagement</code></li>
                        <li><code className="bg-gray-100 px-1 rounded">instagram_basic</code></li>
                        <li><code className="bg-gray-100 px-1 rounded">instagram_content_publish</code></li>
                      </ul>
                    </li>
                    <li>Klik <strong>Generate Access Token</strong></li>
                    <li>Login dan berikan izin ke Facebook Page Irsyadul Haq Manado</li>
                  </ol>

                  <p className="text-sm font-medium mt-4">Langkah 5b: Dapatkan Instagram Business Account ID</p>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>
                      Di Graph API Explorer, masukkan query ini di kolom input:
                      <div className="flex items-center gap-2 mt-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1">me/accounts?fields=name,instagram_business_account</code>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard('me/accounts?fields=name,instagram_business_account')}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </li>
                    <li>Klik <strong>Submit</strong></li>
                    <li>
                      Hasil akan menampilkan:
                      <pre className="bg-gray-100 p-2 rounded text-xs mt-2 overflow-x-auto">
{`{
  "data": [
    {
      "name": "Irsyadul Haq Manado",
      "instagram_business_account": {
        "id": "INSTAGRAM_BUSINESS_ID" ← Catat ini!
      },
      "id": "PAGE_ID"
    }
  ]
}`}
                      </pre>
                    </li>
                    <li>Catat <strong>instagram_business_account.id</strong></li>
                  </ol>

                  <p className="text-sm font-medium mt-4">Langkah 5c: Dapatkan Page Access Token (Long-Lived)</p>
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>
                      Di Graph API Explorer, masukkan query:
                      <div className="flex items-center gap-2 mt-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1">me/accounts?fields=access_token</code>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard('me/accounts?fields=access_token')}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </li>
                    <li>Klik <strong>Submit</strong></li>
                    <li>Catat <strong>access_token</strong> dari Page Irsyadul Haq Manado</li>
                  </ol>

                  <div className="p-3 bg-green-50 border border-green-200 rounded text-sm mt-4">
                    <p className="font-medium text-green-800">💡 Tips: Page Access Token dari langkah ini sudah Long-Lived (tidak expire) selama app masih aktif.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ig-step-6">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">6</span>
                    Berikan Informasi ke Saya
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <p className="text-sm">Setelah selesai setup, beritahu saya:</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-100 rounded">
                      <span className="text-sm font-mono">Instagram Business Account ID</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      (Page Access Token yang sama dari Facebook akan digunakan)
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* YouTube Guide */}
        <Card className="mb-6 border-red-200">
          <CardHeader className="bg-red-50">
            <div className="flex items-center gap-3">
              <Youtube className="h-8 w-8 text-red-600" />
              <div>
                <CardTitle className="text-red-800">Panduan YouTube API</CardTitle>
                <CardDescription>Setup upload video otomatis ke YouTube</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
              <p className="text-sm text-amber-800">
                <strong>⚠️ Catatan:</strong> YouTube API memiliki quota harian yang terbatas. Setiap upload video menggunakan sekitar 1600 quota units dari total 10.000 units per hari.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="yt-step-1">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    Buat Google Cloud Project
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>
                      Buka <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-red-600 underline inline-flex items-center gap-1">
                        Google Cloud Console <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                    <li>Login dengan akun Google yang mengelola channel YouTube pesantren</li>
                    <li>Klik <strong>"Select a project"</strong> → <strong>"New Project"</strong></li>
                    <li>Nama project: <code className="bg-gray-100 px-2 py-1 rounded">Irsyadul Haq YouTube</code></li>
                    <li>Klik <strong>"Create"</strong></li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="yt-step-2">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    Aktifkan YouTube Data API v3
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Di Google Cloud Console, pergi ke <strong>APIs & Services → Library</strong></li>
                    <li>Cari <strong>"YouTube Data API v3"</strong></li>
                    <li>Klik dan pilih <strong>"Enable"</strong></li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="yt-step-3">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    Buat OAuth 2.0 Credentials
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Pergi ke <strong>APIs & Services → Credentials</strong></li>
                    <li>Klik <strong>"Create Credentials"</strong> → <strong>"OAuth client ID"</strong></li>
                    <li>Jika diminta, konfigurasi <strong>OAuth consent screen</strong>:
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>User Type: <strong>External</strong></li>
                        <li>App name: <code className="bg-gray-100 px-1 rounded">Irsyadul Haq YouTube Upload</code></li>
                        <li>User support email: email Anda</li>
                        <li>Developer contact: email Anda</li>
                      </ul>
                    </li>
                    <li>Di Scopes, tambahkan:
                      <ul className="list-disc list-inside ml-4 mt-2">
                        <li><code className="bg-gray-100 px-1 rounded text-xs">https://www.googleapis.com/auth/youtube.upload</code></li>
                      </ul>
                    </li>
                    <li>Application type: <strong>Web application</strong></li>
                    <li>Authorized redirect URIs, tambahkan:
                      <div className="flex items-center gap-2 mt-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1">https://serene-pesantren-portal.lovable.app/youtube-callback</code>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard('https://serene-pesantren-portal.lovable.app/youtube-callback')}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </li>
                    <li>Klik <strong>"Create"</strong> dan catat <strong>Client ID</strong> & <strong>Client Secret</strong></li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="yt-step-4">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    Publish OAuth Consent Screen
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <ol className="list-decimal list-inside space-y-3 text-sm">
                    <li>Pergi ke <strong>OAuth consent screen</strong></li>
                    <li>Di bagian <strong>Test users</strong>, tambahkan email akun YouTube pesantren</li>
                    <li>Untuk production, klik <strong>"Publish App"</strong> (opsional, bisa tetap dalam mode testing untuk penggunaan internal)</li>
                  </ol>
                  <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                    <p className="font-medium text-green-800">✅ Mode Testing:</p>
                    <p className="text-green-700">Jika hanya untuk penggunaan internal pesantren, mode testing sudah cukup. Tidak perlu publish ke production.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="yt-step-5">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
                    Informasi yang Perlu Diberikan ke Saya
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pl-8">
                  <p className="text-sm">Setelah selesai setup, beritahu saya:</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-100 rounded">
                      <span className="text-sm font-mono">YouTube/Google OAuth Client ID</span>
                    </div>
                    <div className="p-3 bg-gray-100 rounded">
                      <span className="text-sm font-mono">YouTube/Google OAuth Client Secret</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6" />
              Langkah Selanjutnya
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-green-700">
              Setelah Anda selesai dengan langkah-langkah di atas, kirimkan informasi berikut kepada saya (via chat):
            </p>
            <div className="grid gap-3">
              <div className="p-3 bg-white rounded-lg border border-green-200">
                <p className="font-medium text-sm">Facebook:</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside">
                  <li>App ID</li>
                  <li>App Secret</li>
                  <li>Page ID</li>
                  <li>Page Access Token (Long-Lived)</li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded-lg border border-green-200">
                <p className="font-medium text-sm">Instagram:</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside">
                  <li>Instagram Business Account ID</li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded-lg border border-green-200">
                <p className="font-medium text-sm">YouTube:</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside">
                  <li>OAuth Client ID</li>
                  <li>OAuth Client Secret</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-green-700 font-medium">
              Saya akan membuatkan sistem integrasi lengkap setelah Anda memberikan informasi tersebut! 🚀
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SocialMediaGuide;
