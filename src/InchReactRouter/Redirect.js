import React, { Component } from 'react';
import { RouterContext } from './Context';
import LifeCycle from './LifeCycle';

export default class Redirect extends Component {
    // !跳转，不能在render函数里面做，因为render是返回 UI的，也就是当前组件的子节点，如果跳转走了，就没有children了
    // 应该在生命周期中跳转
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    const { to, push = false } = this.props;
                    return (
                        <LifeCycle onMount={() => {
                            push ? context.history.push(to) : context.history.replace(to);
                        }} />
                    )
                }}
            </RouterContext.Consumer>
        )
    }
}

