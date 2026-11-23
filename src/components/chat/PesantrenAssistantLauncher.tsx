import { MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PesantrenAssistantLauncher: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin') || location.pathname === '/tanya-pesantren') {
    return null;
  }

  return (
    <Button
      asChild
      className="fixed bottom-4 right-4 z-40 h-12 rounded-full px-4 shadow-lg sm:bottom-6 sm:right-6"
    >
      <Link to="/tanya-pesantren" aria-label="Buka asisten Tanya Pesantren">
        <MessageCircle size={18} aria-hidden="true" />
        Tanya Pesantren
      </Link>
    </Button>
  );
};

export default PesantrenAssistantLauncher;