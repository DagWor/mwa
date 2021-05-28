angular.module('jobOpenings').factory('JobsDataFactory', JobsDataFactory);

function JobsDataFactory($http) {
    return {
        addOneJob: function (job) {
            return $http.post('/api/jobs', job).then(complete).catch(failed);
        },
        getAllJobs: function () {
            return $http.get('/api/jobs').then(complete).catch(failed);
        },
        getOneJob: function (jobId) {
            return $http.get('/api/jobs/' + jobId).then(complete).catch(failed);
        },
        deleteOneJob: function (jobId){
            return $http.delete('api/jobs/' + jobId).then(complete).catch(failed)
        }
    }
}

function complete(response) {
    return response.data;
}

function failed(error) {
    return error.status.statusText;
}