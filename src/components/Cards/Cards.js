import "./Cards.scss";

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
  );
}
