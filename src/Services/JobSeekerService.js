import axios from "axios";

const JOBSEEKER_API_BASE_URL = "http://localhost:8082/api/user/";

class JobSeekerDataService {
  uploadResume(username, formData) {
    return axios.post(
      JOBSEEKER_API_BASE_URL + username + "/uploadResume",
      formData
    );
  }
  login(username) {
    return axios.get(JOBSEEKER_API_BASE_URL + username);
  }
}

export default new JobSeekerDataService();
