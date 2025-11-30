import FrameLayout from "@/components/FrameLayout";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <FrameLayout>
      <Header />
      <main className="flex-1 relative">
        <HeroSection />
      </main>
      <Footer />
    </FrameLayout>
  );
}
