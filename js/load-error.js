const showLoadError = (message) => {
  const alert = document.createElement('div');
  alert.classList.add('data-error');
  alert.style.position = 'fixed';
  alert.style.left = 0;
  alert.style.top = 0;
  alert.style.right = 0;
  alert.style.zIndex = 2000;
  alert.style.padding = '12px 16px';
  alert.style.textAlign = 'center';
  alert.style.fontSize = '16px';
  alert.style.backgroundColor = '#d9534f';
  alert.style.color = '#fff';

  alert.textContent = message;
  document.body.append(alert);
  setTimeout(() => alert.remove(), 4000);
};

export { showLoadError };
