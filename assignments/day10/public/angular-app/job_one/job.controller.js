angular.module('jobOpenings').controller('JobController', JobController);

function JobController(JobsDataFactory, $routeParams, $location, $route) {
    const vm = this;
    vm.pageTitle = 'These are the Jobs Available'
    let jobId = $routeParams.jobId;
    JobsDataFactory.getOneJob(jobId).then((res) => {
        vm.job = res;
    })
    vm.deleteJob = function (jobId) {
        JobsDataFactory.deleteOneJob(jobId).then(console.log("deleted"))
        $location.path("/");
    }

    vm.updateJob = function (jobId) {
        if (vm.newJobTitle && vm.newJobSalary && vm.newJobExperience && vm.newJobDescription && vm.newJobCity && vm.newJobSkill && vm.newJobState && vm.newJobZip) {
            const newJob = {
                title: vm.newJobTitle,
                salary: vm.newJobSalary,
                description: vm.newJobDescription,
                experience: vm.newJobExperience,
                skills: [vm.newJobSkill],
                location: {
                    city: vm.newJobCity,
                    state: vm.newJobState,
                    zip: vm.newJobZip
                }
            }

            JobsDataFactory.replaceJob(jobId, newJob).then(() => $route.reload())
            

        } else {
            const newJob = {}
            if (vm.newJobTitle) newJob.title = vm.newJobTitle;
            if (vm.newJobSalary) newJob.salary = vm.newJobSalary;
            if (vm.newJobDescription) newJob.description = vm.newJobDescription;
            if (vm.newJobExperience) newJob.experience = vm.newJobExperience;
            if (vm.newJobSkill) newJob.skills = vm.newJobSkill;
            if (vm.newJobCity) newJob.location.city = vm.newJobCity;
            if (vm.newJobState) newJob.location.state = vm.newJobState;
            if (vm.newJobZip) newJob.location.zip = vm.newJobZip;

            console.log(newJob);
            JobsDataFactory.updateJob(jobId, newJob).then(() => {
                $route.reload()
            })
        }
    }
}