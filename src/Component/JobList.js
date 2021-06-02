import React, { Component } from "react";
import JobDataService from "../Services/JobService";

export default class JobList extends Component {
  constructor(props) {
    super(props);
    this.retrieveJobs = this.retrieveJobs.bind(this);
    this.searchJobs = this.searchJobs.bind(this);
    this.setActiveJob = this.setActiveJob.bind(this);
    this.onChangeQuery = this.onChangeQuery.bind(this);

    this.state = {
      jobs: [],
      currentJob: null,
      currentIndex: -1,
      query: "",
    };
  }

  componentDidMount() {
    this.retrieveJobs();
  }

  retrieveJobs() {
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
  }

  searchJobs() {
    JobDataService.searchJobs()
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

  onChangeQuery(e) {
    this.setState({
      query: e.target.value,
      currentJob: null,
      currentIndex: -1,
      jobs: [],
    });
    this.searchJobs();
  }

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
          <label htmlFor="title">Search</label>
          <br />
          <input
            type="text"
            value={this.state.query}
            onChange={this.onChangeQuery}
          />
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
                  >
                    {job.jobTitle}
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
                <div>
                  <label>
                    <strong>Company Name:</strong>
                  </label>{" "}
                  {currentJob.companyName}
                </div>
                <div>
                  <label>
                    <strong>Job Description:</strong>
                  </label>{" "}
                  {currentJob.jobDescription}
                </div>
                <div>
                  <label>
                    <strong>Skills:</strong>
                  </label>{" "}
                  {currentJob.skills}
                </div>
                <form action={currentJob.jobAppUrl}>
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
