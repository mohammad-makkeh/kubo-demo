import { createRoot } from 'react-dom/client';
import { gsapHelper } from './lib/gsap-helper';
import './index.css';
import './App.css';
import App from './App.tsx';

gsapHelper.registerPlugins();

createRoot(document.getElementById('root')!).render(<App />);

