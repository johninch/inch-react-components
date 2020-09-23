class Component {
    // 之所以定义成静态方法，是要在实例化之前使用Component.isReactComponent来判断组件类型
    // 如果写成实例方法，那就必须先实例化再使用，显然是不合理的
    static isReactComponent = {

    }

    constructor(props) {
        this.props = props
    }
}

// 写成函数组件也可以
// function Component(props) {
//     this.props = props
// }

export default Component;
