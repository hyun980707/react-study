import { useState } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [result, setResult] = useState([]);
  const timeout;

  onClickScreen = (event) => {
    event && event.preventDefault();

    switch (key) {
      case "waiting":
        setState("ready");
        setMessage("초록색이 되면 클릭하세요.");
        setTimeout(() => {
          setState("now");
          setMessage("지금 클릭");
        }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
        break;

      case "ready":
        setState("waiting");
        setMessage("너무 성급하시군요! 초록생이 된 후에 클릭하세요.");
        break;

      case "now":
        setState("waiting");
        setMessage("클릭해서 시작하세요.");
        setResult([]);
        break;
    }
  };

  onRenderAverage = () => {
    return (
      result.length > 0 && (
        <div>
          평균 시간: {result.reduce((prev, now) => prev + now) / result.length}
          ms
        </div>
      )
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {onRenderAverage()}
    </>
  );
};

export default ResponseCheck;
