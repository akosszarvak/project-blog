import React, { useEffect, useState } from "react";
import "./Home.scss";
import "../../App.scss";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import PostCard from "../../Components/PostCard/PostCard";

export default function Home() {
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
  // Tried to sort the posts by date, but firebase quota exceeded due to setpostlist console log infinite cycle, check if its working next day or so
  return (
    <div className="homePage container">
      {postLists
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((post) => {
          return (
            <div className="postOuter grid-item" key={post.id}>
              <PostCard
                title={post.title}
                author={post.author.name}
                text={post.postText.substring(0, 180)}
              ></PostCard>
            </div>
          );
        })}
    </div>
  );
}
