import { TYPES } from "../../src/consts";

describe("reactlive2019 - perf test", () => {
	it("test select perf", () => {

		cy.visit("http://localhost:3000/?profile");

		cy.window()
			.then((win) => {
				cy.wait(2000);

				const firstGridPhoto = cy.get("#root .grid-photo").first();

				firstGridPhoto.find("img")
					.click()
					.should(() => {
						expect(win._cyProfile).to.not.be.undefined;

						const events = win._cyProfile[TYPES.SET_SELECTED_PHOTO];

						expect(events[0].actualDuration).to.be.lessThan(16);
					});
			});
	});
});