
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import Organization from "./pages/Organization";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import NewStudent from "./pages/NewStudent";
import KegiatanSantri from "./pages/KegiatanSantri";
import AplikasiPesantren from "./pages/AplikasiPesantren";
import StatusPembayaranKelas7 from "./pages/StatusPembayaranKelas7";
import StatusPembayaranKelas8 from "./pages/StatusPembayaranKelas8";
import StatusPembayaranKelas9 from "./pages/StatusPembayaranKelas9";
import AdminLogin from "./pages/AdminLogin";
import AdminKegiatan from "./pages/AdminKegiatan";
import AdminUserRoles from "./pages/AdminUserRoles";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/about" element={<About />} />
            <Route path="/new-student" element={<NewStudent />} />
            <Route path="/kegiatan-santri" element={<KegiatanSantri />} />
            <Route path="/aplikasi-pesantren" element={<AplikasiPesantren />} />
            <Route path="/status-pembayaran/kelas-7" element={<StatusPembayaranKelas7 />} />
            <Route path="/status-pembayaran/kelas-8" element={<StatusPembayaranKelas8 />} />
            <Route path="/status-pembayaran/kelas-9" element={<StatusPembayaranKelas9 />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/kegiatan" element={<AdminKegiatan />} />
            <Route path="/admin/users" element={<AdminUserRoles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
