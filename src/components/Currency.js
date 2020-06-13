import React from "react";
import "./Currency.css";
import { Link } from "react-router-dom";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";

class Currency extends React.Component {
  constructor() {
    super();
    //currencies list
    this.currencies = [
      { currency: "XCD", name: "East Caribbean dollar", symbol: "$" },
      { currency: "EUR", name: "European euro", symbol: "€" },
      { currency: "GEL", name: "Georgian lari", symbol: "₾" },
      { currency: "XCD", name: "East Caribbean dollar", symbol: "$" },
      { currency: "HTG", name: "Haitian gourde", symbol: "G" },
      { currency: "INR", name: "Indian rupee", symbol: "₹" },
      { currency: "ILS", name: "Israeli new sheqel", symbol: "₪" },
      { currency: "KZT", name: "Kazakhstani tenge", symbol: "лв" },
      { currency: "KWD", name: "Kuwaiti dinar", symbol: "د.ك" },
      { currency: "LSL", name: "Lesotho loti", symbol: "L" },
      { currency: "INR", name: "Indian rupee", symbol: "₹" },
      { currency: "USD", name: "U.S. Dollar", symbol: "$" },
    ];
    extendObservable(this, {
      from_currency: "USD",
      to_currency: "INR",
      currency_value: null,
    });
  }

  handleFromChange(e) {
    this.from_currency = e.target.value;
  }

  handleToChange(e) {
    this.to_currency = e.target.value;
  }

  handleCurrencyValueChange(e) {
    this.currency_value = e.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.currency_value === "" || this.currency_value === null) return;

    if (isNaN(this.currency_value)) {
      alert("Input not a number");
      return;
    }

    fetch(
      `https://free.currconv.com/api/v7/convert?q=${this.from_currency}_${this.to_currency}&compact=ultra&apiKey=dd8e835c3d0a875afe5e`
    )
      .then((res) => res.json())
      .then((data) => {
        let multiplier = data[Object.keys(data)[0]];
        let result = this.currency_value * multiplier;
        alert(`The converted amount is ${this.to_currency} ${result}`);
        this.currency_value = "";
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="root-div">
        <div className="links">
          <Link to="/data" className="link-btn">
            Previous
          </Link>
          <Link to="/home" className="link-btn">
            Home
          </Link>
        </div>

        {/*form */}
        <form onSubmit={this.handleSubmit.bind(this)}>
          {/*from currency dropdown */}
          <div>
            <label>
              From:
              <select
                value={this.from_currency}
                onChange={this.handleFromChange.bind(this)}
              >
                {this.currencies.map((currency) => (
                  <option value={currency.currency}>{currency.name}</option>
                ))}
              </select>
            </label>
          </div>

          {/*from currency dropdown */}
          <div>
            <label>
              To:
              <select
                value={this.to_currency}
                onChange={this.handleToChange.bind(this)}
              >
                {this.currencies.map((currency) => (
                  <option value={currency.currency}>{currency.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <input
              type="text"
              value={this.currency_value}
              placeholder="Enter the amount..."
              onChange={this.handleCurrencyValueChange.bind(this)}
            />
          </div>

          <div>
            <input type="submit" value="Convert" />
          </div>
        </form>
      </div>
    );
  }
}

export default observer(Currency);
