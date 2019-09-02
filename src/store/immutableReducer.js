import Immutable from "seamless-immutable";
import createReducer from "../common/immutableReducerBase";
import initialState from "./initialState";


// const getPhotoIndex = (photos, id) =>
// 	photos
// 		.findIndex((p) => p.public_id === id);
//
// const setExposedPhoto = (state, photo) =>
// 	state.set("exposedPhoto", photo);

// const updateExposedPhotoToFirstSelected = (state) =>
// 	setExposedPhoto(state, state.photos.find((p) => p.selected));



export default createReducer(Immutable(initialState), {
//
// 	[TYPES.SET_PHOTOS]: (state, {payload}) =>
// 		state.merge({
// 			"photos": state.photos.concat(payload.photos),
// 			"nextCursor": payload.nextCursor,
// 		}),
//
// 	[TYPES.SET_SELECTED_PHOTO]: (state, {payload}) => {
// 		const index = getPhotoIndex(state.photos, payload.id);
//
// 		state = state.setIn(["photos", index, "selected"], payload.selected);
//
// 		if (payload.selected) {
// 			state = setExposedPhoto(state, state.photos[index]);
// 		}
// 		else if (state.exposedPhoto.public_id === payload.id) {
// 			state = updateExposedPhotoToFirstSelected(state);
// 		}
//
// 		return state;
// 	},
//
// 	[TYPES.CLEAR_PHOTOS]: (state) =>
// 		state.set("photos", []),
//
// 	[TYPES.TOGGLE_VIEW_STATE]: (state) =>
// 		state.set("viewState",
// 			(state.viewState === VIEW_STATES.EXPANDED ?
// 				VIEW_STATES.MINIFIED :
// 				VIEW_STATES.EXPANDED)),
//
// 	[TYPES.SET_FETCH_STATUS]: (state, {payload}) =>
// 		state.set("photosFetchStatus", payload.status),
//
// 	[TYPES.SET_EXPOSED_PHOTO]: (state, {payload}) =>
// 		setExposedPhoto(state,
// 			state.photos[getPhotoIndex(state.photos, payload.id)]),
//
// 	[TYPES.REMOVE_PHOTO]: (state, {payload}) => {
// 		const index = getPhotoIndex(state.photos, payload.id);
//
// 		state = state.set("photos",
// 			state.photos.slice(0, index)
// 				.concat(state.photos.slice((index + 1))));
//
// 		if (state.exposedPhoto.public_id === payload.id) {
// 			state = updateExposedPhotoToFirstSelected(state);
// 		}
//
// 		return state;
// 	},
//
// 	[TYPES.SET_PHOTOS_PRICES]: (state, {payload}) => {
// 		const photos = state.photos,
// 			newPhotos = [];
//
// 		payload.prices.forEach((price) => {
// 			const index = getPhotoIndex(photos, price.id);
//
// 			if (~index) {
// 				newPhotos.push({
// 					...photos[index],
// 					price: price.price, //todo: separate prices to different state prop
// 				});
// 			}
// 		});
//
// 		return state.set("photos", newPhotos);
// 	},
//
// 	[TYPES.TOGGLE_BIG_PERF_INDICATOR]: (state) =>
// 		state.set("bigPerfIndicator", !state.bigPerfIndicator),
});
