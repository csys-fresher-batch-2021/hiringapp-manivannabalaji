let applications = [];
class ApplicationManager{

    /**
     * Function to add new application.
     * @param {*} application 
     */
    static addApplication(jobId, application){
        let url = "http://localhost:3000/api/user/" + jobId + "/apply";
        return axios.post(url, application);
    }

    /**
     * Function to retrieve all applications.
     */
    static getAllApplications(){
        let url = "http://localhost:3000/api/applications";
        return axios.get(url);
    }

    /**
     * Function to retrive a application using email.
     * @param {*} email 
     */
    static getApplication(id){
        let url = "http://localhost:3000/api/applications/" + id;
        return axios.get(url);
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
        return axios.get(url);
    }

    /**
     * Function to update application details.
     * @param {*} applicationId 
     * @param {*} updatedApplication 
     */
    static updateApplication(applicationId, updatedData){
        let url = "http://localhost:3000/api/applications/" + applicationId;
        return axios.patch(url, updatedData);
    }
}