class JobManager{
    /**
     * Function to retrieve all job offers from storage.
     */
    static getJobOffers(){
        let url = "http://localhost:3000/api/jobs";
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.get(url, config);
    }

    /**
     * Function to add new job offer.
     * @param {*} offer 
     */
    static addJobOffer(jobOffer){
        let url = "http://localhost:3000/api/jobs";
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.post(url, jobOffer, config);
    }

    /**
     * Function to remove an existing job offer from storage.
     * @param {*} jobOfferId 
     */
    static removeJobOffer(jobId){
        let url = "http://localhost:3000/api/jobs/" + jobId;
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.delete(url, config);
    }

    /**
     * Function to update existing job offer.
     * @param {*} oldJobOfferId 
     * @param {*} newJobOffer 
     */
    static updateJobOffer(oldJobOfferId, updatedJob){
        let url = "http://localhost:3000/api/jobs/" + oldJobOfferId;
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.put(url, updatedJob, config);
    }

    /**
     * Function to update existing job offer.
     * @param {*} oldJobOfferId 
     * @param {*} newJobOffer 
     */
    static archivePost(id){
        let url = "http://localhost:3000/api/jobs/" + id + "/archive";
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.put(url, {}, config);
    }

    /**
     * Function to search specific job from storage.
     * @param {*} jobOfferName 
     */
    static searchJobOffer(jobOfferName, jobOffers){
        let searchedJobOffer = [];
        jobOffers.forEach(element => {
            if(element.jobtitle.toLowerCase().includes(jobOfferName)){
                searchedJobOffer.push(element);
            }
        });
        return searchedJobOffer;
    }

    /**
     * Function to search specific job from storage.
     * @param {*} jobOfferName 
     */
    static searchJobLocation(jobLocation, jobOffers){
        let searchedJobLocation = [];
        jobOffers.forEach(element => {
            if(element.location.toLowerCase().includes(jobLocation)){
                searchedJobLocation.push(element);
            }
        });
        return searchedJobLocation;
    }

    /**
     * Search job offers by skills
     * @param {*} skill 
     * @param {*} jobOffers 
     */
    static searchJobBySkills(skill, jobOffers){
        let searchedSkill = [];
        jobOffers.forEach(element => {
            let skills = element.skills;
            let splittedSkills = skills.split(',');
            for(let i=0; i<splittedSkills.length; i++){
                if(splittedSkills[i].trim().toLowerCase().includes(skill.toLowerCase())){
                    searchedSkill.push(element);
                    break;
                }
            }
        });
        return searchedSkill;
    }

    /**
     * Function to get a job offer using job id.
     * @param {number} id 
     */
    static getJobOffer(id){
        let url = "http://localhost:3000/api/jobs/" + id;
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.get(url, config);
    }

    static getStatus(){
        let url = "http://localhost:3000/api/dashboard";
        let token = this.getUserToken();
        let config = {headers: {authorization: "Bearer " + token}};
        return axios.get(url, config);
    }

    /**
     * Function to get last accessed job id.
     */
    static getCurrentJobId(){
        let jobId = localStorage.getItem('JOB_VIEW_ID');
        return jobId;
    }

    /**
     * Function to return user auth token
     */
    static getUserToken(){
        let token = JSON.parse(localStorage.getItem('USER')).token;
        return token;
    }
}