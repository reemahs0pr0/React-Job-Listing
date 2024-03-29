import React, { Component } from "react";
import JobDataService from "../Services/JobService";
import JobSeekerDataService from "../Services/JobSeekerService";

export default class JobList extends Component {
  constructor(props) {
    super(props);
    this.retrieveJobs = this.retrieveJobs.bind(this);
    this.searchJobs = this.searchJobs.bind(this);
    this.setActiveJob = this.setActiveJob.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      jobs: [],
      currentJob: null,
      currentIndex: -1,
      query: "",
      user: props.user,
    };
    console.log(this.state.user);
  }

  componentDidMount() {
    JobSeekerDataService.login(this.state.user.userName)
      .then((response) => {
        this.setState({
          user: response.data,
        });
        console.log(response.data);
        this.retrieveJobs();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveJobs() {
    this.setState({
      currentJob: null,
      currentIndex: -1,
      query: "",
    });
    if (this.state.user.resumeUrl == null) {
      JobDataService.getJobs()
        .then((response) => {
          this.setState({
            jobs: response.data,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      JobDataService.getSortedJobs(this.state.user.id)
        .then((response) => {
          this.setState({
            jobs: response.data,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  searchJobs() {
    this.setState({
      currentJob: null,
      currentIndex: -1,
      jobs: [],
    });
    console.log(this.state.query);
    if (this.state.user.resumeUrl == null) {
      JobDataService.searchJobs(this.state.query)
        .then((response) => {
          this.setState({
            jobs: response.data,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      JobDataService.searchSortedJobs(this.state.user.id, this.state.query)
        .then((response) => {
          this.setState({
            jobs: response.data,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  handleChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.searchJobs();
    }
  };

  setActiveJob(job, index) {
    this.setState({
      currentJob: job,
      currentIndex: index,
    });
  }

  render() {
    const { jobs, currentJob, currentIndex } = this.state;

    return (
      <div>
        <br />
        <div className="form-group">
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div>
          <button onClick={this.searchJobs} className="btn btn-sm btn-success">
            Search
          </button>
          <button
            onClick={this.retrieveJobs}
            className="m-3 btn btn-sm btn-danger"
          >
            Clear
          </button>
        </div>
        <br />
        <div className="list row">
          <div className="col-md-6">
            <h4>Jobs List ({jobs.length} jobs available)</h4>

            <ul className="list-group">
              {jobs &&
                jobs.map((job, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveJob(job, index)}
                    key={index}
                    style={{ cursor: "pointer" }}
                  >
                    <span>
                      <b>{job.companyName}</b>
                    </span>
                    <br />
                    <span>{job.jobTitle}</span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            {currentJob ? (
              <div>
                <h4>Job</h4>
                <div>
                  <label>
                    <strong>Job Title:</strong>
                  </label>{" "}
                  {currentJob.jobTitle}
                </div>
                <br />
                <div>
                  <label>
                    <strong>Company Name:</strong>
                  </label>{" "}
                  {currentJob.companyName}
                </div>
                <br />
                <div>
                  <label>
                    <strong>Job Description:</strong>
                  </label>{" "}
                  {currentJob.jobDescription}
                </div>
                <br />
                <div>
                  <label>
                    <strong>Skills:</strong>
                  </label>{" "}
                  {currentJob.skills}
                </div>
                <br />
                <form action={currentJob.jobAppUrl} target="_blank">
                  <input type="submit" value="Apply" />
                </form>
              </div>
            ) : (
              <div>
                <br />
                <p>Click on job for job details...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
