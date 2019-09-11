import React  from "react";
import { useSelector } from "react-redux";
import PhotosGrid from "./PhotosGrid";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import PhotoDrawer from "./PhotoDrawer";
import * as styled from "./App.styled";
import InteractionProfiler from "./InteractionProfiler";

const App = () => {
	const exposedId = useSelector((state) => state.exposedPhotoId);

	return (<styled.Container>
		<GlobalStyles/>
		<Header/>
		<InteractionProfiler>
			<PhotosGrid/>
		</InteractionProfiler>
		{exposedId && <PhotoDrawer exposedId={exposedId}/>}
	</styled.Container>);
};

export default App;
