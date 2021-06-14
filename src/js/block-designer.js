import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';

import LoadMoreBtn from './load-more-btn';

const refs = {
  fromBtn: document.querySelector('.from-btn'),
  form: document.querySelector('.form-designer'),
  boxForBloks: document.querySelector('.box'),
  heading: document.querySelector('.heading'),
  link: document.querySelector('.link'),
  text: document.querySelector('.text'),
  loadMore: document.querySelector('.load-more'),
  boxList: document.querySelector('.box-list'),
};

const myError = error;

refs.form.addEventListener('click', onForm);
refs.loadMore.addEventListener('click', onLoadMoreBtn);

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

let counter = 0;

const textLength = {
  isHeadingValidLength(value) {
    if (value.length > 20) {
      return myError({
        text: 'В заголовку максимум 20 символів',
        delay: 3500,
      });
    }
  },
  isTextValidLength(value) {
    if (value.length > 250) {
      return myError({
        text: 'В тексті максимум 250 символів',
        delay: 3500,
      });
    }
  },
};

function isTextValid(value) {
  const cyrillicPattern = /^[\u0400-\u04FF]+$/;
  return cyrillicPattern.test(value);
}

function formDataCollection() {
  const headingValue = refs.heading.value;
  const textValue = refs.text.value;
  const linkValue = refs.link.value;

  if (headingValue === '' || linkValue === '' || textValue === '') {
    return myError({
      text: 'Ведіть всі дані',
      delay: 3500,
    });
  }

  if (!isTextValid(headingValue)) {
    return myError({
      text: 'В заголовку підтримуюється лише кирилиця',
      delay: 3500,
    });
  }

  if (!isTextValid(textValue)) {
    return myError({
      text: 'в тексті підтримуюється лише кирилиця',
      delay: 3500,
    });
  }

  const el = `
  <li class="box-item">
     <a href="${linkValue}" class="box-link">
        <div class="container-image"></div>
            <ul class="container-list">
                <li class="container-item">${headingValue}</li>
                 <li class="container-item">${textValue}</li>
             </ul>
     </a>
  </li>
`;

  refs.boxList.insertAdjacentHTML('beforeend', el);
}

function onForm(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  const headingValue = refs.heading.value;
  const textValue = refs.text.value;

  textLength.isHeadingValidLength(headingValue);
  textLength.isTextValidLength(textValue);

  formDataCollection();

  e.currentTarget.reset();

  loadMoreBtn.show();
  loadMoreBtn.disable();

  counter += 1;

  if (counter > 10) {
    showLoadMoreBtn();
    refs.loadMore.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  loadMoreBtn.hide();
}

function onLoadMoreBtn() {
  const el = `
  <li class="box-item">
     <a href="#" class="box-link">
        <div class="container-image"></div>
            <ul class="container-list">
                <li class="container-item">Заголовок</li>
                <li class="container-item">Текст</li>
            </ul>
     </a>
  </li>`;

  for (let i = 0; i < 10; i++) {
    refs.boxList.insertAdjacentHTML('beforeend', el);
  }

  refs.loadMore.scrollIntoView({ behavior: 'smooth' });
}

function showLoadMoreBtn() {
  loadMoreBtn.hide();
  refs.loadMore.classList.remove('is-hiden');
}
