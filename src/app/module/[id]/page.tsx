import Link from "next/link";
import { notFound } from "next/navigation";

interface Question {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  questions: Question[];
}

// 模块数据
const moduleData: Record<string, ModuleInfo> = {
  html: {
    id: "html",
    title: "HTML",
    description: "HTML基础知识、语义化、表单等",
    icon: "🏗️",
    color: "bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
    questions: [
      { id: "1", title: "<!DOCTYPE html> 的作用是什么？", difficulty: "easy", tags: ["基础", "文档类型"] },
      { id: "2", title: "块级元素和行内元素有什么区别？举例说明。", difficulty: "easy", tags: ["基础", "元素类型"] },
      { id: "3", title: "meta viewport 标签在移动端的作用是什么？", difficulty: "easy", tags: ["移动端", "响应式"] },
      { id: "4", title: "defer 和 async 在 <script> 标签上的区别？", difficulty: "medium", tags: ["脚本加载", "性能"] },
      { id: "5", title: "在 HTML 中如何实现无障碍（Accessibility, a11y）优化？", difficulty: "medium", tags: ["无障碍", "语义化"] },
      { id: "6", title: "HTML 中的 Shadow DOM 有什么作用？", difficulty: "medium", tags: ["Web Components", "封装"] },
      { id: "7", title: "解释一下 HTML 的「内容模型」(Content Model)？", difficulty: "hard", tags: ["HTML5标准", "内容模型"] },
      { id: "8", title: "preload、prefetch、dns-prefetch、preconnect 有什么区别？", difficulty: "hard", tags: ["性能优化", "资源加载"] },
      { id: "9", title: "contenteditable 有哪些实际应用场景？需要注意什么问题？", difficulty: "hard", tags: ["富文本", "安全"] },
      { id: "10", title: "解释 HTML 解析与 CSS/JS 执行的关系，为什么说 JS 会阻塞 DOM 解析？", difficulty: "hard", tags: ["浏览器渲染", "性能"] }
    ]
  },
  vue: {
    id: "vue",
    title: "Vue",
    description: "Vue.js 框架开发",
    icon: "💚",
    color: "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    questions: [
      { id: "1", title: "Vue 的双向绑定原理是什么？", difficulty: "easy", tags: ["双向绑定", "响应式", "基础概念"] },
      { id: "2", title: "Vue 中的 v-if 和 v-show 区别是什么？", difficulty: "easy", tags: ["指令", "条件渲染", "性能"] },
      { id: "3", title: "Vue 中 computed 和 watch 区别是什么？", difficulty: "easy", tags: ["computed", "watch", "计算属性"] },
      { id: "4", title: "Vue 的父子组件如何通信？", difficulty: "medium", tags: ["组件通信", "props", "emit"] },
      { id: "5", title: "Vue 的生命周期有哪些？", difficulty: "medium", tags: ["生命周期", "钩子函数", "组件"] },
      { id: "6", title: "Vue 的虚拟 DOM 是如何 diff 的？", difficulty: "medium", tags: ["虚拟DOM", "diff算法", "性能优化"] },
      { id: "7", title: "Vue3 的 Composition API 相比 Options API 有什么优势？", difficulty: "hard", tags: ["Composition API", "Vue3", "代码组织"] },
      { id: "8", title: "Vuex 和 Pinia 的区别是什么？", difficulty: "hard", tags: ["Vuex", "Pinia", "状态管理"] },
      { id: "9", title: "Vue 中如何实现 keep-alive？其原理是什么？", difficulty: "hard", tags: ["keep-alive", "缓存", "性能优化"] },
      { id: "10", title: "Vue SSR 的原理是什么？", difficulty: "hard", tags: ["SSR", "服务端渲染", "SEO"] }
    ]
  },
  css: {
    id: "css",
    title: "CSS",
    description: "样式、布局、动画、响应式设计",
    icon: "🎨",
    color: "bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    questions: [
      { id: "1", title: "CSS 选择器的优先级规则", difficulty: "easy", tags: ["基础", "选择器"] },
      { id: "2", title: "盒模型（Box Model）是什么？IE 和标准盒模型的区别？", difficulty: "easy", tags: ["基础", "盒模型"] },
      { id: "3", title: "Flex 布局中 justify-content 和 align-items 的区别？", difficulty: "easy", tags: ["布局", "Flex"] },
      { id: "4", title: "解释一下 BFC (Block Formatting Context)，有什么应用？", difficulty: "medium", tags: ["BFC", "布局"] },
      { id: "5", title: "CSS 动画（transition 与 animation）的区别？", difficulty: "medium", tags: ["动画", "交互"] },
      { id: "6", title: "解释一下 CSS 中的层叠上下文 (Stacking Context)？", difficulty: "medium", tags: ["层叠", "z-index"] },
      { id: "7", title: "如何实现一个自适应正方形的 div？", difficulty: "hard", tags: ["布局", "自适应"] },
      { id: "8", title: "解释一下 CSS Grid 与 Flex 的区别，使用场景是什么？", difficulty: "hard", tags: ["Grid", "Flex", "布局"] },
      { id: "9", title: "在 CSS 中，will-change 的作用是什么？为什么滥用会导致性能问题？", difficulty: "hard", tags: ["性能优化", "GPU加速"] },
      { id: "10", title: "解释一下 CSS 中的\"重绘 (Repaint)\"和\"回流 (Reflow)\"。如何减少？", difficulty: "hard", tags: ["性能优化", "浏览器渲染"] }
    ]
  },
  javascript: {
    id: "javascript",
    title: "JavaScript",
    description: "ES6+、异步编程、原型链等",
    icon: "⚡",
    color: "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    questions: [
      { id: "1", title: "var、let、const 的区别是什么？", difficulty: "easy", tags: ["变量声明", "作用域", "ES6"] },
      { id: "2", title: "解释一下 JavaScript 中的闭包 (Closure)", difficulty: "easy", tags: ["闭包", "作用域", "函数"] },
      { id: "3", title: "this 在不同场景下的指向？", difficulty: "easy", tags: ["this", "上下文", "绑定"] },
      { id: "4", title: "解释事件冒泡和事件捕获，如何阻止事件冒泡？", difficulty: "medium", tags: ["DOM事件", "冒泡", "捕获"] },
      { id: "5", title: "什么是原型链 (Prototype Chain)？", difficulty: "medium", tags: ["原型", "继承", "__proto__"] },
      { id: "6", title: "解释 Promise 的三种状态，以及手写一个 Promise.all", difficulty: "medium", tags: ["Promise", "异步", "手写代码"] },
      { id: "7", title: "解释事件循环 (Event Loop)，以及执行顺序", difficulty: "hard", tags: ["Event Loop", "宏任务", "微任务"] },
      { id: "8", title: "new 运算符的实现原理？", difficulty: "hard", tags: ["new", "构造函数", "原型"] },
      { id: "9", title: "为什么 0.1 + 0.2 !== 0.3？如何解决？", difficulty: "hard", tags: ["浮点数", "精度", "Number.EPSILON"] },
      { id: "10", title: "请解释 V8 中垃圾回收 (GC) 的机制", difficulty: "hard", tags: ["垃圾回收", "V8引擎", "内存管理"] }
    ]
  },
  react: {
    id: "react",
    title: "React",
    description: "组件、Hooks、状态管理",
    icon: "⚛️",
    color: "bg-cyan-100 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800",
    questions: [
      { id: "1", title: "React 中的虚拟 DOM (Virtual DOM) 是什么？", difficulty: "easy", tags: ["虚拟DOM", "性能优化", "基础概念"] },
      { id: "2", title: "React 组件有哪几种？", difficulty: "easy", tags: ["组件类型", "函数组件", "类组件"] },
      { id: "3", title: "解释一下 JSX 是什么？", difficulty: "easy", tags: ["JSX", "语法", "编译"] },
      { id: "4", title: "React 中的 key 有什么作用？为什么不能用 index？", difficulty: "medium", tags: ["key", "列表渲染", "Diff算法"] },
      { id: "5", title: "解释一下 React 的受控组件和非受控组件", difficulty: "medium", tags: ["受控组件", "表单", "状态管理"] },
      { id: "6", title: "React Hooks 为什么不能在条件语句里调用？", difficulty: "medium", tags: ["Hooks规则", "调用顺序", "状态管理"] },
      { id: "7", title: "React 的 Fiber 架构是什么？解决了什么问题？", difficulty: "hard", tags: ["Fiber", "协调引擎", "时间切片"] },
      { id: "8", title: "React 中的 useMemo 和 useCallback 区别是什么？", difficulty: "hard", tags: ["useMemo", "useCallback", "性能优化"] },
      { id: "9", title: "React 18 引入了哪些新特性？", difficulty: "hard", tags: ["React18", "并发渲染", "新特性"] },
      { id: "10", title: "React 的服务端渲染 (SSR) 和客户端渲染 (CSR) 的区别？", difficulty: "hard", tags: ["SSR", "CSR", "渲染模式"] }
    ]
  }
};

