import styled from "styled-components";
import { animated } from "react-spring";

export const Container = styled(animated.div)`
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

export const BottomBar = styled.div`
	color: #fff;
	background-color: #191928;	
	width: 100%;
	border-top: solid 1px #61dafb;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5px;
`;

export const Image = styled.img`
  display: block;
  max-width:230px;
  max-height:130px;
  width: auto;
  height: auto;
`;

export const PhotoId = styled.div`
	font-size: 12px;
	height: 14px;
	max-width: 90%;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const BottomIcons = styled.div`
	display: flex;
	width: 100%;
	height: 28px;
	justify-content: space-between;
`;
