import React, { Component } from "react";
import { createMemoryHistory } from "history";
import Router from "./Router";

export default class MemoryRouter extends Component {
    constructor(props) {
        super(props);
        this.history = createMemoryHistory();
    }
    render() {
        return <Router history={this.history} children={this.props.children} />;
    }
}
