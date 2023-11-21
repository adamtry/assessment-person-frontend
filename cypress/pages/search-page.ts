import { BasePage } from "./base/base-page"

class SearchPage extends BasePage {

	constructor(pageUrl: string = "/search") {
		super(pageUrl)
	}

	elements = {
		...this.baseElements,
		getSearchPageHeading: () => cy.get('.lbh-heading-h1'),
		getGetSearchPageForm: () => cy.get('form'),

		getSearchField: () => cy.get('#searchField'),

		getSearchButton: () => cy.get('[data-testid=searchButton]'),
		getClearSearchButton: () => cy.get('[data-testid=clearSearchButton]'),

		getResultsCounter: () => cy.get('.sv-group > .lbh-heading-h3'),

		getResultByIndex: (index: number) => cy.get("asdf").eq(index),

		getMatchButton: () => cy.get('[data-testid="match-button"]'),

	}

	search(query: string) {
		this.elements.getSearchField().type(query);
		this.elements.getSearchButton().click()
	}
}

export const searchPage = new SearchPage();