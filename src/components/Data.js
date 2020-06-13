import React from "react";
import { Link } from "react-router-dom";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";

class Data extends React.Component {
  constructor() {
    super();
    this.url =
      "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole";
    extendObservable(this, {
      loading: true,
      nameList: [],
      get names() {
        return this.loading
          ? "Loading..."
          : this.nameList.map((name) => (
              <li className="person" key={name}>
                {name}
              </li>
            ));
      },
    });
  }

  componentDidMount() {
    //make an api call
    fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        data.map((info) => {
          this.nameList.push(info.first + " " + info.last);
          this.loading = false;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="root-div">
        <div className="links">
          <Link to="/time" className="link-btn">
            Previous
          </Link>
          <Link to="/currency" className="link-btn">
            Next
          </Link>
        </div>
        <div>{this.names}</div>
      </div>
    );
  }
}

export default observer(Data);
