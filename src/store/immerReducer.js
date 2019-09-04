import createReducer from "../common/immerReducerBase";
import { TYPES } from "../consts";
import initialState from "./initialState";
import { getCloudinaryUrl } from "../api";
import {findPhoto, processPhotos} from "./shared"

export default createReducer(initialState, {
	[TYPES.SET_PHOTOS]: (draft, { payload }) => {
		draft.photos = draft.photos.concat(processPhotos(payload.photos));
		draft.nextCursor = payload.nextCursor;
	},

	[TYPES.SET_SELECTED_PHOTO]: (draft, { payload }) => {
		const photo = findPhoto(draft, payload.id);

		if (photo) {
			photo.selected = payload.selected;
		}
	},

	[TYPES.SET_EXPOSED_PHOTO]: (draft, { payload }) => {
		draft.exposedPhotoId = payload.id;

		if (payload.id) {
			const photo = findPhoto(draft, payload.id);

			photo.exposedUrl = getCloudinaryUrl(payload.id, {
				crop: "limit",
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
	},

	[TYPES.REMOVE_PHOTO]: (draft, { payload }) => {
		draft.photos = draft.photos.filter((p) => p.id !== payload.id);
	},

	[TYPES.SET_PHOTO_TRANSFORMATION_URL]: (draft, { payload }) => {
		const photo = draft.photos.find((p) => p.id === payload.photoId);

		if (photo) {
			photo.exposedUrl = payload.url;
			photo.transformationName = payload.name;
		}
	},

	[TYPES.SET_PHOTO_TRANSFORMATIONS]: (draft, { payload }) => {
		draft.transformations[payload.id] = payload.urls;
	},
});