let regex = /\/[^\s,]+\.jpeg/g;
let filenames = [];

const ORIGINAL_IMAGES_DIR = '../assets/photos/original';
const PROCESSED_IMAGES_DIR = '../assets/photos/processed';

const originalPhotosContainer = document.getElementById(
	'original-photos-container'
);
const processedPhotosContainer = document.getElementById(
	'processed-photos-container'
);
const photosContainer = originalPhotosContainer || processedPhotosContainer;

let isOriginal = false;
if (originalPhotosContainer) {
	isOriginal = true;
}

const ACTIVE_IMAGES_DIR = isOriginal
	? ORIGINAL_IMAGES_DIR
	: PROCESSED_IMAGES_DIR;

function fetchImages() {
	fetch(ACTIVE_IMAGES_DIR)
		.then((res) => res.text())
		.then((textPage) => {
			filenames = textPage.match(regex);

			for (let filename of filenames) {
				const image = document.createElement('img');
				image.setAttribute('src', filename);
				image.setAttribute('alt', 'Фотография');

				const link = document.createElement('a');
				link.setAttribute('href', filename);

				link.append(image);
				photosContainer.append(link);
			}
		})
		.catch((err) => console.warn('ERROR:', err));
}

fetchImages();
