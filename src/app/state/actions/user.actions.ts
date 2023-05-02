import { createAction, props } from "@ngrx/store";
import { UserState } from "../reducers/user.reducer";

export const loadUser = createAction(
    '[User] User data updated',
    props<{data: UserState}>()
)