const Base_url = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_h6aHZSfGRJHcGyi857WpxR6p0oogo9lXAtwQjUcfIHzBe1EqwHUjwegy6HgRkUkl';
const pointCats = {
  breeds: 'breeds',
  imageCat: 'images/search',
};

export function fetchBreeds() {
  return fetch(`${Base_url}${pointCats.breeds}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${Base_url}${pointCats.imageCat}?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}
