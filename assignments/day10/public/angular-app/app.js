angular.module('jobOpenings', ['ngRoute']).config(config);

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when('/', {
        templateUrl: 'angular-app/jobs_list/jobs.html',
        controller: 'JobsListController',
        controllerAs: 'vm'
    }).when('/jobs/:jobId', {
        templateUrl: 'angular-app/job_one/job.html',
        controller: 'JobController',
        controllerAs: 'vm'
    })
}