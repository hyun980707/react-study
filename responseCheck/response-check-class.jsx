import React, { Component } from "react";

export default class ResponseCheck extends Component {
  state;
  timeout;

  constructor(props) {
    super(props);

    this.initialize();
  }

  initialize = () => {
    this.state = {
      state: "waiting",
      message: "클릭해서 시작하세요.",
      result: [],
    };
  };

  onClickScreen = (event) => {
    event && event.preventDefault();
    const { state, message, result } = this.state;

    switch (state) {
      case "waiting":
        this.setState({
          state: "ready",
          message: "초록색이 되면 클릭하세요.",
        });
        this.timeout = setTimeout(() => {
          this.setState({
            state: "now",
            message: "지금 클릭",
          });
        }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
        break;

      case "ready": // 성급하게 클릭
        this.setState({
          state: "waiting",
          message: "너무 성급하시군요! 초록생이 된 후에 클릭하세요.",
        });
        clearTimeout(this.timeout)
        break;

      case "now": // 반응속도 체크
        this.setState({
          state: "waiting",
          message: "클릭해서 시작하세요.",
          result: [],
        });
        break;
    }
  };

  onRenderAverage = () => {
    const { result } = this.state;

    return (
      result.length > 0 && (
        <div>
          평균 시간: {result.reduce((prev, now) => prev + now) / result.length}
          ms
        </div>
      )
    );
  };

  render() {
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.onRenderAverage()}
      </>
    );
  }
}
