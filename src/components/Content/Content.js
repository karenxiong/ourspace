// Package Imports
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createPortal } from "react-dom";

// Import Styles & Components
import Cards from "../Cards/Cards";
import "./Content.scss";
import PostModal from "../PostModal/PostModal.js";

export default function Content() {
  const [postData, setPostData] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((resp) => {
      setPostData(resp.data);
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
              title={selectedPost.title}
              image={selectedPost.image}
              username={selectedPost.username}
              description={selectedPost.description}
              // item_id={selectedPost.item_id}
              likes={selectedPost.likes}
              // comment_id={selectedPost.comment_id}
              timestamp={selectedPost.timestamp}
              onClose={() => setShowModal(false)}
            />,
            document.body
          )}
        {postData.map((post) => (
          <Cards
            key={post.id}
            post={post}
            username={post.username}
            image={post.image}
            likes={post.likes}
            setShowModal={setShowModal}
            setSelectedPost={setSelectedPost}
          />
        ))}
        {postData.map((post) => (
          <Cards
            key={post.id}
            post={post}
            username={post.username}
            image={post.image}
            likes={post.likes}
            setShowModal={setShowModal}
            setSelectedPost={setSelectedPost}
          />
        ))}
        {postData.map((post) => (
          <Cards
            key={post.id}
            post={post}
            username={post.username}
            image={post.image}
            likes={post.likes}
            setShowModal={setShowModal}
            setSelectedPost={setSelectedPost}
          />
        ))}
        {postData.map((post) => (
          <Cards
            key={post.id}
            post={post}
            username={post.username}
            image={post.image}
            likes={post.likes}
            setShowModal={setShowModal}
            setSelectedPost={setSelectedPost}
          />
        ))}
      </main>
    </>
  );
}
