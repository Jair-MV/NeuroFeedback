import * as handlers from "./update.handlers.js";
import * as repository from "./update.repository.js";
import * as ui from "./update.ui.js";
import { loadPatient } from "../../shared/repository.js";
import { isAdult } from "../../shared/service.js";
import { handleInputAge } from "../../shared/handlers.js";

const mainFormEl = document.querySelector(".main-form");
const ageInputEl = document.getElementById("age");
const tutorFieldsetEl = document.getElementById("tutorFieldset");

export async function initUpdate(patientId) {
    const patient = await loadPatient(patientId);

    if (!isAdult(patient.age)) ui.renderTutorFieldset(tutorFieldsetEl);

    ui.renderStatusPill(mainFormEl);
    ui.populateForm(patient);
    ui.updateButtonText();

    mainFormEl.addEventListener("submit", function (e) {
        handlers.handleUpdatePatient(e, repository);
    });

    ageInputEl.addEventListener("change", function () {
        handleInputAge({
            age: this.value,
            tutorFieldsetEl,
            isAdult,
            ui,
        });
    });
}
