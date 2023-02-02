import React from "react";

const Try = ({ item }) => {
  return (
    <li>
      <div>{item.try}</div>
      <div>{item.result}</div>
    </li>
  );
};

export default Try;
