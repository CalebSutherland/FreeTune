import { paths } from "@/config/paths";
import db from "@tombatossals/chords-db/lib/guitar.json";
import YoutubeEmbed from "@/components/ui/youtube-embed";
import { TableOfContents } from "@mantine/core";
import "./resources.css";
import DiagramCard from "@/features/chord-library/components/diagram/diagram-card";
import { useNotePlayer } from "@/hooks/use-note-player";
import ToolsRow from "@/components/ui/tools-row";
import CreatorCard from "@/components/ui/resource-card";

export default function Resources() {
  const { playNote, loadInstrument } = useNotePlayer();

  const MAJOR = 0;
  const MINOR = 1;
  const chords = [
    { name: "D", suffix: "major", chord: db.chords.D[MAJOR].positions[0] },
    { name: "A", suffix: "major", chord: db.chords.A[MAJOR].positions[0] },
    { name: "E", suffix: "major", chord: db.chords.E[MAJOR].positions[0] },
    { name: "A", suffix: "minor", chord: db.chords.A[MINOR].positions[0] },
    { name: "E", suffix: "minor", chord: db.chords.E[MINOR].positions[0] },
    { name: "D", suffix: "minor", chord: db.chords.D[MINOR].positions[0] },
    { name: "G", suffix: "major", chord: db.chords.G[MAJOR].positions[0] },
    { name: "C", suffix: "major", chord: db.chords.C[MAJOR].positions[0] },
  ];

  const creators = [
    {
      name: "Marty Music",
      description:
        "Laid-back, easy-to-follow lessons from one of the most popular teachers on YouTube.",
      link: "https://www.youtube.com/@MartyMusic",
      imageUrl: "/images/creators/marty-music.jpg",
    },
    {
      name: "GuitarZero2Hero",
      description:
        "Step-by-step tutorials for popular songs, with chord breakdowns and guitar tabs.",
      link: "https://www.youtube.com/@GuitarZero2Hero",
      imageUrl: "/images/creators/guitar-zero-2-hero.jpg",
    },
    {
      name: "for3v3rfaithful",
      description:
        "Beginner-friendly song tutorials with a focus on rhythm and acoustic guitar basics.",
      link: "https://www.youtube.com/@for3v3rfaithful",
      imageUrl: "/images/creators/forever.jpg",
    },
    {
      name: "Justin Guitar",
      description:
        "One of the most trusted names in online guitar education. Offers full beginner courses.",
      link: "https://www.youtube.com/@JustinGuitar",
      imageUrl: "/images/creators/justin-guitar.jpg",
    },
    {
      name: "GuitarLessons365",
      description:
        "In-depth lessons on classic rock, metal, and advanced techniques. Great for players looking to level up.",
      link: "https://www.youtube.com/@GuitarLessons365Song",
      imageUrl: "/images/creators/guitar-lessons-365.jpg",
    },
    {
      name: "Redlight Blue",
      description:
        "Clean, clear tutorials with tabs on screen—ideal for learning full songs quickly and accurately.",
      link: "https://www.youtube.com/@RedlightBlue",
      imageUrl: "/images/creators/redlight-blue.jpg",
    },
  ];

  const otherResources = [
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
    <div className="resources-page-wrapper">
      <title>Resources | FreeTune</title>
      <div className="resources-page-landing">
        <p>Cool message and image</p>
      </div>
      <div className="resources">
        <div className="resources-nav">
          <p>Table of Contents</p>
          <TableOfContents
            variant="filled"
            color="var(--accent-color)"
            size="sm"
            radius="sm"
            scrollSpyOptions={{
              selector: "#resources :is(h1, h2, h3)",
            }}
            getControlProps={({ data }) => ({
              onClick: () => data.getNode().scrollIntoView(),
              children: data.value,
            })}
          />
        </div>
        <div className="resources-content" id="resources">
          <div className="resource">
            <h2>Tune Guitar</h2>
            <p>
              Here are some videos on how to tune a guitar. If you don't have
              your own tuner, you can use the{" "}
              <a href={paths.app.tools.tuner.getHref()}>Instrument Tuner</a> or
              the{" "}
              <a href={paths.app.tools.classic_tuner.getHref()}>
                Classic Tuner
              </a>
              .
            </p>
            <div className="videos-wrapper">
              <YoutubeEmbed videoId="5jTsSvkBv60" />
              <YoutubeEmbed videoId="CbvtsJlIcz0" />
            </div>
          </div>
          <div className="resource">
            <h2>First Lesson</h2>
            <p>
              These lessons are perfect for someone who has never played a
              guitar before and is looking to get started.
            </p>
            <div className="videos-wrapper">
              <YoutubeEmbed videoId="w4a2ge9N31E" />
              <YoutubeEmbed videoId="HNSaXAe8tyg" />
            </div>
            <div className="videos-wrapper">
              <YoutubeEmbed videoId="5rcCiXqAShY" />
              <YoutubeEmbed videoId="-X84GG06g-c" />
            </div>
          </div>
          <div className="resource">
            <h2>Essential Chords</h2>
            <p style={{ marginBottom: "1rem" }}>
              These eight essential chords are the foundation of guitar playing.
              Mastering them will unlock the ability to play thousands of
              popular songs. To learn and practice more chords, check out the{" "}
              <a href={paths.app.tools.chord_library.root.getHref()}>
                Chord Library
              </a>
              .
            </p>
            <div className="chords-wrapper">
              {chords.map((chord, i) => (
                <div key={i}>
                  <DiagramCard
                    keyName={chord.name}
                    suffix={chord.suffix}
                    chord={chord.chord}
                    link={true}
                    diagramSize="sm"
                    diagramSpeed="fast"
                    playNote={playNote}
                    loadInstrument={loadInstrument}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="resourcs">
            <h2>First Songs</h2>
            <p>
              Start playing real music with these beginner-friendly songs! Each
              one uses simple chords and is a great way to build your confidence
              while having fun.
            </p>
            <div className="videos-wrapper">
              <YoutubeEmbed videoId="IzxMeQgtyYE" />
              <YoutubeEmbed videoId="FY1b4nhvhoQ" />
            </div>
            <div className="videos-wrapper">
              <YoutubeEmbed videoId="0EVHt__Ktnw" />
              <YoutubeEmbed videoId="wMhS66UScAk" />
            </div>
          </div>
          <div className="resource">
            <h2>Popular Creators</h2>
            <p style={{ marginBottom: "1rem" }}>
              These YouTube creators offer high-quality guitar lessons for all
              levels, from absolute beginners to more advanced players. Whether
              you're learning your first chords or tackling full songs, their
              videos are a great place to start.
            </p>
            <div className="creators-wrapper">
              {creators.map((creator, i) => (
                <CreatorCard
                  key={i}
                  name={creator.name}
                  description={creator.description}
                  imageUrl={creator.imageUrl}
                  link={creator.link}
                  linkLabel={"Visit Creator"}
                />
              ))}
            </div>
          </div>
          <div className="resource">
            <h2>Other Resources</h2>
            <p style={{ marginBottom: "1rem" }}>
              These websites are great for finding tabs, learning chords, and
              connecting with other guitarists. Use them to explore new songs,
              practice along with interactive tools, or dive into the
              guitar-playing community.
            </p>
            <div className="creators-wrapper" style={{ paddingBottom: "2rem" }}>
              {otherResources.map((resource, i) => (
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
          </div>
        </div>
      </div>
      <div className="resources-tools">
        <ToolsRow />
      </div>
    </div>
  );
}
