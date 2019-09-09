import React from "react";
import { useDispatch } from "react-redux";
import {createSelector} from "reselect";
import actions, {interactionDispatch} from "../store/actions";
import { TYPES } from "../consts";
import icons from "../icons";
import Svg from "./Svg";
import * as styled from "./GridPhoto.styled";
import usePropsSelector from "../hooks/usePropsSelector";

const getSelectedSelectorInstance = () => createSelector(
	(state, id) => state.selectedPhotoId === id,
	(isSelected) => isSelected
);

const GridPhoto = ({ photo, style }) => {

	const dispatch = useDispatch();
	const isSelected = usePropsSelector(getSelectedSelectorInstance, photo.id);

	const setSelected = () => {
		interactionDispatch(dispatch, TYPES.SET_SELECTED_PHOTO, {
			id: photo.id,
			selected: !isSelected,
		});
	};

	const setExposed = () =>
		dispatch(actions[TYPES.SET_EXPOSED_PHOTO]({
			id: photo.id,
		}));

	const deletePhoto = () =>
		dispatch(actions[TYPES.REMOVE_PHOTO]({ id: photo.id, }));

	return <styled.Container selected={isSelected} style={style} className="grid-photo">
		<styled.Image src={photo.exposedUrl || photo.url} onClick={setSelected}/>

		<styled.BottomBar>
			<styled.BottomIcons>
				<Svg path={icons.check}
				     fill={isSelected ? "#FB851A" : "#E1E1E1"}
				     onClick={setSelected}/>
				<Svg path={icons.delete} fill="#FB851A" onClick={deletePhoto}/>
				<Svg path={icons.zoom} fill="#FB851A" onClick={setExposed}/>
			</styled.BottomIcons>

			<styled.PhotoId title={photo.id}>{photo.id}</styled.PhotoId>
		</styled.BottomBar>
	</styled.Container>;
};

export default GridPhoto;