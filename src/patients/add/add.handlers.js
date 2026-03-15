export function handleSubmitForm(e, service, repository) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const patientObject = Object.fromEntries(formData.entries());
    patientObject.age = Number(patientObject.age);

    const patientId = service.getURLPatientId();

    if (patientId) {
        const modifiedPatientObject = { ...patientObject, id: patientId };
        repository.updatePatient(modifiedPatientObject);
    } else {
        repository.createPatient(patientObject);
    }

    window.location.href = "../../index.html";
}

export async function handleAddPatient(e, repository) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const patientObject = Object.fromEntries(formData.entries());
    patientObject.age = Number(patientObject.age);

    await repository.createPatient(patientObject);

    window.location.href = "../../index.html";
}
