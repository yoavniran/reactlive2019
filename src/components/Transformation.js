import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {TYPES} from "../consts";
import actions from "../store/actions";

const Container = styled.div`
	padding: 0 5px;
	margin: 0 5px 10px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	
	border: ${({selected}) => selected ? "2px solid #61dafb" : "1px solid #282c34"};
`;

const Image = styled.img`
  display: block;
  max-width:200px;
  max-height:110px;
  width: auto;
  height: auto;
`;

const Text = styled.div`
	font-size: 16px;
	color: #fff;	
	height: 18px;	
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Transformation = ({name, url, photoId, selected}) => {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch(actions[TYPES.SET_PHOTO_TRANSFORMATION_URL]({
			photoId,
			url,
			name,
		}));
	};

	return <Container onClick={onClick} selected={selected}>
		<Image src={url} />
		<Text>{name}</Text>
	</Container>;
};

export default Transformation;