import { createReducer, on } from "@ngrx/store";
import { loadTheme, toggleTheme } from "../actions/theme.actions";

export interface ThemeState {

    darkMode: boolean
}
export const initialState: ThemeState = {

    darkMode: (localStorage.getItem("darkMode") == "true")

}

export const themeReducer = createReducer(
    initialState,
    on(toggleTheme, (oldState) => {


        //? Toggle theme
        const darkMode = !oldState.darkMode;

        //? Change css file url
        let themeLink = document.getElementById('app-theme') as HTMLLinkElement;
        const themeUrl = (darkMode) ? "dark-indigo" : "light-indigo";
        themeLink.href = `${themeUrl}.css`;

        //? Setting theme selected in localStorage
        localStorage.setItem("darkMode", `${darkMode}`);

        return {
            darkMode
        }
    }),
    on(
        loadTheme, (oldState) => {

            //? Toggle theme
            let darkMode = oldState.darkMode;
            //? Change css file url
            let themeLink = document.getElementById('app-theme') as HTMLLinkElement;
            const themeUrl = (darkMode) ? "dark-indigo" : "light-indigo";
            themeLink.href = `${themeUrl}.css`;

            //? Setting theme selected in localStorage
            localStorage.setItem("darkMode", `${darkMode}`);

            return {
                darkMode
            }
        }
    )
)
