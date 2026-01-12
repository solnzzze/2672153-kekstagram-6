const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');

const setScale = (value) => {
  scaleControlValue.value = `${value}%`;              // запись в readonly поле формы
  imagePreview.style.transform = `scale(${value / 100})`; // визуальный масштаб
};

const getScale = () => parseInt(scaleControlValue.value, 10);

const onSmallerClick = () => {
  const newValue = Math.max(SCALE_MIN, getScale() - SCALE_STEP);
  setScale(newValue);
};

const onBiggerClick = () => {
  const newValue = Math.min(SCALE_MAX, getScale() + SCALE_STEP);
  setScale(newValue);
};

const initImageScale = () => {
  setScale(SCALE_DEFAULT);

  buttonSmaller.addEventListener('click', onSmallerClick);
  buttonBigger.addEventListener('click', onBiggerClick);
};

const resetImageScale = () => {

  setScale(SCALE_DEFAULT);

  buttonSmaller.removeEventListener('click', onSmallerClick);
  buttonBigger.removeEventListener('click', onBiggerClick);
};

export { initImageScale, resetImageScale };
