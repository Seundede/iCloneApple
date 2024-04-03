import Hero from "@/components/Hero";
import NavigationBar from "@/components/NavigationBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <NavigationBar />
      <Hero />
    </main>
  );
}
