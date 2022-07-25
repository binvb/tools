let wipRoot // jsx转换的子节点
let rootElement // 根节点容器

function jsx(type, props) {
  return ReactElement(type, props)
}

function ReactElement(type, props) {
  return {
    type,
    props
  }
}

function render(element) {
  wipRoot = element
}

function createRoot(container) {
  rootElement = container

  return {
    render
  }
}


export default {
  jsx,
  createRoot
}