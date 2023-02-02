import React, { Component, createRef } from "react";

import Try from "./try-class";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return new Array(4)
    .fill(null)
    .map(
      (_value, index) =>
        candidate.splice(Math.floor(Math.random() * (9 - index)), 1)[0]
    );
}

export default class NumberBaseball extends Component {
  state;
  inputEl;

  constructor(props) {
    super(props);

    this.initialize();
  }

  initialize() {
    this.state = {
      result: "",
      value: "",
      answer: getNumbers(),
      tries: [],
    };
    this.inputEl = createRef();
  }

  //  shouldComponentUpdate 성능 최적화를 위해 수동으로 변수의 변화가 없을 시 랜더링 안되게 적용
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.value !== nextState.value) {
      return true;
    }

    return false;
  }

  onChangeInput = (event) => {
    event.preventDefault();

    this.setState({ value: event.target.value });
  };

  onSubmitForm = (event) => {
    event.preventDefault();

    if (this.state.value === this.state.answer.join("")) {
      this.setState({
        result: "홈런!",
        tries: [
          ...this.state.tries,
          { try: this.state.value, result: "홈런!" },
        ],
      });
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
      alert("게임을 다시 시작합니다.");
    } else {
      const answerArray = this.state.value
        .split("")
        .map((value) => parseInt(value, 10));
      let strike = 0;
      let ball = 0;

      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(
            ","
          )}였습니다.`,
        });

        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
        alert("게임을 다시 시작합니다.");
      } else {
        answerArray.forEach((value, index) => {
          if (value === this.state.answer[index]) {
            strike += 1;
          } else if (this.state.answer.includes(value)) {
            ball += 1;
          }
        });

        this.setState({
          tries: [
            ...this.state.tries,
            {
              try: this.state.value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            },
          ],
          value: "",
        });
      }
    }

    this.inputEl.current.focus();
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputEl}
            type="text"
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <div>
          <ul>
            {this.state.tries.map((item, index) => (
              <Try key={`${index + 1}차 시도 :`} item={item} index={index} />
            ))}
          </ul>
        </div>
      </>
    );
  }
}
