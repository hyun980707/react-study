import React, { PureComponent } from "react";

export default class SpeedTest extends PureComponent {
  state;

  constructor(props) {
    super(props);

    this.initialize();
  }

  initialize() {
    this.state = { counter: 0 };
  }

  onClick = (event) => {
    event && event.preventDefault();

    this.setState({});
  };

  render() {
    console.log("랜더링 ", this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}
