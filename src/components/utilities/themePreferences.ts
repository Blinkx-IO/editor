export function setThemeClass(lightClass: string, darkClass: string, themePreference: themePreference) {
	if (themePreference == 'dark') {
		return darkClass
	} else if (themePreference == 'light') {
		return lightClass
	}
	//sytem settings
	else {
		return `${lightClass} ${darkClass}`;
	}
}
