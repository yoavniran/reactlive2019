import cld from "cloudinary-core";
import { generateImageResponsiveAttributes } from "cloudinary/lib/utils/srcsetUtils";
import {CLOUD} from "./consts";

const BREAK_POINTS = 4;

const cloudinary = new cld.Cloudinary({
	cloud_name: CLOUD,
	secure: true,
});

const API_DOMAIN = "http://localhost:9999/";

const makeRequest = async (resource, method = "GET", body = null) => {
	let res;

	try {
		res = await fetch(`${API_DOMAIN}${resource}`,
			{
				method,
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
				},
				body: body && JSON.stringify(body),
			});
	}
	catch (ex) {
		console.error("FAILED TO FETCH DATA FROM SERVER !!!!!!!!!!!!!! ", ex);
	}

	return res ? res.json() : {error: true}; //no catch for json()
};

const getCloudinaryUrl = (id, options = {}) =>
	cloudinary.url(id, options);

const getResponsiveAttributes = (id, min, max, transformation) => {
	const sizes = new Array(BREAK_POINTS)
		.fill(null)
		.map((n, i) => `(max-width: ${min * (i + 1)}px) ${(min * (i + 1)) / 2}px`);

	const srcset = generateImageResponsiveAttributes(id, {}, {
		min_width: min,
		max_width: max,
		max_images: BREAK_POINTS,
		transformation: { transformation },
	}, {
		cloud_name: CLOUD,
	});

	return {
		...srcset,
		sizes,
	};
};

window.__url = getCloudinaryUrl;

export {
	makeRequest,
	getCloudinaryUrl,
	getResponsiveAttributes
};