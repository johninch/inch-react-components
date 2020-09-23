// ===========================演示InchReactRedux等实现==============================
// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import store from "./store/";
// import { Provider } from "react-redux";
// // import { Provider } from "./InchReactRedux";

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById("root")
// );


// ===========================演示InchReact实现==============================

// import React, {Component} from "react";
// import ReactDOM from "react-dom";
import React from "./InchReact/";
import ReactDOM from "./InchReact/react-dom";
import Component from "./InchReact/Component";
import "./index.css";

class ClassComponent extends Component {
    static defaultProps = {
        color: "pink"
    };
    render() {
        return (
            <div className="border">
                {this.props.name}
                <p className={this.props.color}>{this.props.name}</p>
            </div>
        );
    }
}

function FunctionComponent(props) {
    return <div className="border">
        <span className={props.color}>{props.name}</span>
    </div>;
}

FunctionComponent.defaultProps = {
    color: "pink"
}

const jsx = (
    <div className="border">
        <p>全栈</p>
        <a href="https://johninch.github.io/Roundtable">RoundTable</a>
        <ClassComponent name="class component" color="red" />
        <FunctionComponent name="function component" />

        <>
            <li>Inch</li>
            <li>Amy</li>
        </>
    </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
