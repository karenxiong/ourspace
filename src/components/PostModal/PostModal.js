import axios from "axios";
import React, { useState, useEffect } from "react";
import "./PostModal.scss";
import { SlHeart } from "react-icons/sl";
import { MdOutlineClose } from "react-icons/md";
import ImageMarker, { Marker } from "react-image-marker";
import { Link } from "react-router-dom";

export default function PostModal({
  id,
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
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:8080/posts/${id}/markers`
      );
      setMarkers(response.data);
    })();
  }, []);

  const img = !image.includes("http")
    ? `http://localhost:8080/${image}`
    : image;
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
          <ImageMarker src={img} alt="post image" markers={markers} />
          <p className="post-modal-description">{description}</p>
          <hr></hr>
          <h5>Listed Products</h5>
          <div className="post-items">
            {markers.map((marker, index) => (
              <Link
                to={{ pathname: marker.link }}
                target="_blank"
                className="post-markers"
              >
                <h6 className="post-markers-items">
                  #{index + 1} {marker.title}
                </h6>
              </Link>
            ))}
          </div>
          <hr></hr>
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
