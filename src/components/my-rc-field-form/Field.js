import React, { Component } from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
    static contextType = FieldContext;
    componentDidMount() {
        const { registerField } = this.context;
        this.unregisterField = registerField(this);
    }

    componentWillUnmount() {
        if (this.unregisterField) {
            this.unregisterField();
        }
    }

    // store变化，执行这个刷新方法
    onStoreChange = () => {
        this.forceUpdate();
    };

    // 给children也就是input，手动绑上value和onChange属性
    getControlled = () => {
        const { name } = this.props;
        const { getFieldValue, setFieldsValue } = this.context;

        return {
            value: getFieldValue(name), // 比如说有个仓库可以存储这个value，那这里直接get
            onChange: (event) => {
                const newValue = event.target.value;
                console.log("newValue", newValue);
                // 想要重新设置input value，那执行仓库的set函数就可以了吧
                // 设置对象，[name]动态属性
                setFieldsValue({ [name]: newValue });
            },
        };
    };
    render() {
        const { children } = this.props;
        const returnChildNode = React.cloneElement(children, this.getControlled());

        return returnChildNode;
    }
}
