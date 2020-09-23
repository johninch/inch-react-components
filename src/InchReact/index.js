import { TEXT } from './const'

function createElement(type, config, ...children) {
    if (config) {
        delete config.__self
        delete config.__source
    }

    let defaultProps = {}
    if (type && type.defaultProps) {
        defaultProps = { ...type.defaultProps }
    }

    // !先不考虑key和ref的特殊情况
    const props = {
        ...defaultProps,
        ...config,
        children: children.map(child =>
            typeof child === "object" ? child : createTextNode(child)
        )
    }

    return {
        type,
        props
    }
}

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

export default { createElement };

