
import isFunction from "lodash/isFunction";

export const mergeUniquelyToImmutableArray = (newList, existList, findIndex) => {
	newList.forEach((item) => {
		const indx = findIndex ? findIndex(existList, item) : existList.indexOf(item);

		existList = (~indx ?
			existList.set(indx, item) :  //found in existing, set inside
			existList.concat(item)); //add new item
	});

	return existList;
};

const throwNonFunctionReducer = (types, action) => {
	throw new Error(`Reducer must provide a function only per type, 
                found ${typeof types[action.type]} for type: ${action.type}`);
};

export default (initialState, types) =>
	(state, action) =>
		(types[action.type] ?
			(isFunction(types[action.type]) ?
				types[action.type]((state || initialState), action) :
				throwNonFunctionReducer(types, action)) :
			(state || initialState));
