import './page.scss';
import NavbarPage from '../layouts/main/NavbarPage';
import LandingPage from './../pages/landing-page/LandingPage';

export default function Home() {
  return (
    <NavbarPage>
      <LandingPage />
    </NavbarPage>
  );
}
