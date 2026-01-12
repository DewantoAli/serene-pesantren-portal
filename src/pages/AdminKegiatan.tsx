import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, LogOut, Eye, Home, Image, Video } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string | null;
  location: string | null;
  participants: string | null;
  media_type: string | null;
  media_url: string | null;
  is_published: boolean | null;
  created_at: string;
}

const AdminKegiatan: React.FC = () => {
  const { user, isEditor, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    participants: '',
    media_type: 'image',
    media_url: '',
    is_published: true
  });

  useEffect(() => {
    if (!loading && (!user || !isEditor)) {
      navigate('/admin');
    }
  }, [user, isEditor, loading, navigate]);

  useEffect(() => {
    if (user && isEditor) {
      fetchActivities();
    }
  }, [user, isEditor]);

  const fetchActivities = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Gagal memuat data: ' + error.message);
    } else {
      setActivities(data || []);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      participants: '',
      media_type: 'image',
      media_url: '',
      is_published: true
    });
    setEditingActivity(null);
  };

  const handleOpenDialog = (activity?: Activity) => {
    if (activity) {
      setEditingActivity(activity);
      setFormData({
        title: activity.title,
        description: activity.description || '',
        date: activity.date,
        time: activity.time || '',
        location: activity.location || '',
        participants: activity.participants || '',
        media_type: activity.media_type || 'image',
        media_url: activity.media_url || '',
        is_published: activity.is_published ?? true
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const activityData = {
      title: formData.title,
      description: formData.description || null,
      date: formData.date,
      time: formData.time || null,
      location: formData.location || null,
      participants: formData.participants || null,
      media_type: formData.media_type,
      media_url: formData.media_url || null,
      is_published: formData.is_published
    };

    if (editingActivity) {
      const { error } = await supabase
        .from('activities')
        .update(activityData)
        .eq('id', editingActivity.id);

      if (error) {
        toast.error('Gagal mengupdate: ' + error.message);
      } else {
        toast.success('Kegiatan berhasil diupdate!');
        setIsDialogOpen(false);
        fetchActivities();
      }
    } else {
      const { error } = await supabase
        .from('activities')
        .insert([{ ...activityData, created_by: user?.id }]);

      if (error) {
        toast.error('Gagal menambahkan: ' + error.message);
      } else {
        toast.success('Kegiatan berhasil ditambahkan!');
        setIsDialogOpen(false);
        fetchActivities();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      toast.error('Hanya admin yang dapat menghapus kegiatan');
      return;
    }

    if (!confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) return;

    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Gagal menghapus: ' + error.message);
    } else {
      toast.success('Kegiatan berhasil dihapus!');
      fetchActivities();
    }
  };

  const handleTogglePublish = async (activity: Activity) => {
    const { error } = await supabase
      .from('activities')
      .update({ is_published: !activity.is_published })
      .eq('id', activity.id);

    if (error) {
      toast.error('Gagal mengubah status: ' + error.message);
    } else {
      toast.success(activity.is_published ? 'Kegiatan disembunyikan' : 'Kegiatan dipublikasikan');
      fetchActivities();
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  if (loading || isLoading) {
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
          <div>
            <h1 className="text-2xl font-display font-bold text-islamic-navy">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Kelola Kegiatan Santri</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Beranda
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/kegiatan-santri">
                <Eye className="h-4 w-4 mr-2" />
                Lihat Halaman
              </Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-islamic-navy">Daftar Kegiatan</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="bg-islamic-teal hover:bg-islamic-teal/90">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kegiatan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingActivity ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Kegiatan *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Tanggal *</Label>
                    <Input
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="Contoh: 15 Januari 2025"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Waktu</Label>
                    <Input
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="Contoh: 08:00 - 10:00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Contoh: Masjid Utama"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="participants">Peserta</Label>
                    <Input
                      id="participants"
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                      placeholder="Contoh: Seluruh Santri"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="media_type">Tipe Media</Label>
                    <Select
                      value={formData.media_type}
                      onValueChange={(value) => setFormData({ ...formData, media_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">
                          <div className="flex items-center">
                            <Image className="h-4 w-4 mr-2" />
                            Gambar
                          </div>
                        </SelectItem>
                        <SelectItem value="video">
                          <div className="flex items-center">
                            <Video className="h-4 w-4 mr-2" />
                            Video YouTube
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="media_url">
                    {formData.media_type === 'image' ? 'URL Gambar' : 'URL Embed YouTube'}
                  </Label>
                  <Input
                    id="media_url"
                    value={formData.media_url}
                    onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                    placeholder={formData.media_type === 'image' 
                      ? 'https://example.com/image.jpg' 
                      : 'https://youtube.com/embed/VIDEO_ID'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label htmlFor="is_published">Publikasikan</Label>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit" className="bg-islamic-teal hover:bg-islamic-teal/90">
                    {editingActivity ? 'Simpan Perubahan' : 'Tambah Kegiatan'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id} className={`${!activity.is_published ? 'opacity-60' : ''}`}>
              <div className="relative">
                {activity.media_type === 'video' && activity.media_url ? (
                  <iframe
                    src={activity.media_url}
                    className="w-full h-40"
                    frameBorder="0"
                    allowFullScreen
                  />
                ) : activity.media_url ? (
                  <img
                    src={activity.media_url}
                    alt={activity.title}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Media</span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    activity.is_published 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {activity.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{activity.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>📅 {activity.date}</p>
                  {activity.time && <p>🕐 {activity.time}</p>}
                  {activity.location && <p>📍 {activity.location}</p>}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenDialog(activity)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleTogglePublish(activity)}
                  >
                    <Eye className={`h-4 w-4 ${activity.is_published ? '' : 'text-gray-400'}`} />
                  </Button>
                  {isAdmin && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(activity.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Belum ada kegiatan. Klik tombol "Tambah Kegiatan" untuk memulai.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminKegiatan;
