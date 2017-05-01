export function isAboutDialogOpen(state) {
  return state.about.open;
}

export function isLicenseDialogOpen(state) {
  return state.about.openLicense;
}

export function isLoadingLicenseText(state) {
  return state.about.loadingLicenseText;
}

export function getLicenseText(state) {
  return state.about.licenseText;
}
