let openings = [];

class JobManager{
    /**
     * Function to retrieve all job offers from storage.
     */
    static getJobOffers(){
        let openings = JSON.parse(localStorage.getItem('OPENINGS')) || [];
        return openings;
    }

    /**
     * Function to add new job offer.
     * @param {*} offer 
     */
    static addJobOffer(offer){
        openings = this.getJobOffers();
        let length = openings.length;
        if(length > 0){
            let lastElementId = openings[length-1].id;
            offer['id'] = lastElementId + 1;
        } else{
            offer['id'] = 1;
        }
        openings.push(offer);
        this.saveToStorage(openings);
        console.log("Job added successfully");
    }

    /**
     * Function to remove an existing job offer from storage.
     * @param {*} jobOfferId 
     */
    static removeJobOffer(jobOfferId){
        let openings = this.getJobOffers();
        let index = openings.findIndex(offer => offer.id == jobOfferId);
        if(index != -1){
            openings.splice(index, 1);
            this.saveToStorage(openings);
            console.log("Job Removed Successfully");
        } else{
            console.log("Error : Job offer not available.");
        }
    }

    /**
     * Function to update existing job offer.
     * @param {*} oldJobOfferId 
     * @param {*} newJobOffer 
     */
    static updateJobOffer(oldJobOfferId, newJobOffer){
        let openings = this.getJobOffers();
        let index = openings.findIndex(offer => offer.id == oldJobOfferId);
        if(index != -1){
            openings.splice(index, 1, newJobOffer);
            this.saveToStorage(openings);
            console.log("Job updated successfully");
        } else{
            console.log("Error : Job Offer not available");
        }
    }

    /**
     * Function to get a job offer using job id.
     * @param {number} id 
     */
    static getJobOffer(id){
        let jobOffer;
        openings = this.getJobOffers();
        for(let i = 0; i < openings.length; i++){
            if(openings[i].id == id){
                jobOffer = openings[i];
                break;
            }
        }
        return jobOffer;
    }

    /**
     * Function to get last accessed job id.
     */
    static getCurrentJobId(){
        let jobId = localStorage.getItem('JOB_VIEW_ID');
        return jobId;
    }

    /**
     * Function to save job offer to storage.
     * @param {*} openings 
     */
    static saveToStorage(openings){
        localStorage.setItem("OPENINGS", JSON.stringify(openings));
    }
}