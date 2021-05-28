const express = require('express');
const router = express.Router();
const jobController = require('../controller/job.controller');
const locationController = require('../controller/location.controller');

router.route('/jobs')
.post(jobController.addOneJob)
.get(jobController.getAllJobs)

router.route('/jobs/:jobId')
.get(jobController.getOneJob)
.patch(jobController.patchOneJob)
.put(jobController.replaceOneJob)
.delete(jobController.deleteOneJob)

router.route('/jobs/:jobId/location')
.post(locationController.addLocation)
.get(locationController.getLocation)
.patch(locationController.patchOneLocation)
.delete(locationController.deleteLocation)

router.route('/jobs/:jobId/skills')
.post(jobController.addSkill)

router.route('/jobs/:jobId/skills/:skillName')
.delete(jobController.deleteSkill)


module.exports = router