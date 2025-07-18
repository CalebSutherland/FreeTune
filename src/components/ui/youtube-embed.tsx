import "./youtube-embed.css";

export default function YoutubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="youtube-embed">
      <iframe
        style={{ border: "none" }}
        width="480"
        height="270"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </div>
  );
}
