import React, { useEffect, useState } from "react";
import "./CreatePost.scss";
import "../../App.scss";
import { Button } from "../../Components/Button/Button";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  let navigate = useNavigate();

  const postsCollectionRef = collection(db, "posts");
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title: title,
      postText: postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  });
  return (
    <div className="outer">
      <div className="createPost container flex">
        <h1>create post</h1>
        <div className="createPostForm flex">
          <div className="row">
            <h4>Title:</h4>
            <input
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="row">
            <h4>Post:</h4>
            <textarea
              placeholder="Post"
              onChange={(e) => {
                setPostText(e.target.value);
              }}
            />
          </div>
          <div className="row ">
            <Button
              style="btn btn-primary btn--wide "
              className="btn"
              onClick={createPost}
            >
              Submit post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
