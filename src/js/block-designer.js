import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  fromBtn: document.querySelector('.from-btn'),
  form: document.querySelector('.form-designer'),
  boxForBloks: document.querySelector('.box'),
  heading: document.querySelector('.heading'),
  link: document.querySelector('.link'),
  text: document.querySelector('.text'),
  boxList: document.querySelector('.box-list'),
  loader: document.querySelector('.loading-2--full-height'),
};

const myError = error;

refs.form.addEventListener('click', onForm);

function isTextValid(value) {
  const cyrillicPattern = /^[\u0400-\u04FF]+$/;
  return cyrillicPattern.test(value);
}

function formDataCollection() {
  const headingValue = refs.heading.value;
  const textValue = refs.text.value;
  const linkValue = refs.link.value;

  if (headingValue === '')
    return myError({ text: 'Ведені не всі дані. Поле заговолок пусте', delay: 3500 });

  if (linkValue === '')
    return myError({ text: 'Ведені не всі дані. Поле силка пусте', delay: 3500 });

  if (textValue === '')
    return myError({ text: 'Ведені не всі дані. Поле текст пусте', delay: 3500 });

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
        <div class="container-image">
         <img src="" alt="">
        </div>
            <ul class="container-list">
                <li class="container-item">${headingValue}</li>
                 <li class="container-item">${textValue}</li>
             </ul>
     </a>
  </li>
`;

  refs.boxList.insertAdjacentHTML('beforeend', el);

  if (refs.boxList.children.length > 10 && refs.boxList.children.length < 12) {
    showLoadMoreBtn();
  }
}

function onForm(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  refs.loader.classList.add('loading-2');
  // if (!formDataCollection()) e.currentTarget.reset();
  formDataCollection();
  refs.loader.classList.remove('loading-2');
}

function showLoadMoreBtn() {
  refs.loadMore.classList.remove('is-hiden');
}
