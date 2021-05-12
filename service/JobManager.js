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
     * Function to save job offer to storage.
     * @param {*} openings 
     */
    static saveToStorage(openings){
        localStorage.setItem("OPENINGS", JSON.stringify(openings));
    }
}