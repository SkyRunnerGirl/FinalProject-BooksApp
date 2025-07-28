import { Image } from "react-bootstrap";

export default function Home() {
  return (
    <div className="container text-center">
      <div className="col-md">
        <h1 id="root-h1">Welcome to Rebecca's Cosmic Bookshelf</h1>
      </div>

      <div className="col-md">
        <Image src="../public/images/cosmic-library.jpg" />
      </div>
    </div>
  );
}
