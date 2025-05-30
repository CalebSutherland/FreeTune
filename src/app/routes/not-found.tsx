import { paths } from "@/config/paths";

const NotFoundRoute = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href={paths.app.home.getHref()}>Go to Home</a>
    </div>
  );
};

export default NotFoundRoute;
