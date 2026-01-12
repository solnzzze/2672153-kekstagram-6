const fileInput = document.querySelector('#upload-file');

const previewImage = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_IMAGE = 'img/upload-default-image.jpg';

let currentObjectUrl = null;

const setPreview = (file) => {
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ext) => fileName.endsWith(ext));

  if (!matches) {
    return false;
  }

  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
  }

  currentObjectUrl = URL.createObjectURL(file);

  previewImage.src = currentObjectUrl;

  effectPreviews.forEach((item) => {
    item.style.backgroundImage = `url("${currentObjectUrl}")`;
  });

  return true;
};

const resetPreview = () => {
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }

  previewImage.src = DEFAULT_IMAGE;

  effectPreviews.forEach((item) => {
    item.style.backgroundImage = `url("${DEFAULT_IMAGE}")`;
  });
};

const onFileInputChange = () => {
  const file = fileInput.files[0];
  if (!file) {
    return;
  }

  setPreview(file);
};

fileInput.addEventListener('change', onFileInputChange);

export { resetPreview };
