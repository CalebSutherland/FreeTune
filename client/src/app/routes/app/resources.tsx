import { paths } from "@/config/paths";
import YoutubeEmbed from "@/components/ui/youtube-embed";
import ToolsRow from "@/components/ui/tools-row";
import EssentialChords from "@/components/ui/essential-chords";
import CreatorRow from "@/components/ui/creator-row";
import ResourceRow from "@/components/ui/resource-row";
import { TableOfContents } from "@mantine/core";
import "./resources.css";

export default function Resources() {
  return (
    <div className="resources-page-wrapper">
      <title>Resources | FreeTune</title>
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
              <a
                href={paths.app.tools.chord_library.chord_library_key.getHref(
                  "C"
                )}
              >
                Chord Library
              </a>
              .
            </p>
            <EssentialChords />
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
            <CreatorRow />
          </div>
          <div className="resource">
            <h2>Other Resources</h2>
            <p style={{ marginBottom: "1rem" }}>
              These websites are great for finding tabs, learning chords, and
              connecting with other guitarists. Use them to explore new songs,
              practice along with interactive tools, or dive into the
              guitar-playing community.
            </p>
            <ResourceRow />
          </div>
        </div>
      </div>
      <div className="resources-tools">
        <ToolsRow />
      </div>
    </div>
  );
}
