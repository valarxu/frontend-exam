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

// JavaScript 模块题目数据
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

// 浏览器底层模块题目数据
const browserQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "浏览器渲染流程？",
    difficulty: "easy",
    tags: ["渲染流程", "DOM", "CSSOM"],
    level: "初级",
    answer: "解析 HTML → 构建 DOM → 构建 CSSOM → 合成渲染树 → Layout → Paint → Composite。",
    explanation: "初级浏览器渲染题，考察对浏览器工作原理的理解。"
  },
  "2": {
    id: "2",
    title: "重排（Reflow）与重绘（Repaint）区别？",
    difficulty: "medium",
    tags: ["重排", "重绘", "性能优化"],
    level: "中级",
    answer: "重排：重新计算布局。\n\n重绘：样式变化但不影响布局。",
    explanation: "中级性能优化题，考察对浏览器渲染机制的理解。"
  },
  "3": {
    id: "3",
    title: "什么是事件循环（Event Loop）？",
    difficulty: "medium",
    tags: ["事件循环", "异步", "宏任务"],
    level: "中级",
    answer: "JS 单线程执行，宏任务（setTimeout、script）、微任务（Promise.then）依次执行。",
    explanation: "中级异步编程题，考察对 JavaScript 执行机制的理解。"
  },
  "4": {
    id: "4",
    title: "什么是回流优化？",
    difficulty: "medium",
    tags: ["回流优化", "性能", "DOM操作"],
    level: "中级",
    answer: "合并多次 DOM 操作。\n\n使用 documentFragment。\n\n使用 transform 替代 top/left。",
    explanation: "中级性能优化题，考察对 DOM 操作优化的理解。"
  },
  "5": {
    id: "5",
    title: "浏览器缓存策略有哪些？",
    difficulty: "medium",
    tags: ["缓存", "HTTP", "性能优化"],
    level: "中级",
    answer: "强缓存：Expires、Cache-Control。\n\n协商缓存：ETag、Last-Modified。",
    explanation: "中级缓存机制题，考察对 HTTP 缓存策略的理解。"
  },
  "6": {
    id: "6",
    title: "浏览器的垃圾回收机制？",
    difficulty: "medium",
    tags: ["垃圾回收", "内存管理", "V8"],
    level: "中级",
    answer: "标记清除。\n\n引用计数。\n\nV8 优化：分代回收。",
    explanation: "中级内存管理题，考察对垃圾回收机制的理解。"
  },
  "7": {
    id: "7",
    title: "浏览器如何实现多进程架构？",
    difficulty: "hard",
    tags: ["多进程", "架构", "安全"],
    level: "高级",
    answer: "主进程：控制渲染进程、插件进程。\n\n渲染进程：执行 JS、渲染页面。",
    explanation: "高级架构题，考察对浏览器进程模型的理解。"
  },
  "8": {
    id: "8",
    title: "什么是预加载（Preload）与预渲染（Prerender）？",
    difficulty: "hard",
    tags: ["预加载", "预渲染", "性能优化"],
    level: "高级",
    answer: "Preload：提前下载资源。\n\nPrerender：后台渲染页面，加快切换。",
    explanation: "高级性能优化题，考察对资源加载优化的理解。"
  },
  "9": {
    id: "9",
    title: "什么是合成层（Composite Layer）？",
    difficulty: "hard",
    tags: ["合成层", "GPU加速", "渲染优化"],
    level: "高级",
    answer: "GPU 加速渲染层，减少重排重绘，常见触发条件：transform: translateZ(0)。",
    explanation: "高级渲染优化题，考察对 GPU 加速的理解。"
  },
  "10": {
    id: "10",
    title: "浏览器中的安全沙箱机制？",
    difficulty: "hard",
    tags: ["安全", "沙箱", "隔离"],
    level: "高级",
    answer: "隔离不同网页、iframe，防止恶意代码影响系统。",
    explanation: "高级安全题，考察对浏览器安全机制的理解。"
  }
};

