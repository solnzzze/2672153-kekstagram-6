const isEscapeKey = (evt) => evt.key === 'Escape';

const showMessage = (templateId, buttonSelector) => {
  const loadError = document.querySelector('.data-error');
  if (loadError) {
    loadError.remove();
  }
  const template = document.querySelector(templateId);

  const messageElement = template.content.firstElementChild.cloneNode(true);
  const innerElement = messageElement.querySelector('div');

  let onDocumentKeydown;
  let onDocumentClick;

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
    onDocumentKeydown = null;
    onDocumentClick = null;
  };

  onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  onDocumentClick = (evt) => {
    if (!innerElement.contains(evt.target)) {
      closeMessage();
    }
  };

  const onButtonClick = () => closeMessage();

  messageElement.querySelector(buttonSelector).addEventListener('click', onButtonClick);

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(messageElement);
};

const showSuccessMessage = () => showMessage('#success', '.success__button');
const showErrorMessage = () => showMessage('#error', '.error__button');

export { showSuccessMessage, showErrorMessage };
