export default function createStore(reducer, enhancer) {
    if (enhancer) {
        // 增强createStore的dispatch
        return enhancer(createStore)(reducer)
    }
    let currentState
    let currentListeners = []

    // 获取状态
    function getState() {
        return currentState
    }

    // 修改状态
    function dispatch(action) {
        // 更新状态
        currentState = reducer(currentState, action)
        // 通知组件，找到订阅并触发
        currentListeners.forEach(listener => listener())
    }

    // 订阅状态
    function subscribe(listener) {
        currentListeners.push(listener)
        // 返回取消订阅函数
        return () => {
            const index = currentListeners.indexOf(listener)
            currentListeners.splice(index, 1)
        }
    }

    // 解决没有初值的问题，手动执行一次dispatch，使其走到switch default的path
    dispatch({ type: "lsfdlsflsflseifieiiii2ii23i23i" }) // 随便给个不会匹配的type即可

    return {
        getState,
        dispatch,
        subscribe
    }
};
