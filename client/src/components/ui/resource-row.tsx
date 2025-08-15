import CreatorCard from "./creator-card";

export default function ResourceRow() {
  const resources = [
    {
      name: "Ultimate Guitar",
      description:
        "One of the largest online libraries of guitar tabs, chords, and user-submitted song sheets.",
      link: "https://www.ultimate-guitar.com/",
      imageUrl: "/images/resources/ult-guitar.png",
    },
    {
      name: "Chordify",
      description:
        "Automatically generates chords from any song. Perfect for quick practice and learning by ear.",
      link: "https://chordify.net/",
      imageUrl: "/images/resources/chordify.png",
    },
    {
      name: "Songsterr",
      description:
        "Interactive tabs with audio playback and real-time scrolling. Great for learning riffs, solos, and full songs.",
      link: "https://www.songsterr.com/",
      imageUrl: "/images/resources/songsterr.png",
    },
    {
      name: "r/Guitar",
      description:
        "A Reddit community for guitarists to share tips, ask questions, and discover new gear and songs.",
      link: "https://www.reddit.com/r/Guitar/",
      imageUrl: "/images/resources/reddit.png",
    },
  ];
  return (
    <div className="creators-wrapper" style={{ paddingBottom: "2rem" }}>
      {resources.map((resource, i) => (
        <CreatorCard
          key={i}
          name={resource.name}
          description={resource.description}
          imageUrl={resource.imageUrl}
          link={resource.link}
          linkLabel={"Visit Website"}
        />
      ))}
    </div>
  );
}
