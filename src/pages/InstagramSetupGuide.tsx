import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Instagram, ExternalLink, CheckCircle2, MousePointer, Globe, Key, User, Settings, Plus, LogIn, Copy, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const InstagramSetupGuide: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Berhasil disalin!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/kegiatan">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-xl">
              <Instagram className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Panduan Setup Instagram API</h1>
              <p className="text-sm text-gray-500">Step-by-step dengan ilustrasi visual</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Intro */}
        <Card className="mb-8 border-pink-200 bg-white/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <Instagram className="h-8 w-8 text-pink-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Apa yang akan kita buat?</h2>
                <p className="text-gray-600">
                  Kita akan membuat koneksi ke Instagram API agar bisa posting otomatis ke akun Instagram pesantren.
                  Ikuti langkah-langkah di bawah ini secara berurutan.
                </p>
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span><strong>Syarat:</strong> Akun Instagram harus sudah menjadi <strong>Professional Account</strong> (Business atau Creator)</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* STEP 0: Prerequisites */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">0</div>
            <h2 className="text-xl font-bold text-gray-800">Persiapan: Ubah ke Professional Account</h2>
          </div>
          
          <Card className="border-gray-200">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-4">Jika akun Instagram Anda masih personal, ubah dulu menjadi Professional:</p>
              
              <div className="grid md:grid-cols-3 gap-4">
                {/* Step 0.1 */}
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-200">
                  <div className="bg-white rounded-lg p-4 mb-3 shadow-sm">
                    <div className="flex items-center justify-center h-24">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <User className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-xs text-gray-500">Profil Instagram</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-center">1. Buka Instagram → Profil</p>
                </div>

                {/* Step 0.2 */}
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-200">
                  <div className="bg-white rounded-lg p-4 mb-3 shadow-sm">
                    <div className="flex items-center justify-center h-24">
                      <div className="text-center">
                        <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2">
                          <Settings className="h-5 w-5 text-gray-600" />
                          <span className="text-sm font-medium">Settings</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 mx-auto my-1" />
                        <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm">
                          Account type
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-center">2. Settings → Account → Account type</p>
                </div>

                {/* Step 0.3 */}
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-200">
                  <div className="bg-white rounded-lg p-4 mb-3 shadow-sm">
                    <div className="flex items-center justify-center h-24">
                      <div className="text-center space-y-2">
                        <div className="bg-blue-500 text-white rounded-lg px-3 py-1.5 text-sm font-medium">
                          Switch to Professional
                        </div>
                        <div className="text-xs text-gray-500">Pilih "Business"</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-center">3. Pilih "Switch to Professional" → Business</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Jika sudah Professional Account, lanjut ke Step 1</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STEP 1: Create Meta App */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</div>
            <h2 className="text-xl font-bold text-gray-800">Buka Meta for Developers</h2>
          </div>
          
          <Card className="border-pink-200">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left: Visual */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="h-5 w-5" />
                      <span className="text-sm opacity-80">developers.facebook.com</span>
                    </div>
                    <div className="bg-white/20 rounded px-3 py-2 text-sm">
                      🔗 developers.facebook.com/apps
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MousePointer className="h-4 w-4" />
                      <span className="text-sm">Klik tombol hijau "Create App"</span>
                    </div>
                  </div>
                </div>

                {/* Right: Instructions */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-pink-100 text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">a</div>
                    <div>
                      <p className="font-medium">Buka Link Berikut:</p>
                      <a 
                        href="https://developers.facebook.com/apps" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 mt-1"
                      >
                        developers.facebook.com/apps <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-pink-100 text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">b</div>
                    <div>
                      <p className="font-medium">Login dengan akun Facebook</p>
                      <p className="text-sm text-gray-500">Gunakan akun yang mengelola Instagram pesantren</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-pink-100 text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">c</div>
                    <div>
                      <p className="font-medium">Klik tombol "Create App"</p>
                      <p className="text-sm text-gray-500">Tombol hijau di pojok kanan atas</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STEP 2: App Setup Wizard */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</div>
            <h2 className="text-xl font-bold text-gray-800">Ikuti Wizard Pembuatan App</h2>
          </div>
          
          <Card className="border-pink-200">
            <CardContent className="pt-6 space-y-6">
              {/* Wizard Step 1 */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <span className="text-sm font-medium text-gray-600">Wizard Step 1: Connect a business portfolio</span>
                </div>
                <div className="p-4 flex gap-4 items-center">
                  <div className="bg-gray-50 rounded-lg p-4 flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
                        <span className="text-sm">Pilih Business Portfolio (jika ada)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-pink-500 bg-pink-500"></div>
                        <span className="text-sm font-medium text-pink-600">✓ ATAU: "I don't want to connect..."</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                  <div className="bg-pink-500 text-white rounded-lg px-4 py-2 font-medium">
                    Next
                  </div>
                </div>
              </div>

              {/* Wizard Step 2 */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <span className="text-sm font-medium text-gray-600">Wizard Step 2: Select use case</span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="border rounded-lg p-3 text-center text-sm text-gray-500">
                      Authenticate users
                    </div>
                    <div className="border rounded-lg p-3 text-center text-sm text-gray-500">
                      Build AI experiences
                    </div>
                    <div className="border-2 border-pink-500 rounded-lg p-3 text-center text-sm font-medium text-pink-600 bg-pink-50">
                      ✓ Other
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 bg-amber-50 p-2 rounded">
                    <strong>Pilih "Other"</strong> karena opsi Instagram ada di sini
                  </p>
                </div>
              </div>

              {/* Wizard Step 3 */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <span className="text-sm font-medium text-gray-600">Wizard Step 3: Select app type</span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="border rounded-lg p-3 text-center text-sm text-gray-500">
                      Consumer
                    </div>
                    <div className="border-2 border-pink-500 rounded-lg p-3 text-center text-sm font-medium text-pink-600 bg-pink-50">
                      ✓ Business
                    </div>
                    <div className="border rounded-lg p-3 text-center text-sm text-gray-500">
                      Gaming
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 bg-green-50 p-2 rounded flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <strong>PENTING: Pilih "Business"</strong> - ini wajib untuk akses Instagram API!
                  </p>
                </div>
              </div>

              {/* Wizard Step 4 */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <span className="text-sm font-medium text-gray-600">Wizard Step 4: Add app details</span>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">App name:</label>
                      <div className="bg-gray-100 rounded-lg px-3 py-2 mt-1 font-mono text-sm flex justify-between items-center">
                        <span>Pesantren Social</span>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard('Pesantren Social')}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Contact email:</label>
                      <div className="bg-gray-100 rounded-lg px-3 py-2 mt-1 text-sm text-gray-500">
                        (gunakan email Anda)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-green-500 text-white rounded-lg px-6 py-3 font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  Klik "Create App"
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STEP 3: Add Instagram Product */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</div>
            <h2 className="text-xl font-bold text-gray-800">Tambahkan Produk Instagram</h2>
          </div>
          
          <Card className="border-pink-200">
            <CardContent className="pt-6">
              <p className="text-gray-600 mb-4">Setelah app dibuat, Anda akan melihat halaman Dashboard. Cari bagian "Add products to your app":</p>
              
              <div className="bg-gray-900 rounded-xl p-6 text-white mb-4">
                <p className="text-gray-400 text-sm mb-4">Tampilan Dashboard App:</p>
                
                {/* Simulated Dashboard */}
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-400 mb-3">Add products to your app:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-xs">f</div>
                        <span className="text-sm">Facebook Login</span>
                      </div>
                      <p className="text-xs text-gray-400">for Business</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-3 border-2 border-pink-500 relative">
                      <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Pilih ini!
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-500 rounded flex items-center justify-center">
                          <Instagram className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">Instagram</span>
                      </div>
                      <p className="text-xs text-gray-400">Manage content, insights</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MousePointer className="h-5 w-5 text-pink-400" />
                  <span className="text-sm">Klik <strong>"Set up"</strong> pada card Instagram</span>
                </div>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Setelah klik Set up, di sidebar kiri akan muncul menu <strong>"Instagram"</strong></span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STEP 4: Add Developer Role - FIX ERROR */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">4</div>
            <h2 className="text-xl font-bold text-gray-800">⚠️ PENTING: Tambahkan Developer Role</h2>
          </div>
          
          <Card className="border-red-300 bg-red-50/50">
            <CardContent className="pt-6">
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800">Jika muncul error:</p>
                    <p className="text-red-700 font-mono text-sm mt-1">"Insufficient Developer Role: Insufficient developer role"</p>
                    <p className="text-red-700 text-sm mt-2">Ikuti langkah di bawah ini untuk mengatasinya:</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Sub-step A */}
                <div className="flex gap-4">
                  <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">A</div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Buka App Roles di Sidebar Kiri</p>
                    <div className="bg-gray-900 rounded-lg p-4 text-white">
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <span className="text-gray-400">Sidebar:</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-gray-800 rounded px-3 py-2 text-sm flex items-center gap-2">
                          <span>📱 Instagram</span>
                        </div>
                        <div className="bg-gray-800 rounded px-3 py-2 text-sm flex items-center gap-2">
                          <span>📊 App Dashboard</span>
                        </div>
                        <div className="bg-blue-600 rounded px-3 py-2 text-sm flex items-center gap-2 border-2 border-blue-400">
                          <span>👥 <strong>App Roles</strong></span>
                          <span className="ml-auto text-xs bg-yellow-500 text-black px-2 py-0.5 rounded">Klik ini!</span>
                        </div>
                        <div className="ml-4 bg-gray-700 rounded px-3 py-2 text-sm flex items-center gap-2">
                          <ArrowRight className="h-3 w-3" />
                          <span className="font-medium text-green-400">Roles</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-step B */}
                <div className="flex gap-4">
                  <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">B</div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Klik "Add People"</p>
                    <div className="bg-gray-900 rounded-lg p-4 text-white">
                      <p className="text-sm text-gray-400 mb-3">Halaman App Roles:</p>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-medium">Roles</span>
                          <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add People
                            <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded">Klik!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-step C */}
                <div className="flex gap-4">
                  <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">C</div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Tambahkan diri Anda sebagai Admin/Developer</p>
                    <div className="bg-gray-900 rounded-lg p-4 text-white">
                      <p className="text-sm text-gray-400 mb-3">Dialog "Add People":</p>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                        <div>
                          <label className="text-sm text-gray-400">1. Pilih Role:</label>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500"></div>
                              <span className="font-medium text-green-400">Administrator</span>
                              <span className="text-xs text-gray-500">(Rekomendasi)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border-2 border-gray-500"></div>
                              <span>Developer</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">2. Masukkan nama/email Facebook Anda:</label>
                          <div className="mt-2 bg-gray-700 rounded px-3 py-2 text-sm">
                            <input type="text" placeholder="Nama Facebook Anda..." className="bg-transparent w-full outline-none text-white placeholder-gray-500" disabled />
                          </div>
                        </div>
                        <div className="bg-blue-500 text-white text-center py-2 rounded font-medium">
                          Add
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-step D */}
                <div className="flex gap-4">
                  <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">D</div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Terima Undangan (jika diperlukan)</p>
                    <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                      <p className="text-amber-800 text-sm flex items-start gap-2">
                        <span className="text-lg">🔔</span>
                        <span>
                          <strong>Cek Notifikasi Facebook:</strong><br/>
                          Buka <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Facebook.com</a> → 
                          Klik ikon lonceng (🔔) → Cari undangan dari app Anda → Klik "Accept"
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-green-800 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  Setelah role ditambahkan, lanjut ke Step 5 untuk Generate Token
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STEP 5: Generate Token */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">5</div>
            <h2 className="text-xl font-bold text-gray-800">Generate Access Token</h2>
          </div>
          
          <Card className="border-pink-200">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Sub-step A */}
                <div className="flex gap-4">
                  <div className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">A</div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Buka menu Instagram di sidebar kiri</p>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Instagram className="h-4 w-4 text-pink-500" />
                        <span>Instagram</span>
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                        <span className="font-medium text-pink-600">API setup with Instagram business login</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-step B */}
                <div className="flex gap-4">
                  <div className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">B</div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Di bagian "1. Generate access tokens"</p>
                    <div className="bg-gray-900 rounded-lg p-4 text-white">
                      <p className="text-sm text-gray-400 mb-3">Generate access tokens:</p>
                      <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Plus className="h-5 w-5 text-blue-400" />
                          <span className="text-sm">Add Instagram account</span>
                        </div>
                        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          Klik ini
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-step C */}
                <div className="flex gap-4">
                  <div className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">C</div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Login ke akun Instagram</p>
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg p-4 text-white">
                      <div className="bg-white/20 rounded-lg p-4 text-center">
                        <LogIn className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Login dengan akun Instagram pesantren</p>
                        <p className="text-xs opacity-80 mt-1">Berikan semua izin yang diminta</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-step D */}
                <div className="flex gap-4">
                  <div className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">D</div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Generate Token</p>
                    <div className="bg-gray-900 rounded-lg p-4 text-white">
                      <p className="text-sm text-gray-400 mb-3">Akun yang sudah terhubung:</p>
                      <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm">@akun_pesantren</span>
                        </div>
                        <div className="bg-green-500 text-white text-xs px-3 py-1.5 rounded font-medium">
                          Generate token
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-gray-700 rounded text-xs font-mono">
                        <span className="text-gray-400">Token: </span>
                        <span className="text-green-400">EAAxxxxxx...</span>
                        <Button size="sm" variant="ghost" className="ml-2 h-5 text-white hover:bg-gray-600" onClick={() => toast.info('Copy token dari Meta Dashboard')}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <Key className="h-4 w-4" />
                      Copy access token ini, akan digunakan nanti
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STEP 6: Get User ID */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">6</div>
            <h2 className="text-xl font-bold text-gray-800">Dapatkan Instagram User ID</h2>
          </div>
          
          <Card className="border-pink-200">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-gray-600">Gunakan token untuk mendapatkan User ID:</p>
                
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-medium">Buka Graph API Explorer:</p>
                    <a 
                      href="https://developers.facebook.com/tools/explorer" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      developers.facebook.com/tools/explorer <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Setup di Graph API Explorer:</p>
                    <div className="bg-gray-100 rounded-lg p-4 space-y-3">
                      <div>
                        <label className="text-xs text-gray-500">Meta App:</label>
                        <div className="bg-white rounded px-3 py-2 text-sm border">Pilih app "Pesantren Social"</div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Access Token:</label>
                        <div className="bg-white rounded px-3 py-2 text-sm border text-gray-400">Paste token dari Step 4</div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Query:</label>
                        <div className="bg-white rounded px-3 py-2 text-sm border font-mono flex justify-between items-center">
                          <span>me?fields=user_id,username</span>
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard('me?fields=user_id,username')}>
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-medium">Ganti base URL ke Instagram:</p>
                    <div className="bg-gray-100 rounded-lg px-3 py-2 mt-1 font-mono text-sm flex justify-between items-center">
                      <span>graph.instagram.com</span>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard('graph.instagram.com')}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Di bagian atas, ganti dari "graph.facebook.com" ke "graph.instagram.com"</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Klik Submit dan lihat hasil:</p>
                    <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "user_id": "17841400000000000",  ← CATAT INI!
  "username": "akun_pesantren"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STEP 7: Get App Credentials */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">7</div>
            <h2 className="text-xl font-bold text-gray-800">Dapatkan App ID & App Secret</h2>
          </div>
          
          <Card className="border-pink-200">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-medium">Di sidebar kiri, klik:</p>
                    <div className="bg-gray-100 rounded-lg px-3 py-2 mt-1 flex items-center gap-2 text-sm">
                      <Settings className="h-4 w-4" />
                      <span>App settings</span>
                      <ArrowRight className="h-3 w-3 text-gray-400" />
                      <span className="font-medium">Basic</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Catat informasi berikut:</p>
                    <div className="bg-gray-100 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">App ID:</span>
                        <div className="bg-white rounded px-3 py-1 text-sm font-mono border">123456789012345</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">App Secret:</span>
                        <div className="bg-white rounded px-3 py-1 text-sm font-mono border flex items-center gap-2">
                          <span>••••••••••••••••</span>
                          <span className="text-xs text-blue-600">Show</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card className="border-green-300 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6" />
              Selesai! Kirimkan Info Berikut
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Setelah selesai semua langkah di atas, kirimkan 4 informasi ini ke saya:
            </p>
            <div className="grid gap-3">
              <div className="bg-white rounded-lg p-4 border border-green-200 flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <Key className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">1. Instagram User ID</p>
                  <p className="text-sm text-gray-500">dari Step 5</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200 flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <Key className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">2. Access Token</p>
                  <p className="text-sm text-gray-500">dari Step 4</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200 flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <Key className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">3. App ID</p>
                  <p className="text-sm text-gray-500">dari Step 6</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200 flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <Key className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">4. App Secret</p>
                  <p className="text-sm text-gray-500">dari Step 6</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>💬 Cara mengirim:</strong> Ketik di chat seperti ini:
              </p>
              <pre className="bg-white mt-2 p-3 rounded text-xs overflow-x-auto border">
{`Instagram User ID: 17841400000000000
Access Token: EAAxxxxxxxxxx
App ID: 123456789012345
App Secret: abcd1234efgh5678`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link to="/panduan-social-media">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Lihat Panduan Lengkap (FB, IG, YouTube)
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default InstagramSetupGuide;
