import React, { Component, useRef, useState } from "react";

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

export default class NumberBaseball extends Component {
  state;

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
      alert("게임을 다시 시작합니다.");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
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

        alert("게임을 다시 시작합니다.");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        answerArray.forEach((_value, index) => {
          if (value === this.state.answer[index]) {
            strike += 1;
          } else if (this.state.answer.includes(value)) {
            ball += 1;
          }

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
        });
      }
    }
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
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
