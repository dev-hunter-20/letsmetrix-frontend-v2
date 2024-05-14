import dynamic from 'next/dynamic';
import './page.scss';

const HomePage = dynamic(() => import('./../layouts/main/HomePage'), { ssr: false });
export default function Home() {
  return <HomePage />;
}
