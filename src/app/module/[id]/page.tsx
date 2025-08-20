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
      { id: "1", title: "React组件的生命周期", difficulty: "medium", tags: ["生命周期", "组件"] },
      { id: "2", title: "useState和useEffect的使用", difficulty: "easy", tags: ["Hooks", "状态"] },
      { id: "3", title: "React性能优化方法", difficulty: "hard", tags: ["性能", "优化"] },
      { id: "4", title: "虚拟DOM的工作原理", difficulty: "hard", tags: ["虚拟DOM", "原理"] },
      { id: "5", title: "状态管理方案对比", difficulty: "medium", tags: ["状态管理", "Redux"] }
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
    questions: defaultQuestions
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
            const QuestionComponent = (id === "html" || id === "css" || id === "js") ? (
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
        {(id === "html" || id === "css" || id === "js") ? (
          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="text-green-500 dark:text-green-400 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                  {id === "html" ? "HTML" : id === "css" ? "CSS" : "JavaScript"} 模块内容已完善
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
                  目前展示的是题目列表，具体的题目内容和答案解析将陆续添加。HTML、CSS、JavaScript模块已完成，其他模块敬请期待。
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