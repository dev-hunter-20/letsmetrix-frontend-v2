import dynamic from 'next/dynamic';
import './page.scss';
import LandingPage from './../pages/landing-page/LandingPage';

const NavbarPage = dynamic(() => import('../layouts/main/NavbarPage'), { ssr: false });
export default function Home() {
  return (
    <NavbarPage>
      <LandingPage />
    </NavbarPage>
  );
}
