let applicants = [];

class ApplicantManager{

    /**
     * Function to add new applicant.
     * @param {*} applicant 
     */
    static addApplicant(applicant){
        let url = "http://localhost:3000/api/user/signup";
        return axios.post(url, applicant);
    }

    /**
     * Function to retrieve applicant for authentication
     * @param {*} email 
     * @param {*} password 
     */
    static authenticateApplicant(credentials){
        let url = "http://localhost:3000/api/user/login";
        return axios.post(url, credentials);
    }

    /**
     * Function to get applicant profile
     * @param {*} email 
     */
    static getProfile(email){
        let url = "http://localhost:3000/api/user/profile/" + email;
        return axios.get(url);
    }

    /**
     * Function to update applicant profile
     * @param {*} applicant 
     */
    static updateProfile(email, updatedProfile){
        let url = "http://localhost:3000/api/user/profile/" + email;
        return axios.post(url, updatedProfile);
    }
}