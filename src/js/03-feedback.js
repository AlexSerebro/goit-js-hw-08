import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const localObj = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateTextArea();

function onFormSubmit(event) {
  event.preventDefault();
  console.log('отправка формы');
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  // console.log(localObj);
}

function onFormInput(event) {
  localObj[event.target.name] = event.target.value;
  // console.log('~ message', localObj);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localObj));
}

function populateTextArea() {
  const saveMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saveMessage) {
    refs.email.value = saveMessage.email;
    refs.textarea.value = saveMessage.message;
  }
}
