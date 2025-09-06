import MaidForPlayVideo from "./MaidForPlayVideo";

function VideoSection() {
    return (
        <div className="container">
            <div className="relative  w-full mt-10 lg:mt-[120px]">
                <div className="max-w-full mx-auto">
                    <MaidForPlayVideo
                        poster="/maids/poster.jpg"
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        title="Pediatric Consultation Session"
                    />
                </div>
            </div>
        </div>

    )
}

export default VideoSection
