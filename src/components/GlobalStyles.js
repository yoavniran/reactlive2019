import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

	html {
		background-color: white;
		overflow-x: hidden;
		overflow-y: scroll;
		text-rendering: optimizeLegibility;
		font-size: 18px;
		box-sizing: border-box;
		margin: 0;
		padding: 0;	
	}

	body {
  		font-family: 'Frank Ruhl Libre', serif;
		line-height: 1.5;
		background-color: #acb5ba;
    	margin: 0;
    	padding: 0;
    	
    	&.no-scroll {
    		overflow: hidden;
    		height: 100vh;
    	}
	}

	*, *::before, *::after {
		box-sizing: inherit;
	}

	article,
	aside,
	figure,
	footer,
	header,
	hgroup,
	section {
		display: block;
	}

	a {
		text-decoration: none;
		cursor: pointer;		
	}

	img {
  		height: auto;
  		max-width: 100%;
	}

	span {
  		font-style: inherit;
  		font-weight: inherit;
	}

	h1, h2, h3, h4 {
  		font-weight: bold;
  		margin: 1rem 0 0.5rem 0;
  		padding: 0;
	}

	h2 {
		margin: 1.2rem 0 0.6rem 0;
	}

	h1 {
  		font-size: 2.2rem;
	}

	h2 {
  		font-size: 1.7rem;
	}

	h3{
		font-size: 1.4rem;
	}

	h4{
		font-size: 1.2rem;
	}

	ul {
  		margin-block-start: 0;
  		margin-block-end: 0;
	}

	section {
  		display: flex;
  		padding: 0 20px;	
	}

	hr {

	}
`;

export default GlobalStyles;
