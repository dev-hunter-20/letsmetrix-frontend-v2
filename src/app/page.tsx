import dynamic from 'next/dynamic';
import './page.scss';

const NavbarPage = dynamic(() => import('../layouts/main/NavbarPage'), { ssr: false });
export default function Home({ children }: { children: React.ReactNode }) {
  return <NavbarPage>{children}</NavbarPage>;
}
