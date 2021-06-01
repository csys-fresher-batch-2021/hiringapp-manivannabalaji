let applications = [];
class ApplicationManager{

    /**
     * Function to add new application.
     * @param {*} application 
     */
    static addApplication(application){
        applications = this.getAllApplications();
        let length = applications.length;
        if(length > 0){
            let lastElementId = applications[length-1].id;
            application['id'] = lastElementId + 1; 
        } else{
            application['id'] = 1;
        }
        applications.push(application);
        this.saveToStorage(applications);
        console.log("Application saved");
    }

    /**
     * Function to retrieve all applications.
     */
    static getAllApplications(){
        let applications = JSON.parse(localStorage.getItem("APPLICATIONS")) || [];
        return applications;
    }
    /**
     * Function to retrive a application using email.
     * @param {*} email 
     */
    static getApplication(email, applicationId){
        let application;
        applications = this.getAllApplications();
        for(let i = 0; i < applications.length; i++){
            if(applications[i].email === email && applications[i].id === parseInt(applicationId)){
                application = applications[i];
                break;
            }
        }
        return application;
    }
    /**
     * Function to get all application by job name.
     * @param {string} job 
     */
    static filterApplicationByJob(job){
        let searchedApplications = [];
        applications = this.getAllApplications();
        applications.forEach(element => {
            if(element.jobTitle.toLowerCase().includes(job.toLowerCase())){
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
        let userApplications = [];
        applications = this.getAllApplications();
        applications.forEach(element => {
            if(element.email == email){
                userApplications.push(element);
            }
        });
        return userApplications;
    }

    /**
     * Function to update application details.
     * @param {*} applicationId 
     * @param {*} updatedApplication 
     */
    static updateApplication(applicationId, updatedApplication){
        applications = this.getAllApplications();
        let index = applications.findIndex(application => application.id === parseInt(applicationId));
        if(index != -1){
            applications.splice(index, 1, updatedApplication);
            this.saveToStorage(applications);
            console.log("Successfully updated");
        } else{
            console.log("Error: Application not available");
        }
    }

    /**
     * Function to store applications to storage.
     * @param {*} application 
     */
    static saveToStorage(applications){
        localStorage.setItem("APPLICATIONS", JSON.stringify(applications));
    }
}