// 为其他模块添加默认题目
const defaultQuestions: Question[] = [
  { id: "1", title: "基础概念题目1", difficulty: "easy", tags: ["基础"] },
  { id: "2", title: "进阶应用题目2", difficulty: "medium", tags: ["进阶"] },
  { id: "3", title: "高级原理题目3", difficulty: "hard", tags: ["原理"] },
  { id: "4", title: "实践应用题目4", difficulty: "medium", tags: ["实践"] },
  { id: "5", title: "综合应用题目5", difficulty: "hard", tags: ["综合"] }
];

// 安全模块题目
const securityQuestions: Question[] = [
  { id: "1", title: "什么是 XSS？防御方式？", difficulty: "medium", tags: ["XSS", "跨站脚本", "安全防护"] },
  { id: "2", title: "什么是 CSRF？防御方式？", difficulty: "medium", tags: ["CSRF", "跨站请求伪造", "Token"] },
  { id: "3", title: "什么是点击劫持？", difficulty: "medium", tags: ["点击劫持", "iframe", "X-Frame-Options"] },
  { id: "4", title: "HTTPS 为什么安全？", difficulty: "easy", tags: ["HTTPS", "TLS", "加密"] },
  { id: "5", title: "前端如何防止敏感信息泄露？", difficulty: "medium", tags: ["敏感信息", "数据安全", "HTTPS"] },
  { id: "6", title: "JWT 如何防止被伪造？", difficulty: "hard", tags: ["JWT", "签名", "认证安全"] },
  { id: "7", title: "SQL 注入攻击原理？", difficulty: "medium", tags: ["SQL注入", "参数化查询", "ORM"] },
  { id: "8", title: "CORS 中 Access-Control-Allow-Credentials 有什么用？", difficulty: "easy", tags: ["CORS", "跨域", "Cookie"] },
  { id: "9", title: "如何避免前端本地存储泄露？", difficulty: "medium", tags: ["本地存储", "数据安全", "加密"] },
  { id: "10", title: "前端防御暴力破解的手段？", difficulty: "hard", tags: ["暴力破解", "限流", "验证码"] }
];

