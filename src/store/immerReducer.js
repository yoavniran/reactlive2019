import createReducer from "../common/immerReducerBase";
import { TYPES } from "../consts";
import initialState from "./initialState";

const processPhotos = (photos) =>
	photos.map((p) => ({
		selected: false,
		url: p.secure_url,
		id: p.public_id,
		transformationName: null,
	}));

export default createReducer(initialState, {
	[TYPES.SET_PHOTOS]: (draft, { payload }) => {
		draft.photos = draft.photos.concat(processPhotos(payload.photos));
		draft.nextCursor = payload.nextCursor;
	},

	[TYPES.SET_SELECTED_PHOTO]: (draft, { payload }) => {
		const photo = draft.photos.find((p) => p.id === payload.id);

		if (photo) {
			photo.selected = payload.selected;
		}
	},

	[TYPES.SET_EXPOSED_PHOTO]: (draft, { payload }) => {
		draft.exposedPhotoId = payload.id;
	},

	[TYPES.REMOVE_PHOTO]: (draft, { payload }) => {
		draft.photos = draft.photos.filter((p) => p.id !== payload.id);
	},

	[TYPES.SET_PHOTO_TRANSFORMATION_URL]: (draft, { payload }) => {
		const photo = draft.photos.find((p) => p.id === payload.photoId);

		if (photo) {
			photo.url = payload.url;
			photo.transformationName = payload.name;
		}
	},

	[TYPES.SET_PHOTO_TRANSFORMATIONS]: (draft, {payload}) => {
		draft.transformations[payload.id] = payload.urls;
	},
});