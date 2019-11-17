const express = require('express');
const router = express.Router();
const passport = require('passport');
const Applicant = require('../../models/Applicant');

// @route GET api/applicants
// @desc Get all applicants
// @access Public
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Applicants.find()
      .sort({ createdAt: -1 })
      .then(allApplicants => {
        res.json(allApplicants);
      })
      .catch(err => {
        errors.applicants = 'Applicants not found';
        console.log(err);
        res.status(404).json(errors);
      });
  }
);

// @route POST api/applicants
// @desc Post new applicant
// @access Private / Admin
router.post('/', (req, res) => {
  const { errors, isValid } = validateApplicantInput(req.body);
  // Check for validation errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const applicant = {};
  if (req.body.name) applicant.name = req.body.name;
  if (req.body.email) applicant.email = req.body.email;
  if (req.body.note) applicant.note = req.body.note;
  if (req.body.linkedin) applicant.linkedin = req.body.linkedin;
  new Applicant(applicant)
    .save()
    .then(newApplicant =>
      res.status(200).json({
        item: newApplicant,
        action: 'add',
        message: 'Added Applicant'
      })
    )
    .catch(err => {
      errors.applicant = 'Applicant can not be saved';
      console.log(err);
      return res.status(400).json(errors);
    });
});

module.exports = router;
