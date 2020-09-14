import React, { Component } from 'react';

export default function createForm(Cmp) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {}
            this.options = {}
        }
        handleChange = e => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }
        // getFieldDecorator("username", { rules: [nameRules] })(<Input placeholder="Username" />)
        getFieldDecorator = (field, option) => InputCmp => {
            this.options[field] = option
            return React.cloneElement(InputCmp, {
                name: field,
                value: this.state[field] || "",
                onChange: this.handleChange
            })
        }
        setFieldValue = newStore => {
            this.setState(newStore)
        }
        getFieldValue = () => {
            return this.state
        }
        validateFields = callback => {
            // 定义一个简单校验
            // 校验规则this.options
            // 校验值是this.state
            let err = []
            for (let field in this.options) {
                // 判断state[field]是否是undefined
                // 如果是undefined，err.push({[field]: 'err'})
                this.state[field] === undefined && err.push({ [field]: 'err' })
            }
            if (err.length === 0) {
                // 校验成功
                callback(null, this.state)
            } else {
                callback(err, this.state)
            }
        }
        getForm = () => {
            return {
                form: {
                    getFieldDecorator: this.getFieldDecorator,
                    setFieldsValue: this.setFieldsValue,
                    getFieldValue: this.getFieldValue,
                }
            }
        }

        render() {
            return <Cmp {...this.props} {...this.getForm()} />
        }
    }
};



// function compose(...funcs) {
//     // return funcs.reduce((a, b) => (...args) => a(b(...args)))
//     return funcs.reduce((a, b) => {
//         console.log(a, b); // f1() f2()

//         return (...args) => {
//             console.log("args", ...args); // lala
//             return a(b(...args));
//         };
//     });
// }

// const f1 = (arg) => {
//     console.log("f1", arg);
// };

// const f2 = (arg) => {
//     console.log("f2", arg);
// };

// compose(f1, f2)("lala");

