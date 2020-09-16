import React, { useReducer, useEffect, useLayoutEffect } from "react";
import { countReducer } from "../store";

const init = initArg => {
    return initArg - 0;
};

export default function HooksPage(props) {
    const [state, dispatch] = useReducer(countReducer, "0", init);

    useEffect(() => {
        return () => {
            console.log("unmount");
        };
    }, []);

    useEffect(() => {
    }, [state]);

    useLayoutEffect(() => {
        console.log("useLayoutEffect");
    }, []);

    return (
        <div>
            <h3>HooksPage</h3>
            <p>{state}</p>
            <button onClick={() => dispatch({ type: "ADD" })}>add</button>
        </div>
    );
}
