export function sendCallback(callback) {
  if (typeof callback === "function") {
    callback();
  } else if (typeof callback === "undefined") {
    console.warn("sendCallback(callback): called but callback undefined");
  } else {
    console.error("sendCallback(callback): callback is not a function.");
  }
}
