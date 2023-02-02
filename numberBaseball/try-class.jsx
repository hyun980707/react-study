import React, { PureComponent } from "react";

// PureComponent 사용하면 state 변확가 없으면 랜더링 하지 않는다
export default class Try extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;

    return (
      <li>
        <div>{item.try}</div>
        <div>{item.result}</div>
      </li>
    );
  }
}
