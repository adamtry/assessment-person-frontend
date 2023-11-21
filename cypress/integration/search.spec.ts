import { searchPage } from "../pages/search-page";



describe('search', () => {
    before(() => {
        searchPage.visit();
    });

    it('should display the search page', () => {
        searchPage.elements.getClearSearchButton().should('exist');
    });

});