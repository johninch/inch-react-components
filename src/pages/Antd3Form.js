import React, { Component } from "react";
import { createForm } from "rc-form";
import Input from "../components/Input";

// 用户自己定义state并绑定value和onChange，但这样使用很繁琐，如果有很多状态需要用户定义非常多状态
// class MyRCForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: "",
//             password: ""
//         };
//     }
//     submit = () => {
//         console.log("submit", this.state)
//     };
//     render() {
//         console.log("props", this.props)
//         const { username, password } = this.state;

//         return (
//             <div>
//                 <h3>MyRCForm</h3>
//                 <Input placeholder="Username" value={username} onChange={e => this.setState({ username: e.target.value })} />
//                 <Input placeholder="Password" value={password} onChange={e => this.setState({ password: e.target.value })} />
//                 <button onClick={this.submit}>submit</button>
//             </div>
//         );
//     }
// }

// 使用高阶组件来帮助用户管理状态
const nameRules = { required: true, message: "请输入姓名!" };
const passworRules = { required: true, message: "请输入密码!" };

@createForm()
class MyRCForm extends Component {
    componentDidMount() {
        this.props.form.setFieldsValue({ username: "default" });
    }
    submit = () => {
        const { validateFields } = this.props.form;

        validateFields((err, val) => {
            if (err) {
                console.log("err", err);
            } else {
                console.log("校验成功", val);
            }
        });
    };
    render() {
        console.log("props", this.props)
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <h3>MyRCForm</h3>
                {getFieldDecorator("username", { rules: [nameRules] })(
                    <Input placeholder="Username" />
                )}
                {getFieldDecorator("password", { rules: [passworRules] })(
                    <Input placeholder="Password" />
                )}
                <button onClick={this.submit}>submit</button>
            </div>
        );
    }
}

export default MyRCForm;

