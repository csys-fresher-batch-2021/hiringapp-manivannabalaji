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
        if(jobTitle.trim().length < 1 || jobType.trim().length < 1 || description.trim().length < 1
            || skills.trim().length < 1 || minYear.trim().length < 1 || maxYear.trim().length < 1
            || minSalary.trim().length < 1 || maxSalary.trim().length < 1 || location.trim().length < 1
            || qualification.trim().length < 1){
                valid = false;
        }
        return valid;
    }
}