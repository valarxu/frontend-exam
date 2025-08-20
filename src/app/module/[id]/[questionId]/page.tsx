import Link from "next/link";
import { notFound } from "next/navigation";

interface QuestionDetail {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  answer: string;
  explanation: string;
  level: string;
}

// 题目详细内容
const jsQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "var、let、const 的区别是什么？",
    difficulty: "easy",
    tags: ["变量声明", "作用域", "ES6"],
    level: "初级",
    answer: "• var: 函数作用域，存在变量提升，可重复声明\n• let: 块级作用域，不可重复声明，有暂时性死区\n• const: 块级作用域，必须初始化，引用不可变，但对象内容可修改",
    explanation: "入门必考，考察对作用域与 ES6 的理解。"
  },
  "2": {
    id: "2",
    title: "解释一下 JavaScript 中的闭包 (Closure)",
    difficulty: "easy",
    tags: ["闭包", "作用域", "函数"],
    level: "初级",
    answer: "闭包 = 函数 + 外部作用域的引用。\n\n例子：\n```js\nfunction outer() {\n  let count = 0;\n  return function inner() {\n    return ++count;\n  };\n}\nconst counter = outer();\ncounter(); // 1\ncounter(); // 2\n```",
    explanation: "初级经典题，考察对作用域和函数的理解。"
  }
};

// 工程化模块题目数据
const engineeringQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "什么是前端工程化？",
    difficulty: "easy",
    tags: ["工程化", "构建工具", "自动化"],
    level: "初级",
    answer: "使用工具、规范、自动化来提升开发效率与质量，包括构建工具、模块化、CI/CD。",
    explanation: "初级工程化概念题，考察对前端工程化整体理解。"
  },
  "2": {
    id: "2",
    title: "常见的构建工具有哪些？",
    difficulty: "easy",
    tags: ["Webpack", "Vite", "构建工具"],
    level: "初级",
    answer: "Webpack、Rollup、Vite、esbuild、Parcel。",
    explanation: "初级工具认知题，考察对主流构建工具的了解。"
  },
  "3": {
    id: "3",
    title: "Tree Shaking 原理？",
    difficulty: "medium",
    tags: ["Tree Shaking", "ES Module", "优化"],
    level: "中级",
    answer: "基于 ES Module 静态分析，删除未使用代码。",
    explanation: "中级优化原理题，考察对代码优化机制的理解。"
  },
  "4": {
    id: "4",
    title: "什么是代码分割（Code Splitting）？",
    difficulty: "medium",
    tags: ["代码分割", "按需加载", "性能优化"],
    level: "中级",
    answer: "将应用拆分为多个 chunk，按需加载，减少首屏体积。",
    explanation: "中级性能优化题，考察对代码分割策略的理解。"
  },
  "5": {
    id: "5",
    title: "Webpack Loader 与 Plugin 区别？",
    difficulty: "medium",
    tags: ["Webpack", "Loader", "Plugin"],
    level: "中级",
    answer: "Loader：转换文件。\nPlugin：扩展构建功能，生命周期钩子。",
    explanation: "中级 Webpack 概念题，考察对构建工具机制的理解。"
  },
  "6": {
    id: "6",
    title: "Babel 的作用？",
    difficulty: "easy",
    tags: ["Babel", "编译器", "ES6+"],
    level: "初级",
    answer: "JS 编译器，把 ES6+ 转为兼容性更好的 JS。",
    explanation: "初级编译工具题，考察对代码转换工具的理解。"
  },
  "7": {
    id: "7",
    title: "Monorepo 与 Multirepo 区别？",
    difficulty: "medium",
    tags: ["Monorepo", "代码管理", "架构"],
    level: "中级",
    answer: "Monorepo：一个仓库多个包，统一管理。\nMultirepo：多个独立仓库。",
    explanation: "中级架构管理题，考察对代码仓库管理策略的理解。"
  },
  "8": {
    id: "8",
    title: "CI/CD 是什么？",
    difficulty: "easy",
    tags: ["CI/CD", "持续集成", "自动化"],
    level: "初级",
    answer: "持续集成（CI）、持续交付/部署（CD），自动化测试、构建、发布。",
    explanation: "初级 DevOps 概念题，考察对自动化流程的理解。"
  },
  "9": {
    id: "9",
    title: "前端常见的性能监控指标有哪些？",
    difficulty: "medium",
    tags: ["性能监控", "FCP", "LCP"],
    level: "中级",
    answer: "FP、FCP、LCP、TTFB、CLS、FID。",
    explanation: "中级性能监控题，考察对 Web 性能指标的了解。"
  },
  "10": {
    id: "10",
    title: "如何做前端错误监控？",
    difficulty: "medium",
    tags: ["错误监控", "异常捕获", "日志上报"],
    level: "中级",
    answer: "window.onerror 捕获。\nunhandledrejection 捕获 Promise 错误。\n埋点上报日志。",
    explanation: "中级监控实践题，考察对错误处理机制的理解。"
  }
};

