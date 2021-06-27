import "./App.css";
import JobList from "./Component/JobList";
import UploadResume from "./Component/UploadResume";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Component } from "react";
import Login from "./Login";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);

    this.state = {
      user: props.user,
      login: true,
    };
  }

  onLogout() {
    this.setState({
      login: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.login ? (
          <div className="App">
            <Router>
              <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                  <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                      {" "}
                      <Link to={"/JobList"} className="nav-link">
                        {" "}
                        Jobs{" "}
                      </Link>{" "}
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link to={"/UploadResume"} className="nav-link">
                        {" "}
                        Upload Resume{" "}
                      </Link>{" "}
                    </li>
                    <li className="nav-item">
                      {" "}
                      <span
                        className="nav-link"
                        onClick={this.onLogout}
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        Logout{" "}
                      </span>{" "}
                    </li>
                  </div>
                </nav>
              </div>
              <div className="container mt-3">
                <Switch>
                  <Route exact path="/JobList">
                    <JobList user={this.state.user} />
                  </Route>
                  <Route exact path="/UploadResume">
                    <UploadResume user={this.state.user} />
                  </Route>
                </Switch>
              </div>
            </Router>
          </div>
        ) : (
          <div>
            <Login />
          </div>
        )}
      </div>
    );
  }
}
