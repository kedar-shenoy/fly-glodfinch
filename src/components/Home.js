import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useLocalStore, useObserver } from "mobx-react";

function Home() {
  const counter = useLocalStore(() => ({
    count: 0,
    increment() {
      counter.count += 1;
    },
    decrement() {
      if (counter.count > 0) counter.count -= 1;
    },
  }));

  return useObserver(() => (
    <div className="root-div">
      {/*button to next page */}
      <Link to="/time" className="link-btn">
        Next
      </Link>

      {/*counter */}
      <div className="increment-decrement">
        <button onClick={counter.decrement}>-</button>
        <p>{counter.count}</p>
        <button onClick={counter.increment}>+</button>
      </div>
    </div>
  ));
}

export default Home;
