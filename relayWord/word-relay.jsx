import React, { useRef, useState } from "react";

const WordRelay = () => {
  const [word, setWord] = useState("조현우");
  const [result, setResult] = useState("");
  const inputEl = useRef(null);

  const onSubmitForm = (event) => {
    event && event.preventDefault();

    console.dir(event.target);

    if (word[word.length - 1] === event.target.children.wordInput.value[0]) {
      setResult("딩동댕");
      setWord(event.target.children.wordInput.value);
      event.target.children.wordInput.value = "";
    } else {
      setResult("땡");
      event.target.children.wordInput.value = "";
    }

    inputEl.current.focus();
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">글자를 입력하세요.</label>
        <input ref={inputEl} id="wordInput" className="wordInput" type="text" />
        <button type="button">입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay
