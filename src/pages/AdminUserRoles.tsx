import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Trash2, LogOut, Home, Users, Shield, UserCog, RefreshCw } from 'lucide-react';
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
      // Call edge function to get all users with roles
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/list-users`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mengambil data user');
      }

      const { users: usersData } = await response.json();
      setUsers(usersData);
    } catch (error: any) {
      toast.error('Gagal memuat data: ' + error.message);
    }
    setIsLoading(false);
  };

  const handleAddRole = async (userId: string, role: AppRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: role
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('User sudah memiliki role ini');
        } else {
          throw error;
        }
        return;
      }

      toast.success(`Role ${role} berhasil ditambahkan!`);
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
    u.id.toLowerCase().includes(searchEmail.toLowerCase()) ||
    u.email.toLowerCase().includes(searchEmail.toLowerCase())
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
              <strong>Info:</strong> Semua user yang terdaftar ditampilkan di bawah. Klik tombol untuk menambahkan role.
            </p>
            <p className="text-sm text-blue-800 mt-2">
              <strong>Your User ID:</strong> <code className="bg-blue-100 px-2 py-1 rounded">{user?.id}</code>
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mb-6 gap-4">
          <Input
            placeholder="Cari berdasarkan email atau User ID..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="max-w-md"
          />
          <Button onClick={fetchUsersWithRoles} variant="outline" size="sm">
            Refresh
          </Button>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((userItem) => (
            <Card key={userItem.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm truncate" title={userItem.email}>
                  {userItem.email}
                </CardTitle>
                <p className="text-xs text-muted-foreground font-mono truncate" title={userItem.id}>
                  {userItem.id}
                </p>
                {userItem.id === user?.id && (
                  <Badge variant="outline" className="w-fit text-xs">Anda</Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Current Roles */}
                <div className="flex flex-wrap gap-2">
                  {userItem.roles.length > 0 ? (
                    userItem.roles.map((role) => (
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
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic">Belum ada role</span>
                  )}
                </div>

                {/* Add Role Buttons */}
                <div className="flex flex-wrap gap-1 pt-2 border-t">
                  {!userItem.roles.includes('admin') && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => handleAddRole(userItem.id, 'admin')}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Admin
                    </Button>
                  )}
                  {!userItem.roles.includes('editor') && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => handleAddRole(userItem.id, 'editor')}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Editor
                    </Button>
                  )}
                  {!userItem.roles.includes('user') && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => handleAddRole(userItem.id, 'user')}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      User
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-muted-foreground">
              {searchEmail ? 'Tidak ada user yang ditemukan' : 'Belum ada user terdaftar.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminUserRoles;
