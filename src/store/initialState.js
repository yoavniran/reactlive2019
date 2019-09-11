import { FETCH_STATUSES } from "../consts";

export default {
	photosFetchStatus: FETCH_STATUSES.NONE,

	photos: [],
	nextCursor: null,

	tagsFilter: [],

	exposedPhotoId: null,
	highlightedPhotoId: null,

	transformations: {}
};