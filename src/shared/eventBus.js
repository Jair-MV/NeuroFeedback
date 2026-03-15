const bus = new EventTarget();

export function emit(event, detail) {
    bus.dispatchEvent(new CustomEvent(event, { detail }));
}

export function on(event, handler) {
    bus.addEventListener(event, (e) => handler(e.detail));
}
