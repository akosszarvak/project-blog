import React from "react";
import "./PostCard.scss";
import "../../App.scss";

export default function PostCard({ title, author, text, date }) {
  return (
    <>
      <div className="card flex">
        <div className="title">
          <h4>{title}</h4>
        </div>
        <div className="info-row">
          {author} | {date}
        </div>
        <div className="text">
          <p>{text}</p>
          <a href="">continue reading</a>
        </div>
      </div>
    </>
  );
}
