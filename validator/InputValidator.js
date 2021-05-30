class InputValidator{
    /**
     * Function to check whether minimum salary is less than maximum salary
     * @param {int} minSalary 
     * @param {int} maxSalary 
     */
    static validateSalary(minSalary, maxSalary){
        let valid = false;
        if(minSalary < maxSalary){
            valid = true;
        }
        return valid;
    }

    /**
     * Function to check whether minimum experience year is less than maximum experience year.
     * @param {int} minYear 
     * @param {int} maxYear 
     */
    static validateExperience(minYear, maxYear){
        let valid = false;
        if(minYear < maxYear){
            valid = true;
        }
        return valid;
    }

    /**
     * Function to verify all form fields are filled by user.
     * @param {*} job 
     */
    static checkFormFields(job){
        let jobTitle = job.jobTitle;
        let jobType = job.jobType;
        let description = job.description;
        let skills = job.skills;
        let minYear = job.minYears;
        let maxYear = job.maxYears;
        let minSalary = job.minSalary;
        let maxSalary = job.maxSalary;
        let location = job.location;
        let qualification = job.qualification;

        let valid = true;
        if( this.checkEmptyData(jobTitle) || this.checkEmptyData(jobType) || this.checkEmptyData(description) 
            || this.checkEmptyData(skills) || this.checkEmptyData(minYear) || this.checkEmptyData(maxYear) 
            || this.checkEmptyData(minSalary) || this.checkEmptyData(maxSalary) || this.checkEmptyData(location) 
            || this.checkEmptyData(qualification)){
                valid = false;
        }
        return valid;
    }

    /**
     * Function to check variable has empty value or not.
     * @param {*} data 
     */
    static checkEmptyData(data){
        let isValid = false;
        if(data.trim().length < 1){
            isValid = true;
        }
        return isValid;
    }
     /**
     * Function to check name has only alphabets, spaces and must start with alphabet.
     * @param {*} name 
     */
    static validateName(name){
        let valid = true;
        if(name.charCodeAt(0) == 32){
            valid = false;
        }
        for(let i = 0; i < name.length; i++){
            if(!(name.charCodeAt(i) >= 65 && name.charCodeAt(i) <= 90       //validating ascii value to find alphabet.
             || name.charCodeAt(i) >= 97 && name.charCodeAt(i) <= 122
             || name.charCodeAt(i) == 32)){
                valid = false;
             }
        }
        return valid;
    }

    /**
     * Function to check mobile number has length 10 and greater than 0.
     * @param {*} mobile 
     */
    static validateMobile(mobile){
        let valid = false;
        if(parseInt(mobile) > 0 && mobile.length == 10){
            valid = true;
        }
        return valid;
    }
    /**
     * Function to check year of passing has 4 digit value and not 0 value.
     * @param {*} yop 
     */
    static validateYearOfPassing(yop){
        let valid = false;
        if(parseInt(yop) > 0 && yop.length == 4){
            valid = true;
        }
        return valid;
    }

    /**
     * Function to check whether the work experience has length 1 to 2.
     * @param {*} experience 
     */
    static validateExperience(experience){
        let valid = false;
        if(experience.length >= 1 && experience.length <= 2){
            valid = true;
        }
        return valid;
    }
}