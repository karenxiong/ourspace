import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createPortal } from "react-dom";

import Cards from "../Cards/Cards";
import "./Content.scss";
import PostModal from "../PostModal/PostModal.js";

export default function Content() {
  const [postData, setPostData] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const [showModal, setShowModal] = useState(false);

  // Add this constant for the base image URL
  const imageBaseURL = "http://localhost:8080/resources/static/assets/uploads/";

  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((resp) => {
      setPostData(resp.data);
      console.log(resp.data);
    });
  }, [showModal]);

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
        {showModal &&
          selectedPost &&
          createPortal(
            <PostModal
              id={selectedPost.id}
              title={selectedPost.title}
              image={selectedPost.image} // Append imageBaseURL to the image filename
              username={selectedPost.user_nickname}
              description={selectedPost.description}
              likes={selectedPost.likes}
              timestamp={selectedPost.timestamp}
              onClose={() => setShowModal(false)}
            />,
            document.body
          )}
        {postData.map((post) => (
          <Cards
            key={post.id}
            post={post}
            username={post.user_nickname}
            image={post.image} // Append imageBaseURL to the image filename
            likes={post.likes}
            setShowModal={setShowModal}
            setSelectedPost={setSelectedPost}
          />
        ))}
      </main>
    </>
  );
}
