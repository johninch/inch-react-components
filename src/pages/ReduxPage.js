import React, { Component } from "react";
import store from "../store/";


export default class ReduxPage extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    add = () => {
        store.dispatch({ type: "ADD" });
    };

    addAsync = () => {
        store.dispatch((dispatch, getState) => {
            setTimeout(() => {
                console.log(getState())
                dispatch({ type: "ADD" })
            }, 1000)
        })
    }

    promiseMinus = () => {
        store.dispatch(
            Promise.resolve({
                type: "MINUS",
                payload: 100
            })
        );
    };

    render() {
        return (
            <div>
                <h3>ReduxPage</h3>
                <p>{store.getState()}</p>
                <button onClick={this.add}>add</button>
                <button onClick={this.addAsync}>addAsync</button>
                <button onClick={this.promiseMinus}>promiseMinus</button>
            </div>
        );
    }
}
