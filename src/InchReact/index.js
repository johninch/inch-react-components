import { TEXT } from './const'

// 把文本节点变成对象的形式，方便统一简洁处理，当然源码当中没这样做，我们是为了逻辑清晰
function createTextNode(text) {
    return {
        type: TEXT,
        props: {
            children: [],
            nodeValue: text
        }
    }
}

function createElement(type, config, ...children) {
    if (config) {
        delete config.__self
        delete config.__source
    }

    // let defaultProps = {}
    // if (type && type.defaultProps) {
    //     defaultProps = { ...type.defaultProps }
    // }

    // !源码中做了详细处理，比如过滤掉key，ref等
    const props = {
        // ...defaultProps,
        ...config,
        children: children.map(child =>
            typeof child === "object" ? child : createTextNode(child)
        )
    }

    delete props.key

    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps
        for (let propName in defaultProps) {
            if (props[propName] !== undefined) {
                props[propName] = defaultProps[propName]
            }
        }
    }

    return {
        key: config.key || '',
        type,
        props
    }
}

function cloneElement(element, config, ...children) {
    const props = Object.assign({}, element.props)

    let defaultProps = {}
    if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps
    }

    for (let propName in config) {
        if (propName !== "key" && propName !== "ref") {
            let val = config[propName] || defaultProps[propName]
            val && (props[propName] = val)
        }
    }

    return {
        key: element.key || config.key || "",
        type: element.type,
        props
    }
}

export default {
    createElement,
    cloneElement
};

