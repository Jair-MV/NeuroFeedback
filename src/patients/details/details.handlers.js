import { emit } from "../../shared/eventBus.js";
import { isAdult } from "../../shared/service.js";
import { loadPatient } from "../../shared/repository.js";

export function handleCloseModal(ui) {
    ui.closePatientDetails();
}

export async function handleDeletePatient({ e, repository, state, ui }) {
    const patientId = Number(
        e.target.closest(".patient-card--extended").dataset.patientId,
    );

    await repository.deletePatient(patientId);
    state.deletePatient(patientId);

    handleCloseModal(ui);

    emit("patientDeleted", {});
}

export async function handleDetails({
    e,
    repository,
    ui,
    state,
    pageNumbersEl,
    randomNumber,
}) {
    const detailsButton = e.target.closest('[data-action="details"]');

    if (!detailsButton) return;

    // Load patient data
    const patientID = detailsButton.closest(".patient-card").dataset.patientId;
    const patient = await loadPatient(patientID);

    // Render patient card
    const enrichedPatient = {
        ...patient,
        showTutor: isAdult(patient.age),
    };

    ui.openPatientDetails(enrichedPatient, {
        onClose: () => handleCloseModal(ui),
        onDelete: (e) =>
            handleDeletePatient({
                e,
                state,
                ui,
                repository,
                pageNumbersEl,
                randomNumber,
            }),
    });
}
