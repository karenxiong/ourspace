import "./Profile.scss";
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { createPortal } from "react-dom";
import axios from "axios";
import Cards from "../../components/Cards/Cards";
import { Link } from "react-router-dom";
import PostModal from "../../components/PostModal/PostModal";

import Highlight from "../../components/Highlight";
import Loading from "../../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent = () => {
  const [postData, setPostData] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth0();
  const currentUser = user.sub;

  const imageBaseURL = "http://localhost:8080/resources/static/assets/uploads/";

  useEffect(() => {
    axios.get(`http://localhost:8080/posts/user/${user.sub}`).then((resp) => {
      setPostData(resp.data.filter((posts) => posts.user_id === currentUser));
    });
  }, [showModal]);

  return (
    <>
      <Container className="mb-5">
        <Row className="profile-header mb-5 text-left text-md-left">
          <Col md={2}>
            <img
              src={user.picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              referrerPolicy="no-referrer"
            />
          </Col>
          <Col md className="user-info">
            <h2 className="user-name">@{user.nickname}</h2>
          </Col>
        </Row>
      </Container>
      <main>
        {postData.length === 0 && (
          <div className="no-post">
            <h5 className="no-post-msg">
              You currently have no post <br></br>Share your first space
            </h5>
            <Link to="/post">
              <button className="post">Post</button>
            </Link>
          </div>
        )}
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
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
