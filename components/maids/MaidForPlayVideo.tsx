"use client"


import { useEffect, useRef, useState } from "react"
import { FaPlay } from "react-icons/fa"

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  autoPlay?: boolean
}

export default function MaidForPlayVideo({ src, poster, title, autoPlay = true }: VideoPlayerProps) {
   const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(true) // Start as true for automatic play
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false) // Start with controls hidden

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    const handleDurationChange = () => {
      setDuration(video.duration)
    }
    const handleEnded = () => {
      if (hasUserInteracted) {
        // If user has interacted, restart the video automatically
        video.currentTime = 0
        video.play()
        setIsPlaying(true)
        setTimeout(() => {
          setShowControls(false)
        }, 2000)
      } else {
        setIsPlaying(false)
        setShowControls(true)
      }
    }
    const handlePlay = () => {
      setIsPlaying(true)
    }
    const handlePause = () => {
      setIsPlaying(false)
    }

    video.addEventListener("durationchange", handleDurationChange)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    // Auto-play functionality - always try to play
    const playVideo = async () => {
      try {
        await video.play()
        setIsPlaying(true)
        setHasUserInteracted(true) // Mark as user interaction for continuous play
        // Hide controls after auto-play starts
        setTimeout(() => {
          setShowControls(false)
        }, 2000)
      } catch (error) {
        console.log("Auto-play failed:", error)
        // If auto-play fails, show the play button
        setIsPlaying(false)
        setShowControls(true)
      }
    }
    
    // Always try to auto-play
    playVideo()

    return () => {
      video.removeEventListener("durationchange", handleDurationChange)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [autoPlay, hasUserInteracted])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    // Mark that user has interacted
    setHasUserInteracted(true)

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)

    // Hide controls after play starts
    if (!isPlaying) {
      setTimeout(() => {
        setShowControls(false)
      }, 2000)
    } else {
      setShowControls(true)
    }
  }

  const handleVideoClick = () => {
    togglePlay()
  }
  const handleMouseMove = () => {
    if (isPlaying) {
      setShowControls(true)
      clearTimeout(controlsTimeout.current)
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  const controlsTimeout = useRef<NodeJS.Timeout | null>(null)
  return (
    <div className=" ">
      <div className="relative w-full  mx-auto">
        <div className="relative w-full aspect-video lg:h-[600px] overflow-hidden rounded-lg shadow-lg bg-black group">
          <video
            ref={videoRef}
            className="w-full h-full object-cover cursor-pointer"
            onClick={handleVideoClick}
            playsInline
            poster={poster}
            muted={true}
            loop={true}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {!isPlaying && (
            <button
              className="absolute inset-0 flex items-center justify-center w-full h-full bg-black/30 transition-opacity duration-300"
              onClick={togglePlay}
              aria-label="Play video"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16  flex cursor-pointer items-center justify-center rounded-full bg-primaryColor/40 shadow-lg transform transition-transform hover:scale-110">
                <FaPlay className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 text-whiteColor fill-PrimaryColor ml-1" />
              </div>
            </button>
          )}
          <div
            className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${isPlaying && !showControls ? "opacity-0" : "opacity-100"}`}
          >
          </div>
        </div>
      </div>
    </div>
 
  )
}
