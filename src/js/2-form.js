console.log('Form');

const STORAGE_KEY = 'feedback-form-state';
const formData = {
  email: '',
  message: '',
};
const form = document.querySelector('.feedback-form');
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
}

populateForm();

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value;
    saveToLocalStorage();
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData.email = '';
  formData.message = '';
});
