import { getCloudinaryUrl } from "../api";
import {ENABLE_PROFILER} from "../common/utils";

const getGridPhotoUrl = (id) =>
	getCloudinaryUrl(id, {
		crop: "fill",
		width: ENABLE_PROFILER ? 120 : 230,
		dpr: 2,
		quality: "auto",
		fetchFormat: "auto",
	});

const processPhotos = (photos) =>
	photos.map((p) => ({
		highlighted: false,
		url: getGridPhotoUrl(p.public_id),
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
	getGridPhotoUrl,
	processPhotos,
	findPhoto,
	getPhotoIndex,
};