import React from "react";
import "./Time.css";
import { Link } from "react-router-dom";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";

class Time extends React.Component {
  constructor() {
    super();

    extendObservable(this, {
      time: "",
    });
  }

  componentDidMount() {
    setInterval(() => {
      let myDate = new Date();
      this.time =
        myDate.getHours() +
        ":" +
        myDate.getMinutes() +
        ":" +
        myDate.getSeconds();
    }, 1000);
  }

  render() {
    return (
      <div className="root-div">
        <div className="links">
          <Link to="/home" className="link-btn">
            Previous
          </Link>
          <Link to="/data" className="link-btn">
            Next
          </Link>
        </div>
        <div>{this.time}</div>
      </div>
    );
  }
}

export default observer(Time);
