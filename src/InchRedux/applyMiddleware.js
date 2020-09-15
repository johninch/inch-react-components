export default function applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer)
        // 缓存原dispatch
        let dispatch = store.dispatch

        const midApi = {
            getState: store.getState,
            dispatch: action => dispatch(action) // 这里不直接用dispatch而是拷贝一份，是因为多个中间件使用同一个dispatch可能会相互影响
        }
        // 加强dispatch，使用compose将dispatch和中间件函数都执行
        const middlewareChain = middlewares.map(middleware => middleware(midApi))
        dispatch = compose(...middlewareChain)(store.dispatch)

        // 返回store，同时把dispatch加强
        return {
            ...store,
            // 返回加强版的dispatch
            dispatch
        }
    }
};

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