// 可视化模块题目数据
const visualizationQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "Canvas 和 SVG 区别？",
    difficulty: "easy",
    tags: ["Canvas", "SVG", "图形渲染"],
    level: "初级",
    answer: "Canvas：基于像素绘制，适合大量图形。\nSVG：基于 DOM 节点，适合矢量图、小规模元素。",
    explanation: "初级图形技术题，考察对不同渲染方式的理解。"
  },
  "2": {
    id: "2",
    title: "D3.js 的核心思想？",
    difficulty: "medium",
    tags: ["D3.js", "数据驱动", "DOM绑定"],
    level: "中级",
    answer: "数据驱动文档，把数据与 DOM 绑定，使用选择器和数据映射更新图形。",
    explanation: "中级可视化框架题，考察对数据驱动理念的理解。"
  },
  "3": {
    id: "3",
    title: "ECharts 和 AntV 的区别？",
    difficulty: "easy",
    tags: ["ECharts", "AntV", "图表库"],
    level: "初级",
    answer: "ECharts：配置驱动，快速上手。\nAntV：可定制性强，适合复杂场景。",
    explanation: "初级图表库对比题，考察对不同可视化工具的认知。"
  },
  "4": {
    id: "4",
    title: "WebGL 是什么？",
    difficulty: "medium",
    tags: ["WebGL", "3D渲染", "GPU"],
    level: "中级",
    answer: "基于 OpenGL ES 的浏览器 3D 渲染 API，能操作 GPU。",
    explanation: "中级 3D 技术题，考察对底层渲染技术的理解。"
  },
  "5": {
    id: "5",
    title: "Three.js 的作用？",
    difficulty: "easy",
    tags: ["Three.js", "3D开发", "WebGL封装"],
    level: "初级",
    answer: "封装 WebGL，简化 3D 开发。",
    explanation: "初级 3D 框架题，考察对 3D 开发工具的了解。"
  },
  "6": {
    id: "6",
    title: "数据可视化中常见的交互方式？",
    difficulty: "easy",
    tags: ["交互", "缩放", "拖拽"],
    level: "初级",
    answer: "缩放、拖拽、过滤、高亮、tooltip。",
    explanation: "初级交互设计题，考察对用户交互模式的理解。"
  },
  "7": {
    id: "7",
    title: "虚拟化渲染（大数据表格/图表）原理？",
    difficulty: "hard",
    tags: ["虚拟化", "大数据", "性能优化"],
    level: "高级",
    answer: "只渲染可见区域元素，滚动时动态替换。",
    explanation: "高级性能优化题，考察对大数据渲染优化的理解。"
  },
  "8": {
    id: "8",
    title: "动态大屏开发中如何保证性能？",
    difficulty: "hard",
    tags: ["大屏", "性能优化", "Canvas"],
    level: "高级",
    answer: "减少 DOM 数量。\n使用 Canvas/WebGL。\n进行分片渲染。",
    explanation: "高级大屏开发题，考察对复杂场景性能优化的理解。"
  },
  "9": {
    id: "9",
    title: "GIS 地图常用框架？",
    difficulty: "easy",
    tags: ["GIS", "地图", "Leaflet"],
    level: "初级",
    answer: "Leaflet、OpenLayers、MapboxGL、Cesium。",
    explanation: "初级地图技术题，考察对 GIS 开发工具的了解。"
  },
  "10": {
    id: "10",
    title: "前端如何处理 10 万条数据的可视化？",
    difficulty: "hard",
    tags: ["大数据", "虚拟列表", "WebGL"],
    level: "高级",
    answer: "数据抽样。\n虚拟列表。\nWeb Worker 分线程计算。\nWebGL 绘制。",
    explanation: "高级大数据处理题，考察对海量数据可视化的综合解决方案。"
  }
};




const cssQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "请解释一下 CSS 选择器的优先级规则。",
    difficulty: "easy",
    tags: ["基础", "选择器"],
    level: "初级",
    answer: "优先级计算规则：\n• 内联样式（1000）\n• ID 选择器（100）\n• 类、伪类、属性选择器（10）\n• 标签、伪元素选择器（1）\n• !important 会提升优先级，但不推荐滥用。",
    explanation: "入门必考，延伸点是\"层叠 (Cascade)\"与\"继承 (Inheritance)\"。"
  },
  "2": {
    id: "2",
    title: "盒模型（Box Model）是什么？IE 和标准盒模型的区别？",
    difficulty: "easy",
    tags: ["基础", "盒模型"],
    level: "初级",
    answer: "• 标准盒模型：width = content，不包括 padding 和 border。\n• IE 盒模型：width = content + padding + border。\n• 可通过 box-sizing: border-box; 切换。",
    explanation: "CSS 入门经典题，兼容性考点。"
  },
  "3": {
    id: "3",
    title: "Flex 布局中 justify-content 和 align-items 的区别？",
    difficulty: "easy",
    tags: ["布局", "Flex"],
    level: "初级",
    answer: "• justify-content: 主轴对齐方式。\n• align-items: 交叉轴对齐方式。",
    explanation: "考察 CSS 布局的理解，Flex 是常见面试点。"
  },
  "4": {
    id: "4",
    title: "解释一下 BFC (Block Formatting Context)，有什么应用？",
    difficulty: "medium",
    tags: ["BFC", "布局"],
    level: "中级",
    answer: "BFC 是一种独立的渲染区域，内部元素不会影响外部布局。触发条件：\n• float 非 none\n• overflow 非 visible\n• display: inline-block/flex/grid\n• position: absolute/fixed\n应用：清除浮动、防止 margin 重叠、布局隔离。",
    explanation: "中级核心题，常和浮动/清除浮动搭配考。"
  },
  "5": {
    id: "5",
    title: "CSS 动画（transition 与 animation）的区别？",
    difficulty: "medium",
    tags: ["动画", "交互"],
    level: "中级",
    answer: "• transition: 需要触发条件（hover/click），只能在两个状态之间过渡。\n• animation: 可以自动执行、循环、定义多个关键帧。",
    explanation: "考察对交互动效的理解，延伸可问\"如何优化动画性能\"。"
  },
  "6": {
    id: "6",
    title: "解释一下 CSS 中的层叠上下文 (Stacking Context)？",
    difficulty: "medium",
    tags: ["层叠", "z-index"],
    level: "中级",
    answer: "层叠上下文是一个三维的概念，决定元素在 Z 轴上的显示顺序。触发条件：\n• position: relative/absolute/fixed + z-index\n• opacity < 1\n• transform、filter 等",
    explanation: "中级进阶题，很多人对 z-index 理解不深，这是区分水平的好题。"
  },
  "7": {
    id: "7",
    title: "如何实现一个自适应正方形的 div？（宽度随父容器变化，高度保持相等）",
    difficulty: "hard",
    tags: ["布局", "自适应"],
    level: "高级",
    answer: "方法一：利用 padding-top 百分比：\n.square {\n  width: 50%;\n  padding-top: 50%; /* 高度 = 宽度 */\n  background: lightblue;\n}\n\n方法二：aspect-ratio: 1 / 1;（现代浏览器）。",
    explanation: "实战型题目，考察候选人解决问题的创造力。"
  },
  "8": {
    id: "8",
    title: "解释一下 CSS Grid 与 Flex 的区别，使用场景是什么？",
    difficulty: "hard",
    tags: ["Grid", "Flex", "布局"],
    level: "高级",
    answer: "• Flex：一维布局（行或列），元素按内容自适应。\n• Grid：二维布局（行+列），可精确控制网格区域。\n• 使用场景：\n  - Flex → 导航栏、工具栏。\n  - Grid → 复杂页面布局、响应式网格系统。",
    explanation: "高级布局题，考察对新特性的掌握。"
  },
  "9": {
    id: "9",
    title: "在 CSS 中，will-change 的作用是什么？为什么滥用会导致性能问题？",
    difficulty: "hard",
    tags: ["性能优化", "GPU加速"],
    level: "高级",
    answer: "• will-change 提示浏览器某属性将要改变，从而做优化（如开启 GPU 合成层）。\n• 滥用会导致过多图层，反而增加内存消耗，降低性能。",
    explanation: "高级性能题，区分\"会写 CSS\"与\"懂浏览器优化\"的候选人。"
  },
  "10": {
    id: "10",
    title: "解释一下 CSS 中的\"重绘 (Repaint)\"和\"回流 (Reflow)\"。如何减少？",
    difficulty: "hard",
    tags: ["性能优化", "浏览器渲染"],
    level: "高级",
    answer: "• 回流：元素尺寸、布局、隐藏显示变化时触发。\n• 重绘：元素外观（颜色、背景）改变但不影响布局时触发。\n减少方法：\n• 合并 DOM 操作（DocumentFragment、classList）。\n• 使用 transform 代替 top/left 移动。\n• 开启 GPU 加速。",
    explanation: "高级面试常问，和浏览器底层相关。"
  }
};

const vueQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "Vue 的双向绑定原理是什么？",
    difficulty: "easy",
    tags: ["双向绑定", "响应式", "基础概念"],
    level: "初级",
    answer: "Vue2：基于 `Object.defineProperty`，通过 getter/setter 劫持数据，结合发布订阅模式实现。\nVue3：基于 `Proxy`，可直接监听对象和数组的变化，性能更好。",
    explanation: "入门必考，延伸点是 Vue3 为什么重写响应式系统。"
  },
  "2": {
    id: "2",
    title: "Vue 中的 v-if 和 v-show 区别是什么？",
    difficulty: "easy",
    tags: ["指令", "条件渲染", "性能"],
    level: "初级",
    answer: "`v-if`：条件为 false 时，**不渲染 DOM 节点**，切换有性能开销。\n`v-show`：通过 `display: none` 隐藏，DOM 始终存在，切换开销小。",
    explanation: "初级常考，延伸点是\"如何选择\"。"
  },
  "3": {
    id: "3",
    title: "Vue 中 computed 和 watch 区别是什么？",
    difficulty: "easy",
    tags: ["computed", "watch", "计算属性"],
    level: "初级",
    answer: "`computed`: 基于依赖缓存，只有依赖变化时才重新计算。\n`watch`: 监听数据变化并执行回调，适合异步或开销较大的逻辑。",
    explanation: "初级题，延伸点是\"能用 computed 就不用 watch\"。"
  },
  "4": {
    id: "4",
    title: "Vue 的父子组件如何通信？",
    difficulty: "medium",
    tags: ["组件通信", "props", "emit"],
    level: "中级",
    answer: "父传子：props。\n子传父：`$emit` 触发事件。\n复杂场景：Vuex / Pinia、依赖注入 (provide/inject)、event bus。",
    explanation: "中级常考，延伸点是\"在 Vue3 中推荐用组合式 API + Pinia\"。"
  },
  "5": {
    id: "5",
    title: "Vue 的生命周期有哪些？",
    difficulty: "medium",
    tags: ["生命周期", "钩子函数", "组件"],
    level: "中级",
    answer: "Vue2：`beforeCreate → created → beforeMount → mounted → beforeUpdate → updated → beforeDestroy → destroyed`。\nVue3：`setup → onMounted → onUpdated → onUnmounted` 等。",
    explanation: "面试常考，延伸点是\"setup 相当于 beforeCreate + created\"。"
  },
  "6": {
    id: "6",
    title: "Vue 的虚拟 DOM 是如何 diff 的？",
    difficulty: "medium",
    tags: ["虚拟DOM", "diff算法", "性能优化"],
    level: "中级",
    answer: "同层比较，不跨层。\n通过 key 区分节点，提升复用效率。\nVue2：基于\"双端比较\"算法。\nVue3：引入静态标记（PatchFlag），优化更新。",
    explanation: "中级进阶题，考察对底层 diff 机制的理解。"
  },
  "7": {
    id: "7",
    title: "Vue3 的 Composition API 相比 Options API 有什么优势？",
    difficulty: "hard",
    tags: ["Composition API", "Vue3", "代码组织"],
    level: "高级",
    answer: "更好的逻辑复用（通过 hooks 抽离）。\n更灵活的组织代码（按逻辑而非生命周期）。\n更利于 TS 类型推导。",
    explanation: "高级热点题，常考\"为什么 Vue3 选择 Composition API\"。"
  },
  "8": {
    id: "8",
    title: "Vuex 和 Pinia 的区别是什么？",
    difficulty: "hard",
    tags: ["Vuex", "Pinia", "状态管理"],
    level: "高级",
    answer: "Vuex：基于 mutations/actions，结构复杂，类型推导较弱。\nPinia：Vue3 官方推荐，更轻量，支持组合式 API，天然 TS 友好。",
    explanation: "高级题，考察候选人是否跟进生态发展。"
  },
  "9": {
    id: "9",
    title: "Vue 中如何实现 keep-alive？其原理是什么？",
    difficulty: "hard",
    tags: ["keep-alive", "缓存", "性能优化"],
    level: "高级",
    answer: "`keep-alive` 是 Vue 内置组件，用于缓存组件状态。\n原理：\n使用 LRU（最近最少使用）缓存策略存储组件 vnode。\n再次渲染时直接复用缓存，避免重复创建。",
    explanation: "高级面试常问，延伸点是\"适合缓存路由组件、性能优化\"。"
  },
  "10": {
    id: "10",
    title: "Vue SSR 的原理是什么？",
    difficulty: "hard",
    tags: ["SSR", "服务端渲染", "SEO"],
    level: "高级",
    answer: "SSR（服务端渲染）：在服务端把 Vue 组件渲染为 HTML，返回给客户端。\n客户端再执行 hydration（激活），让页面可交互。\n优点：首屏快、SEO 友好。\n缺点：服务器压力大、实现复杂。",
    explanation: "高级实战题，延伸点是\"Nuxt.js 的作用\"。"
  }
};

const networkQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "HTTP1.1、HTTP2、HTTP3 区别？",
    difficulty: "medium",
    tags: ["HTTP", "协议演进", "性能优化"],
    level: "中级",
    answer: "• HTTP1.1：长连接、管道化。\n• HTTP2：二进制分帧、多路复用、头部压缩、服务器推送。\n• HTTP3：基于 QUIC(UDP)，避免 TCP 队头阻塞。",
    explanation: "高频面试题，考察网络演进。"
  },
  "2": {
    id: "2",
    title: "什么是 TCP 三次握手？",
    difficulty: "easy",
    tags: ["TCP", "握手", "连接"],
    level: "初级",
    answer: "• 第一次：客户端 → 服务端，SYN。\n• 第二次：服务端 → 客户端，SYN+ACK。\n• 第三次：客户端 → 服务端，ACK。",
    explanation: "入门必考，延伸点是四次挥手。"
  },
  "3": {
    id: "3",
    title: "GET 和 POST 有什么区别？",
    difficulty: "easy",
    tags: ["HTTP方法", "RESTful", "幂等性"],
    level: "初级",
    answer: "• GET：幂等，请求参数放 URL，大小有限制。\n• POST：非幂等，参数放请求体。",
    explanation: "基础必考，延伸点是 RESTful 语义。"
  },
  "4": {
    id: "4",
    title: "DNS 解析过程？",
    difficulty: "medium",
    tags: ["DNS", "域名解析", "缓存"],
    level: "中级",
    answer: "浏览器缓存 → 系统缓存 → 本地 hosts → 递归/迭代查询 → 根域名 → 顶级域名 → 权威域名服务器。",
    explanation: "中级网络基础题，考察对 DNS 解析流程的理解。"
  },
  "5": {
    id: "5",
    title: "CDN 加速原理？",
    difficulty: "medium",
    tags: ["CDN", "缓存", "边缘节点"],
    level: "中级",
    answer: "将静态资源缓存在边缘节点，用户请求时就近访问，减少延迟。",
    explanation: "中级性能优化题，考察对 CDN 工作原理的理解。"
  },
  "6": {
    id: "6",
    title: "什么是跨域？如何解决？",
    difficulty: "medium",
    tags: ["跨域", "CORS", "同源策略"],
    level: "中级",
    answer: "浏览器同源策略限制。\n\n解决方案：CORS / JSONP / Nginx 代理 / postMessage。",
    explanation: "中级安全题，前端开发中的常见问题。"
  },
  "7": {
    id: "7",
    title: "HTTP 状态码有哪些常见的？",
    difficulty: "easy",
    tags: ["状态码", "HTTP", "响应"],
    level: "初级",
    answer: "• 200 成功\n• 301 永久重定向\n• 302 临时重定向\n• 304 缓存\n• 401 未授权\n• 403 禁止\n• 404 未找到\n• 500 服务器错误",
    explanation: "初级基础题，HTTP 协议的基本知识。"
  },
  "8": {
    id: "8",
    title: "Cookie、Session、Token、JWT 区别？",
    difficulty: "hard",
    tags: ["认证", "状态管理", "安全"],
    level: "高级",
    answer: "• Cookie：存浏览器，用于状态保持。\n• Session：存服务端，依赖 Cookie 标识。\n• Token：无状态，客户端存储。\n• JWT：自包含的 Token，带签名。",
    explanation: "高级认证题，考察对不同认证方式的理解。"
  },
  "9": {
    id: "9",
    title: "WebSocket 是什么？与 HTTP 区别？",
    difficulty: "medium",
    tags: ["WebSocket", "实时通信", "全双工"],
    level: "中级",
    answer: "• WebSocket 是全双工通信协议，基于 TCP。\n• HTTP 是单向请求响应模式。",
    explanation: "中级实时通信题，考察对不同通信协议的理解。"
  },
  "10": {
    id: "10",
    title: "什么是同源策略？",
    difficulty: "easy",
    tags: ["同源策略", "安全", "浏览器"],
    level: "初级",
    answer: "协议、域名、端口都相同才算同源，否则受限制（如 Ajax 请求、DOM 访问）。",
    explanation: "初级安全基础题，浏览器安全机制的核心概念。"
  }
};

const securityQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "什么是 XSS？防御方式？",
    difficulty: "medium",
    tags: ["XSS", "跨站脚本", "安全防护"],
    level: "中级",
    answer: "跨站脚本攻击，注入恶意 JS。\n防御：转义输入、CSP、HttpOnly Cookie。",
    explanation: "前端安全基础题，考察对 XSS 攻击的理解和防护措施。"
  },
  "2": {
    id: "2",
    title: "什么是 CSRF？防御方式？",
    difficulty: "medium",
    tags: ["CSRF", "跨站请求伪造", "Token"],
    level: "中级",
    answer: "跨站请求伪造，攻击者诱导用户发起请求。\n防御：CSRF Token、SameSite Cookie、验证码。",
    explanation: "中级安全题，考察对 CSRF 攻击原理和防护的理解。"
  },
  "3": {
    id: "3",
    title: "什么是点击劫持？",
    difficulty: "medium",
    tags: ["点击劫持", "iframe", "X-Frame-Options"],
    level: "中级",
    answer: "通过透明 iframe 覆盖页面，引导用户点击。\n防御：X-Frame-Options: DENY。",
    explanation: "中级安全题，考察对点击劫持攻击的理解。"
  },
  "4": {
    id: "4",
    title: "HTTPS 为什么安全？",
    difficulty: "easy",
    tags: ["HTTPS", "TLS", "加密"],
    level: "初级",
    answer: "TLS 加密，防止窃听与篡改，依赖 CA 证书。",
    explanation: "初级安全基础题，考察对 HTTPS 安全机制的理解。"
  },
  "5": {
    id: "5",
    title: "前端如何防止敏感信息泄露？",
    difficulty: "medium",
    tags: ["敏感信息", "数据安全", "HTTPS"],
    level: "中级",
    answer: "• 不在前端存储明文密码。\n• 使用 HTTPS。\n• 不在代码里写死秘钥。",
    explanation: "中级安全实践题，考察对前端数据安全的理解。"
  },
  "6": {
    id: "6",
    title: "JWT 如何防止被伪造？",
    difficulty: "hard",
    tags: ["JWT", "签名", "认证安全"],
    level: "高级",
    answer: "• 使用强加密签名（HS256、RS256）。\n• 设置过期时间。\n• 服务端黑名单机制。",
    explanation: "高级安全题，考察对 JWT 安全机制的深度理解。"
  },
  "7": {
    id: "7",
    title: "SQL 注入攻击原理？",
    difficulty: "medium",
    tags: ["SQL注入", "参数化查询", "ORM"],
    level: "中级",
    answer: "拼接 SQL 字符串时注入恶意语句。\n防御：参数化查询、ORM。",
    explanation: "中级安全题，考察对 SQL 注入攻击的理解。"
  },
  "8": {
    id: "8",
    title: "CORS 中 Access-Control-Allow-Credentials 有什么用？",
    difficulty: "easy",
    tags: ["CORS", "跨域", "Cookie"],
    level: "初级",
    answer: "允许跨域请求时携带 Cookie。",
    explanation: "初级跨域题，考察对 CORS 机制的理解。"
  },
  "9": {
    id: "9",
    title: "如何避免前端本地存储泄露？",
    difficulty: "medium",
    tags: ["本地存储", "数据安全", "加密"],
    level: "中级",
    answer: "• 不存敏感数据。\n• 必要时加密存储。\n• 考虑 SessionStorage 替代。",
    explanation: "中级安全实践题，考察对前端存储安全的理解。"
  },
  "10": {
    id: "10",
    title: "前端防御暴力破解的手段？",
    difficulty: "hard",
    tags: ["暴力破解", "限流", "验证码"],
    level: "高级",
    answer: "• 限制请求频率。\n• 图形验证码 / 行为验证码。\n• 后端限流 + 黑名单。",
    explanation: "高级安全题，考察对暴力破解防护的综合理解。"
  }
};

const performanceQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "什么是 Web Worker？使用场景？",
    difficulty: "medium",
    tags: ["Web Worker", "多线程", "性能优化"],
    level: "中级",
    answer: "Web Worker 是浏览器提供的后台线程机制，可以让 JS 在不阻塞主线程的情况下执行任务。\n使用场景：大量计算（如加密、复杂算法）、预加载数据、实时分析（音频/视频处理）。",
    explanation: "中级性能优化题，考察对多线程编程的理解。"
  },
  "2": {
    id: "2",
    title: "什么是 Service Worker？它和 Web Worker 有什么区别？",
    difficulty: "medium",
    tags: ["Service Worker", "PWA", "离线缓存"],
    level: "中级",
    answer: "Service Worker 是浏览器在后台运行的脚本，可拦截网络请求、实现离线缓存、推送通知。\n区别：\nWeb Worker 只做计算，不可拦截请求。\nService Worker 生命周期独立于页面，常用于 PWA（渐进式 Web 应用）。",
    explanation: "中级PWA相关题，延伸点是离线缓存策略。"
  },
  "3": {
    id: "3",
    title: "前端如何实现防抖（debounce）和节流（throttle）？应用场景？",
    difficulty: "medium",
    tags: ["防抖", "节流", "性能优化"],
    level: "中级",
    answer: "防抖（debounce）：一段时间内只执行最后一次，比如输入框搜索。\n节流（throttle）：固定间隔执行一次，比如滚动监听、窗口 resize。\n实现方式：`setTimeout` 或 `时间戳` 控制。",
    explanation: "中级常考性能优化题，实际开发中经常用到。"
  },
  "4": {
    id: "4",
    title: "React 为什么要用虚拟 DOM？",
    difficulty: "medium",
    tags: ["虚拟DOM", "React", "性能"],
    level: "中级",
    answer: "真实 DOM 操作代价高。\n虚拟 DOM 是 JS 对象，更新快，通过 diff 算法计算最小更新路径，再更新真实 DOM，减少重排重绘。",
    explanation: "中级React核心概念题，延伸点是diff算法原理。"
  },
  "5": {
    id: "5",
    title: "Vue 和 React 的主要区别？",
    difficulty: "medium",
    tags: ["Vue", "React", "框架对比"],
    level: "中级",
    answer: "Vue：模板 + 响应式数据绑定，学习曲线平缓。\nReact：JSX + Hooks，更自由灵活，需要工程化。\nDiff 算法差异：Vue 是\"双端比较\"，React 是\"从左到右\"。",
    explanation: "中级框架对比题，考察对两大框架的理解深度。"
  },
  "6": {
    id: "6",
    title: "前端如何处理跨域？",
    difficulty: "medium",
    tags: ["跨域", "CORS", "安全"],
    level: "中级",
    answer: "CORS（设置响应头 `Access-Control-Allow-Origin`）。\nJSONP（只能 GET）。\n代理转发（Nginx，Webpack devServer）。\npostMessage（iframe 跨域通信）。",
    explanation: "中级网络安全题，实际开发中的常见问题。"
  },
  "7": {
    id: "7",
    title: "什么是 HTTPS？它比 HTTP 安全在哪里？",
    difficulty: "easy",
    tags: ["HTTPS", "安全", "加密"],
    level: "初级",
    answer: "HTTPS = HTTP + TLS/SSL。\n安全性：\n加密：防止中间人窃听。\n完整性：防止数据篡改。\n身份验证：证书保证网站真实身份。",
    explanation: "初级网络安全基础题，现代Web开发必备知识。"
  },
  "8": {
    id: "8",
    title: "前端如何做权限控制？",
    difficulty: "hard",
    tags: ["权限控制", "安全", "路由"],
    level: "高级",
    answer: "路由权限：前端根据用户角色过滤路由。\n按钮权限：根据角色隐藏/禁用按钮。\n接口权限：后端返回鉴权信息，前端做 UI 层展示控制。",
    explanation: "高级实战题，考察对前端安全架构的理解。"
  },
  "9": {
    id: "9",
    title: "WebSocket 和 SSE（Server-Sent Events）的区别？",
    difficulty: "hard",
    tags: ["WebSocket", "SSE", "实时通信"],
    level: "高级",
    answer: "WebSocket：双向通信，适合聊天、游戏。\nSSE：单向，服务器推送数据给客户端，适合新闻推送、实时行情。\n区别：SSE 基于 HTTP，兼容性更好；WebSocket 更灵活，但需要协议支持。",
    explanation: "高级实时通信题，考察对不同通信方式的选择。"
  },
  "10": {
    id: "10",
    title: "前端如何防止内存泄漏？",
    difficulty: "hard",
    tags: ["内存泄漏", "性能优化", "垃圾回收"],
    level: "高级",
    answer: "避免全局变量滥用。\n清理定时器、事件监听器。\n使用弱引用（WeakMap、WeakSet）。\n单页应用（SPA）中，组件销毁时清理副作用。",
    explanation: "高级性能优化题，考察对内存管理的深度理解。"
  }
};

const reactQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "React 中的虚拟 DOM (Virtual DOM) 是什么？",
    difficulty: "easy",
    tags: ["虚拟DOM", "性能优化", "基础概念"],
    level: "初级",
    answer: "虚拟 DOM 是用 JavaScript 对象描述真实 DOM 的结构，更新时通过 Diff 算法找出最小的变更，然后批量更新到真实 DOM。",
    explanation: "入门必考，延伸点是\"虚拟 DOM 相比直接操作 DOM 的优势：性能优化、跨平台（React Native）\"。"
  },
  "2": {
    id: "2",
    title: "React 组件有哪几种？",
    difficulty: "easy",
    tags: ["组件类型", "函数组件", "类组件"],
    level: "初级",
    answer: "函数组件（Function Component）\n类组件（Class Component）\n高阶组件（HOC, Higher-Order Component）\n受控组件 vs 非受控组件",
    explanation: "初级考点，重点在于区分类组件和函数组件，以及 hooks 取代类生命周期的趋势。"
  },
  "3": {
    id: "3",
    title: "解释一下 JSX 是什么？",
    difficulty: "easy",
    tags: ["JSX", "语法", "编译"],
    level: "初级",
    answer: "JSX 是 JavaScript 的语法扩展，允许在 JS 中写类似 HTML 的结构。\n底层会被 Babel 编译为 React.createElement 调用。\n例如：\nconst el = <h1>Hello</h1>;\n// 编译后\nconst el = React.createElement(\"h1\", null, \"Hello\");",
    explanation: "入门常见题，关键点是\"JSX 并不是 HTML\"。"
  },
  "4": {
    id: "4",
    title: "React 中的 key 有什么作用？为什么不能用 index？",
    difficulty: "medium",
    tags: ["key", "列表渲染", "Diff算法"],
    level: "中级",
    answer: "key 用于标识列表中元素，帮助 React 判断哪些节点需要更新/复用/删除。\n用 index 作为 key 会导致：\n插入/删除时引发错误复用，影响性能和 UI 状态。",
    explanation: "中级经典题，延伸点是\"React Diff 算法\"。"
  },
  "5": {
    id: "5",
    title: "解释一下 React 的受控组件和非受控组件",
    difficulty: "medium",
    tags: ["受控组件", "表单", "状态管理"],
    level: "中级",
    answer: "受控组件：表单输入值由 React 状态控制（value+onChange）。\n非受控组件：通过 ref 直接访问 DOM 元素获取值。",
    explanation: "中级考点，延伸点是\"受控组件利于状态同步，非受控组件利于性能\"。"
  },
  "6": {
    id: "6",
    title: "React Hooks 为什么不能在条件语句里调用？",
    difficulty: "medium",
    tags: ["Hooks规则", "调用顺序", "状态管理"],
    level: "中级",
    answer: "因为 Hooks 依赖调用顺序，React 内部通过链表存储 hooks，如果条件语句里改变调用顺序，会导致 hooks 状态错乱。",
    explanation: "中级面试必考，延伸点是\"React Hooks 的规则\"。"
  },
  "7": {
    id: "7",
    title: "React 的 Fiber 架构是什么？解决了什么问题？",
    difficulty: "hard",
    tags: ["Fiber", "协调引擎", "时间切片"],
    level: "高级",
    answer: "Fiber 是 React 16 引入的新的协调引擎，基于链表结构。\n解决问题：\n将渲染任务拆分为可中断的小任务（时间切片）。\n允许优先级调度，保证流畅的用户交互。",
    explanation: "高级面试杀手题，核心是\"可中断渲染 + 优先级调度\"。"
  },
  "8": {
    id: "8",
    title: "React 中的 useMemo 和 useCallback 区别是什么？",
    difficulty: "hard",
    tags: ["useMemo", "useCallback", "性能优化"],
    level: "高级",
    answer: "useMemo: 缓存 计算结果。\nuseCallback: 缓存 函数引用。\n例子：\nconst memoValue = useMemo(() => compute(a, b), [a, b]);\nconst memoFn = useCallback(() => handleClick(id), [id]);",
    explanation: "高级常考，延伸点是\"过度使用可能导致性能下降\"。"
  },
  "9": {
    id: "9",
    title: "React 18 引入了哪些新特性？",
    difficulty: "hard",
    tags: ["React18", "并发渲染", "新特性"],
    level: "高级",
    answer: "自动批处理 (Automatic Batching)。\n并发渲染 (Concurrent Rendering)。\nuseId：生成唯一 ID。\nstartTransition：标记非紧急更新。\nSuspense 在 SSR 支持更完善。",
    explanation: "高级热点题，考察候选人是否跟进新版本。"
  },
  "10": {
    id: "10",
    title: "React 的服务端渲染 (SSR) 和客户端渲染 (CSR) 的区别？",
    difficulty: "hard",
    tags: ["SSR", "CSR", "渲染模式"],
    level: "高级",
    answer: "CSR：由浏览器执行 JS 渲染页面，首次加载慢，但交互流畅。\nSSR：由服务器生成 HTML 返回，首屏快，利于 SEO，但服务端压力大。\n混合模式：Next.js 提供的 SSG、ISR。",
    explanation: "高级实战题，延伸点是\"如何选择合适的渲染模式\"。"
  }
};

const htmlQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "<!DOCTYPE html> 的作用是什么？",
    difficulty: "easy",
    tags: ["基础", "文档类型"],
    level: "初级",
    answer: "它告诉浏览器当前文档使用的 HTML 标准版本。HTML5 中写法统一为 <!DOCTYPE html>。如果缺失，会进入\"怪异模式\"，导致 CSS 渲染不一致。",
    explanation: "这是前端最基础的知识点，主要考察对文档标准模式与兼容模式的理解。"
  },
  "2": {
    id: "2",
    title: "块级元素和行内元素有什么区别？举例说明。",
    difficulty: "easy",
    tags: ["基础", "元素类型"],
    level: "初级",
    answer: "块级元素（div、p、section）：独占一行，可设置宽高。\n行内元素（span、a、strong）：不独占一行，宽高随内容。",
    explanation: "初级常见考点，延伸点是\"行内块元素（inline-block）\"和 BFC（块级格式化上下文）。"
  },
  "3": {
    id: "3",
    title: "meta viewport 标签在移动端的作用是什么？",
    difficulty: "easy",
    tags: ["移动端", "响应式"],
    level: "初级",
    answer: "用于控制页面在移动设备上的缩放和宽度适配。常见写法：\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
    explanation: "考察对响应式设计的理解。可延伸讨论 DPR（设备像素比）。"
  },
  "4": {
    id: "4",
    title: "defer 和 async 在 <script> 标签上的区别？",
    difficulty: "medium",
    tags: ["脚本加载", "性能"],
    level: "中级",
    answer: "async: 下载和解析 HTML 并行，下载完成立即执行，可能阻塞渲染。\ndefer: 下载与解析并行，但会在 HTML 解析完成后、DOMContentLoaded 前按顺序执行。",
    explanation: "重点是\"执行时机不同\"，常考点。"
  },
  "5": {
    id: "5",
    title: "在 HTML 中如何实现无障碍（Accessibility, a11y）优化？",
    difficulty: "medium",
    tags: ["无障碍", "语义化"],
    level: "中级",
    answer: "• 使用语义化标签（header、nav、article）。\n• 使用 alt 提供图片替代文本。\n• 使用 aria- 属性增强可访问性。\n• 保证键盘可操作性（tab 键）。",
    explanation: "中级偏软性问题，考察候选人对\"语义化\"和\"用户体验\"的理解。"
  },
  "6": {
    id: "6",
    title: "HTML 中的 Shadow DOM 有什么作用？",
    difficulty: "medium",
    tags: ["Web Components", "封装"],
    level: "中级",
    answer: "Shadow DOM 是 Web Components 技术之一，用于封装组件内部 DOM 和样式，避免样式冲突。\n例如：\nconst shadow = element.attachShadow({ mode: 'open' });",
    explanation: "中级往高级过渡题，考察对 Web Components 的掌握。"
  },
  "7": {
    id: "7",
    title: "解释一下 HTML 的\"内容模型\"(Content Model)？",
    difficulty: "hard",
    tags: ["HTML5标准", "内容模型"],
    level: "高级",
    answer: "HTML5 将元素分为不同的内容模型类别，如：\n• Metadata content\n• Flow content\n• Sectioning content\n• Phrasing content\n• Embedded content",
    explanation: "高级题，几乎不常问，但能体现候选人对 HTML5 标准的深度理解。"
  },
  "8": {
    id: "8",
    title: "preload、prefetch、dns-prefetch、preconnect 有什么区别？",
    difficulty: "hard",
    tags: ["性能优化", "资源加载"],
    level: "高级",
    answer: "• preload: 告诉浏览器立即加载资源。\n• prefetch: 低优先级下载，未来可能会用。\n• dns-prefetch: 提前做 DNS 解析。\n• preconnect: 提前建立 TCP/SSL 连接。",
    explanation: "这是优化型题目，偏高级，考察对性能优化与浏览器机制的理解。"
  },
  "9": {
    id: "9",
    title: "contenteditable 有哪些实际应用场景？需要注意什么问题？",
    difficulty: "hard",
    tags: ["富文本", "安全"],
    level: "高级",
    answer: "场景：富文本编辑器、即时编辑表格。\n注意事项：\n• 默认输入的 HTML 可能包含潜在 XSS 风险。\n• 不同浏览器对 contenteditable 行为不一致。",
    explanation: "高级题，结合安全和跨浏览器兼容。"
  },
  "10": {
    id: "10",
    title: "解释 HTML 解析与 CSS/JS 执行的关系，为什么说 JS 会阻塞 DOM 解析？",
    difficulty: "hard",
    tags: ["浏览器渲染", "性能"],
    level: "高级",
    answer: "浏览器解析 HTML 遇到 JS，会停止 DOM 构建，先下载并执行脚本。\n这是因为 JS 可能修改 DOM 结构（document.write）。\n可通过 defer/async 或将 JS 放在 </body> 前缓解阻塞。",
    explanation: "高级题，直击\"浏览器渲染机制\"核心。"
  }
};

