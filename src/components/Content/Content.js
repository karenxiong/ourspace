import "./Content.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createPortal } from "react-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Cards from "../Cards/Cards";
import PostModal from "../PostModal/PostModal.js";
import SpaceModal from "../Modal/Model";

export default function Content() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [postData, setPostData] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState();
  const [likeData, setLikeData] = useState([]);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const selectedPost = postData.filter((post) => post.id === selectedPostId)[0];

  // Add this constant for the base image URL
  const imageBaseURL = "http://localhost:8080/resources/static/assets/uploads/";

  useEffect(() => {
    axios.get(`http://localhost:8080/posts/user/${user.sub}`).then((resp) => {
      setPostData(resp.data);
    });
  }, []);

  const filteredLikes = likeData.filter((likes) => likes.user_id === user.id);

  return (
    <>
      <header>
        <h3 className="content-header">Discover new spaces</h3>
        {isAuthenticated && (
          <Link to="/post">
            <button className="post">Post</button>
          </Link>
        )}
      </header>
      <main>
        {modal && selectedPost && (
          <SpaceModal
            id={selectedPost.id}
            selectedPost={selectedPost}
            postData={postData}
            setPostData={setPostData}
            isOpen={modal}
            toggle={toggle}
            current_user_liked={selectedPost.current_user_liked}
            like_count={selectedPost.like_count}
            title={selectedPost.title}
            image={selectedPost.image} // Append imageBaseURL to the image filename
            username={selectedPost.user_nickname}
            description={selectedPost.description}
            likes={filteredLikes}
            timestamp={selectedPost.timestamp}
          />
        )}
        {postData.map((post) => (
          <Cards
            key={post.id}
            post={post}
            username={post.user_nickname}
            image={post.image} // Append imageBaseURL to the image filename
            likes={post.likes}
            setSelectedPostId={setSelectedPostId}
            setModal={setModal}
          />
        ))}
      </main>
    </>
  );
}
