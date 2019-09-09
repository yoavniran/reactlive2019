import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";

const usePropsSelector = (selectorCreator, ...props) => {
	const selectorInstance = useMemo(selectorCreator, []);

	const memoSelector = useCallback(
		(state) => selectorInstance(state, ...props),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		props);

	return useSelector(memoSelector);
};

export default usePropsSelector;