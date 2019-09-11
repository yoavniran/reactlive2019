import Immutable from "seamless-immutable";
import createReducer from "../common/immutableReducerBase";
import initialState from "./initialState";
import { processPhotos, getPhotoIndex } from "./shared"
import { TYPES } from "../consts";
import { getCloudinaryUrl } from "../api";

export default createReducer(Immutable(initialState), {

	[TYPES.SET_PHOTOS]: (state, { payload }) =>
		state.merge({
			photos: state.photos
				.concat(processPhotos(payload.photos)),
			nextCursor: payload.nextCursor,
		}),

	[TYPES.SET_HIGHLIGHTED_PHOTO]: (state, { payload }) => {
		return state.set("highlightedPhotoId",
			payload.highlighted ? payload.id : null);
	},

	[TYPES.SET_EXPOSED_PHOTO]: (state, { payload }) => {
		state = state.set("exposedPhotoId", payload.id);

		if (payload.id) {
			const index = getPhotoIndex(state, payload.id);

			const url = getCloudinaryUrl(payload.id, {
				crop: "limit",
				width: window.innerWidth,
				height: window.innerHeight,
			});

			state = state.setIn(["photos", index, "exposedUrl"], url);
		}

		return state;
	},

	[TYPES.REMOVE_PHOTO]: (state, { payload }) => {
		const updatedList = state.photos
			.filter((p) => p.id !== payload.id);

		return state.merge({"photos": updatedList});
	},

	[TYPES.SET_PHOTO_TRANSFORMATION_URL]: (state, { payload }) => {
		const index = getPhotoIndex(state, payload.photoId);

		return state.updateIn(["photos", index], (photo) =>
			photo.merge({
				exposedUrl: payload.url,
				transformationName: payload.name,
			}));
	},

	[TYPES.SET_PHOTO_TRANSFORMATIONS]: (state, { payload }) =>
		state.setIn(["transformations", payload.id], payload.urls),
});
