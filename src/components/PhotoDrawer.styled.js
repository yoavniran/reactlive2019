import styled from "styled-components";
import Svg from "./Svg";

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 20px;
	background-color: rgba(40,44,52,0.80);
`;

export const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #15171b;
`;

export const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 2;
`;

export const Image = styled.img`
	width: auto;	
	height: ${({ size }) => size.height ? `${size.height}px` : "auto"};
`;

export const Transformations = styled.div`
	height: 200px;
	width: 100%;
	display: flex;
	border-top: 2px solid #61dafb;
	align-items: center;
`;

export const CloseButton = styled(Svg)`
	position: absolute;
	top: 4px;
	right: 4px;
	cursor:pointer;
`;