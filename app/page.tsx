'use client';

import Nav from '../components/Nav';
import Header from '../components/Header';
import InfoSection from '../components/infoSection';
import MarketTrend from '../components/MarketTrend';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Nav />
      <Header />
      <InfoSection />
      <MarketTrend />
      <NewsLetter />
      <Footer />
    </div>
  );
}
