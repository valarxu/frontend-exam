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
    explanation: "初级经典题，延伸点是『内存泄漏』和『私有变量』。"
  },
  "3": {
    id: "3",
    title: "this 在不同场景下的指向？",
    difficulty: "easy",
    tags: ["this", "上下文", "绑定"],
    level: "初级",
    answer: "• 普通函数调用 → 全局对象（严格模式下 undefined）\n• 对象方法调用 → 调用者对象\n• 构造函数 → 新创建的实例\n• 箭头函数 → 外层作用域的 this",
    explanation: "经典基础题，区分初学者与熟练者。"
  },
  "4": {
    id: "4",
    title: "解释事件冒泡和事件捕获，如何阻止事件冒泡？",
    difficulty: "medium",
    tags: ["DOM事件", "冒泡", "捕获"],
    level: "中级",
    answer: "• 捕获阶段：从根节点向目标元素传递\n• 冒泡阶段：从目标元素向根节点传递\n• 阻止冒泡：event.stopPropagation()\n• 阻止默认行为：event.preventDefault()",
    explanation: "考察 DOM 事件机制，延伸点是事件委托 (event delegation)。"
  },
  "5": {
    id: "5",
    title: "什么是原型链 (Prototype Chain)？",
    difficulty: "medium",
    tags: ["原型", "继承", "__proto__"],
    level: "中级",
    answer: "每个对象都有 __proto__ 指向其原型，原型本身也是对象，也有原型，直到 Object.prototype.__proto__ === null。",
    explanation: "中级必考，延伸点是 class 本质上是语法糖。"
  },
  "6": {
    id: "6",
    title: "解释 Promise 的三种状态，以及手写一个 Promise.all",
    difficulty: "medium",
    tags: ["Promise", "异步", "手写代码"],
    level: "中级",
    answer: "• 状态：pending → fulfilled or rejected，且不可逆\n\n• 简单实现 Promise.all：\n```js\nPromise.all = function(promises) {\n  return new Promise((resolve, reject) => {\n    let results = [];\n    let count = 0;\n    promises.forEach((p, i) => {\n      Promise.resolve(p).then(res => {\n        results[i] = res;\n        if (++count === promises.length) resolve(results);\n      }).catch(reject);\n    });\n  });\n};\n```",
    explanation: "中级进阶题，能看出候选人是否理解异步原理。"
  },
  "7": {
    id: "7",
    title: "解释事件循环 (Event Loop)，以及执行顺序",
    difficulty: "hard",
    tags: ["Event Loop", "宏任务", "微任务"],
    level: "高级",
    answer: "• JS 是单线程，任务分为宏任务 (MacroTask) 和微任务 (MicroTask)\n• 宏任务：setTimeout、setInterval、I/O\n• 微任务：Promise.then、MutationObserver、queueMicrotask\n\n执行顺序：\n1. 先执行同步任务\n2. 再执行所有微任务\n3. 再取一个宏任务 → 微任务，如此循环\n\n例子：\n```js\nconsole.log(1);\nsetTimeout(() => console.log(2));\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n// 输出顺序：1, 4, 3, 2\n```",
    explanation: "高级必考题，几乎每个大厂都会问。"
  },
  "8": {
    id: "8",
    title: "new 运算符的实现原理？",
    difficulty: "hard",
    tags: ["new", "构造函数", "原型"],
    level: "高级",
    answer: "new Foo() 做了 4 件事：\n1. 创建一个空对象\n2. 将该对象的原型指向构造函数的 prototype\n3. 执行构造函数，将 this 绑定到该对象\n4. 如果构造函数返回对象，则返回该对象，否则返回 this\n\n手写实现：\n```js\nfunction myNew(fn, ...args) {\n  const obj = Object.create(fn.prototype);\n  const result = fn.apply(obj, args);\n  return result instanceof Object ? result : obj;\n}\n```",
    explanation: "高级经典题，可以手写 new 来考察深度理解。"
  },
  "9": {
    id: "9",
    title: "为什么 0.1 + 0.2 !== 0.3？如何解决？",
    difficulty: "hard",
    tags: ["浮点数", "精度", "Number.EPSILON"],
    level: "高级",
    answer: "• 因为浮点数在二进制表示时会丢失精度\n• 0.1 和 0.2 转换成二进制后是无限小数\n\n解决方案：\n• Number.EPSILON 判断误差范围：\n```js\nMath.abs(0.1 + 0.2 - 0.3) < Number.EPSILON\n```\n• 或使用大数库（BigInt/Decimal.js）",
    explanation: "高级题，常考『浮点数精度误差』。"
  },
  "10": {
    id: "10",
    title: "请解释 V8 中垃圾回收 (GC) 的机制",
    difficulty: "hard",
    tags: ["垃圾回收", "V8引擎", "内存管理"],
    level: "高级",
    answer: "V8 使用分代回收策略：\n\n• 新生代：对象存活时间短，采用 Scavenge (复制算法)\n• 老生代：存活久的对象，采用 标记-清除/标记-整理\n\n优化点：增量标记 (Incremental Marking)、并行回收",
    explanation: "高级面试杀手题，主要考察对 JS 引擎底层的理解。"
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
  
  return paths;
}