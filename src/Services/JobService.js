import axios from "axios";

const JOB_API_BASE_URL = "http://localhost:8082/api/jobs/";

class JobDataService {
  getJobs() {
    return axios.get(JOB_API_BASE_URL);
  }
  searchJobs(query) {
    return axios.get(JOB_API_BASE_URL + query);
  }
  getSortedJobs(id) {
    return axios.get(JOB_API_BASE_URL + "sorted/" + id);
  }
  searchSortedJobs(id, query) {
    return axios.get(JOB_API_BASE_URL + "sorted/" + id + "/" + query);
  }
}

export default new JobDataService();
