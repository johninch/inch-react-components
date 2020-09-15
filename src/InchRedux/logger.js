export default function logger({ dispatch, getState }) {
    return next => action => {
        console.log("**************************************")
        // prev state
        const prevState = getState()
        console.log("prev state", prevState)

        const returnVal = next(action)
        // next state
        const nextState = getState()
        console.log("next state", nextState)

        console.log("**************************************")

        return returnVal
    }
}
