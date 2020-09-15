export default function thunk({ dispatch, getState }) {
    return next => action => {
        if (typeof action === "function") {
            return action(dispatch, getState)
        } else if (typeof action === "object") {
            return next(action)
        }
    }
}
