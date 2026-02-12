import { tutorFieldsetEl } from "./form.dom.js";

export function renderTutorFieldset(render = true) {
    if (render) {
        tutorFieldsetEl.classList.remove("u-hide");
        tutorFieldsetEl.disabled = false;
    } else {
        tutorFieldsetEl.classList.add("u-hide");
        tutorFieldsetEl.disabled = true;
    }
}
