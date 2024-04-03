import { useGSAP } from '@gsap/react';
import { ChevronRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';
import React from 'react'

const Highlight = () => {
    useGSAP(() => {
        gsap.to('#title', {opacity: 1, y:0})
       gsap.to("#links", { opacity: 1, stagger: 0.25, duration: 1});
    }, [])
  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full bg-zinc py-32 md:py-20 px-10 md:px-5"
    >
      <div className="max-w-screen-xl ms-auto me-auto  ">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1
            id="title"
            className="text-gray lg:text-6xl md:text-5xl opacity-0 text-3xl mb-5 lg:mb-0 font-medium translate-y-20"
          >
            Get the highlights.
          </h1>

          <div className="flex flex-wrap items-end gap-5 ">
            <p
              id="links"
              className="text-blue opacity-0 hover:underline cursor-pointer flex items-center text-xl -translate-y-5"
            >
              Watch the film
              <PlayCircleIcon className="h-5 w-5 ml-2" />
            </p>
            <p
              id="links"
              className="text-blue opacity-0 hover:underline cursor-pointer flex items-center text-xl -translate-y-5 "
            >
              Watch the event
              <ChevronRightIcon className="h-5 w-5 ml-2" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlight