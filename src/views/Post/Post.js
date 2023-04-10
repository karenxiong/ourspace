import "./Post.scss";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default function Post() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();

  //new code
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
  const inputRef = useRef(null);

  const onImageClick = (event) => {
    console.log("Image clicked");
    if (event.target !== inputRef.current) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log({ x, y });
      setInputPosition({ x, y });
      setInputTag(" "); // Set this to a non-empty string
      setTimeout(() => {
        console.log("setting focus");
        inputRef.current.focus();
      }, 100);
    }
  };

  const onInputBlur = async () => {
    console.log("input blurred");
    const text = inputRef.current.value.trim();
    if (text !== "") {
      const newTag = {
        text,
        x: inputPosition.x,
        y: inputPosition.y,
      };
      setTags([...tags, newTag]);

      // Save the new tag to the database
      await axios.post("/api/tags", newTag);
    }
    setInputTag("");
  };

  //end of new code

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
            //new code

            <div
              className="image-container"
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                className="uploaded-image"
                src={URL.createObjectURL(uploadImage)}
                alt="Sample"
              />
              <div className="overlay" onMouseDown={onImageClick}></div>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="tag"
                  style={{
                    position: "absolute",
                    left: tag.x,
                    top: tag.y,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    padding: "3px",
                    borderRadius: "3px",
                  }}
                >
                  {tag.text}
                </span>
              ))}
              <input
                ref={inputRef}
                className="tag-input"
                value={inputTag}
                onBlur={onInputBlur}
                onChange={(e) => setInputTag(e.target.value)}
                style={{
                  width: "100px",
                  height: "20px",
                  position: "absolute",
                  left: inputPosition.x,
                  top: inputPosition.y,
                  zIndex: 2,
                  display:
                    inputTag.trim() === "" &&
                    !inputRef.current?.contains(document.activeElement)
                      ? "none"
                      : "block",
                  backgroundColor: "transparent",
                }}
                tabIndex="-1"
              />
            </div>

            //end new code
            /*           <div>
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
            </div> */
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
