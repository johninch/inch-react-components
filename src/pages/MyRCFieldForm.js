import React, { useEffect } from "react";
import Form, { Field, useForm } from "../components/my-rc-field-form/";
import Input from "../components/Input";

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

export default function MyRCFieldForm(props) {
	const [form] = useForm();

	const onFinish = (val) => {
		console.log("onFinish", val); //sy-log
	};

	// 表单校验失败执行
	const onFinishFailed = (val) => {
		console.log("onFinishFailed", val); //sy-log
	};

	useEffect(() => {
		form.setFieldsValue({ username: "default" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<h3>MyRCFieldForm</h3>
			<Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<Field name="username" rules={[nameRules]}>
					<Input placeholder="input UR Username" />
				</Field>
				<Field name="password" rules={[passworRules]}>
					<Input placeholder="input UR Password" />
				</Field>

				<button>Submit</button>
			</Form>
		</div>
	);
}

// class AntdFormPage extends Component {
//   formRef = React.createRef();

//   componentDidMount() {
//     this.formRef.current.setFieldsValue({username: "defalut"});
//   }
//   onFinish = val => {
//     console.log("onFinish", val);
//   };
//   onFinishFailed = val => {
//     console.log("onFinishFailed", val);
//   };
//   render() {
//     return (
//       <div>
//         <h3>AntdFormPage</h3>
//         <Form
//           ref={this.formRef}
//           onFinish={this.onFinish}
//           onFinishFailed={this.onFinishFailed}>
//           <FormItem name="username" label="姓名" rules={[nameRules]}>
//             <Input placeholder="username placeholder" />
//           </FormItem>
//           <FormItem name="password" label="密码" rules={[passworRules]}>
//             <Input placeholder="password placeholder" />
//           </FormItem>
//           <FormItem>
//             <Button type="primary" size="large" htmlType="submit">
//               Submit
//             </Button>
//           </FormItem>
//         </Form>
//       </div>
//     );
//   }
// }

// export default AntdFormPage;
