# 🚀 前端面试题库

一个基于 Next.js 15 构建的现代化前端面试题库应用，涵盖前端开发的各个技术领域，帮助开发者系统性地准备前端面试。

## ✨ 项目特色

- 🎯 **全面覆盖**：14个核心技术模块，140+精选面试题
- 🎨 **现代设计**：基于 Tailwind CSS 的响应式设计，支持深色模式
- ⚡ **高性能**：Next.js 15 + TypeScript，优化的构建和加载性能
- 📱 **移动友好**：完全响应式设计，支持各种设备
- 🔍 **智能分类**：按难度和标签分类，便于针对性学习

## 📚 技术模块

### 基础技术
- 🏗️ **HTML** - 语义化、表单、无障碍等
- 🎨 **CSS** - 布局、动画、响应式设计
- ⚡ **JavaScript** - ES6+、异步编程、原型链

### 前端框架
- ⚛️ **React** - 组件、Hooks、状态管理
- 💚 **Vue** - Vue3、组合式API、响应式原理
- 📘 **TypeScript** - 类型系统、泛型、工具类型

### 工程化与性能
- 🚀 **网站性能** - 优化策略、Core Web Vitals
- 🔧 **工程化** - 构建工具、模块化、CI/CD
- 🧪 **测试** - 单元测试、集成测试、E2E

### 网络与安全
- 🌐 **网络** - HTTP协议、WebSocket、CDN
- 🔒 **安全** - XSS、CSRF、内容安全策略

### 高级主题
- 🔍 **浏览器底层** - 渲染原理、事件循环、内存管理
- 📊 **可视化** - Canvas、SVG、WebGL、图表库
- 🟢 **Node.js** - 服务端开发、API设计、中间件

## 🛠️ 技术栈

- **框架**: Next.js 15.5.0 (App Router)
- **语言**: TypeScript 5+
- **样式**: Tailwind CSS 4
- **字体**: Geist Sans & Geist Mono
- **构建**: Turbopack (开发模式)
- **代码规范**: ESLint + Next.js 配置

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm / yarn / pnpm

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
npm run build
npm run start
```

### 代码检查
```bash
npm run lint
```

## 📁 项目结构

```
frontend-exam/
├── src/
│   └── app/
│       ├── globals.css          # 全局样式
│       ├── layout.tsx           # 根布局
│       ├── page.tsx             # 首页 - 模块列表
│       └── module/
│           └── [id]/
│               └── page.tsx     # 动态路由 - 题目列表
├── public/                      # 静态资源
├── package.json                 # 项目配置
├── next.config.ts              # Next.js 配置
├── tailwind.config.ts          # Tailwind 配置
└── tsconfig.json               # TypeScript 配置
```

## 🎯 功能特性

### 主页面
- 14个技术模块的卡片展示
- 每个模块包含图标、标题、描述
- 响应式网格布局
- 深色模式支持

### 题目页面
- 按模块分类的面试题列表
- 难度标识（简单/中等/困难）
- 标签分类系统
- 返回导航

### 用户体验
- 流畅的页面切换动画
- 优化的加载性能
- 移动端适配
- 无障碍访问支持

## 🚀 部署

### Vercel 部署（推荐）
1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动检测 Next.js 配置并部署

### 其他平台
- **Netlify**: 支持 Next.js 静态导出
- **Railway**: 支持 Node.js 应用
- **Docker**: 可容器化部署

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Vercel](https://vercel.com/) - 部署平台
- [Geist Font](https://vercel.com/font) - 现代字体系列

---

**开始你的前端面试准备之旅吧！** 🎯