// 工程化模块题目
const engineeringQuestions: Question[] = [
  { id: "1", title: "什么是前端工程化？", difficulty: "easy", tags: ["工程化", "构建工具", "自动化"] },
  { id: "2", title: "常见的构建工具有哪些？", difficulty: "easy", tags: ["Webpack", "Vite", "构建工具"] },
  { id: "3", title: "Tree Shaking 原理？", difficulty: "medium", tags: ["Tree Shaking", "ES Module", "优化"] },
  { id: "4", title: "什么是代码分割（Code Splitting）？", difficulty: "medium", tags: ["代码分割", "按需加载", "性能优化"] },
  { id: "5", title: "Webpack Loader 与 Plugin 区别？", difficulty: "medium", tags: ["Webpack", "Loader", "Plugin"] },
  { id: "6", title: "Babel 的作用？", difficulty: "easy", tags: ["Babel", "编译器", "ES6+"] },
  { id: "7", title: "Monorepo 与 Multirepo 区别？", difficulty: "medium", tags: ["Monorepo", "代码管理", "架构"] },
  { id: "8", title: "CI/CD 是什么？", difficulty: "easy", tags: ["CI/CD", "持续集成", "自动化"] },
  { id: "9", title: "前端常见的性能监控指标有哪些？", difficulty: "medium", tags: ["性能监控", "FCP", "LCP"] },
  { id: "10", title: "如何做前端错误监控？", difficulty: "medium", tags: ["错误监控", "异常捕获", "日志上报"] }
];

