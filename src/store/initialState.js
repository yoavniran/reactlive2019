import { FETCH_STATUSES } from "../consts";

export default {
	// viewState: VIEW_STATES.EXPANDED,
	photosFetchStatus: FETCH_STATUSES.NONE,

	photos: [],
	nextCursor: null,

	tagsFilter: [],

	exposedPhotoId: null,

	transformations: {}
	// bigPerfIndicator: false,
};