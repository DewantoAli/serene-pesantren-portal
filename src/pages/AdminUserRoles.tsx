import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Trash2, LogOut, Home, Users, Shield, UserCog } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface UserWithRoles {
  id: string;
  email: string;
  roles: AppRole[];
  created_at: string;
}

const AdminUserRoles: React.FC = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<AppRole>('editor');
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin');
      toast.error('Hanya admin yang dapat mengakses halaman ini');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchUsersWithRoles();
    }
  }, [user, isAdmin]);

  const fetchUsersWithRoles = async () => {
    setIsLoading(true);
    try {
      // Fetch all user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (rolesError) throw rolesError;

      // Group roles by user_id
      const userRolesMap = new Map<string, AppRole[]>();
      const userCreatedAtMap = new Map<string, string>();
      
      rolesData?.forEach(role => {
        const existing = userRolesMap.get(role.user_id) || [];
        existing.push(role.role);
        userRolesMap.set(role.user_id, existing);
        if (!userCreatedAtMap.has(role.user_id)) {
          userCreatedAtMap.set(role.user_id, role.created_at);
        }
      });

      // Create user list with roles (we'll show user_id as identifier)
      const usersWithRoles: UserWithRoles[] = Array.from(userRolesMap.entries()).map(([userId, roles]) => ({
        id: userId,
        email: userId.substring(0, 8) + '...', // Show partial ID as placeholder
        roles,
        created_at: userCreatedAtMap.get(userId) || ''
      }));

      setUsers(usersWithRoles);
    } catch (error: any) {
      toast.error('Gagal memuat data: ' + error.message);
    }
    setIsLoading(false);
  };

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUserId.trim()) {
      toast.error('User ID tidak boleh kosong');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: selectedUserId.trim(),
          role: selectedRole
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('User sudah memiliki role ini');
        } else {
          throw error;
        }
        return;
      }

      toast.success(`Role ${selectedRole} berhasil ditambahkan!`);
      setIsDialogOpen(false);
      setSelectedUserId('');
      setSelectedRole('editor');
      fetchUsersWithRoles();
    } catch (error: any) {
      toast.error('Gagal menambahkan role: ' + error.message);
    }
  };

  const handleRemoveRole = async (userId: string, role: AppRole) => {
    if (userId === user?.id && role === 'admin') {
      toast.error('Anda tidak dapat menghapus role admin Anda sendiri');
      return;
    }

    if (!confirm(`Apakah Anda yakin ingin menghapus role ${role} dari user ini?`)) return;

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) throw error;

      toast.success('Role berhasil dihapus!');
      fetchUsersWithRoles();
    } catch (error: any) {
      toast.error('Gagal menghapus role: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const getRoleBadgeColor = (role: AppRole) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500 hover:bg-red-600';
      case 'editor':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getRoleIcon = (role: AppRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-3 w-3 mr-1" />;
      case 'editor':
        return <UserCog className="h-3 w-3 mr-1" />;
      default:
        return <Users className="h-3 w-3 mr-1" />;
    }
  };

  const filteredUsers = users.filter(u => 
    u.id.toLowerCase().includes(searchEmail.toLowerCase())
  );

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
            <h1 className="text-2xl font-display font-bold text-islamic-navy">Kelola User Roles</h1>
            <p className="text-sm text-muted-foreground">Tambah dan hapus role untuk pengguna</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Beranda
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/kegiatan">
                <Users className="h-4 w-4 mr-2" />
                Kegiatan
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
        {/* Info Card */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <p className="text-sm text-blue-800">
              <strong>Cara Menambah Role:</strong> Untuk mendapatkan User ID, minta pengguna untuk mendaftar di halaman 
              <Link to="/admin" className="text-blue-600 underline mx-1">/admin</Link>
              lalu Anda dapat melihat User ID mereka di database atau minta mereka mengirimkan ID dari profil mereka.
            </p>
            <p className="text-sm text-blue-800 mt-2">
              <strong>Your User ID:</strong> <code className="bg-blue-100 px-2 py-1 rounded">{user?.id}</code>
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mb-6 gap-4">
          <Input
            placeholder="Cari berdasarkan User ID..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="max-w-xs"
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-islamic-teal hover:bg-islamic-teal/90">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Role Baru</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddRole} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Masukkan User ID (UUID) dari pengguna yang sudah terdaftar
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={selectedRole}
                    onValueChange={(value) => setSelectedRole(value as AppRole)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-red-500" />
                          Admin (Full Access)
                        </div>
                      </SelectItem>
                      <SelectItem value="editor">
                        <div className="flex items-center">
                          <UserCog className="h-4 w-4 mr-2 text-blue-500" />
                          Editor (Manage Content)
                        </div>
                      </SelectItem>
                      <SelectItem value="user">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          User (Basic Access)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit" className="bg-islamic-teal hover:bg-islamic-teal/90">
                    Tambah Role
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((userItem) => (
            <Card key={userItem.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono break-all">
                  {userItem.id}
                </CardTitle>
                {userItem.id === user?.id && (
                  <Badge variant="outline" className="w-fit text-xs">Anda</Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userItem.roles.map((role) => (
                    <Badge 
                      key={role} 
                      className={`${getRoleBadgeColor(role)} text-white flex items-center gap-1`}
                    >
                      {getRoleIcon(role)}
                      {role}
                      <button
                        onClick={() => handleRemoveRole(userItem.id, role)}
                        className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                        title="Hapus role"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-muted-foreground">
              {searchEmail ? 'Tidak ada user yang ditemukan' : 'Belum ada user dengan role. Klik "Tambah Role" untuk memulai.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUserRoles;
