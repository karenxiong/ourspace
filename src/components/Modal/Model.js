import "./Model.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ImageMarker, { Marker } from "react-image-marker";
import { Link } from "react-router-dom";
import { SlHeart } from "react-icons/sl";
import { useAuth0 } from "@auth0/auth0-react";

function getDate(timestamp) {
  const dateObject = new Date(timestamp);
  const month = dateObject.toLocaleDateString("default", { month: "short" });

  const yyyy = dateObject.getFullYear();
  let dd = dateObject.getDate();

  if (dd < 10) dd = "0" + dd;

  return `${month} ${dd}, ${yyyy}`;
}

function SpaceModal(args) {
  const [markers, setMarkers] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:8080/posts/${args.id}/markers`
      );
      setMarkers(response.data);
    })();
  }, []);

  const img = !args.image.includes("http")
    ? `http://localhost:8080/${args.image}`
    : args.image;

  const timestamp = getDate(args.timestamp);

  const onLikeClick = () => {
    // frontend update state and look first to show new like
    const newPostData = args.postData.map((post) => {
      if (post.id === args.selectedPost.id) {
        return {
          ...post,
          current_user_liked: true,
          like_count: args.like_count + 1,
        };
      } else {
        return post;
      }
    });
    console.log("setPostData: ", args.setPostData);
    args.setPostData(newPostData);
    // update bagickend db with post request to create new like
    (async () => {
      const accessToken = await getAccessTokenSilently({});
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const formData = new FormData();
      formData.append("user_id", user.sub);
      formData.append("post_id", args.id);

      try {
        const response = await axios.post(
          "http://localhost:8080/likes",
          formData,
          config
        );

        console.log("response", response);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <Modal size="xl" {...args}>
      <ModalHeader toggle={args.toggle}>{args.title}</ModalHeader>
      <ModalBody className="modal-body">
        <div className="space-author">
          <h6 className="username">@{args.username}</h6>
          <h6>{timestamp}</h6>
        </div>
        <ImageMarker src={img} alt="post image" markers={markers} />
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
      </ModalBody>
      <ModalFooter>
        <div className="likes">
          <button
            className="heart-icon active"
            onClick={onLikeClick}
            disabled={args.current_user_liked || !user}
          >
            <SlHeart color={args.current_user_liked ? "red" : "black"} />
          </button>
          <p>{args.like_count}</p>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default SpaceModal;
