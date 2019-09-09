import styled from "styled-components";

export const Container = styled.header`
	height: 60px;
	width: 100%;
	background-color: #282c34;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row-reverse;
	border-bottom: 2px solid #61dafb;	
`;

export const Counter = styled.div`
	height: 100%;
	padding: 0 4px;
	background-color: black;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	font-size: 2rem;
`;
