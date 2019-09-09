
import createActionCreators, {createCustomCreator} from "../common/actionsBase";
import {TYPES, FETCH_STATUSES} from "../consts";
import {makeRequest} from "../api";
//imptrace


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
			// fetchPhotos(getState, dispatcher, response.meta.next);
		}
	}
	else {
		dispatcher(TYPES.SET_FETCH_STATUS, {status: FETCH_STATUSES.FAILED});
	}
};

const fetchTransformations =  async(data, getState, dispatcher) => {
	const response = await makeRequest(`transformations?id=${data.id}`);

	if (!response.error){
		dispatcher(TYPES.SET_PHOTO_TRANSFORMATIONS, {id: data.id, urls: response.urls});
	}
};

const actions = createActionCreators(TYPES, {
	[TYPES.FETCH_PHOTOS]:
		createCustomCreator(fetchPhotos),

	[TYPES.FETCH_PHOTO_TRANSFORMATIONS]:
		createCustomCreator(fetchTransformations),
});

//intdisp


export default actions;