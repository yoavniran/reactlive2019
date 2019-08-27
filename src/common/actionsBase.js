import {bindActionCreators} from "redux";
import isFunction from "lodash/isFunction";

const getActionsSettings = (types, overrides = {}) =>
    Object.values(types).reduce((res, tVal) => {
        res[tVal] = (overrides && overrides[tVal]) || true;
        return res;
    }, {});

const getSyncActionCreator = (key, actions, args) => ({
	type: key, payload: (isFunction(actions[key]) ?
		actions[key](...args) : //use the action method to retrieve the payload
		args[0])  //no action method, return the first dispatched arg as the payload object
});

const prepareActionCreators = (actions) =>
	Object.keys(actions)
		.reduce((res, key) => {
			res[key] = (...args) =>
				(actions[key]._customAC === true ?
					actions[key](...args) :
					getSyncActionCreator(key, actions, args));
			return res;
		}, {});

const getBoundActionCreators = (actions) =>
    (dispatch) =>
        bindActionCreators(prepareActionCreators(actions), dispatch);

const dispatcher = (dispatch, actions) =>
    actions.forEach((a) => dispatch({type: a[0], payload: a[1]}));

/**
 * returns a function that can be called either:
 *  a) with type and payload:
 *          const dispatcher = createDispatcher(dispatch);
 *          dispatcher(myType, {});
 *  b) with an array of arrays:
 *          const dispatcher = createDispatcher(dispatch);
 *          dispatcher([[myType, {}], [otherType, {}]]);
 *
 * @param dispatch
 */
export const createDispatcher = (dispatch) =>
    (type, payload = null) =>
        dispatcher(dispatch, (Array.isArray(type) ? type : [[type, payload]]));

export const createCustomCreator = (func) => {
    const actionCreator = (...args) =>
        (dispatch, getState) =>
            func(...args, getState, createDispatcher(dispatch), dispatch);

    actionCreator._customAC = true;

    return actionCreator;
};

export const bindStructuredActions = (mapping) =>
    (dispatch) =>
        Object.keys(mapping).reduce((res, key) => {
            res[key] = mapping[key](dispatch);
            return res;
        }, {});

/**
 * returns a function that can be directly passed to react-redux connect's mapDispatchToProps
 *
 * @param types - is a key/val map, the val(!) will be the name of the action available in the component's props object
 *
 * @param overrides - is a key/val where the key should match one of the val(!) in the types parameter
 * the value can be one of:
 *      a) any value (just not a function) = the dispatched value will be passed as is to the reducer
 *      b) a function = the returned value of this function will be used as the payload,
 *          the dispatched values will be passed as argument to this function
 *      c) the result of createCustomCreator (a function) this will pass the custom creator to the
 *          thunk middleware, the creator will receive the dispatch and getState methods as the first arguments.
 *          the rest of the dispatched values will be provided as the next arguments
 *
 *
 * Usage Example:
 *
 *      createBoundActionCreators({
 *      "TYPE1":"TYPE1".
 *      "TYPE2":"TYPE2-TYPE".
 *      "TYPE3":"TYPE3.3".
 *      },{
 *          "TYPE2-TYPE": (a,b)=>({val: a*b}),
 *          "TYPE3.3": createCustomCreator
 *      })
 */
export const createBoundActionCreators = (types, overrides) =>
    getBoundActionCreators(getActionsSettings(types, overrides));

//createActionCreators
export default (types, overrides) =>
	prepareActionCreators(getActionsSettings(types, overrides));