// TypeScript 模块题目数据
const typescriptQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "TS 和 JS 区别？",
    difficulty: "easy",
    tags: ["TypeScript", "静态类型", "基础"],
    level: "初级",
    answer: "TS 是 JS 的超集，支持静态类型检查、接口、泛型。",
    explanation: "初级 TypeScript 概念题，考察对类型系统的理解。"
  },
  "2": {
    id: "2",
    title: "TS 中的 interface 和 type 区别？",
    difficulty: "medium",
    tags: ["interface", "type", "类型定义"],
    level: "中级",
    answer: "interface：可继承、可合并。\n\ntype：可用于联合、交叉类型，功能更强。",
    explanation: "中级类型定义题，考察对 TypeScript 类型系统的深入理解。"
  },
  "3": {
    id: "3",
    title: "TS 的泛型是什么？",
    difficulty: "medium",
    tags: ["泛型", "类型参数", "复用"],
    level: "中级",
    answer: "定义时不指定具体类型，使用时传入。\n例：function identity<T>(arg: T): T { return arg; }",
    explanation: "中级泛型题，考察对类型参数化的理解。"
  },
  "4": {
    id: "4",
    title: "TS 中的 any、unknown、never 区别？",
    difficulty: "medium",
    tags: ["any", "unknown", "never"],
    level: "中级",
    answer: "any：任意类型，关闭检查。\n\nunknown：类型安全的 any，需断言后使用。\n\nnever：不可能有值（如抛错）。",
    explanation: "中级类型系统题，考察对特殊类型的理解。"
  },
  "5": {
    id: "5",
    title: "TS 中的交叉类型和联合类型？",
    difficulty: "medium",
    tags: ["交叉类型", "联合类型", "类型组合"],
    level: "中级",
    answer: "联合：A | B。\n\n交叉：A & B。",
    explanation: "中级类型组合题，考察对复合类型的理解。"
  },
  "6": {
    id: "6",
    title: "TS 如何做类型守卫？",
    difficulty: "medium",
    tags: ["类型守卫", "类型检查", "安全"],
    level: "中级",
    answer: "typeof、instanceof、in\n\n自定义类型保护函数：arg is Type",
    explanation: "中级类型安全题，考察对类型守卫机制的理解。"
  },
  "7": {
    id: "7",
    title: "什么是声明文件（.d.ts）？",
    difficulty: "easy",
    tags: ["声明文件", "类型声明", "第三方库"],
    level: "初级",
    answer: "提供类型声明，使 JS 库可以在 TS 中使用。",
    explanation: "初级工具使用题，考察对类型声明的理解。"
  },
  "8": {
    id: "8",
    title: "TS 中的 utility types（工具类型）有哪些？",
    difficulty: "hard",
    tags: ["工具类型", "类型操作", "高级"],
    level: "高级",
    answer: "Partial、Required、Readonly、Pick、Omit、Record、ReturnType 等。",
    explanation: "高级类型操作题，考察对内置工具类型的掌握。"
  },
  "9": {
    id: "9",
    title: "TS 中的 keyof、typeof、in 用法？",
    difficulty: "hard",
    tags: ["keyof", "typeof", "in"],
    level: "高级",
    answer: "keyof：取对象 key 联合类型。\n\ntypeof：获取变量类型。\n\nin：类型映射。",
    explanation: "高级类型操作题，考察对类型操作符的理解。"
  },
  "10": {
    id: "10",
    title: "TS 如何实现条件类型？",
    difficulty: "hard",
    tags: ["条件类型", "类型推断", "高级"],
    level: "高级",
    answer: "语法：T extends U ? X : Y。",
    explanation: "高级类型系统题，考察对条件类型的理解。"
  }
};

