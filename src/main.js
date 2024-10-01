import '../styles/modern.css';
import '../styles/style.css';
import '../styles/components/sign-up-page.css';
import '../styles/components/success-box.css';
import '../styles/util.css';

// get elements
const signUpBox = document.querySelector('.sign-up-box');
const successBox = document.querySelector('.success-main-box');
const emaiInput = document.getElementById('email-input');
const submitButton = document.querySelector('.subscribe-button');
const dismissButton = document.getElementById('dismiss-button');
const userEmailDisplay = document.getElementById('user-email');
const invalidEmailText = document.querySelector('.email-valid-text');
const inputBox = document.querySelector('.input');
// create elements

const validCharacters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._-';

// functions

function updateUi() {
  invalidEmailText.style.display = 'block';
  inputBox.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
  inputBox.style.border = '1px solid red';
}

function validEmail() {
  const userEmail = emaiInput.value;

  userEmailDisplay.innerText = userEmail;

  const [localPart, domainPart] = userEmail.split('@');

  if (userEmail.includes('@')) {
    const atSymbolCount = userEmail.split('@').length - 1;

    if (atSymbolCount === 1) {
    } else {
      console.log('invalid email');
      updateUi();
    }
  } else {
    updateUi();
  }

  if (!localPart || !domainPart) {
    return updateUi();
  }

  for (let i = 0; i < localPart.length; i++) {
    const char = localPart[i];

    if (!validCharacters.includes(char)) {
      return updateUi();
    }
  }

  if (!isValidDomain(domainPart)) {
    return updateUi();
  }

  successBox.style.display = 'block';
  signUpBox.style.display = 'none';
}

function isValidDomain(domain) {
  if (!domain.includes('.')) {
    return false;
  }

  const domainParts = domain.split('.');

  for (const part of domainParts) {
    if (part.length < 1) {
      return false;
    }

    for (let i = 0; i < part.length; i++) {
      const char = part[i];
      if (!validCharacters.includes(char)) {
        return false;
      }
    }
    if (part.startsWith('-') || part.endsWith('-')) {
      return false;
    }
  }
  return true;
}

function dismissSuccessBox() {
  successBox.style.display = 'none';
  signUpBox.style.display = 'block';
  emaiInput.value = '';
  invalidEmailText.style.display = 'none';
  inputBox.style.backgroundColor = 'white';
  inputBox.style.border = '1px solid hsl(231, 7%, 60%)';
}

// event listeners

submitButton.addEventListener('click', validEmail);
dismissButton.addEventListener('click', dismissSuccessBox);
