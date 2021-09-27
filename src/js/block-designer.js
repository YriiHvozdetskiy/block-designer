import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  imageInput: document.querySelector('.image-input'),
  fromBtn: document.querySelector('.from-btn'),
  form: document.querySelector('.form-designer'),
  boxForBloks: document.querySelector('.box'),
  heading: document.querySelector('.heading'),
  link: document.querySelector('.link'),
  text: document.querySelector('.text'),
  boxList: document.querySelector('.box-list'),
  loader: document.querySelector('.loading-2--full-height'),
  imgWrapper: document.querySelector('.image-wrapper'),
  imageDisplay: document.querySelector('.image-display'),
  loadMore: document.querySelector('.load-more'),
};

const myError = error;

refs.form.addEventListener('click', onForm);
refs.imageInput.addEventListener('change', onImageInput);

function isTextValid(value) {
  const cyrillicPattern = /^[\u0400-\u04FF]+$/;
  return cyrillicPattern.test(value);
}

let uploadedImage = '';

function onImageInput() {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    uploadedImage = reader.result;
    refs.imageDisplay.src = uploadedImage;
  });
  reader.readAsDataURL(this.files[0]);
}

let isValidForm = '';

function formDataCollection() {
  const headingValue = refs.heading.value;
  const textValue = refs.text.value;
  const linkValue = refs.link.value;
  isValidForm = false;

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

  if (refs.boxList.children.length === 10) showLoadMoreBtn();
  if (refs.boxList.children.length > 9) {
    const el = `
  <li class="box-item is-hiden">
     <a href="${linkValue}" class="box-link">
        <div class="container-image">
         <img src="${uploadedImage}" alt="">
        </div>
            <ul class="container-list">
                <li class="container-item">${headingValue}</li>
                 <li class="container-item">${textValue}</li>
             </ul>
     </a>
  </li>
`;
    refs.boxList.insertAdjacentHTML('beforeend', el);
    isValidForm = true;

    return;
  }

  const el = `
  <li class="box-item">
     <a href="${linkValue}" class="box-link">
        <div class="container-image">
         <img src="${uploadedImage}" alt="">
        </div>
            <ul class="container-list">
                <li class="container-item">${headingValue}</li>
                 <li class="container-item">${textValue}</li>
             </ul>
     </a>
  </li>
`;

  refs.boxList.insertAdjacentHTML('beforeend', el);
  isValidForm = true;
}

function onForm(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  refs.loader.classList.add('loading-2');
  formDataCollection();
  if (isValidForm) clearForm();
  refs.loader.classList.remove('loading-2');
}

function showLoadMoreBtn() {
  refs.loadMore.classList.remove('is-hiden');
  refs.loadMore.addEventListener('click', onLoadMore);
}

function onLoadMore() {
  const boxItem = document.querySelectorAll('.box-item.is-hiden');
  for (let i = 0; i < 10; i += 1) {
    boxItem[i].classList.remove('is-hiden');
  }
}

const clearForm = () => {
  refs.heading.value = '';
  refs.link.value = '';
  refs.text.value = '';
  refs.imageDisplay.src = ' ';
};
