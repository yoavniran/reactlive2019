import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { animated } from "react-spring";
import { createSelector } from "reselect";
import actions, { interactionDispatch } from "../store/actions";
import { TYPES } from "../consts";
import icons from "../icons";
import Svg from "./Svg";
import usePropsSelector from "../hooks/usePropsSelector";

const Container = styled(animated.div)`
	width: 230px;	
	margin: 10px;	
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #191928;
	position: relative;
	cursor: pointer;
	box-sizing: border-box;	
	border: ${({ selected, exposed }) =>
	(exposed ? "2px dotted #8995B8" :
		selected ? "2px solid #61dafb" : "2px solid #282c34")};
`;

const BottomBar = styled.div`
	color: #fff;
	background-color: #191928;	
	width: 100%;
	border-top: solid 1px #61dafb;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5px;
`;

const Image = styled.img`
  display: block;
  max-width:230px;
  max-height:130px;
  width: auto;
  height: auto;
`;

const PhotoId = styled.div`
	font-size: 12px;
	height: 14px;
	max-width: 90%;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const BottomIcons = styled.div`
	display: flex;
	width: 100%;
	height: 28px;
	justify-content: space-between;
`;

//
// const selectedIdSelector = createSelector(
// 	(state, props) => state.selectedPhotoId === props.id,
// 	(state, props) => props.id,
// 	(isSelected, id) => {
// 		console.log("!!!!!!!!!!!! returning selected = " + isSelected + " for id: ", id);
// 		return isSelected;
// 	},
// );

const getSelectorInstance = () => createSelector(
	(state, id) => state.selectedPhotoId === id,
	(isSelected) => {
		//console.log("!!!!!!!!!!!! returning selected = " + isSelected + " for props: ", props);
		return isSelected;
	},
);

const GridPhoto = ({ photo, style }) => {
	const dispatch = useDispatch();
	// const selectedId = useSelector((state) => state.selectedPhotoId);
	const isSelected = photo.selected;
	// const isSelected = useSelector((state) => state.selectedPhotoId === photo.id);
	// const isSelected = useSelector((state)=>memoizedIsSelected(state, photo.id));
	// const isSelected = usePropsSelector(getSelectorInstance, photo.id, photo.url);

	const setSelected = () => {
		dispatch(actions[TYPES.SET_SELECTED_PHOTO]({
			id: photo.id,
			selected: !isSelected,
		}));

		// interactionDispatch(dispatch, TYPES.SET_SELECTED_PHOTO, {
		// 	id: photo.id,
		// 	selected: !isSelected,
		// });
	};

	const setExposed = () =>
		dispatch(actions[TYPES.SET_EXPOSED_PHOTO]({
			id: photo.id,
		}));

	const deletePhoto = () =>
		dispatch(actions[TYPES.REMOVE_PHOTO]({ id: photo.id, }));

	// console.log("!!!!!!!! rendering GridPhoto: ", photo.id);

	return <Container selected={isSelected} style={style} className="grid-photo">
		<Image src={photo.url} onClick={setSelected}/>

		<BottomBar>
			<BottomIcons>
				<Svg path={icons.check}
				     fill={isSelected ? "#FB851A" : "#E1E1E1"}
				     onClick={setSelected}/>
				<Svg path={icons.delete} fill="#FB851A" onClick={deletePhoto}/>
				<Svg path={icons.zoom} fill="#FB851A" onClick={setExposed}/>
			</BottomIcons>

			<PhotoId title={photo.id}>{photo.id}</PhotoId>
		</BottomBar>
	</Container>;
};

export default GridPhoto;
// export default memo(GridPhoto);