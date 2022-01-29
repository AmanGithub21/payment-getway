import axios from "axios";
import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";

class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, response: "" };
  }
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://payment-getway.herokuapp.com/verification/${this.props.match.params.token}`
    );
    console.log("compoen didi motu");
    this.setState({ loading: false, response: res.data });
  }
  render() {
    return (
      <div className="">
        {this.state.loading ? (
          <ClipLoader />
        ) : (
          <div className="">
            <h1 className="m-5">{this.state.response}</h1>
            <a className="btn btn-dark m-5" href="/">
              Back to home page
            </a>
          </div>
        )}
      </div>
    );
  }
}
export default Verification;
