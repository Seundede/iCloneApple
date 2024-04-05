import { useGSAP } from "@gsap/react";
import {
  ArrowPathIcon,
  PauseCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
// import highlightFirstmv from '../../public/assets/videos/highlight-first.mp4'

interface HighlightSlide {
  id: number;
  textLists: string[];
  video: string;
  videoDuration: number;
}
interface VideoState {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
}
const hightlightsSlides: HighlightSlide[] = [
  {
    id: 1,
    textLists: [
      "Enter A17 Pro.",
      "Game‑changing chip.",
      "Groundbreaking performance.",
    ],
    video: "highlight-first",
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: ["Titanium.", "So strong. So light. So Pro."],
    video: "highlight-sec",
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "iPhone 15 Pro Max has the",
      "longest optical zoom in",
      "iPhone ever. Far out.",
    ],
    video: "highlight-third",
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["All-new Action button.", "What will yours do?."],
    video: "highlight-fourth",
    videoDuration: 3.63,
  },
];

const VideoCarousel = () => {
  // Reference for video element
  const videoRef = useRef<HTMLVideoElement[]>([]);
  // Reference for span element
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  // Reference for div element
  const videoDivRef = useRef<HTMLDivElement[]>([]);

  // State to manage video playback and progress
  const [video, setVideo] = useState<VideoState>({
    isEnd: false, // Indicates if the video has ended
    startPlay: false, // Indicates if the video playback has started
    videoId: 0, // Current video ID
    isLastVideo: false, // Indicates if it is the last video
    isPlaying: false, // Indicates if the video is currently playing
  });

  // Destructure video state
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  // State to manage loaded video data
  const [loadedData, setLoadedData] = useState<any[]>([]);

  // GSAP for animations
  useGSAP(() => {
    // Animate slider to move the video out of the screen and bring the next video in
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    // Animate video to play when it's in view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0; // Variable to track current progress
    let span = videoSpanRef.current; // Reference to the span element

    if (span[videoId]) {
      // Animation to move the indicator
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // Get the progress of the video animation
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // Set the width of the progress bar based on screen width
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            // Set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // When the video animation ends, update the progress bar
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      // Restart animation if it's the first video
      if (videoId == 0) {
        anim.restart();
      }

      // Update the progress bar based on video playback
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // Add ticker for progress bar update
        gsap.ticker.add(animUpdate);
      } else {
        // Remove ticker if video is paused
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    // Check if video data is loaded and manage playback
    if (loadedData) {
      if (!isPlaying) {
        // Pause video if not playing
        videoRef.current[videoId].pause();
      } else {
        // Play video if playing
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Function to handle different video processes
  const handleProcess = (type: string, i: number) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  // Function to handle loaded metadata for videos
  const handleLoadedMetaData = (e: any) => setLoadedData((pre) => [...pre, e]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((item, i) => (
          <div key={item.id} id="slider" className="pr-20 md:pr-10">
            <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  className={`${
                    item.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  preload="auto"
                  muted
                  ref={(el: HTMLVideoElement | null) => {
                    if (el) {
                      // Assign video element to ref
                      videoRef.current[i] = el;
                    }
                  }}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last", i)
                  }
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(e)}
                >
                  <source
                    src="/assets/videos/highlight-first.mp4"
                 
                    type="video/mp4"
                  />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {item.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-center mt-10">
        <div className="flex items-center justify-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 size-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el: HTMLDivElement | null) => {
                if (el) {
                  videoDivRef.current[i] = el;
                }
              }}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el: HTMLSpanElement | null) => {
                  if (el) {
                    videoSpanRef.current[i] = el;
                  }
                }}
              />
            </span>
          ))}
        </div>

        <button
          className="ml-4 p-4 rounded-full bg-gray-300 backdrop-blur flex-center"
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset", 0)
              : !isPlaying
              ? () => handleProcess("play", 0)
              : () => handleProcess("pause", 0)
          }
        >
          {isLastVideo ? (
            <ArrowPathIcon className="size-5" />
          ) : !isPlaying ? (
            <PlayIcon className="size-5" />
          ) : (
            <PauseCircleIcon className="size-5" />
          )}
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
