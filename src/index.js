import './css/styles.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries';
import { renderMarkup, clearMarkup } from './js/markupService';

const DEBOUNCE_DELAY = 300;

const refs = {
  listEl: document.querySelector('.country-list'),
  cardEl: document.querySelector('.country-info'),
  inputEl: document.querySelector('#search-box'),
};

refs.inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  const value = event.target.value.trim().toLowerCase();
  clearMarkup(refs);
  if (!value) {
    return;
  }
  fetchCountries(value).then(onSuccess).catch(onError);
}

function onSuccess(data) {
  if (data.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  renderMarkup(data, refs);
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
