import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Home, ArrowLeft, Save } from 'lucide-react';
import StorageImageUploader from '@/components/ui/StorageImageUploader';
import { PAGE_MANIFESTS, ContentField } from '@/lib/contentManifest';

const AdminContent: React.FC = () => {
  const { user, isEditor, loading } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isEditor)) navigate('/admin');
  }, [user, isEditor, loading, navigate]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('page_content').select('page_key, content_key, value');
      const map: Record<string, Record<string, string>> = {};
      PAGE_MANIFESTS.forEach((p) => {
        map[p.key] = {};
        p.fields.forEach((f) => { map[p.key][f.key] = f.defaultValue; });
      });
      if (!error && data) {
        data.forEach((r: any) => {
          if (!map[r.page_key]) map[r.page_key] = {};
          map[r.page_key][r.content_key] = r.value ?? '';
        });
      }
      setValues(map);
      setIsLoading(false);
    };
    if (user && isEditor) load();
  }, [user, isEditor]);

  const handleChange = (pageKey: string, fieldKey: string, val: string) => {
    setValues((prev) => ({ ...prev, [pageKey]: { ...prev[pageKey], [fieldKey]: val } }));
  };

  const handleSave = async (pageKey: string, field: ContentField) => {
    const val = values[pageKey]?.[field.key] ?? '';
    const key = `${pageKey}:${field.key}`;
    setSavingKey(key);
    const { error } = await supabase
      .from('page_content')
      .upsert(
        { page_key: pageKey, content_key: field.key, value: val, updated_by: user?.id },
        { onConflict: 'page_key,content_key' }
      );
    setSavingKey(null);
    if (error) toast.error('Gagal menyimpan: ' + error.message);
    else toast.success(`Tersimpan: ${field.label}`);
  };

  const handleReset = async (pageKey: string, field: ContentField) => {
    handleChange(pageKey, field.key, field.defaultValue);
    const { error } = await supabase
      .from('page_content')
      .upsert(
        { page_key: pageKey, content_key: field.key, value: field.defaultValue, updated_by: user?.id },
        { onConflict: 'page_key,content_key' }
      );
    if (error) toast.error('Gagal reset: ' + error.message);
    else toast.success('Dikembalikan ke default');
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-islamic-teal" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-display font-bold text-islamic-navy">Kelola Konten Halaman</h1>
            <p className="text-sm text-muted-foreground">Edit teks & gambar Beranda, Tentang, dan Organisasi</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/kegiatan"><ArrowLeft className="h-4 w-4 mr-2" />Admin</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/"><Home className="h-4 w-4 mr-2" />Beranda</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue={PAGE_MANIFESTS[0].key} className="w-full">
          <TabsList className="mb-6">
            {PAGE_MANIFESTS.map((p) => (
              <TabsTrigger key={p.key} value={p.key}>{p.label}</TabsTrigger>
            ))}
          </TabsList>
          {PAGE_MANIFESTS.map((p) => (
            <TabsContent key={p.key} value={p.key} className="space-y-4">
              {p.fields.map((field) => {
                const val = values[p.key]?.[field.key] ?? '';
                const key = `${p.key}:${field.key}`;
                return (
                  <Card key={field.key}>
                    <CardHeader>
                      <CardTitle className="text-base">{field.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Label className="text-xs text-muted-foreground">Key: {field.key}</Label>
                      {field.type === 'text' && (
                        <Input value={val} onChange={(e) => handleChange(p.key, field.key, e.target.value)} />
                      )}
                      {field.type === 'textarea' && (
                        <Textarea rows={4} value={val} onChange={(e) => handleChange(p.key, field.key, e.target.value)} />
                      )}
                      {field.type === 'image' && (
                        <StorageImageUploader
                          value={val}
                          onChange={(url) => handleChange(p.key, field.key, url)}
                          folder="page-content"
                        />
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-islamic-teal hover:bg-islamic-teal/90"
                          onClick={() => handleSave(p.key, field)}
                          disabled={savingKey === key}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {savingKey === key ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleReset(p.key, field)}>
                          Reset ke default
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default AdminContent;
