const express = require('express');
const router = express.Router();
const passport = require('passport');
const Job = require('../../models/Job');

// AWS IMAGES
const aws = require('aws-sdk');
const config = require('../../config/keys');
const upload = require('../files');
const jobAvatar = upload.uploadJobAvatar.single('jobAvatar');

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: 'eu-central-1'
});

const s3 = new aws.S3();

// @route GET api/jobs
// @desc Get all jobs
// @access Public
router.get('/', (req, res) => {
  const errors = {};
  Job.find()
    .sort({ createdAt: -1 })
    .then(allJobs => {
      res.json(allJobs);
    })
    .catch(err => {
      errors.job = 'Jobs not found';
      console.log(err);
      res.status(404).json(errors);
    });
});

// @route GET api/jobs/:id
// @desc Get single job by id
// @access Public
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Job.findById(req.params.id)
      .then(foundJob => res.json(foundJob))
      .catch(err => {
        errors.job = 'Job not found';
        console.log(err);
        res.status(404).json(errors);
      });
  }
);

// @route POST api/jobs
// @desc Post new jobs
// @access Private / Admin
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    const job = {};
    if (req.body.title) job.title = req.body.title;
    new Job(job)
      .save()
      .then(newJob =>
        res.status(200).json({
          item: newJob,
          action: 'add',
          message: 'Added job'
        })
      )
      .catch(err => {
        errors.job = 'Job can not be saved';
        console.log(err);
        return res.status(400).json(errors);
      });
  }
);

// @route PUT api/jobs/:id
// @desc Update existing job
// @access Private / Admin
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Job.findById(req.params.id)
      .then(foundJob => {
        if (req.body.title) foundJob.title = req.body.title;
        if (req.body.companyName) foundJob.companyName = req.body.companyName;
        if (req.body.companyDescription)
          foundJob.companyDescription = req.body.companyDescription;
        if (req.body.location) foundJob.location = req.body.location;
        if (req.body.description) foundJob.description = req.body.description;
        if (req.body.deadline) foundJob.deadline = req.body.deadline;
        if (req.body.website) foundJob.website = req.body.website;
        foundJob
          .save()
          .then(updatedJob =>
            res.status(200).json({
              item: updatedJob,
              action: 'update',
              message: 'Updated job'
            })
          )
          .catch(err => {
            errors.job = 'Job can not be updated';
            console.log(err);
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.job = 'Job not found';
        console.log(err);
        res.status(404).json(errors);
      });
  }
);

// @route DELETE api/jobs/:id
// @desc Delete job
// @access Private / Admin
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Job.findById(req.params.id)
      .then(job => {
        if (job.avatar && job.avatar.key) {
          const params = {
            Bucket: job.avatar.bucket,
            Delete: {
              Objects: [{ Key: job.avatar.key }]
            }
          };
          s3.deleteObjects(params, (err, data) => {
            if (err) {
              console.log(err);
            }
            job
              .remove()
              .then(() =>
                res.status(200).json({
                  item: { _id: req.params.id },
                  action: 'delete',
                  message: 'Deleted job'
                })
              )
              .catch(err => {
                errors.job = 'Job can not be deleted';
                console.log(err);
                return res.status(400).json(errors);
              });
          });
        }
      })
      .catch(err => {
        errors.job = 'Job not found';
        console.log(err);
        res.status(404).json(errors);
      });
  }
);

// --- UPLOADING JOB IMAGES --- //

// @route POST api/jobs/avatar/:id
// @desc Upload job's avatar
// @access Private / Admin
router.post(
  '/avatar/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Job.findById(req.params.id)
      .then(job => {
        // Check if avatar exists
        if (job.avatar && job.avatar.key) {
          // Delete job avatar
          const params = {
            Bucket: job.avatar.bucket,
            Delete: {
              Objects: [{ Key: job.avatar.key }]
            }
          };
          s3.deleteObjects(params, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              // Deleted job avatar - now create a new one
              jobAvatar(req, res, err => {
                if (err) {
                  console.log(err);
                  errors.uploadfail = 'Failed to upload an image';
                  return res.json(errors);
                }
                if (req.file == undefined) {
                  console.log(err);
                  errors.selectfail = 'No file selected';
                  return res.json(errors);
                }
                job.avatar.location = req.file.location;
                job.avatar.key = req.file.key;
                job.avatar.bucket = req.file.bucket;
                job.avatar.originalname = req.file.originalname;
                job.avatar.mimetype = req.file.mimetype;
                job.avatar.size = req.file.size;
                job.avatar.fieldName = req.file.metadata.fieldName;
                job
                  .save()
                  .then(deletedAvatarJob =>
                    res.status(200).json(deletedAvatarJob)
                  )
                  .catch(err => {
                    console.log(err);
                    errors.jobnotsaved = 'Job not saved';
                    return res.status(404).json(errors);
                  });
              });
            }
          });
        } else {
          // Create job avatar
          jobAvatar(req, res, err => {
            if (err) {
              console.log(err);
              errors.uploadfail = 'Failed to upload an image';
              return res.json(errors);
            }
            if (req.file == undefined) {
              console.log(err);
              errors.selectfail = 'No file selected';
              return res.json(errors);
            }
            job.avatar.location = req.file.location;
            job.avatar.key = req.file.key;
            job.avatar.bucket = req.file.bucket;
            job.avatar.originalname = req.file.originalname;
            job.avatar.mimetype = req.file.mimetype;
            job.avatar.size = req.file.size;
            job.avatar.fieldName = req.file.metadata.fieldName;
            job
              .save()
              .then(deletedAvatarJob => res.status(200).json(deletedAvatarJob))
              .catch(err => {
                console.log(err);
                errors.jobnotsaved = 'Job not saved';
                return res.status(404).json(errors);
              });
          });
        }
      })
      .catch(err => {
        console.log(err);
        errors.job = 'Job not found';
        return res.status(404).json(errors);
      });
  }
);

// @route DELETE api/jobs/avatar/:id
// @desc Delete job's avatar
// @access Private / Admin
router.delete(
  '/avatar/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Job.findById(req.params.id)
      .then(job => {
        if (job.avatar && job.avatar.key) {
          const params = {
            Bucket: job.avatar.bucket,
            Delete: {
              Objects: [{ Key: job.avatar.key }]
            }
          };
          s3.deleteObjects(params, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              job.avatar = null;
              job
                .save()
                .then(deletedAvatarJob =>
                  res.status(200).json(deletedAvatarJob)
                )
                .catch(err => {
                  console.log(err);
                  errors.jobnotsaved = 'Job not saved';
                  return res.status(404).json(errors);
                });
            }
          });
        } else {
          errors.avatarnotfound = 'Job avatar not found';
          return res.status(404).json(errors);
        }
      })
      .catch(err => {
        console.log(err);
        errors.job = 'Job not found';
        return res.status(404).json(errors);
      });
  }
);

module.exports = router;
