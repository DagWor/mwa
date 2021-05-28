const Job = require('../model/job.model');

module.exports.getLocation = (req, res) => {
    const response = {
        status: 200,
        message: ''
    }
    if (req.params.jobId) {
        Job.findById(req.params.jobId).exec((err, jobs) => {
            if (err) {
                response.status = 500;
                response.message = { 'message': "Internal Server Error" }
            } else if (!jobs) {
                response.status = 404;
                response.message = { 'message': "Job not found" }
            } else if (jobs.length === 0) {
                response.status = 404;
                response.message = { 'message': "No Job Openings" }
            } else if (!jobs.location) {
                response.status = 404;
                response.message = { 'message': "No Location Available" }
            } else {
                response.message = jobs.location;
            }
            res.status(response.status).json(response.message)
        })
    } else {
        res.status(400).json({ 'message': "Job Id not provided" })
    }
}

module.exports.addLocation = (req, res) => {
    const response = {
        status: 200,
        message: ''
    }
    if (req.params.jobId && req.body && req.body.city && req.body.state && req.body.zip) {
        Job.findById(req.params.jobId).exec((err, job) => {
            if (err) {
                response.status = 500;
                response.message = { 'message': "Internal Server Error" }
            } else if (!job) {
                response.status = 404;
                response.message = { 'message': "Job not found" }
            } else if (job.length === 0) {
                response.status = 404;
                response.message = { 'message': "No Job Openings" }
            } else {
                let newLocation = {
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip
                }

                job.location = newLocation;
                response.message = job;
            }

            job.save((err, saved) => {
                if (err) {
                    response.status = 500;
                    response.message = { 'message': "Internal Server Error" }
                } else if (!saved) {
                    response.status = 404;
                    response.message = { 'message': "Job not found" }
                }
                res.status(response.status).json(response.message)
            })
        })
    } else {
        res.status(400).json({ 'message': "Insufficient Information" })
    }
}

module.exports.patchOneLocation = (req, res) => {
    const response = {
        status: 200,
        message: ''
    }

    if (req.params.jobId) {

        const jobId = req.params.jobId;
        Job.findById(jobId).exec((err, job) => {
            if (err) {
                response.status = 500;
                response.message = { 'message': "Internal Server Error" }
            } else if (!job) {
                response.status = 404;
                response.message = { 'message': "Job not found" }
            }

            if (job) {
                const patchedLocation = {};
                if (req.body.city) patchedLocation.city = req.body.city;
                else patchedLocation.city = job.city;

                if (req.body.state) patchedLocation.state = req.body.state;
                else patchedLocation.state = job.state;

                if (req.body.zip) patchedLocation.zip = req.body.zip;
                else patchedLocation.zip = job.zip;

                job.save((err, saved) => {
                    if (err) {
                        response.status = 500;
                        response.message = { 'message': "Internal Server Error" }
                    } else if (!job) {
                        response.status = 404;
                        response.message = { 'message': "Job not found" }
                    }
                    response.message = job;

                    res.status(response.status).json(response.message)
                })
            }
        })
    } else {
        res.status(400).json({ 'message': "Job Id not provided" })
    }
}


module.exports.deleteLocation = (req, res) => {
    const response = {
        status: 204,
        message: ''
    }
    if (req.params.jobId) {
        const jobId = req.params.jobId;
        Job.findById(jobId).exec((err, job) => {
            if (err) {
                response.status = 500;
                response.message = { 'message': "Internal Server Error" }
            } else if (!job) {
                response.status = 404;
                response.message = { 'message': "Job not found" }
            }
            else {
                job.location.remove();

                job.save((err, saved) => {
                    if (err) {
                        response.status = 500;
                        response.message = { 'message': "Internal Server Error" }
                    } else if (!saved) {
                        response.status = 404;
                        response.message = { 'message': "Job not found" }
                    }
                    response.message = saved;

                    res.status(response.status).json(response.message)
                })
            }
        })
    } else {
        res.status(400).json({ 'message': "Job Id not provided" })
    }
}