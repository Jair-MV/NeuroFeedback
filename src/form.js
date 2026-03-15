import { initAdd } from "./patients/add/add.init.js";
import { initUpdate } from "./patients/update/update.init.js";
import { getURLPatientId } from "./shared/service.js";

const patientId = getURLPatientId();

if (patientId) initUpdate(patientId);
else initAdd();
