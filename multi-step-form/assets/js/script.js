let currentStep = 0;
const formSteps = document.querySelectorAll('.form-step');
const progressStep = document.querySelectorAll('.step-progress [data-step]')
const form = document.querySelector('form');


form.addEventListener('click', (e) => {
  if(!e.target.matches('[data-action]')) {
    return;
  }

  const actions = {
    next() {
      if(!isValidInputs()) {
        return ;
      }
      currentStep++;
    },
    prev() {
      currentStep--;
    }
  }

  const action = e.target.dataset.action;
  actions[action]();
  updateActiveStep();
  updateProgressStep();
})

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);
  console.log(data.get('name'));
  console.log(data.get('email'));
});

const updateActiveStep = () => {
  formSteps.forEach(step => step.classList.remove('active'));
  formSteps[currentStep].classList.add('active');
}

const updateProgressStep = () => {
  progressStep.forEach((step, index) => {
    step.classList.remove('active');
    step.classList.remove('done');

    if(index < currentStep + 1) {
      step.classList.add('active');
    }

    if(index < currentStep) {
      step.classList.add('done');
    }
  })
}

const isValidInputs = () => {
  const currentFormSteps = formSteps[currentStep];
  const formFields = [...currentFormSteps.querySelectorAll('input'),...currentFormSteps.querySelectorAll('textarea')];

  return formFields.every(input => input.reportValidity());
}

formSteps.forEach( (formStep)=> {
  function addHide() {
    formStep.classList.add('hide');
  }

  formStep.addEventListener('animationend', () => {
    addHide();
    formSteps[currentStep].classList.remove('hide');
  })
})