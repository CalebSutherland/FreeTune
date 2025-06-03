import "./resources.css";

export default function Resources() {
  return (
    <div className="resources-page-wrapper">
      <title>Resources | FreeTune</title>
      <div className="resources-landing-wrapper">
        <div className="resources-side-content">
          <h1>Resources</h1>
          <p>Re source the resource</p>
        </div>
        <div className="resources-main-content">
          <p>Landing Img</p>
        </div>
      </div>
      <div className="card-wrapper">
        <h2>Creators</h2>
        <div className="card-row">
          <p>Creator</p>
          <p>Creator</p>
          <p>Creator</p>
          <p>Creator</p>
        </div>
      </div>
      <div className="card-wrapper">
        <h2>Websites</h2>
        <div className="card-row">
          <p>Website</p>
          <p>Website</p>
          <p>Website</p>
          <p>Website</p>
        </div>
      </div>
      <div className="card-wrapper">
        <h2>Other</h2>
        <div className="card-row">
          <p>Other</p>
          <p>Other</p>
          <p>Other</p>
          <p>Other</p>
        </div>
      </div>
    </div>
  );
}
