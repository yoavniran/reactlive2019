import React from "react";
import styled from "styled-components";

const Container = styled.div`
	padding: 0 5px;
	margin: 0 5px 10px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	
	border: ${({ selected }) => selected ? "2px solid #61dafb" : "1px solid #282c34"};
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

const Transformation = ({ name, url, selected, enableTransformation }) => {

	return <Container onClick={() => enableTransformation(name, url)} selected={selected}>
		<Image src={url}/>
		<Text>{name}</Text>
	</Container>;
};

export default Transformation;