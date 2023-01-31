import React, { useState } from "react";

import Try from "./try";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return new Array(4)
    .fill(null)
    .map(
      (_value, index) =>
        candidate.splice(Math.floor(Math.random() * (9 - index)), 1)[0]
    );
}

export default NumberBaseball = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);

  const onChangeInput = (event) => {
    event.preventDefault();

    setValue(event.target.value);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();

    if (value === answer.join("")) {
      setResult("홈런!");
      setTries((oldTries) => [...oldTries, { try: value, result: "홈런!" }]);
      alert("게임을 다시 시작합니다.");
      setValue("");
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArray = value.split("").map((value) => parseInt(value, 10));
      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다.`);
        alert("게임을 다시 시작합니다.");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
      } else {
        answerArray.forEach((_value, index) => {
          if (value === answer[index]) {
            strike += 1;
          } else if (answer.includes(value)) {
            ball += 1;
          }

          setTries((oldTries) => [
            ...oldTries,
            { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` },
          ]);
          setValue("");
        });
      }
    }
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
      </form>
      <div>시도: {tries.length}</div>
      <div>
        <ul>
          {tries.map((item, index) => (
            <Try key={`${index + 1}차 시도 :`} item={item} index={index} />
          ))}
        </ul>
      </div>
    </>
  );
};
