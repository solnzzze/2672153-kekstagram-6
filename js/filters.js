import { debounce } from './utils.js';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

// Количество случайных фотографий при фильтре "Случайные" --- IGNORE ---
const RANDOM_COUNT = 10;
const RERENDER_DELAY = 500;

const filtersBlock = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

// Устанавливает активную кнопку фильтра --- IGNORE ---
const setActiveButton = (buttonId) => {
  filtersForm.querySelectorAll('.img-filters__button').forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  const active = document.querySelector(`#${buttonId}`);
  if (active) {
    active.classList.add('img-filters__button--active');
  }
};

const getRandomUnique = (photos, count) => {
  const shuffled = photos.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

const getFilteredPhotos = (filterId, photos) => {
  switch (filterId) {
    case Filter.RANDOM:
      return getRandomUnique(photos, RANDOM_COUNT);

    case Filter.DISCUSSED:
      return photos
        .slice()
        .sort((a, b) => b.comments.length - a.comments.length);

    case Filter.DEFAULT:
    default:
      return photos;
  }
};

const initFilters = (photos, onFilterChange) => {
  filtersBlock.classList.remove('img-filters--inactive');

  const debouncedRender = debounce((filterId) => {
    onFilterChange(getFilteredPhotos(filterId, photos));
  }, RERENDER_DELAY);

  const onFiltersFormClick = (evt) => {
    const button = evt.target.closest('.img-filters__button');
    if (!button) {
      return;
    }

    const filterId = button.id;
    setActiveButton(filterId);
    debouncedRender(filterId);
  };

  filtersForm.addEventListener('click', onFiltersFormClick);
};

export { initFilters };
