import React from "react";
import { useDispatch } from "react-redux";
import {createSelector} from "reselect";
import actions from "../store/actions";
import { TYPES } from "../consts";
import icons from "../icons";
import Svg from "./Svg";
import * as styled from "./GridPhoto.styled";
import { unstable_trace as trace } from "scheduler/tracing";
import usePropsSelector from "../hooks/usePropsSelector";

//impresponsive
//implazyload


const createHighlightedSelector = () => createSelector(
	(state, id) =>
		state.highlightedPhotoId === id,
	(state, id) => id,

	(isHighlighted) => {
		return isHighlighted;
	},
);

//createstate

//lazyloadedimg


const GridPhoto = ({ photo, style }) => {

	const dispatch = useDispatch();
	const isHighlighted = usePropsSelector(createHighlightedSelector, photo.id);

	const setHighlighted = () => {

		trace(TYPES.SET_HIGHLIGHTED_PHOTO, performance.now(), () =>
			dispatch(actions[TYPES.SET_HIGHLIGHTED_PHOTO]({
				id: photo.id,
				highlighted: !isHighlighted,
			})));
	};

	const setExposed = () =>
		dispatch(actions[TYPES.SET_EXPOSED_PHOTO]({
			id: photo.id,
		}));

	const deletePhoto = () =>
		dispatch(actions[TYPES.REMOVE_PHOTO]({ id: photo.id, }));

	//respattrs


	return <styled.Container hld={`${isHighlighted}`} style={style} className="grid-photo">
		<styled.Image src={photo.exposedUrl || photo.url} onClick={setHighlighted}/>

		{/*lazyimgprops*/}
		{/*respimgprops*/}

		<styled.BottomBar>
			<styled.BottomIcons>
				<Svg path={icons.check}
				     fill={isHighlighted ? "#FB851A" : "#E1E1E1"}
				     onClick={setHighlighted}/>
				<Svg path={icons.delete} fill="#FB851A" onClick={deletePhoto}/>
				<Svg path={icons.zoom} fill="#FB851A" onClick={setExposed}/>
			</styled.BottomIcons>

			<styled.PhotoId title={photo.id}>{photo.id}</styled.PhotoId>
		</styled.BottomBar>
	</styled.Container>;
};

export default GridPhoto;