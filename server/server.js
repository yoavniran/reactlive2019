const smocker = require("smocker"),
	colors = require("colors/safe");

const startServer = (config) => {

	console.info(colors.gray(`!!! Starting server with config: `), config);

	smocker.start({
		port: config.port,
		resources: "./resources",
		// parent: "../",
		appData: {
			// ...config
		},
	});

	// configHelper.save(config);
};


startServer({
	port: 9999,
});