class RecruiterManager{
    static async authenticate(data){
        let url = "http://localhost:3000/api/recruiter/login";
        return axios.post(url, data);
    }
}