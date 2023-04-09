import "./Cards.scss";
// import {
//   Card,
//   CardBody,
//   CardText,
//   CardTitle,
//   CardSubtitle,
//   Button,
// } from "reactstrap";

import { SlHeart } from "react-icons/sl";

export default function Cards({
  post,
  username,
  image,
  likes,
  setSelectedPost,
  setShowModal,
}) {
  return (
    <div
      className="card"
      onClick={() => {
        setSelectedPost(post);
        setShowModal(true);
      }}
    >
      <img src={image} alt="space image" />
      <div className="cards-body">
        <h6 className="username">@{username}</h6>
        <div className="likes">
          <div className="heart-icon">
            <SlHeart />
          </div>
          <p>{likes}</p>
        </div>
      </div>
    </div>
    // <Card
    //   color="light"
    //   style={{
    //     width: "18rem",
    //   }}
    // >
    //   <img alt="Sample" src="https://picsum.photos/300/200" />
    //   <CardBody>
    //     <CardTitle tag="h5">My Space</CardTitle>
    //     <CardSubtitle className="mb-2 text-muted" tag="h6">
    //       @MySpace
    //     </CardSubtitle>
    //   </CardBody>
    // </Card>
  );
}
