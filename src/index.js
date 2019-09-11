import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {Provider} from "react-redux";
import getStore from "./store/store";
//improot

const store = getStore();

window.__store = store;

ReactDOM.render(<Provider store={store}>
	<App />
</Provider>, document.getElementById("root"));

//renderroot

