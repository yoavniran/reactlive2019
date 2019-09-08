const cloudinary = require("../../cloudinary");
// const core = require("cloudinary-core");

module.exports = (req, info) => {

	// const cl = core.Cloudinary.new( { cloud_name: "yoav-cloud"});
	// console.log("video tag = ", cl.videoTag("test.mkv").toHtml());

	const cursor = info.params.cursor;

	if (cursor) {
		console.log("!!!!!!!!!!!! RECEIVED NEXT CURSOR - ", cursor);
	}

	return cloudinary.search({
		cursor,
		tags: [process.env.CLD_TAG],
		max: 200,
	})
		.then((result) => {

			console.log("!!!!!!!!! returned from search - ", {
				...result,
				resources: "",
				items: result.resources && result.resources.length,
			});

			return {
				response: {
					error: !!result.error,
					photos: result.error ? [] : result.resources.map((p) => ({
						...p,
						price: (Math.ceil(Math.random() * 10) + Math.random()).toFixed(2),
					})),
					meta: {
						next: result.next_cursor,
						count: result.total_count,
						limit: result.rate_limit_allowed,
						limitReset: result.rate_limit_reset_at,
						remaining: result.rate_limit_remaining,
					},
				}
			}
		});
};
