import { getCloudinaryUrl } from "../api";

const getPhotoUrl = (id) =>
	getCloudinaryUrl(id, {
		crop: "fill",
		width: 230,
		dpr: 2,
	});

const processPhotos = (photos) =>
	photos.map((p) => ({
		selected: false,
		url: getPhotoUrl(p.public_id),//p.secure_url,
		id: p.public_id,
		transformationName: null,
		exposedUrl: null,
	}));

const findPhoto = (state, id) =>
	state.photos
		.find((p) => p.id === id);

const getPhotoIndex = (state, id) =>
	state.photos.findIndex((p)=> p.id === id);

export {
	getPhotoUrl,
	processPhotos,
	findPhoto,
	getPhotoIndex,
};