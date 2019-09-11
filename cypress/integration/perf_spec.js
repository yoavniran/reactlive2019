//cytest
import { TYPES } from "../../src/consts";

const INTERACTION_MAX = 16;

describe("reactlive2019 - perf test", () => {
	it("test select perf", () => {

		cy.visit("http://localhost:3000/?profile");

		cy.window()
			.then((win) => {
				cy.wait(2000);

				const firstGridPhoto =
					cy.get("#root .grid-photo").first();

				firstGridPhoto.find("img")
					.click()
					.should(() => {

						const events = win._cyProfile[TYPES.SET_HIGHLIGHTED_PHOTO];

						expect(events[0].actualDuration)
							.to.be.at.most(INTERACTION_MAX);
					});
			});

	});
});