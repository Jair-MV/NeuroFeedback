/* import { isAdult } from "../shared/utils.js";
import { renderTutorFieldset } from "./form.ui.js";
import { updatePatient, createPatient } from "../patients/patients.api.js"; */

export async function handleSubmitFormOld(e, patientId) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const patientObject = Object.fromEntries(formData.entries());
    patientObject.age = Number(patientObject.age);

    if (patientId) {
        const updatedPatient = {
            ...patientObject,
            id: patientId,
        };

        await updatePatient(updatedPatient);
    } else {
        await createPatient(patientObject);
    }

    window.location.href = "../../index.html";
}

export function handleInputAgeOld(ageValue) {
    const patientAge = Number(ageValue);
    const isPatientAdult = isAdult(patientAge);

    renderTutorFieldset(!isPatientAdult);
}

import * as api from "../patients/patients.api.js";
import * as state from "../patients/patients.state.js";
import * as service from "../patients/patients.service.js";
import * as ui from "./form.ui.js";

const mainFormEl = document.querySelector(".main-form");
const ageInputEl = document.getElementById("age");
const tutorFieldsetEl = document.getElementById("tutorFieldset");

function getURLPatientId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("patientId");
}

function handleSubmitForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const patientObject = Object.fromEntries(formData.entries());
    patientObject.age = Number(patientObject.age);

    const patientId = getURLPatientId();

    if (patientId) {
        const modifiedPatientObject = { ...patientObject, id: patientId };
        api.updatePatient(modifiedPatientObject);
    } else {
        api.createPatient(patientObject);
    }

    window.location.href = "../../index.html";
}

function handleInputAge(age) {
    const patientAge = Number(age);
    const isPatientAdult = service.isAdult(patientAge);

    ui.renderTutorFieldset(tutorFieldsetEl, !isPatientAdult);
}

function bindEvents() {
    mainFormEl.addEventListener("submit", function (e) {
        handleSubmitForm(e);
    });

    ageInputEl.addEventListener("change", function () {
        handleInputAge(this.value);
    });
}

export async function init() {
    bindEvents();

    // Determine how the form is loaded
    const patientId = getURLPatientId();

    if (!patientId) return;

    const patient = await api.loadPatient(patientId);

    if (!service.isAdult(patient.age)) ui.renderTutorFieldset(tutorFieldsetEl);

    ui.populateForm(patient);
    ui.updateButtonText();
}
