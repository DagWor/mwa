angular.module('jobOpenings').controller('JobsListController', JobsListController);

function JobsListController(JobsDataFactory, $location){
    const vm = this;
    vm.pageTitle = 'These are the Jobs Available'
    JobsDataFactory.getAllJobs().then((res) => {
        vm.jobs = res;
    })
    vm.addJob = function() {
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

        JobsDataFactory.addOneJob(newJob).then(console.log("success"));
        $location.path('/')
    }
}