import React, { memo, useState } from "react";

// memo는 PureComponent와 동일한 기능
const Try = memo(({ item }) => {
  const [result, setResult] = useState(item.result);

  const onClick = (event) => {
    event && event.preventDefault();

    setResult("");
  };

  return (
    <li>
      <div>{item.try}</div>
      <div onClick={onClick}>{result}</div>
    </li>
  );
});
Try.displayName = "Try";

export default Try;
