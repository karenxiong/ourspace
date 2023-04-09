import "./PostModal.scss";
import { SlHeart } from "react-icons/sl";
import { MdOutlineClose } from "react-icons/md";

export default function PostModal({
  title,
  image,
  username,
  description,
  item_id,
  likes,
  comment_id,
  timestamp,
  onClose,
}) {
  return (
    <>
      <div className="post-modal-overlay" />
      <div className="post-modal-body">
        <div className="post-modal-content">
          <div className="post-modal-header">
            <h2 className="post-modal-title">{title}</h2>
            <button className="post-modal-close" onClick={onClose}>
              <MdOutlineClose />
            </button>
          </div>
          <div className="post-modal-info">
            <h5 className="post-modal-username">@{username}</h5>
            <h6 className="post-modal-timestamp">{timestamp}</h6>
          </div>
          <img className="post-modal-img" src={image} alt="post image" />
          <p className="post-modal-description">{description}</p>
          <div className="post-modal-comments">
            <div className="post-modal-likes">
              <SlHeart />
              <p>{likes}</p>
            </div>
            <h6>Comments</h6>
          </div>
        </div>
      </div>
    </>
  );
}