// Node.js 模块题目数据
const nodejsQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "Node.js 的特点？",
    difficulty: "easy",
    tags: ["Node.js", "事件驱动", "非阻塞IO"],
    level: "初级",
    answer: "事件驱动、非阻塞 I/O、单线程。",
    explanation: "初级 Node.js 概念题，考察对 Node.js 核心特性的理解。"
  },
  "2": {
    id: "2",
    title: "CommonJS 与 ES Module 区别？",
    difficulty: "medium",
    tags: ["CommonJS", "ES Module", "模块系统"],
    level: "中级",
    answer: "CommonJS：同步加载，运行时导入。\n\nESM：静态分析，编译时导入。",
    explanation: "中级模块系统题，考察对不同模块规范的理解。"
  },
  "3": {
    id: "3",
    title: "Node.js 的事件循环与浏览器有何不同？",
    difficulty: "hard",
    tags: ["事件循环", "微任务", "nextTick"],
    level: "高级",
    answer: "Node 有微任务队列，还分 nextTick 队列 和 Promise 队列。",
    explanation: "高级事件循环题，考察对 Node.js 事件循环机制的深入理解。"
  },
  "4": {
    id: "4",
    title: "什么是中间件？Express/Koa 如何实现？",
    difficulty: "medium",
    tags: ["中间件", "Express", "Koa"],
    level: "中级",
    answer: "中间件是请求处理函数链，Koa 使用 async/await 洋葱模型。",
    explanation: "中级框架题，考察对中间件模式的理解。"
  },
  "5": {
    id: "5",
    title: "Node.js 如何处理高并发？",
    difficulty: "medium",
    tags: ["高并发", "事件循环", "Cluster"],
    level: "中级",
    answer: "事件循环 + 非阻塞 I/O。\n\n负载均衡（Cluster）。",
    explanation: "中级性能题，考察对 Node.js 并发处理的理解。"
  },
  "6": {
    id: "6",
    title: "什么是 Stream？",
    difficulty: "medium",
    tags: ["Stream", "数据流", "管道"],
    level: "中级",
    answer: "Node.js 的数据流处理，边读边写，分为 Readable/Writable/Duplex/Transform。",
    explanation: "中级流处理题，考察对 Node.js 流的理解。"
  },
  "7": {
    id: "7",
    title: "什么是 Buffer？",
    difficulty: "easy",
    tags: ["Buffer", "二进制", "内存"],
    level: "初级",
    answer: "Node 的二进制数据结构，存储在 V8 堆外内存。",
    explanation: "初级数据结构题，考察对 Buffer 的理解。"
  },
  "8": {
    id: "8",
    title: "如何实现文件上传？",
    difficulty: "medium",
    tags: ["文件上传", "multipart", "multer"],
    level: "中级",
    answer: "前端 multipart/form-data。\n\nNode 使用 multer、busboy 解析。",
    explanation: "中级实战题，考察对文件上传机制的理解。"
  },
  "9": {
    id: "9",
    title: "Node.js 如何连接数据库？",
    difficulty: "easy",
    tags: ["数据库", "MySQL", "MongoDB"],
    level: "初级",
    answer: "MySQL：mysql2。\n\nMongoDB：mongoose。",
    explanation: "初级数据库连接题，考察对常用数据库驱动的了解。"
  },
  "10": {
    id: "10",
    title: "如何做 Node.js 错误处理？",
    difficulty: "hard",
    tags: ["错误处理", "异常捕获", "进程守护"],
    level: "高级",
    answer: "try/catch 捕获同步错误。\n\nPromise.catch 处理异步。\n\n监听 uncaughtException，但推荐进程守护。",
    explanation: "高级错误处理题，考察对 Node.js 异常处理机制的理解。"
  }
};

