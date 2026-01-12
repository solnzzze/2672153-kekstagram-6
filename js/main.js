import { renderPictures } from './miniatures.js';
import { loadPictures } from './api.js';
import { showLoadError } from './load-error.js';
import { initFilters } from './filters.js';

import './upload-form.js';
import './upload-preview.js';

const init = async () => {
  try {
    const photos = await loadPictures();

    renderPictures(photos);

    initFilters(photos, renderPictures);
  } catch (err) {
    showLoadError('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
  }
};

init();
