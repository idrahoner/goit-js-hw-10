import './css/styles.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const listEl = document.querySelector('.country-list');
const cardEl = document.querySelector('.country-info');
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  const value = event.target.value.trim().toLowerCase();
  if (!value) {
    return clearMarkup();
  }
  clearMarkup();
  fetchCountries(value);
}

function fetchCountries(country) {
  fetch(
    `https://restcountries.com/v2/name/${country}?fields=name,capital,population,flags,languages`
  )
    .then(responce => {
      if (!responce.ok) {
        throw new Error(responce.status);
      }
      return responce.json();
    })
    .then(data => {
      if (data.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      renderMarkup(data);
    })
    .catch(onError);
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function renderMarkup(array) {
  if (array.length > 1) {
    listEl.innerHTML = renderList(array);
  } else {
    cardEl.innerHTML = renderCard(array[0]);
  }
}

function renderList(array) {
  return array
    .map(({ name, flags: { svg: flag } }) => {
      return `
        <li class="country-list__item">
            <img src="${flag}" alt="Flag of ${name}" class="country-list__image" width="20" height="20" />
            <p>${name}</p>
        </li>
        `;
    })
    .join('');
}

function renderCard(object) {
  const {
    name,
    flags: { svg: flag },
    capital,
    population,
    languages,
  } = object;
  return `
        <div class="country-info__title">
          <img src="${flag}" alt="Flag of ${name}" class="country-info__image" width="20" height="20" />
          <h2>${name}</h2>
        </div>
        <ul class="counry-info__list">
            <li class="country-info__list-item">
                <p><b>Capital:</b> ${capital}</p>
            </li>
            <li class="country-info__list-item">
                <p><b>Population:</b> ${population}</p>
            </li>
            <li class="country-info__list-item">
                <p><b>Languages:</b> ${languages
                  .map(lang => lang.name)
                  .join(', ')}</p>
            </li>
        </ul>
    `;
}

function clearMarkup() {
  listEl.innerHTML = '';
  cardEl.innerHTML = '';
}
