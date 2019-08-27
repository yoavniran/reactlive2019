import createActionCreators, {createCustomCreator} from "../common/actionsBase";
import {TYPES, FETCH_STATUSES} from "../consts";
import {makeRequest} from "../api";

// const schedulePriceFetch = (getState, dispatcher) => {
// 	setTimeout(() => {
// 		fetchPrices(getState, dispatcher);
// 	}, 5000);
// };

// const fetchPrices = async (getState, dispatcher) => {
// 	const photos = getState().photos;
//
// 	if (photos.length) {
// 		dispatcher(TYPES.SET_FETCH_STATUS, {status: FETCH_STATUSES.PROGRESS});
//
// 		const response = await makeRequest("prices", "POST", {
// 			photos: photos.map((p) => ({id: p.public_id, price: p.price}))
// 		});
//
// 		dispatcher(TYPES.SET_FETCH_STATUS, {status: FETCH_STATUSES.NONE});
//
// 		if (!response.error) {
// 			dispatcher(TYPES.SET_PHOTOS_PRICES, response);
// 		}
//
// 		schedulePriceFetch(getState, dispatcher);
// 	}
// };

const fetchPhotos = async (getState, dispatcher, cursor = null) => {

	dispatcher(TYPES.SET_FETCH_STATUS, {status: FETCH_STATUSES.PROGRESS});
	const response = await makeRequest(`photos${cursor ? `?cursor=${cursor}` : "" }`);

	if (!response.error) {
		dispatcher(TYPES.SET_PHOTOS, {
			photos: response.photos,
			nextCursor: response.meta.next,
		});

		dispatcher(TYPES.SET_FETCH_STATUS, {status: FETCH_STATUSES.NONE});

		if (response.meta.next) { //fetches everything instead of waiting for paging/scrolling
			fetchPhotos(getState, dispatcher, response.meta.next);
		}
	}
	else {
		dispatcher(TYPES.SET_FETCH_STATUS, {status: FETCH_STATUSES.FAILED});
	}
};

export default createActionCreators(TYPES, {
	[TYPES.FETCH_PHOTOS]: createCustomCreator(
		(getState, dispatcher) =>
			fetchPhotos(getState, dispatcher)),
});