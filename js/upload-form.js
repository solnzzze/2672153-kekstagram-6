import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { initImageScale, resetImageScale } from './shapes.js';
import { initEffects, resetEffects } from './effects.js';
import { resetPreview } from './upload-preview.js';

const { Pristine } = window;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const fileInput = document.querySelector('#upload-file');
const submitButton = document.querySelector('#upload-submit');

const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const normalizeHashtags = (value) =>
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean);

const validateHashtagFormat = (value) => {
  const tags = normalizeHashtags(value);
  return tags.every((tag) => HASHTAG_REGEX.test(tag));
};

const validateHashtagCount = (value) => {
  const tags = normalizeHashtags(value);
  return tags.length <= MAX_HASHTAGS;
};

const validateHashtagUnique = (value) => {
  const tags = normalizeHashtags(value).map((t) => t.toLowerCase());
  return new Set(tags).size === tags.length;
};

const validateDescriptionLength = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__error',
});

pristine.addValidator(
  hashtagInput,
  validateHashtagFormat,
  'Неверный формат хэш-тега'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagCount,
  'Нельзя указывать больше пяти хэш-тегов'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagUnique,
  'Хэш-теги не должны повторяться'
);

pristine.addValidator(
  descriptionInput,
  validateDescriptionLength,
  `Описание не должно превышать ${MAX_DESCRIPTION_LENGTH} символов`
);

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const resetFormToDefault = () => {
  form.reset();
  fileInput.value = '';

  resetPreview();
  resetImageScale();
  resetEffects();
  pristine.reset();
};

const blockSubmit = () => {
  submitButton.disabled = true;
};

const unblockSubmit = () => {
  submitButton.disabled = false;
};

const onDocumentKeydown = (evt) => {
  if (document.querySelector('.error') || document.querySelector('.success')) {
    return;
  }
  if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
    return;
  }
  if (evt.key === 'Escape' && !overlay.classList.contains('hidden')) {
    evt.preventDefault();
    document.removeEventListener('keydown', onDocumentKeydown);
    closeForm();
    resetFormToDefault();
  }
};

const openForm = () => {
  pristine.reset();
  form.querySelectorAll('.pristine-error').forEach((item) => item.remove());
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  initImageScale();
  initEffects();
  document.addEventListener('keydown', onDocumentKeydown);
};

const onFileInputChange = () => {
  openForm();
};

const onCancelButtonClick = (evt) => {
  evt.preventDefault();
  document.removeEventListener('keydown', onDocumentKeydown);
  closeForm();
  resetFormToDefault();
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  try {
    blockSubmit();
    const formData = new FormData(form);
    const file = fileInput.files[0];
    if (file) {
      formData.set('filename', file);
    }
    await sendPicture(formData);
    document.removeEventListener('keydown', onDocumentKeydown);
    closeForm();
    resetFormToDefault();
    showSuccessMessage();
  } catch (err) {
    showErrorMessage();
  } finally {
    unblockSubmit();
  }
};

fileInput.addEventListener('change', onFileInputChange);

cancelButton.addEventListener('click', onCancelButtonClick);

form.addEventListener('submit', onFormSubmit);
