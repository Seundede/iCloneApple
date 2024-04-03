import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [videoSource, setVideoSource] = useState<string>("");

  useEffect(() => {
    const handleVideoResizing = () => {
      const source =
        typeof window !== "undefined" && window.innerWidth < 760
          ? "/assets/videos/smallHero.mp4"
          : "/assets/videos/hero.mp4";
      setVideoSource(source);
    };
    handleVideoResizing();
    // Add event listener for resize
    window.addEventListener("resize", handleVideoResizing);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleVideoResizing);
    };
  }, []);
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, delay: 2 });
    gsap.to('#cta', {opacity:1, delay: 2, y: -50})
  }, []);
  return (
    <section className="w-full h-[calc(100vh-60px)]">
      <div className="h-5/6 w-full flex flex-col items-center justify-center">
        <p
          id="title"
          className="font-semibold text-center text-3xl text-gray-100 max-md:mb-10 opacity-0"
        >
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            key={videoSource}
            playsInline={true}
            autoPlay
            muted
            className="pointer-events-none"
          >
            <source src={videoSource} type="video/mp4" />
          </video>
        </div>
      </div>
      <div id="cta" className="flex flex-col items-center translate-y-20 opacity-0">
        <a
          href="#highlights"
          className="px-5 py-1 rounded-3xl bg-blue my-5 hover:bg-transparent border border-transparent hover:border hover:text-blue hover:border-blue"
        >
          Buy
        </a>
        <p className="font-normal text-lg">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
