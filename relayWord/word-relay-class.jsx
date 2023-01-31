import React, { Component } from "react";

export default class WordRelay extends Component {
  state;

  constructor(props) {
    super(props);

    this.initialize();
  }

  initialize() {
    this.state = {
      word: "조현우",
      value: "",
      result: "",
    };
  }

  onSubmitForm = (event) => {
    event && event.preventDefault();

    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState((prevState) => ({
        result: "딩동댕",
        word: prevState.value,
        value: "",
      }));
    } else {
      this.setState({
        result: "땡",
        value: "",
      });
    }

    this.input.focus();
  };

  onRefInput = (e) => {
    this.input = e;
  };

  onChangeInput = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <label htmlFor="wordInput">글자를 입력하세요.</label>
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
            id="wordInput"
            className="wordInput"
            type="text"
          />
          <button type="button">입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}
