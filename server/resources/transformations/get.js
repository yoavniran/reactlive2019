const cldApi = require("../../cloudinary");

const DEMO_PREFIX = "t_reactlive_";

const filterDemoTransformations = (transformations) =>
	transformations.filter((t) => !t.name.indexOf(DEMO_PREFIX));

const getTransformationUrls = (id, transformations) =>
	transformations.map((t) => {
		const url = cldApi.cloudinary.url(id, {transformation: [t.name]}) ;
		return {
			name: t.name.replace(DEMO_PREFIX, ""),
			url,
		};
	});

module.exports = (req, info) => {
	return cldApi.transformations()
		.then((result) => {
			console.log("!!!!!!!!! returned from fetching transformations - ", {
				params: info.params,
				result,
			});

			let imageTransformations;

			if (!result.error) {
				imageTransformations = getTransformationUrls(
					info.params.id,
					filterDemoTransformations(result.transformations),
				);
			}

			return {
				response: {
					error: !!result.error,
					urls: imageTransformations
				}
			};
		});
};