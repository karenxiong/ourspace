import "./Post.scss";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default function Post() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();

  const uploadHandler = (event) => {
    console.log(event.target.files[0]);
    setUploadImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    console.log(user);
    e.preventDefault();
    const formData = new FormData();
    formData.append("uploaded_file", uploadImage);
    formData.append("user_id", user.sub);
    formData.append("user_nickname", user.nickname);
    formData.append("title", title);
    formData.append("description", description);
    const accessToken = await getAccessTokenSilently({});
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/posts",
        formData,
        config
      );
      history.push("/");
      console.log("response from POST /posts", response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Post your space</h1>
      <Form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
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
              {console.log(URL.createObjectURL(uploadImage))}
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
            className="upload-image"
            type="file"
            name="uploaded_file"
            onChange={uploadHandler}
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
