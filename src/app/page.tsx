import Link from "next/link";

interface ModuleCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const modules: ModuleCard[] = [
  {
    id: "html",
    title: "HTML",
    description: "HTML基础知识、语义化、表单等",
    icon: "🏗️",
    color: "bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
  },
  {
    id: "css",
    title: "CSS",
    description: "样式、布局、动画、响应式设计",
    icon: "🎨",
    color: "bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "ES6+、异步编程、原型链等",
    icon: "⚡",
    color: "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
  },
  {
    id: "react",
    title: "React",
    description: "组件、Hooks、状态管理",
    icon: "⚛️",
    color: "bg-cyan-100 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800"
  },
  {
    id: "vue",
    title: "Vue",
    description: "Vue3、组合式API、响应式原理",
    icon: "💚",
    color: "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800"
  },
  {
    id: "performance",
    title: "网站性能",
    description: "性能优化、加载速度、缓存策略",
    icon: "🚀",
    color: "bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
  },
  {
    id: "network",
    title: "网络",
    description: "HTTP、HTTPS、WebSocket、CDN",
    icon: "🌐",
    color: "bg-indigo-100 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800"
  },
  {
    id: "security",
    title: "安全",
    description: "XSS、CSRF、内容安全策略",
    icon: "🔒",
    color: "bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800"
  },
  {
    id: "engineering",
    title: "工程化",
    description: "构建工具、模块化、CI/CD",
    icon: "🔧",
    color: "bg-gray-100 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800"
  },
  {
    id: "visualization",
    title: "可视化",
    description: "Canvas、SVG、WebGL、图表库",
    icon: "📊",
    color: "bg-pink-100 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800"
  },
  {
    id: "browser",
    title: "浏览器底层",
    description: "渲染原理、事件循环、内存管理",
    icon: "🔍",
    color: "bg-teal-100 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800"
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "类型系统、泛型、装饰器",
    icon: "📘",
    color: "bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
  },
  {
    id: "nodejs",
    title: "Node.js",
    description: "服务端开发、API设计、中间件",
    icon: "🟢",
    color: "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800"
  },
  {
    id: "testing",
    title: "测试",
    description: "单元测试、集成测试、E2E测试",
    icon: "🧪",
    color: "bg-violet-100 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center text-foreground">
            前端面试题库
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
            系统化学习前端知识点
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={`/module/${module.id}`}
              className="block group"
            >
              <div className={`
                ${module.color}
                border rounded-xl p-6 transition-all duration-200
                hover:shadow-lg hover:scale-105 active:scale-95
                group-hover:border-opacity-80
              `}>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl flex-shrink-0">
                    {module.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-500">
                  <span>点击查看题目</span>
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            持续更新中，助力前端面试成功 🚀
          </p>
        </div>
      </footer>
    </div>
  );
}
