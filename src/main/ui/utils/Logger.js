import isDev from "electron-is-dev";
class Logger {

  info(text) {
    log(console.info(text));
  }

  error(text) {
    log(console.error(text));
  }

  warn(text) {
    log(console.warn(text));
  }

  log(log) {
    if (isDev) {
      log();
    }
  }
}

export default Logger;