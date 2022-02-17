import React, { useEffect, useState } from "react";
import "./Home.scss";
import "../../App.scss";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import PostCard from "../../Components/PostCard/PostCard";
import { Button } from "../../Components/Button/Button";

export default function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  let postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    let mounted = true;
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    // if (!mounted) {
    getPosts();
    // }

    // return () => {
    //   mounted = false;
    // };
  });

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="homePage container">
      {postLists
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((post) => {
          return (
            <div className="postOuter grid-item" key={post.id}>
              {" "}
              {isAuth && (
                <Button
                  style="btn btn-primary btn-warning"
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  delete post
                </Button>
              )}
              <PostCard
                title={post.title}
                author={post.author.name}
                text={post.postText}
                date={post.createdAt}
              >
                {" "}
              </PostCard>
            </div>
          );
        })}
    </div>
  );
}
