import * as ui from "./add.ui.js";
import * as handlers from "./add.handlers.js";
import * as repository from "./add.repository.js";
import { loadPatient } from "../../shared/repository.js";
import { isAdult } from "../../shared/service.js";
import { handleInputAge } from "../../shared/handlers.js";

const mainFormEl = document.querySelector(".main-form");
const ageInputEl = document.getElementById("age");
const tutorFieldsetEl = document.getElementById("tutorFieldset");

export async function initAdd() {
    /* const patientId = service.getURLPatientId();
    const patient = await loadPatient(patientId);

    if (!isAdult(patient.age)) ui.renderTutorFieldset(tutorFieldsetEl);

    ui.renderStatusPill(mainFormEl);
    ui.populateForm(patient);
    ui.updateButtonText(); */

    mainFormEl.addEventListener("submit", function (e) {
        handlers.handleAddPatient(e, repository);
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