// 可视化模块题目
const visualizationQuestions: Question[] = [
  { id: "1", title: "Canvas 和 SVG 区别？", difficulty: "easy", tags: ["Canvas", "SVG", "图形渲染"] },
  { id: "2", title: "D3.js 的核心思想？", difficulty: "medium", tags: ["D3.js", "数据驱动", "DOM绑定"] },
  { id: "3", title: "ECharts 和 AntV 的区别？", difficulty: "easy", tags: ["ECharts", "AntV", "图表库"] },
  { id: "4", title: "WebGL 是什么？", difficulty: "medium", tags: ["WebGL", "3D渲染", "GPU"] },
  { id: "5", title: "Three.js 的作用？", difficulty: "easy", tags: ["Three.js", "3D开发", "WebGL封装"] },
  { id: "6", title: "数据可视化中常见的交互方式？", difficulty: "easy", tags: ["交互", "缩放", "拖拽"] },
  { id: "7", title: "虚拟化渲染（大数据表格/图表）原理？", difficulty: "hard", tags: ["虚拟化", "大数据", "性能优化"] },
  { id: "8", title: "动态大屏开发中如何保证性能？", difficulty: "hard", tags: ["大屏", "性能优化", "Canvas"] },
  { id: "9", title: "GIS 地图常用框架？", difficulty: "easy", tags: ["GIS", "地图", "Leaflet"] },
  { id: "10", title: "前端如何处理 10 万条数据的可视化？", difficulty: "hard", tags: ["大数据", "虚拟列表", "WebGL"] }
];

// 性能优化模块题目
const performanceQuestions: Question[] = [
  { id: "1", title: "什么是 Web Worker？使用场景？", difficulty: "medium", tags: ["Web Worker", "多线程", "性能优化"] },
  { id: "2", title: "什么是 Service Worker？它和 Web Worker 有什么区别？", difficulty: "medium", tags: ["Service Worker", "PWA", "离线缓存"] },
  { id: "3", title: "前端如何实现防抖（debounce）和节流（throttle）？应用场景？", difficulty: "medium", tags: ["防抖", "节流", "性能优化"] },
  { id: "4", title: "React 为什么要用虚拟 DOM？", difficulty: "medium", tags: ["虚拟DOM", "React", "性能"] },
  { id: "5", title: "Vue 和 React 的主要区别？", difficulty: "medium", tags: ["Vue", "React", "框架对比"] },
  { id: "6", title: "前端如何处理跨域？", difficulty: "medium", tags: ["跨域", "CORS", "安全"] },
  { id: "7", title: "什么是 HTTPS？它比 HTTP 安全在哪里？", difficulty: "easy", tags: ["HTTPS", "安全", "加密"] },
  { id: "8", title: "前端如何做权限控制？", difficulty: "hard", tags: ["权限控制", "安全", "路由"] },
  { id: "9", title: "WebSocket 和 SSE（Server-Sent Events）的区别？", difficulty: "hard", tags: ["WebSocket", "SSE", "实时通信"] },
  { id: "10", title: "前端如何防止内存泄漏？", difficulty: "hard", tags: ["内存泄漏", "性能优化", "垃圾回收"] }
];

