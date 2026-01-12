const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const loadPictures = async () => {
  const response = await fetch(`${BASE_URL}${Route.GET_DATA}`);

  if (!response.ok) {
    throw new Error(`Load error: ${response.status}`);
  }

  return response.json();
};

const sendPicture = async (formData) => {
  const response = await fetch(`${BASE_URL}${Route.SEND_DATA}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Send error: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (err) {
    return null;
  }
};

export { loadPictures, sendPicture };
