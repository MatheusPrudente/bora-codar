export function startLoading() {
  document.documentElement.classList.add("loading");
}

export function stopLoading() {
  document.documentElement.classList.remove("loading");
}

export function loadingMessage(message) {
  document.documentElement.dataset.message = message;
}