// 获取难度对应的样式
const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "hard":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

// 获取难度中文名称
const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "简单";
    case "medium":
      return "中等";
    case "hard":
      return "困难";
    default:
      return "未知";
  }
};

export default async function QuestionPage({ 
  params 
}: { 
  params: Promise<{ id: string; questionId: string }> 
}) {
  const { id, questionId } = await params;
  
  let question: QuestionDetail | undefined;
  
  if (id === "html") {
    question = htmlQuestions[questionId];
  } else if (id === "css") {
    question = cssQuestions[questionId];
  } else if (id === "js") {
    question = jsQuestions[questionId];
  } else if (id === "react") {
     question = reactQuestions[questionId];
   } else if (id === "vue") {
     question = vueQuestions[questionId];
   } else if (id === "performance") {
     question = performanceQuestions[questionId];
   } else if (id === "network") {
     question = networkQuestions[questionId];
   } else if (id === "security") {
      question = securityQuestions[questionId];
    } else if (id === "engineering") {
      question = engineeringQuestions[questionId];
    } else if (id === "visualization") {
      question = visualizationQuestions[questionId];
    } else {
      notFound();
    }

  if (!question) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link 
              href={`/module/${id}`}
              className="text-gray-500 hover:text-foreground transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🏗️</span>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {id.toUpperCase()} 题目详情
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  第 {question.id} 题 · {question.level}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Question Header */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-500">
                Q{question.id}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyStyle(question.difficulty)}`}>
                {getDifficultyText(question.difficulty)}
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded-full font-medium">
                {question.level}
              </span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {question.title}
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Answer Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            答案
          </h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
              {question.answer}
            </pre>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <span className="text-blue-500 mr-2">💡</span>
            解析
          </h3>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-sm text-foreground leading-relaxed">
              {question.explanation}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <div>
            {parseInt(question.id) > 1 && (
              <Link
                href={`/module/${id}/${parseInt(question.id) - 1}`}
                className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                上一题
              </Link>
            )}
          </div>
          <div>
            {parseInt(question.id) < 10 && (
              <Link
                href={`/module/${id}/${parseInt(question.id) + 1}`}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                下一题
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// 生成静态路径
export async function generateStaticParams() {
  const paths = [];
  
  // 为HTML模块生成所有题目路径
  for (let i = 1; i <= 10; i++) {
    paths.push({
      id: "html",
      questionId: i.toString()
    });
  }
  
  // 为CSS模块生成所有题目路径
  for (let i = 1; i <= 10; i++) {
    paths.push({
      id: "css",
      questionId: i.toString()
    });
  }
  
  // 为JavaScript模块生成所有题目路径
  for (let i = 1; i <= 10; i++) {
    paths.push({
      id: "js",
      questionId: i.toString()
    });
  }
  
  // 为React模块生成所有题目路径
   for (let i = 1; i <= 10; i++) {
     paths.push({
       id: "react",
       questionId: i.toString()
     });
   }
   
   // 为Vue模块生成所有题目路径
   for (let i = 1; i <= 10; i++) {
     paths.push({
       id: "vue",
       questionId: i.toString()
     });
   }
   
   // 为网站性能模块生成所有题目路径
   for (let i = 1; i <= 10; i++) {
     paths.push({
       id: "performance",
       questionId: i.toString()
     });
   }
   
   // 为网络协议模块生成所有题目路径
   for (let i = 1; i <= 10; i++) {
     paths.push({
       id: "network",
       questionId: i.toString()
     });
   }
   
   // 为安全模块生成所有题目路径
    for (let i = 1; i <= 10; i++) {
      paths.push({
        id: "security",
        questionId: i.toString()
      });
    }
    
    // 为工程化模块生成所有题目路径
    for (let i = 1; i <= 10; i++) {
      paths.push({
        id: "engineering",
        questionId: i.toString()
      });
    }
    
    // 为可视化模块生成所有题目路径
    for (let i = 1; i <= 10; i++) {
      paths.push({
        id: "visualization",
        questionId: i.toString()
      });
    }
   
   return paths;
}