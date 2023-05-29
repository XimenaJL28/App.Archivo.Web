import { createAction } from "@ngrx/store";

export const toggleTheme = createAction(
    '[Theme] Change theme',
)
export const loadTheme = createAction(
    '[Theme] Load Theme',
)