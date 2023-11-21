import { AuthRoles } from "../../support/commands";

export class BasePage {
	pageUrl: string;

	constructor(pageUrl: string) {
		this.pageUrl = pageUrl;
	}

	baseElements = {}

	visit(role?: AuthRoles, options?: Partial<Cypress.VisitOptions>) {
		cy.visitAs(this.pageUrl, role, options);
	}
}