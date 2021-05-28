angular.module('jobOpenings').controller('JobController', JobController);

function JobController(JobsDataFactory, $routeParams, $location){
    const vm = this;
    vm.pageTitle = 'These are the Jobs Available'
    let jobId = $routeParams.jobId;
    JobsDataFactory.getOneJob(jobId).then((res) => {
        vm.job = res;
    })
    vm.deleteJob = function(jobId){
        JobsDataFactory.deleteOneJob(jobId).then(console.log("deleted"))
        $location.path("/");
    }
}