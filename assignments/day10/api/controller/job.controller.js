const Job = require('../model/job.model');

module.exports.addOneJob = (req, res) => {
    const response = {
        status: 201,
        message: ''
    }
    if (req.body && req.body.location && req.body.title) {
        const newLocation = {
            city: req.body.location.city,
            state: req.body.location.state,
            zip: req.body.location.zip
        }
        const newJob = {
            title: req.body.title,
            location: newLocation
        }

        if (req.body.salary) newJob.salary = req.body.salary;
        if (req.body.description) newJob.description = req.body.description;
        if (req.body.experience) newJob.experience = req.body.experience;
        if (req.body.skills) newJob.skills = req.body.skills;

        Job.create(newJob, (err, saved) => {
            if (err) {
                response.status = 500;
                response.message = { 'message': "Internal Server Error" }
            } else if (!saved) {
                response.status = 404;
                response.message = { 'message': "Database Failed" }
            } else {
                response.message = saved;
            }
            res.status(response.status).json(response.message);
        })

    } else {
        response.status = 400;
        response.message = { 'message': "Insufficient data provided" };
        res.status(response.status).json(response.message);
    }
}

module.exports.getAllJobs = (req, res) => {
    const response = {
        status: 200,
        message: ''
    }
    let offset = 0;
    let count = 5;
    
    let maxCount = 10;
    
    if (isNaN(offset) || isNaN(count)) res.status(400).json({ 'message': 'Query String offset and count should be numbers' });

    if (count > maxCount) res.status(400).json({ 'message': 'Count can not be greater than ' + maxCount });
    else if(req.query.count) count = parseInt(req.query.count);

    if(req.query.offset) offset = parseInt(req.query.offset);

    Job.find().skip(0).limit(count).exec((err, jobs) => {
        if (err) {
            response.status = 500;
            response.message = { 'message': err }
        } else if (!jobs) {
            response.status = 404;
            response.message = { 'message': "Database Failed" }
        } else if (jobs.length === 0) {
            response.status = 404;
            response.message = { 'message': "No Job Openings" }
        } else {
            response.message = jobs;
        }
        res.status(response.status).json(response.message)
    })
}

module.exports.deleteOneJob = (req, res) => {
    const response = {
        status: 204,
        message: ''
    }
    if (req.params.jobId) {
        const jobId = req.params.jobId;
        Job.findByIdAndDelete(jobId).exec((err, job) => {
            if (err) {
                response.status = 500;
                response.message = { 'message': "Internal Server Error" }
            } else if (!job) {
                response.status = 404;
                response.message = { 'message': "Job not found" }
            }
            else {
                response.message = { 'message': "Job Deleted Successfully" }
            }
            res.status(response.status).json(response.message)
        })
    } else {
        res.status(400).json({ 'message': "Job Id not provided" })
    }
}

module.exports.patchOneJob = (req, res) => {
    const response = {
        status: 200,
        message: ''
    }

    if(req.params.jobId){
        const patchedJob = {};
        if(req.body.location) patchedJob.location = req.body.location;
        if(req.body.title) patchedJob.title = req.body.title;
        if(req.body.salary) patchedJob.salary = req.body.salary;
        if(req.body.postDate) patchedJob.postDate = req.body.postDate;
        if(req.body.description) patchedJob.description = req.body.description;
        if(req.body.experience) patchedJob.experience = req.body.experience;
        if(req.body.skills) patchedJob.skills = req.body.skills;

        const jobId = req.params.jobId;
        Job.findByIdAndUpdate(jobId, patchedJob).exec((err, updatedJob) => {
            if (err) {
                response.status = 500;
                response.message = { 'message': "Internal Server Error" }
            } else if (!updatedJob) {
                response.status = 404;
                response.message = { 'message': "Job not found" }
            }
            
            if(updatedJob) response.message = updatedJob;

            res.status(response.status).json(response.message)
        })
    } else {
        res.status(400).json({ 'message': "Job Id not provided" })
    }
}

module.exports.replaceOneJob = (req, res) => {
    const response = {
        status: 200,
        message: ''
    }

    if(req.params.jobId){
        const jobId = req.params.jobId;
        Job.findOneAndReplace({_id: jobId}, req.body).exec((err, replacedJob) => {
            if (err) {
                response.status = 500;
                response.message = { 'message': "Internal Server Error" }
            } else if (!replacedJob) {
                response.status = 404;
                response.message = { 'message': "Job not found" }
            }
            
            if(replacedJob) response.message = replacedJob;

            res.status(response.status).json(response.message)
        })
    } else {
        res.status(400).json({ 'message': "Job Id not provided" })
    }
}

module.exports.addSkill = (req, res) => {
    const response = {
        status: 201,
        message: ''
    }
    if (req.body && req.params.jobId && req.body.skill) {
        const skill =  req.body.skill;
        Job.findById(req.params.jobId).exec((err, job) => {
            if (err) {
                response.status = 500;
                response.message = { 'message': "Internal Server Error" }
            } else if (!job) {
                response.status = 404;
                response.message = { 'message': "Database Failed" }
            } else {
                if(job.skills.length === 0) job.skills = [req.body.skill]
                else job.skills.push(skill)
                job.save((err, saved) => {
                    if (err) {
                        response.status = 500;
                        response.message = { 'message': "Internal Server Error" }
                    } else if (!saved) {
                        response.status = 404;
                        response.message = { 'message': "Database Failed" }
                    } else {
                        response.message = saved;
                    }
                    res.status(response.status).json(response.message);
                })
            }
        })
    } else {
        response.status = 400;
        response.message = { 'message': "Insufficient data provided" };
        res.status(response.status).json(response.message);
    }
}

module.exports.deleteSkill = (req, res) => {
    const response = {
        status: 201,
        message: ''
    }
    if (req.body && req.params.jobId && req.params.skillName) {
        const skill =  req.body.skill;
        Job.findById(req.params.jobId).exec((err, job) => {
            if (err) {
                response.status = 500;
                response.message = { 'message': "Internal Server Error" }
            } else if (!job) {
                response.status = 404;
                response.message = { 'message': "Database Failed" }
            } else {
                if(job.skills.length === 0) {
                    response.status = 404
                    response.message = 'job not found'
                }
                else {
                    // let skillIndex = job.skills.findIndex(a => a == skill)
                    job.skills.pop(skill)
                }
                job.save((err, saved) => {
                    if (err) {
                        response.status = 500;
                        response.message = { 'message': "Internal Server Error" }
                    } else if (!saved) {
                        response.status = 404;
                        response.message = { 'message': "Database Failed" }
                    } else {
                        response.message = saved;
                    }
                    res.status(response.status).json(response.message);
                })
            }
        })
    } else {
        response.status = 400;
        response.message = { 'message': "Insufficient data provided" };
        res.status(response.status).json(response.message);
    }
}

module.exports.getOneJob = (req, res) => {
    const response = {
        status: 200,
        message: ''
    }

    if(req.params.jobId){
        Job.findById(req.params.jobId).exec((err, jobs) => {
            if (err) {
                response.status = 500;
                response.message = { 'message': err }
            } else if (!jobs) {
                response.status = 404;
                response.message = { 'message': "Database Failed" }
            } else {
                response.message = jobs;
            }
            res.status(response.status).json(response.message)
        })
    }
}