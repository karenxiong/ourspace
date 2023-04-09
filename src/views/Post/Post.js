import "./Post.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [userSub, setUserSub] = useState("");
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        console.log("enter try", user);
        const accessToken = await getAccessTokenSilently({});
        const data = {};
        console.log("accessToken: ", accessToken);
        const response = await axios.get("http://localhost:8080/posts", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(response);
      } catch (e) {
        console.log(e.message);
        console.log("enter error");
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userSub);
    try {
      const accessToken = await getAccessTokenSilently({});
      const res = await fetch("http://localhost:8080/posts", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: JSON.stringify({
          user_id: userSub,
          title: title,
          uploadImage: uploadImage,
          description: description,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("Post created successfully");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Post your space</h1>
      <Form
        action="/stats"
        enctype="multipart/form-data"
        method="post"
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <Label for="postTitle">Title</Label>
          <Input
            id="postTitle"
            value={title}
            name="title"
            placeholder="Enter post title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="postDescription">Description</Label>
          <Input
            id="postDescription"
            value={description}
            name="description"
            placeholder="Enter post description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          {uploadImage && (
            <div>
              {console.log(uploadImage.name)}
              <img
                className="uploaded-image"
                alt="not found"
                width={"100%"}
                height={"100%"}
                max-width={"100%"}
                src={URL.createObjectURL(uploadImage)}
              />
              <br />
              <button
                className="post-btns"
                onClick={() => setUploadImage(null)}
              >
                Remove
              </button>
            </div>
          )}
          <br />
          <br />
          <Input
            className="post-btns"
            type="file"
            // value={uploadImage}
            name="image"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setUploadImage(event.target.files[0]);
            }}
          />
        </FormGroup>
        <div className="formbtns">
          <Link to="/">
            <button className="cancelbtn">Cancel</button>
          </Link>
          <button className="postbtn" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
