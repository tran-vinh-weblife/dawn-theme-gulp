class SearchForm {
    constructor() {
        this.searchForm = document.querySelector(".js-search-form");
        this.searchBtn = document.querySelector(".js-search-btn");
        this.closeSearch = document.querySelector(".js-close-search");

        this.bindEvents();
    }

    bindEvents = () => {
        this.toggleSearch();
    };

    toggleSearch() {
        this.searchBtn.addEventListener("click", () => {
            this.searchForm.classList.add("is-open");
        });

        this.closeSearch.addEventListener("click", () => {
            this.searchForm.classList.remove("is-open");
        });
    }
}

window.addEventListener("load", () => {
    new SearchForm();
});
