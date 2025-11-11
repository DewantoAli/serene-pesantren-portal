import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Handle GitHub Pages SPA routing redirect from 404.html
const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  history.replaceState(null, '', redirect);
}

createRoot(document.getElementById("root")!).render(<App />);
