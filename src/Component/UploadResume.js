import React, { Component } from "react";
import JobSeekerDataService from "../Services/JobSeekerService";

export default class UploadResume extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);

    this.state = {
      selectedFile: null,
      user: props.user,
    };
  }

  onFileChange(event) {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  onFileUpload() {
    if (this.state.selectedFile == null) {
      alert("Choose a file!");
    } else {
      const formData = new FormData();

      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      console.log(this.state.selectedFile);

      JobSeekerDataService.uploadResume(this.state.user.userName, formData)
        .then((response) => {
          this.setState({
            user: response.data,
          });
          console.log(response.data);
          alert("Resume uploaded!");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h3>Upload your resume</h3>
        <br />
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload} className="btn btn-success">
            Upload!
          </button>
        </div>
        <br />
        {this.fileData()}
      </div>
    );
  }
}
