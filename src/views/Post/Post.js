import "./Post.scss";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import ImageMarker, { Marker } from "react-image-marker";

export default function Post() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();
  const [markers, setMarkers] = useState([]);

  const uploadHandler = (event) => {
    console.log(event.target.files[0]);
    setUploadImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    const accessToken = await getAccessTokenSilently({});
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log(user);
    e.preventDefault();
    const formData = new FormData();
    formData.append("uploaded_file", uploadImage);
    formData.append("user_id", user.sub);
    formData.append("user_nickname", user.nickname);
    formData.append("title", title);
    formData.append("description", description);

    console.log(markers);

    try {
      const response = await axios.post(
        "http://localhost:8080/posts",
        formData,
        config
      );

      console.log("response", response);
      // create all the markers after we finish creating the post
      for (let i = 0; i < markers.length; i++) {
        const markerFormData = new FormData();
        markerFormData.append("title", markers[i].title);
        markerFormData.append("link", markers[i].link);
        markerFormData.append("xaxis", markers[i].left);
        markerFormData.append("yaxis", markers[i].top);
        markerFormData.append("post_id", response.data.post.id);
        const markerResponse = await axios.post(
          "http://localhost:8080/items",
          markerFormData,
          config
        );
        console.log("markerResponse: ", markerResponse);
      }

      history.push("/");
      console.log("response from POST /posts", response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="post-header">Post your space</h1>
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
          <div className="upload-tip-container">
            <h6 className="upload-tip">
              Once you have uploaded your space, you may add markers by clicking
              anywhere on your space to show other's where to find the products
              shown!
            </h6>
          </div>
          {uploadImage && (
            //new code

            <div
              className="image-container"
              style={{ position: "relative", display: "inline-block" }}
            >
              <ImageMarker
                className="uploaded-image"
                markers={markers}
                onAddMarker={(marker) =>
                  setMarkers([...markers, { ...marker, title: "", link: "" }])
                }
                src={URL.createObjectURL(uploadImage)}
                alt="Sample"
              />
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

        {markers.map((marker, index) => (
          <FormGroup key={index}>
            <Label for={`markerTitle ${index + 1}`}>Item {index + 1}</Label>
            <Input
              value={marker.title}
              name={`markerTitle ${index + 1}`}
              placeholder="Enter item name"
              type="text"
              onChange={(e) => {
                const updatedMarkers = markers.map((m, i) => {
                  if (i === index) {
                    return {
                      ...m,
                      title: e.target.value,
                    };
                  } else {
                    return m;
                  }
                });

                setMarkers(updatedMarkers);
              }}
            />
            <Label for={`markerLink ${index + 1}`}>Link {index + 1}</Label>
            <Input
              value={marker.link}
              name={`markerLink ${index + 1}`}
              placeholder="Paste item link"
              type="text"
              onChange={(e) => {
                const updatedMarkers = markers.map((m, i) => {
                  if (i === index) {
                    return {
                      ...m,
                      link: e.target.value,
                    };
                  } else {
                    return m;
                  }
                });

                setMarkers(updatedMarkers);
              }}
            />
          </FormGroup>
        ))}
        {/* <Label for="postTitle">Title</Label>
          <Input
            id="postTitle"
            value={title}
            name="title"
            placeholder="Enter post title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          /> */}

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
