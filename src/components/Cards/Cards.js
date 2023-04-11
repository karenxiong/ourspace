import "./Cards.scss";

import { SlHeart } from "react-icons/sl";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";

export default function Cards({
  post,
  username,
  image,
  setSelectedPostId,
  setModal,
}) {
  const img = !image.includes("http")
    ? `http://localhost:8080/${image}`
    : image;

  const handleLike = () => {};

  return (
    <div
      className="card"
      onClick={() => {
        setSelectedPostId(post.id);
        setModal(true);
      }}
    >
      <img src={img} alt="space image" />
      <div className="cards-body">
        <h6 className="username">@{username}</h6>
        <div className="likes">
          <button
            className="heart-icon active"
            disabled={post.current_user_liked}
          >
            {post.current_user_liked ? (
              <RiHeart3Fill color="red" />
            ) : (
              <RiHeart3Line />
            )}
            {/* <RiHeart3Line color={post.current_user_liked ? "red" : "black"} /> */}
          </button>
          <p>{post.like_count}</p>
        </div>
      </div>
    </div>
  );
}
