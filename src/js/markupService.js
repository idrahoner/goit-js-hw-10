function renderMarkup(array, { listEl, cardEl }) {
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

function clearMarkup({ listEl, cardEl }) {
  listEl.innerHTML = '';
  cardEl.innerHTML = '';
}

export { renderMarkup, clearMarkup };
