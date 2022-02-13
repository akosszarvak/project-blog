import React, { useState } from "react";

import "./Button.scss";

export const Button = ({ onClick, children, style }) => {
  const [btnstyle] = useState(style);
  return (
    <button className={`${style}`} onClick={onClick}>
      {children}
    </button>
  );
};
