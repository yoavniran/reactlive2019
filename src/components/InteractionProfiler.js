import React, { Fragment, Profiler } from "react";
import { ENABLE_PROFILER } from "../common/utils";

const onRender = (
	id, // the "id" prop of the Profiler tree that has just committed
	phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
	actualDuration, // time spent rendering the committed update
	baseDuration, // estimated time to render the entire subtree without memoization
	startTime, // when React began rendering this update
	commitTime, // when React committed this update
	interactions, // the Set of interactions belonging to this update
) => {

	if (interactions.size) {
		const cyProfile = window._cyProfile = window._cyProfile || {};
		interactions.forEach((i) => {
			const name = i.name;
			cyProfile[name] = cyProfile[name] || [];

			cyProfile[name].push({
				startTime,
				commitTime,
				actualDuration,
				interactions
			});
		});
	}
};


const InteractionProfiler = ({ profile, children }) =>
	(profile || ENABLE_PROFILER) ? <Profiler
		id={"PhotosGrid"} onRender={onRender}>
		{children}
	</Profiler> : <Fragment>
		{children}
	</Fragment>;

export default InteractionProfiler;
