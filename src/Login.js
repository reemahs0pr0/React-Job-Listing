import React, { Component } from "react";
import JobSeekerDataService from "./Services/JobSeekerService";
import App from "./App";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      username: "",
      password: "",
      user: null,
      verified: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  login() {
    if (this.state.username === "") {
      alert("Input username");
      return;
    }
    if (this.state.password === "") {
      alert("Input password");
      return;
    }
    JobSeekerDataService.login(this.state.username)
      .then((response) => {
        this.setState({
          user: response.data,
        });
        console.log(response.data);
        if (this.state.password === this.state.user.password) {
          this.setState({
            verified: true,
          });
        } else {
          alert("Wrong credentials!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.login();
    }
  };

  render() {
    return (
      <div>
        {this.state.verified ? (
          <div>
            <App user={this.state.user} />
          </div>
        ) : (
          <div className="submit-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">ID</label>
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <button onClick={this.login} className="btn btn-success">
              Login
            </button>
          </div>
        )}
      </div>
    );
  }
}
