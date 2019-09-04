import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import actions from "../store/actions";
import { TYPES } from "../consts";
import icons from "../icons";
import Svg from "./Svg";

const Container = styled.div`
	width: 230px;	
	margin: 10px;	
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #191928;
	position: relative;
	cursor: pointer;
	border: ${({ selected, exposed }) =>
	(exposed ? "1px dotted #8995B8" : 
		selected ? "2px solid #61dafb" : "1px solid #282c34") };
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

const ExposedMask = styled.div`
	display: ${({show}) => show ? "block" : "none" };
	
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(247,246,255,0.53);
`;

const GridPhoto = ({ photo }) => {
	// console.log("!!!!!!!!!!! rendering photo: ", photo.id);
	const dispatch = useDispatch();

	const exposedPhotoId = useSelector((state) => state.exposedPhotoId);

	const isExposed = exposedPhotoId === photo.id;

	const setSelected = () =>
		dispatch(actions[TYPES.SET_SELECTED_PHOTO]({
			id: photo.id,
			selected: !photo.selected,
		}));

	const setExposed = () =>
		dispatch(actions[TYPES.SET_EXPOSED_PHOTO]({
			id: photo.id,
		}));

	const deletePhoto = () =>
		dispatch(actions[TYPES.REMOVE_PHOTO]({
			id: photo.id,
		}));

	return <Container selected={photo.selected} exposed={isExposed}>
		<ExposedMask show={isExposed} />

		<Image src={photo.url} onClick={setSelected}/>

		<BottomBar>
			<BottomIcons>
				<Svg path={icons.check}
				     fill={photo.selected ? "#FB851A" : "#E1E1E1"}
				     onClick={setSelected}/>
			     <Svg path={icons.delete} fill="#FB851A" onClick={deletePhoto}/>
			     <Svg path={icons.zoom} fill="#FB851A" onClick={setExposed}/>
			</BottomIcons>

			<PhotoId title={photo.id}>{photo.id}</PhotoId>
		</BottomBar>
	</Container>;
};

export default GridPhoto;
//export default memo(GridPhoto);