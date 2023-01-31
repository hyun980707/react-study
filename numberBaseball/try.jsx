import React from "react";

export default Try = () => {
  return (
    <li>
      <div>{this.props.item.try}</div>
      <div>{this.props.item.result}</div>
    </li>
  );
};
