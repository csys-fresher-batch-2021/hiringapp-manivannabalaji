class JobManager{
    /**
     * Function to retrieve all job offers from storage.
     */
    static getJobOffers(){
        let url = "http://localhost:3000/api/jobs";
        return axios.get(url);
    }

    /**
     * Function to add new job offer.
     * @param {*} offer 
     */
    static addJobOffer(jobOffer){
        let url = "http://localhost:3000/api/jobs";
        return axios.post(url, jobOffer);
    }

    /**
     * Function to remove an existing job offer from storage.
     * @param {*} jobOfferId 
     */
    static removeJobOffer(jobId){
        let url = "http://localhost:3000/api/jobs/" + jobId;
        return axios.delete(url);
    }

    /**
     * Function to update existing job offer.
     * @param {*} oldJobOfferId 
     * @param {*} newJobOffer 
     */
    static updateJobOffer(oldJobOfferId, updatedJob){
        let url = "http://localhost:3000/api/jobs/" + oldJobOfferId;
        return axios.put(url, updatedJob);
    }

    /**
     * Function to update existing job offer.
     * @param {*} oldJobOfferId 
     * @param {*} newJobOffer 
     */
    static archivePost(id){
        let url = "http://localhost:3000/api/jobs/" + id + "/archive";
        return axios.put(url);
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
     * Function to get a job offer using job id.
     * @param {number} id 
     */
    static getJobOffer(id){
        let url = "http://localhost:3000/api/jobs/" + id;
        return axios.get(url);
    }

    static getStatus(){
        let url = "http://localhost:3000/api/dashboard";
        return axios.get(url);
    }

    /**
     * Function to get last accessed job id.
     */
    static getCurrentJobId(){
        let jobId = localStorage.getItem('JOB_VIEW_ID');
        return jobId;
    }
}