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
  const cyrillicPattern = /^[\u0400-\u04FF\s]+$/;
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
  const headingValue = refs.heading.value.trim();
  const textValue = refs.text.value.trim();
  const linkValue = refs.link.value;
  isValidForm = false;

  if (isEmptyInput(headingValue, linkValue, textValue)) return;
  if (isValidInput(headingValue, textValue)) return;

  let boxListArrLength = refs.boxList.children.length;

  if (boxListArrLength === 10) showLoadMoreBtn();
  if (isClassHidden(boxListArrLength, headingValue, linkValue, textValue)) return;
}

function isClassHidden(length, title, link, text) {
  if (length > 9) {
    const el = `
  <li class="box-item is-hiden">
     <a href="${link}" class="box-link">
        <div class="container-image">
         <img src="${uploadedImage}" alt="">
        </div>
            <ul class="container-list">
                <li class="container-item">${title}</li>
                 <li class="container-item">${text}</li>
             </ul>
     </a>
  </li>
`;
    refs.boxList.insertAdjacentHTML('beforeend', el);
    isValidForm = true;

    return;
  } else {
    const el = `
  <li class="box-item">
     <a href="${link}" class="box-link">
        <div class="container-image">
         <img src="${uploadedImage}" alt="">
        </div>
            <ul class="container-list">
                <li class="container-item">${title}</li>
                 <li class="container-item">${text}</li>
             </ul>
     </a>
  </li>
`;

    refs.boxList.insertAdjacentHTML('beforeend', el);
    isValidForm = true;
  }
}

function isEmptyInput(title, link, text) {
  if (title === '') {
    return myError({ text: '???????????? ???? ?????? ????????. ???????? ?????????????????? ??????????', delay: 3500 });
  } else if (link === '') {
    return myError({ text: '???????????? ???? ?????? ????????. ???????? ?????????? ??????????', delay: 3500 });
  } else if (text === '') {
    return myError({ text: '???????????? ???? ?????? ????????. ???????? ?????????? ??????????', delay: 3500 });
  } else {
    false;
  }
}

function isValidInput(title, text) {
  if (!isTextValid(title)) {
    return myError({
      text: '?? ?????????????????? ???????????????????????????? ???????? ????????????????',
      delay: 3500,
    });
  } else if (!isTextValid(text)) {
    return myError({
      text: '?? ???????????? ???????????????????????????? ???????? ????????????????',
      delay: 3500,
    });
  } else {
    false;
  }
}

function onForm(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  refs.loader.classList.add('loading-2');
  formDataCollection();
  if (isValidForm) clearForm();
  refs.loader.classList.remove('loading-2');

  const boxItem = document.querySelectorAll('.box-item.is-hiden');
  if (boxItem.length > 0) refs.loadMore?.classList.remove('is-hiden');
}

function showLoadMoreBtn() {
  refs.loadMore.classList.remove('is-hiden');
  refs.loadMore.addEventListener('click', onLoadMore);
}

function onLoadMore() {
  const boxItem = document.querySelectorAll('.box-item.is-hiden');
  for (let i = 0; i < 10; i += 1) {
    boxItem[i]?.classList.remove('is-hiden');
  }
  if (boxItem.length <= 10) refs.loadMore.classList.add('is-hiden');
}

const clearForm = () => {
  refs.heading.value = '';
  refs.link.value = '';
  refs.text.value = '';
  refs.imageDisplay.src = ' ';
  const data = refs.form[0];
  data.value = null;
};
