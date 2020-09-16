import React, { useLayoutEffect, useReducer, useContext } from 'react';

// ! step1: 创建一个context对象
const Context = React.createContext();

// ! step2: 使用Context.Provider把store传递下来
export function Provider({ store, children }) {
    return <Context.Provider value={store}>{children}</Context.Provider>
}

// ! step3: 利用connect得到新组建，新组建上有state和dispatch
// mapStateToProps: function
// mapDispatchToProps: object|function
export const connect = (mapStateToProps = state => state, mapDispatchToProps) => WrappedComponent => props => {
    // 获取store
    const store = React.useConnect(Context);
    const { dispatch, getState, subscribe } = store;
    // todo 给新返回的组件的props上加上store state 和 dispatch，这个dispatch不是特指dispatch方法
    const stateProps = mapStateToProps(getState());

    // 默认dispatchProps
    let dispatchProps = {
        dispatch
    }
    if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    } else if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch)
    }

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            // 执行组件更新 forceUpdate
            forceUpdate();
        })

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, [store])

    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
}



function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
    let obj = {};

    for (let key in creators) {
        obj[key] = bindActionCreator(creators[key], dispatch)
    }

    return obj;
};

// ! step3: 或者使用自定义hook
// 自定义hook useSelector
export function useSelector(selector) {
    // 获取store state
    const store = useStore();
    const selectedState = selector(store.getState());

    // 需要订阅，才能使下面的dispatch更新
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useLayoutEffect(() => {
        const unsubscribe = store.subscribe(() => {
            // 执行组件更新 forceUpdate
            forceUpdate();
        })

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, [store])

    return selectedState
};

function useStore() {
    const store = useContext(Context);
    return store
}

// 自定义hook useDispatch
export function useDispatch() {
    const store = useStore();
    return store.dispatch;
}
// 为什么不在 useDispatch 当中执行订阅呢？
// 因为dispatch会多次执行，每次都订阅会有问题


