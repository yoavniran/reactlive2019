const cloudinary = require("cloudinary"),
	colors = require("colors/safe");

cloudinary.config({
	cloud_name: "yoav-cloud",
	api_key: process.env.CLD_KEY,
	api_secret: process.env.CLD_SECRET,
});

const transformations = (options = {}) => {
	return cloudinary.v2.api.transformations({
		named: true,
		max_results: 100,
		...options,
	})
		.catch((error) => {
			console.error("FAILED TO GET NAMED TRANSFORMATIONS !!!! ", error);
			return {error: true};
		});
};

const search = (options) => {

	const q = {
		type: "image",
		tags: [],
		text: "",
		max: 50,
		...options,
	};

	const tags = q.tags && q.tags.length ?
		`AND ` + q.tags.map((t) => `tags=${t}`).join(" AND ") : "";

	const exp = `resource_type:${q.type} ${tags} ${q.text ? "AND " + q.text : ""}`;

	console.info(colors.yellow(`issuing search query: ${exp}`));

	return cloudinary.v2.search
		.expression(exp)
		.next_cursor(q.cursor)
		.sort_by("uploaded_at")
		.max_results(options.max)
		.execute()
		.catch((error) => {
			console.error("FAILED TO SEARCH !!!! ", error);
			return {error: true};
		})
};

module.exports = {
	cloudinary,
	search,
	transformations,
};