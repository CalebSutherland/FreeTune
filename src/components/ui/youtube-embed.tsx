export default function YoutubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="youtube-embed">
      <iframe
        style={{ border: "none" }}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </div>
  );
}
