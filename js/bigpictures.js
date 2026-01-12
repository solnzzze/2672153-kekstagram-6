const bigPicture = document.querySelector('.big-picture');
const body = document.body;

const imgElement = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');

const commentsCounterBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const COMMENTS_PER_PORTION = 5;
const COMMENT_AVATAR_SIZE = 35;

let allComments = [];
let renderedCount = 0;

const createComment = ({ avatar, name, message }) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = COMMENT_AVATAR_SIZE;
  img.height = COMMENT_AVATAR_SIZE;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;

  li.append(img, p);
  return li;
};

const updateCounter = () => {
  let shownCountElement = commentsCounterBlock.querySelector('.social__comment-shown-count');
  let totalCountElement = commentsCounterBlock.querySelector('.social__comment-total-count');

  if (!shownCountElement || !totalCountElement) {
    commentsCounterBlock.textContent = '';

    shownCountElement = document.createElement('span');
    shownCountElement.classList.add('social__comment-shown-count');

    totalCountElement = document.createElement('span');
    totalCountElement.classList.add('social__comment-total-count');

    commentsCounterBlock.append(
      shownCountElement,
      document.createTextNode(' из '),
      totalCountElement,
      document.createTextNode(' комментариев')
    );
  }

  shownCountElement.textContent = renderedCount;
  totalCountElement.textContent = allComments.length;
};

const renderNextComments = () => {
  const nextChunk = allComments.slice(renderedCount, renderedCount + COMMENTS_PER_PORTION);

  nextChunk.forEach((comment) => {
    commentsList.append(createComment(comment));
  });

  renderedCount += nextChunk.length;

  updateCounter();

  if (renderedCount >= allComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onEscKey = (evt) => {
  if (evt.key === 'Escape') {
    hideBigPicture();
    document.removeEventListener('keydown', onEscKey);
  }
};

const openBigPicture = (photo) => {
  imgElement.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  caption.textContent = photo.description;

  allComments = photo.comments;
  renderedCount = 0;

  commentsList.innerHTML = '';

  commentsCounterBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  renderNextComments();

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKey);
};

const closeBigPicture = () => {
  hideBigPicture();
  document.removeEventListener('keydown', onEscKey);
};

const onCommentsLoaderClick = () => {
  renderNextComments();
};

commentsLoader.addEventListener('click', onCommentsLoaderClick);
closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture, closeBigPicture };
