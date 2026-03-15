import * as handlers from "./search.handlers.js";
import * as ui from "./search.ui.js";
import * as repository from "./search.repository.js";
import * as state from "../../app/appState.js";
import { randomNumber } from "../../shared/utils.js";

const searchFormEl = document.querySelector(".search-form");
const searchFormInputEl = document.querySelector(".search-form__input");
const searchResultsEl = document.querySelector(".search-results");

export function initSearch() {
    searchFormEl.addEventListener("submit", function (e) {
        handlers.handleSearchFormSubmit({
            e,
            state,
            ui,
            searchResultsEl,
        });
    });

    searchFormEl.addEventListener("click", function (e) {
        handlers.handleSearchResultClick({ e, state, searchResultsEl, ui });
    });

    searchFormInputEl.addEventListener("input", function (e) {
        handlers.handleSearchInput({ e, ui, searchResultsEl, repository });
    });
}
