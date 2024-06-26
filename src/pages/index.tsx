import Hero from "@/components/Hero";
import Highlight from "@/components/Highlight";
import Model from "@/components/Model";
import NavigationBar from "@/components/NavigationBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <NavigationBar />
      <Hero />
      <Highlight />
      <Model />
    </main>
  );
}
