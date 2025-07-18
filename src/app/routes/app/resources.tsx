import db from "@tombatossals/chords-db/lib/guitar.json";
import YoutubeEmbed from "@/components/ui/youtube-embed";
import { TableOfContents } from "@mantine/core";
import "./resources.css";
import DiagramCard from "@/features/chord-library/components/diagram/diagram-card";
import { useNotePlayer } from "@/hooks/use-note-player";
import ToolsRow from "@/components/ui/tools-row";
import CreatorCard from "@/components/ui/creator-card";

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
      description: "Guitar lessons and tutorials",
      link: "https://www.youtube.com/@MartyMusic",
      imageUrl: "/images/creators/marty-music.jpg",
    },
    {
      name: "Justin Guitar",
      description: "Guitar lessons and tutorials",
      link: "https://www.youtube.com/@JustinGuitar",
      imageUrl: "/images/creators/justin-guitar.jpg",
    },
    {
      name: "for3v3rfaithful",
      description: "Guitar lessons and tutorials",
      link: "https://www.youtube.com/@for3v3rfaithful",
      imageUrl: "/images/creators/forever.jpg",
    },
    {
      name: "GuitarZero2Hero",
      description: "Guitar lessons and tutorials",
      link: "https://www.youtube.com/@GuitarZero2Hero",
      imageUrl: "/images/creators/guitar-zero-2-hero.jpg",
    },
    {
      name: "GuitarLessons365",
      description: "Guitar lessons and tutorials",
      link: "https://www.youtube.com/@GuitarLessons365Song",
      imageUrl: "/images/creators/guitar-lessons-365.jpg",
    },
    {
      name: "Redlight Blue",
      description: "Guitar lessons and tutorials",
      link: "https://www.youtube.com/@RedlightBlue",
      imageUrl: "/images/creators/redlight-blue.jpg",
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
            <div className="videos-wrapper">
              <YoutubeEmbed videoId="5jTsSvkBv60" />
              <YoutubeEmbed videoId="CbvtsJlIcz0" />
            </div>
          </div>
          <div className="resource">
            <h2>First Lesson</h2>
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
            <div className="creators-wrapper">
              {creators.map((creator, i) => (
                <CreatorCard
                  key={i}
                  name={creator.name}
                  description={creator.description}
                  imageUrl={creator.imageUrl}
                  link={creator.link}
                />
              ))}
            </div>
          </div>
          <h2>Other Resources</h2>
        </div>
      </div>
      <div className="resources-tools">
        <ToolsRow />
      </div>
    </div>
  );
}
