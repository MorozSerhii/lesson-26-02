import getTrending from './api-pixabay';
import * as basiclightbox from 'basiclightbox';
import axios from 'axios';

const videoEl = document.querySelector('.video');

async function getVideo() {
  const response = await getTrending();
  const data = response.data.results;
  pushMarkup(data);
}

function pushMarkup(data) {
  let cardVideo = data.reduce(
    (markup, response) => createMarkup(response) + markup,
    ''
  );

  videoEl.insertAdjacentHTML('beforeend', cardVideo);
}

function createMarkup({ original_title, poster_path, id }) {
  return `

<div class='video__card' data-id = '${id}'>
<img src="https://image.tmdb.org/t/p/w300/${poster_path}" alt="${original_title}" >
<h2>${original_title}</h2>
</div>
`;
}

getVideo();

videoEl.addEventListener('click', onGallaryItemClick);

async function onGallaryItemClick(event) {
  event.preventDefault();

  let idVideo = await event.target.closest('.video__card');
  const dataSetAtt = await idVideo.dataset.id;

  const KEYS = '345007f9ab440e5b86cef51be6397df1';
  const videoDaata = await axios(
    `https:api.themoviedb.org/3/movie/${dataSetAtt}/videos?api_key=${KEYS}`
  );
  const results = videoDaata.data.results;
  const traler = results.find(
    option => option.type === 'Trailer' && option.site === 'YouTube'
  );

  if (traler) {
    const videoBox = basiclightbox.create(
      `
        <iframe src="https://www.youtube.com/embed/${traler.key}"></iframe>
        
	`
    );

    videoBox.show();
  }
}
