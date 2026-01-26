"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  List
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { 
  getBootcampBySlug, 
  getVideosByBootcamp,
  courseVideos 
} from "@/lib/data"

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function VideoPlayerPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const videoId = params.videoId as string

  const bootcamp = getBootcampBySlug(slug)
  const videos = getVideosByBootcamp(slug)
  const currentVideo = courseVideos.find(v => v.id === videoId)
  const currentIndex = videos.findIndex(v => v.id === videoId)
  const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null
  const nextVideo = currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [markedComplete, setMarkedComplete] = useState(currentVideo?.watched || false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleLoadedMetadata = () => setDuration(video.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      setMarkedComplete(true)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)
      if (isPlaying) {
        timeout = setTimeout(() => setShowControls(false), 3000)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeout)
    }
  }, [isPlaying])

  if (!bootcamp || !currentVideo) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-foreground mb-4">Vidéo non trouvée</h1>
        <Button asChild>
          <Link href={`/espace-personnel/formations/${slug}`}>Retour à la formation</Link>
        </Button>
      </div>
    )
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return
    video.volume = value[0]
    setVolume(value[0])
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, duration))
  }

  const toggleFullscreen = () => {
    const container = document.getElementById('video-container')
    if (!container) return
    
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      container.requestFullscreen()
    }
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="space-y-4">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href={`/espace-personnel/formations/${slug}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Retour à la formation</span>
        </Link>

        {/* Playlist Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <List className="w-4 h-4 mr-2" />
              {currentIndex + 1} / {videos.length}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Contenu de la formation</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-2 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {videos.map((video, index) => (
                <Link
                  key={video.id}
                  href={`/espace-personnel/formations/${slug}/video/${video.id}`}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors",
                    video.id === videoId 
                      ? "bg-violet/10 border border-violet/20" 
                      : "hover:bg-muted"
                  )}
                >
                  <div className="flex-shrink-0">
                    {video.watched || (video.id === videoId && markedComplete) ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium truncate",
                      video.id === videoId ? "text-violet" : "text-foreground"
                    )}>
                      {index + 1}. {video.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{video.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Video Player */}
      <div 
        id="video-container"
        className="relative bg-black rounded-xl overflow-hidden aspect-video group"
        onMouseEnter={() => setShowControls(true)}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          poster=""
          onClick={togglePlay}
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
          >
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Play className="w-8 h-8 text-blue-navy ml-1" />
            </div>
          </button>
        )}

        {/* Controls */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity",
          showControls ? "opacity-100" : "opacity-0"
        )}>
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={() => skip(-10)}
              >
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={() => skip(10)}
              >
                <SkipForward className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2 ml-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                  className="w-20"
                />
              </div>

              <span className="text-white text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="bg-background rounded-xl border border-border p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-sm text-violet font-medium mb-1">
              Jour {currentVideo.dayNumber} - Module {currentVideo.moduleIndex + 1}
            </p>
            <h1 className="text-xl lg:text-2xl font-serif font-bold text-foreground">
              {currentVideo.title}
            </h1>
          </div>
          {markedComplete && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Complété</span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground mb-6">
          {currentVideo.description}
        </p>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {prevVideo ? (
            <Button variant="outline" asChild>
              <Link href={`/espace-personnel/formations/${slug}/video/${prevVideo.id}`}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Précédent
              </Link>
            </Button>
          ) : (
            <div />
          )}
          
          {nextVideo ? (
            <Button asChild className="bg-gradient-to-r from-blue to-violet hover:from-blue-deep hover:to-violet-dark">
              <Link href={`/espace-personnel/formations/${slug}/video/${nextVideo.id}`}>
                Suivant
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button asChild className="bg-gradient-to-r from-gold-dark to-gold hover:from-gold hover:to-gold-bright text-blue-navy">
              <Link href="/espace-personnel/certificats">
                Demander le certificat
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
