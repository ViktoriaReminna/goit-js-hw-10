import { fetchBreeds, fetchCatByBreed } from './cat-api';

import getRefs from './get-refs';

import '../css/style.css';

import Notiflix from 'notiflix';

import SlimSelect from 'slim-select';

import 'slim-select/dist/slimselect.css';

const refs = getRefs();
refs.breedSelect.setAttribute('id', 'single');
refs.loader.textContent = '';
refs.error.classList.add('is-inactive');
refs.breedSelect.classList.add('is-inactive');

Notiflix.Notify.init({
  position: 'center-top',
  distance: '45px',
  timeout: 2500,
  cssAnimationStyle: 'zoom',
  fontFamily: 'Arial, sans-serif',
});

fetchBreeds()
  .then(breeds => markupSelectBreeds(breeds))
  .catch(() => {
    refs.loader.classList.add('is-inactive');
    Notiflix.Notify.failure(errorMassage.textContent);
  });

const markupSelectBreeds = breeds => {
  refs.breedSelect.classList.remove('is-inactive');
  refs.loader.classList.add('is-inactive');
  const markup = breeds
    .map((breed, idx) => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  refs.breedSelect.innerHTML = markup;
  new SlimSelect({
    select: '#single',
  });
};

const markupCatInfo = arrCats => {
  if (arrCats.length === 0) {
    refs.catInfo.classList.add('is-inactive');
    return Notiflix.Notify.warning(
      `Sorry, nothing was found for the breed. You may be interested in other cat breeds.`
    );
  }
  const catInfoShow = arrCats
    .map(({ url, breeds }) => {
      const { name, description, temperament } = breeds[0];

      return `
        <img src="${url}" alt="${name}" class=""/>
      <div class="about-cat">
        <h2>${name}</h2>
        <p class="description">${description}</p>
        <p class="temperament"><b>Temperament: </b>${temperament}</p>
      </div>`;
    })
    .join('');
  refs.catInfo.innerHTML = catInfoShow;
};

const onSelectCat = e => {
  const idCat = e.currentTarget.value;
  refs.loader.classList.remove('is-inactive');
  refs.catInfo.classList.add('is-inactive');

  fetchCatByBreed(idCat)
    .then(data => {
      refs.catInfo.classList.remove('is-inactive');
      setTimeout(() => {
        refs.loader.classList.add('is-inactive');
        markupCatInfo(data);
      }, 0);
    })
    .catch(() => {
      refs.loader.classList.add('is-inactive');
      Notiflix.Notify.failure(errorMassage.textContent);
    });
};

refs.breedSelect.addEventListener('change', onSelectCat);
