import { TEXT, PLACEMENT } from './const'

// fiber
// type：标记当前节点的类型；
// props：属性；
// key：标记唯一性；
// child：第一个子节点；
// sibling：下一个兄弟节点；
// return：指向父节点；
// node：真实的dom节点；
// base：记录下当前的旧fiber

// 下一个要执行的fiber，数据结构就是fiber
let nextUnitOfWork = null;
// work in progress 正在进行中的，结构类型是fiber
let wipRoot = null;

function render(vnode, container) {
    wipRoot = {
        node: container,
        props: {
            children: [vnode]
        },
        base: null
    }

    nextUnitOfWork = wipRoot
    // // todo
    // // 1.vnode => node
    // const node = createNode(vnode)
    // // 2.container.appendChild(node)
    // container.appendChild(node)
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
    }
    // else if (typeof type === 'function') {
    //     // 类组件 或者 函数组件
    //     node = type.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode)
    // } else {
    //     // 空的Fragment或</>的形式，没有type
    //     node = document.createDocumentFragment()
    // }

    // // 遍历调和子节点
    // reconcileChildren(props.children, node)
    // 添加属性到真实dom上
    updateNode(node, props)

    return node
}

// function reconcileChildren(children, node) {
//     for (let i = 0; i < children.length; i++) {
//         let child = children[i]
//         // child是vnode，那需要把vnode => node，然后插入父节点node中
//         render(child, node)
//     }
// }

// 协调子节点
// 1. 给workInProgress添加一个child节点，就是children的第一个子节点形成的fiber；
// 2. 形成fiber架构，把children里节点遍历下，形成fiber链表状；
function reconcileChildren(workInProgress, children) {
    let prevSibling = null;
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        // 先只写初次渲染
        let newFiber = {
            type: child.type,
            props: child.props,
            node: null,
            base: null,
            return: workInProgress,
            effectTag: PLACEMENT
        }

        if (i === 0) {
            workInProgress.child = newFiber;
        } else {
            prevSibling.sibling = newFiber;
        }

        prevSibling = newFiber;
    }
}

function updateNode(node, nextVal) {
    Object.keys(nextVal).filter(k => k !== 'children').forEach(k => {
        node[k] = nextVal[k]
    })
}

function updateClassComponent(fiber) {
    // const { type, props } = vnode
    // const cmp = new type(props) // 类组件需要new实例
    // const vvnode = cmp.render()

    // // 返回真实dom节点
    // const node = createNode(vvnode)
    // return node
    const { type, props } = fiber
    let cmp = new type(props)
    let vvnode = cmp.render()
    const children = [vvnode]
    reconcileChildren(fiber, children)
}

function updateFunctionComponent(fiber) {
    // const { type, props } = vnode
    // const vvnode = type(props) // 函数组件直接执行返回虚拟dom

    // const node = createNode(vvnode)
    // return node
    const { type, props } = fiber
    const children = [type(props)]
    reconcileChildren(fiber, children)
}

function updateHostComponent(fiber) {
    if (!fiber.node) {
        fiber.node = createNode(fiber)
    }
    const { children } = fiber.props
    reconcileChildren(fiber, children)
}

function performUnitOfWork(fiber) {
    // step1：执行更新当前fiber
    const { type } = fiber
    if (typeof type === 'function') {
        type.isReactComponent ? updateClassComponent(fiber) : updateFunctionComponent(fiber)
    } else {
        // 原生标签的
        updateHostComponent(fiber)
    }


    // step2：并且返回下一个要执行的fiber
    // 原则就是：先看下有没有子节点
    if (fiber.child) {
        return fiber.child
    }
    // 如果没有子节点，就找兄弟节点
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.return
    }
}

function workLoop(deadline) {
    while (nextUnitOfWork && deadline.timeRemaining() > 1) {
        // 执行更新当前fiber，并且返回下一个要执行的fiber
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
    if (!nextUnitOfWork && wipRoot) {
        // 没有下一个任务了，执行提交
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

function commitRoot() {
    commitWorker(wipRoot.child);
    wipRoot = null;
}

function commitWorker(fiber) {
    if (!fiber) {
        return;
    }

    // parentNode是fiber的离得最近的dom父或祖先节点，因为有些节点是没有真实dom节点的，比如Provider，Consumer，Fragment等等
    let parentNodeFiber = fiber.return
    while (!parentNodeFiber.node) {
        parentNodeFiber = parentNodeFiber.return
    }

    const parentNode = parentNodeFiber.node
    // fiber有node节点
    if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
        parentNode.appendChild(fiber.node);
    }

    commitWorker(fiber.child)
    commitWorker(fiber.sibling)
}


requestIdleCallback(workLoop)


export default { render };
