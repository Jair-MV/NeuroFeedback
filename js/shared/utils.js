export function isAdult(age) {
    return age >= 18;
}

export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
