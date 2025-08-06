import WatchVideo from "./WatchVideo";

function VideoSection() {
    return (
        
           <div className="relative w-full">
                    <div className="max-w-full mx-auto">
                        <WatchVideo
                           poster="/maids/poster.jpg"
                             src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            title="Pediatric Consultation Session"
                        />
                    </div>
                </div>
        
    )
}

export default VideoSection
