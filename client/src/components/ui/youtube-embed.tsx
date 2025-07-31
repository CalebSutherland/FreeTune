import { useState } from "react";

import { Skeleton } from "@mantine/core";
import "./youtube-embed.css";

export default function YoutubeEmbed({ videoId }: { videoId: string }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="youtube-embed">
      <Skeleton
        className="youtube-skeleton"
        width="100%"
        height="100%"
        visible={loading}
      >
        <iframe
          style={{ border: "none" }}
          width="480"
          height="270"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allowFullScreen
          onLoad={() => setLoading(false)}
        ></iframe>
      </Skeleton>
    </div>
  );
}
