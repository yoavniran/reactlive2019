// import { useRef,  useCallback } from "react";
// import { useSelector } from "react-redux";
// import {memoizedFlow} from "memoize-state";
//
// const useMemoizedStateSelector = (selector, ...props) => {
//
// 	const selectorInstance = useRef(memoizedFlow(selector));
// 		//(state)=> memoize(createSelector(state)));
//
// 	console.log("########### creating memoized state selector ", props);
//
// 	const memoSelector = useCallback((state) => {
// 			return selectorInstance.current(state, ...props)
// 		},
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 		props);
//
// 	return useSelector(memoSelector);
// };
//
// export default useMemoizedStateSelector;
//
// const isSelectedSelectorFlow = [
// 	(state, id) => {
// 		console.log("111111111 running first step of memoized selector", state, id)
// 		return  {selectedId: state.selectedPhotoId, id};
// 	} ,
// 	({selectedId, id}) => {
// 		console.log("2222222222 running memoized selector = for: ", id);
// 		return selectedId === id;
// 	}
// ];
