import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";

const usePropsSelector = (selectorCreator, ...props) => {
	//create an instance of our reselect selector
	const selectorInstance = useMemo(selectorCreator, []);

	//ensure useSelector only ever sees the same selector function
	const memoSelector = useCallback(
		(state) => selectorInstance(state, ...props),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		props);

	return useSelector(memoSelector);
};

export default usePropsSelector;