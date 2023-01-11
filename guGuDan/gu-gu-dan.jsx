import React from "react";

export const GuGuDan = () => {
  const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState("");
  const inputRef = React.useRef(null);

  const onChangeInput = (event) => {
    event && event.preventDefault();

    setValue(event.target.value);
  };

  const onSubmitForm = (event) => {
    event && event.preventDefault();

    if (parseInt(value, 10) === first * second) {
      /**
       * setState는 비동기 방식으로 처리한다
       * setState에서 state의 값을 사용할 때는 function으로 변경하여 prevState를 사용하는걸 추천한다.
       * 그래야 값이 정확하게 출력이 된다
       **/
      setResult("정답: " + value);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
    } else {
      setResult("땡");
    }

    setValue("");
    inputRef.current.focus();
  };

  return (
    <>
      <div>
        {first} 곱하기 {second}
      </div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          type="tel"
        />
        <button type="button">입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};
