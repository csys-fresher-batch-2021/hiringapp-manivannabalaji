let applications = [];
class ApplicationManager{

    /**
     * Function to add new application.
     * @param {*} application 
     */
    static addApplication(jobId, application){
        let url = "http://localhost:3000/api/user/" + jobId + "/apply";
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.post(url, application, config);
    }

    /**
     * Function to retrieve all applications.
     */
    static getAllApplications(){
        let url = "http://localhost:3000/api/applications";
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.get(url, config);
    }

    /**
     * Function to retrive a application using email.
     * @param {*} email 
     */
    static getApplication(id){
        let url = "http://localhost:3000/api/applications/" + id;
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.get(url, config);
    }

    /**
     * Function to get all application by job name.
     * @param {string} job 
     */
    static filterApplicationByJob(job, applications){
        let searchedApplications = [];
        applications.forEach(element => {
            if(element.jobtitle.toLowerCase().includes(job.toLowerCase())){
                searchedApplications.push(element);
            }
        });
        return searchedApplications;
    }

    /**
     * Function to get all application by applicant name.
     * @param {string} job 
     */
    static filterApplicationByName(name, applications){
        let searchedApplications = [];
        applications.forEach(element => {
            if(element.name.toLowerCase().includes(name.toLowerCase())){
                searchedApplications.push(element);
            }
        });
        return searchedApplications;
    }
    
    /**
     * Function to get all applications submitted by a user.
     * @param {string} email 
     */
    static getApplicationsByUser(email){
        let url = "http://localhost:3000/api/user/applications/" + email;
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.get(url, config);
    }

    /**
     * Function to update application details.
     * @param {*} applicationId 
     * @param {*} updatedApplication 
     */
    static updateApplication(applicationId, updatedData){
        let url = "http://localhost:3000/api/applications/" + applicationId;
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.patch(url, updatedData, config);
    }

    /**
     * Function to store user feedback.
     * @param {*} feedback 
     */
    static sendFeedback(feedback){
        let url = "http://localhost:3000/api/feedback";
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.post(url, feedback, config);
    }

    /**
     * Function to return user auth token
     */
    static getUserToken(){
        let token = JSON.parse(localStorage.getItem('USER')).token;
        return token;
    }
}