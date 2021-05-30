let applicants = [];

class ApplicantManager{

    /**
     * Function to add new applicant.
     * @param {*} applicant 
     */
    static addApplicant(applicant){
        applicants = this.getAllApplicants();
        let length = applicants.length;
        if(length > 0){
            let lastElementId = applicants[length-1].id;
            applicant['id'] = lastElementId + 1;
        } else{
            applicant['id'] = 1;
        }
        applicants.push(applicant);
        this.saveApplicants(applicants);
    }

    /**
     * Function to retrieve all applicants.
     */
    static getAllApplicants(){
        let applicants = JSON.parse(localStorage.getItem("APPLICANTS")) || [];
        return applicants;
    }

    /**
     * Function to get an applicant detail using email.
     * @param {*} email 
     */
    static getApplicant(email){
        let applicant;
        applicants = this.getAllApplicants();
        for(let i = 0; i < applicants.length; i++){
            if(applicants[i].email === email){
                applicant = applicants[i];
                break;
            }
        }
        return applicant;
    }

    /**
     * Function to retrieve applicant for authentication
     * @param {*} email 
     * @param {*} password 
     */
    static authenticateApplicant(email, password){
        let validApplicant = false;
        applicants = this.getAllApplicants();
        for(let i = 0; i < applicants.length; i++){
            if(applicants[i].email === email && applicants[i].password === password){
                validApplicant = true;
                break;
            }
        }
        return validApplicant; 
    }

    /**
     * Function to save applicant to storage.
     * @param {*} applicants 
     */
    static saveApplicants(applicants){
        localStorage.setItem("APPLICANTS", JSON.stringify(applicants));
    }

}