// 测试模块题目数据
const testQuestions: Record<string, QuestionDetail> = {
  "1": {
    id: "1",
    title: "前端测试分类？",
    difficulty: "easy",
    tags: ["测试分类", "单元测试", "集成测试"],
    level: "初级",
    answer: "单元测试、集成测试、端到端测试(E2E)。",
    explanation: "初级测试概念题，考察对测试分类的理解。"
  },
  "2": {
    id: "2",
    title: "常见的前端测试框架有哪些？",
    difficulty: "easy",
    tags: ["测试框架", "Jest", "Cypress"],
    level: "初级",
    answer: "Jest、Mocha、Karma、Cypress、Playwright。",
    explanation: "初级工具认知题，考察对测试框架的了解。"
  },
  "3": {
    id: "3",
    title: "单元测试和集成测试区别？",
    difficulty: "easy",
    tags: ["单元测试", "集成测试", "测试策略"],
    level: "初级",
    answer: "单元测试：测试函数/组件。\n\n集成测试：测试模块间交互。",
    explanation: "初级测试策略题，考察对不同测试层级的理解。"
  },
  "4": {
    id: "4",
    title: "Jest 和 Mocha 区别？",
    difficulty: "medium",
    tags: ["Jest", "Mocha", "测试框架对比"],
    level: "中级",
    answer: "Jest：开箱即用，内置断言、Mock。\n\nMocha：灵活，需要搭配 Chai、Sinon。",
    explanation: "中级框架对比题，考察对测试工具特性的理解。"
  },
  "5": {
    id: "5",
    title: "什么是 Mock？",
    difficulty: "easy",
    tags: ["Mock", "测试隔离", "依赖注入"],
    level: "初级",
    answer: "模拟接口/数据，隔离外部依赖。",
    explanation: "初级测试概念题，考察对 Mock 的理解。"
  },
  "6": {
    id: "6",
    title: "Cypress 和 Selenium 区别？",
    difficulty: "medium",
    tags: ["Cypress", "Selenium", "E2E测试"],
    level: "中级",
    answer: "Cypress：现代化，运行在浏览器内，调试方便。\n\nSelenium：支持多语言，兼容性强，但慢。",
    explanation: "中级工具对比题，考察对 E2E 测试工具的理解。"
  },
  "7": {
    id: "7",
    title: "如何测试异步代码？",
    difficulty: "medium",
    tags: ["异步测试", "Promise", "async/await"],
    level: "中级",
    answer: "Jest：done 回调 / async-await。",
    explanation: "中级异步测试题，考察对异步代码测试的理解。"
  },
  "8": {
    id: "8",
    title: "如何测试 React 组件？",
    difficulty: "medium",
    tags: ["React测试", "Testing Library", "Enzyme"],
    level: "中级",
    answer: "React Testing Library：推荐，测试用户行为。\n\nEnzyme：旧方案，测试组件内部实现。",
    explanation: "中级 React 测试题，考察对组件测试策略的理解。"
  },
  "9": {
    id: "9",
    title: "什么是快照测试（Snapshot Test）？",
    difficulty: "medium",
    tags: ["快照测试", "回归测试", "UI测试"],
    level: "中级",
    answer: "保存组件渲染结果，下次测试时对比差异。",
    explanation: "中级测试策略题，考察对快照测试的理解。"
  },
  "10": {
    id: "10",
    title: "前端测试在 CI/CD 中如何集成？",
    difficulty: "hard",
    tags: ["CI/CD", "自动化测试", "DevOps"],
    level: "高级",
    answer: "配置 GitHub Actions / GitLab CI。\n\nPush 时自动运行测试。\n\n测试通过后才构建发布。",
    explanation: "高级 DevOps 题，考察对测试自动化流程的理解。"
  }
};

// 所有模块的题目数据映射
const allQuestions: Record<string, Record<string, QuestionDetail>> = {
  "javascript": jsQuestions,
  "engineering": engineeringQuestions,
  "browser": browserQuestions,
  "typescript": typescriptQuestions,
  "nodejs": nodejsQuestions,
  "test": testQuestions
};

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "简单";
    case "medium":
      return "中等";
    case "hard":
      return "困难";
    default:
      return difficulty;
  }
};

export default async function QuestionPage({ 
  params 
}: { 
  params: Promise<{ id: string; questionId: string }> 
}) {
  const { id, questionId } = await params;
  
  const questions = allQuestions[id];
  if (!questions) {
    notFound();
  }
  
  const question = questions[questionId];
  if (!question) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link 
            href={`/module/${id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回题目列表
          </Link>
        </div>

        {/* 题目卡片 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* 题目头部 */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                getDifficultyStyle(question.difficulty)
              }`}>
                {getDifficultyText(question.difficulty)}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {question.level}
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {question.title}
            </h1>
            
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 答案部分 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">答案</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm leading-relaxed">
                {question.answer}
              </pre>
            </div>
          </div>

          {/* 解析部分 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">解析</h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="mt-8 flex justify-between">
          <div>
            {parseInt(questionId) > 1 && (
              <Link 
                href={`/module/${id}/${parseInt(questionId) - 1}`}
                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                上一题
              </Link>
            )}
          </div>
          
          <div>
            {questions[String(parseInt(questionId) + 1)] && (
              <Link 
                href={`/module/${id}/${parseInt(questionId) + 1}`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                下一题
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const params = [];
  
  for (const [moduleId, questions] of Object.entries(allQuestions)) {
    for (const questionId of Object.keys(questions)) {
      params.push({
        id: moduleId,
        questionId: questionId
      });
    }
  }
  
  return params;
}