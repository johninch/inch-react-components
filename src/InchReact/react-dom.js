import { TEXT } from './const'

function render(vnode, container) {
    // todo
    // 1.vnode => node
    const node = createNode(vnode)
    // 2.container.appendChild(node)
    container.appendChild(node)
}

// 生成真实dom节点
function createNode(vnode) {
    let node = null
    const { type, props } = vnode

    if (type === TEXT) {
        // 创建文本节点
        node = document.createTextNode("")
    } else if (typeof type === 'string') {
        // 证明是个html标签节点，比如div span
        node = document.createElement(type)
    } else if (typeof type === 'function') {
        // 类组件 或者 函数组件
        node = type.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode)
    } else {
        // 空的Fragment或</>的形式，没有type
        node = document.createDocumentFragment()
    }

    // 遍历调和子节点
    reconcileChildren(props.children, node)
    // 添加属性到真实dom上
    updateNode(node, props)

    return node
}

function reconcileChildren(children, node) {
    for (let i = 0; i < children.length; i++) {
        let child = children[i]
        // child是vnode，那需要把vnode => node，然后插入父节点node中
        render(child, node)
    }
}

function updateNode(node, nextVal) {
    Object.keys(nextVal).filter(k => k !== 'children').forEach(k => {
        node[k] = nextVal[k]
    })
}

function updateClassComponent(vnode) {
    const { type, props } = vnode
    const cmp = new type(props) // 类组件需要new实例
    const vvnode = cmp.render()

    // 返回真实dom节点
    const node = createNode(vvnode)
    return node
}

function updateFunctionComponent(vnode) {
    const { type, props } = vnode
    const vvnode = type(props) // 函数组件直接执行返回虚拟dom

    const node = createNode(vvnode)
    return node
}

export default { render };
