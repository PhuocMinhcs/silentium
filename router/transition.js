const express = require('express');
const router = express.Router();

const steps = [];

router.get('/transition/step/:step', (req, res) => {
  const { params } = req;
  const { step } = params;

  if (
    steps.length === 0 && step !== 'blue'
    || (
      steps.length > 0
      && (step === 'yellow' && steps[steps.length - 1] !== 'blue' || step === 'green' && steps[steps.length - 1] !== 'blue')
    )
  ) {
    return res.status(400).send({
      error: true,
      message: 'Step is not allow.'
    });
  }

  steps.push(step);
  return res.status(200).send({
    error: false,
    message: ''
  });
});

router.get('/transition/current-step', (req, res) => {
  return res.status(200).send({
    error: false,
    message: '',
    currentStep: steps.slice(-1)
  });
});

router.post('/transition/reset', (req, res) => {
  steps.length = 0;
  return res.status(200).send({
    error: false,
    message: ''
  });
});

module.exports = router;
