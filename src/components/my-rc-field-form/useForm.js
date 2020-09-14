import React from "react";

// 定义一个仓库
class FormStore {
    constructor(props) {
        this.store = {};

        // 存储下Field 实例
        this.fieldEntities = [];

        // 存储校验回调
        this.callbacks = {};
    }

    // 有注册（订阅），一定要有取消注册（订阅）
    registerField = (entity) => {
        this.fieldEntities.push(entity);

        return () => {
            // 取消
            this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
            delete this.store[entity.props.name];
        };
    };

    setCallback = (callback) => {
        this.callbacks = {
            ...this.callbacks,
            ...callback,
        };
    };

    // 获取store的值
    getFieldValue = (name) => {
        // 简单粗暴，不考虑安全了暂时
        return this.store[name];
    };

    // 设置this.store
    setFieldsValue = (newStore) => {
        // 把newStore更新到store中
        this.store = {
            ...this.store,
            ...newStore,
        };
        // store已经更新，下一步更新组件
        this.fieldEntities.forEach((entity) => {
            const { name } = entity.props;
            Object.keys(newStore).forEach((key) => {
                if (name === key) {
                    entity.onStoreChange();
                }
            });
        });
    };

    // 这是个简单的校验
    validate = () => {
        // 存储错误信息了，
        let err = [];
        // todo
        this.fieldEntities.forEach((entity) => {
            const { name, rules } = entity.props;
            let value = this.getFieldValue(name);
            let rule = rules && rules[0];
            if (rule && rule.required && (value === undefined || value === "")) {
                //  出错
                err.push({
                    [name]: rules.message,
                    value,
                });
            }
        });
        return err;
    };

    submit = () => {
        // 1.校验
        // 2.根据校验结果，如果校验成功，那么调用onFinish，否则失败调用onFinishFailed
        let err = this.validate();
        const { onFinish, onFinishFailed } = this.callbacks;
        if (err.length === 0) {
            onFinish(this.store);
        } else if (err.length > 0) {
            onFinishFailed(err);
        }
    };
    getForm = () => {
        return {
            submit: this.submit,
            getFieldValue: this.getFieldValue,
            setFieldsValue: this.setFieldsValue,
            registerField: this.registerField,
            setCallback: this.setCallback,
        };
    };
}

export default function useForm() {
    // 如果用一个常量保存当前store，那自定义hook每次执行都新创建一个store
    // 因此，要将当前store存到ref中，每次更新都是同一个store
    const formRef = React.useRef();
    if (!formRef.current) {
        const formStore = new FormStore();
        formRef.current = formStore.getForm();
    }

    return [formRef.current];
}
