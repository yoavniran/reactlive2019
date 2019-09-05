import produce from "immer";
import isFunction from "lodash/isFunction";

const throwNonFunctionReducer = (types, action) => {
	throw new Error(`Reducer must provide a function only per type,
                found ${typeof types[action.type]} for type: ${action.type}`);
};

const curriedProducer = (types, draft, action) =>
	types[action.type] ? (isFunction(types[action.type]) ?
		types[action.type](draft, action) :
		throwNonFunctionReducer(types, action)) : undefined;

export default (initialState, types) =>
	produce((draft, action) =>
		curriedProducer(types, draft, action), initialState);