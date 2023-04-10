import axios from "axios";
import React, { useState, useEffect } from "react";
import "./PostModal.scss";
import { SlHeart } from "react-icons/sl";
import { MdOutlineClose } from "react-icons/md";
import ImageMarker, { Marker } from "react-image-marker";

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
  console.log(id);
  console.log(" someorimaemadfslkmasdklfmal");
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:8080/posts/${id}/markers`
      );
      setMarkers(response.data);
      console.log(" == = = = = == = = =response: ", response);
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
          <ImageMarker
            className="uploaded-image"
            src={img}
            alt="post image"
            markers={markers}
          />
          <hr></hr>
          <h1>Marker Legend</h1>
          {markers.map((marker, index) => (
            <div>
              <h2>Marker {index + 1}</h2>
              <p>Title: {marker.title}</p>
              <p>Link: {marker.link}</p>
            </div>
          ))}
          <hr></hr>
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
