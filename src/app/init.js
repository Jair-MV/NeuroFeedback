import * as repository from "../patients/list/list.repository.js";
import { setPatients } from "./appState.js";

export async function initApp() {
    const patients = await repository.loadPatients();
    setPatients(patients);
}