// 网络协议模块题目
const networkQuestions: Question[] = [
  { id: "1", title: "HTTP1.1、HTTP2、HTTP3 区别？", difficulty: "medium", tags: ["HTTP", "协议演进", "性能优化"] },
  { id: "2", title: "什么是 TCP 三次握手？", difficulty: "easy", tags: ["TCP", "握手", "连接"] },
  { id: "3", title: "GET 和 POST 有什么区别？", difficulty: "easy", tags: ["HTTP方法", "RESTful", "幂等性"] },
  { id: "4", title: "DNS 解析过程？", difficulty: "medium", tags: ["DNS", "域名解析", "缓存"] },
  { id: "5", title: "CDN 加速原理？", difficulty: "medium", tags: ["CDN", "缓存", "边缘节点"] },
  { id: "6", title: "什么是跨域？如何解决？", difficulty: "medium", tags: ["跨域", "CORS", "同源策略"] },
  { id: "7", title: "HTTP 状态码有哪些常见的？", difficulty: "easy", tags: ["状态码", "HTTP", "响应"] },
  { id: "8", title: "Cookie、Session、Token、JWT 区别？", difficulty: "hard", tags: ["认证", "状态管理", "安全"] },
  { id: "9", title: "WebSocket 是什么？与 HTTP 区别？", difficulty: "medium", tags: ["WebSocket", "实时通信", "全双工"] },
  { id: "10", title: "什么是同源策略？", difficulty: "easy", tags: ["同源策略", "安全", "浏览器"] }
];

const allModules = [
  "html", "css", "javascript", "react", "vue", "performance", 
  "network", "security", "engineering", "visualization", 
  "browser", "typescript", "nodejs", "testing"
];

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

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // 检查模块是否存在
  if (!allModules.includes(id)) {
    notFound();
  }

  // 获取模块数据，如果没有具体数据则使用默认数据
  const moduleInfo = moduleData[id] || {
    id,
    title: id.charAt(0).toUpperCase() + id.slice(1),
    description: `${id}相关知识点和面试题目`,
    icon: "📚",
    color: "bg-gray-100 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800",
    questions: id === "performance" ? performanceQuestions : id === "network" ? networkQuestions : id === "security" ? securityQuestions : id === "engineering" ? engineeringQuestions : id === "visualization" ? visualizationQuestions : defaultQuestions
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-foreground transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{moduleInfo.icon}</span>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {moduleInfo.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {moduleInfo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              题目列表 ({moduleInfo.questions.length})
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              点击题目查看详情
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {moduleInfo.questions.map((question, index) => {
            const QuestionComponent = (id === "html" || id === "css" || id === "js" || id === "react" || id === "vue" || id === "performance" || id === "network" || id === "security" || id === "engineering" || id === "visualization") ? (
              <Link
                key={question.id}
                href={`/module/${id}/${question.id}`}
                className="block"
              >
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-500">
                          #{index + 1}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyStyle(question.difficulty)}`}>
                          {getDifficultyText(question.difficulty)}
                        </span>
                      </div>
                      <h3 className="font-medium text-foreground mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {question.title}
                      </h3>
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
                    <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={question.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group opacity-60"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-500">
                        #{index + 1}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyStyle(question.difficulty)}`}>
                        {getDifficultyText(question.difficulty)}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 text-xs rounded">
                        敬请期待
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground mb-2">
                      {question.title}
                    </h3>
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
                </div>
              </div>
            );
            
            return QuestionComponent;
          })}
        </div>

        {/* 提示信息 */}
        {(id === "html" || id === "css" || id === "js" || id === "react" || id === "vue" || id === "performance" || id === "network" || id === "security" || id === "engineering" || id === "visualization") ? (
          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="text-green-500 dark:text-green-400 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                  {id === "html" ? "HTML" : id === "css" ? "CSS" : id === "js" ? "JavaScript" : id === "react" ? "React" : id === "vue" ? "Vue" : id === "performance" ? "Performance" : id === "network" ? "Network" : id === "security" ? "Security" : id === "engineering" ? "Engineering" : "Visualization"} 模块内容已完善
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  点击任意题目可查看详细的答案和解析，包含10道从初级到高级的面试题。
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="text-blue-500 dark:text-blue-400 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  题目内容正在完善中
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  目前展示的是题目列表，具体的题目内容和答案解析将陆续添加。HTML、CSS、JavaScript、React、Vue、Performance、Network、Security、Engineering、Visualization模块已完成，其他模块敬请期待。
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// 生成静态路径
export async function generateStaticParams() {
  return allModules.map((id) => ({
    id,
  }));
}