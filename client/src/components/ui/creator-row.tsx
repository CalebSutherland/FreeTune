import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import CreatorCard from "./creator-card";
import "./creator-row.css";

interface creatorRowProps {
  homePage?: boolean;
}

export default function CreatorRow({ homePage }: creatorRowProps) {
  let creators = [
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

  if (homePage) {
    creators = creators.slice(0, 4);
  }
  return (
    <div className="creator-row">
      {homePage && <h2>Learn</h2>}
      <div className={`creators-wrapper ${homePage ? "home" : ""}`}>
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
      {homePage && (
        <p style={{ paddingTop: "0.5rem" }}>
          Start your guitar journey on the{" "}
          <Link to={paths.app.resources.getHref()}>Learn</Link> page.
        </p>
      )}
    </div>
  );
}
