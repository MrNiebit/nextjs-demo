# Next.js 项目知识点总结

本项目是基于 Next.js 框架开发的应用，包含了多种 Next.js 的核心功能和最佳实践。以下是项目中涉及的主要知识点：

## 1. Next.js 应用结构

- **App Router**: 使用了 Next.js 13+ 的新路由系统，基于文件夹结构自动生成路由
- **页面组织**: 通过 `src/app` 目录下的文件夹结构组织页面（如 `page1`, `page2`, `api-demo` 等）
- **布局系统**: 可能使用了 `layout.tsx` 文件定义共享布局

## 2. 路由系统

### 2.1 前端路由

- **基于文件系统的路由**: Next.js 根据 `src/app` 目录下的文件结构自动生成路由
- **页面路由**: 
  - `src/app/page1/page.tsx` → `/page1` 路由
  - `src/app/page2/page.tsx` → `/page2` 路由
  - `src/app/api-demo/page.tsx` → `/api-demo` 路由
- **客户端导航**: 使用 `<Link>` 组件实现无刷新页面跳转
- **路由参数**: 可以通过文件夹名称如 `[paramName]` 定义动态路由段

### 2.2 后端 API 路由

- **API Routes 结构**: 在 `src/app/api` 目录下定义的所有路由都会被视为 API 端点
- **端点定义**:
  - `src/app/api/endpoint1/route.ts` → `/api/endpoint1` API 端点
  - `src/app/api/endpoint2/route.ts` → `/api/endpoint2` API 端点
  - `src/app/api/form-data/route.ts` → `/api/form-data` 处理表单数据的端点
- **动态 API 路由**: 
  - `src/app/api/users/[userId]/route.ts` → `/api/users/123` 可接收动态 ID 参数
- **HTTP 方法**: 在 route.ts 文件中可以导出 GET, POST, PUT, DELETE 等函数来处理不同的 HTTP 请求方法
- **请求处理**: 使用 Next.js 的 Request 和 Response API 处理请求和响应

## 3. 数据获取

- **服务器组件**: Next.js 13+ 默认使用服务器组件，可以直接在组件中进行数据获取
- **API 调用演示**: `api-demo` 页面展示了如何在客户端调用 API 端点
- **用户数据处理**: 通过 `users/[userId]` 路由处理特定用户的数据
- **数据获取方式**:
  - 服务器组件中使用 `fetch`
  - 客户端组件中使用 `useEffect` + `fetch` 或第三方库如 `axios`
  - 可能使用了 SWR 或 React Query 进行数据获取和缓存

## 4. 样式和资源

- **全局样式**: 使用 `globals.css` 定义全局样式规则
- **CSS 模块**: 可能使用了 `.module.css` 文件实现组件级样式隔离
- **静态资源**: 在 `public` 目录下存放静态文件，如 `file.svg` 图标
- **资源引用**: 静态资源可通过相对路径直接引用，如 `/file.svg`

## 5. 项目配置

- **依赖管理**: 通过 `package.json` 管理项目依赖
- **构建配置**: 可能包含了自定义的 Next.js 配置
- **环境变量**: 可能使用 `.env` 文件管理不同环境的配置

## 6. 最佳实践

- **路由分离**: 将页面和 API 路由清晰分离
- **模块化**: 按功能将代码组织到不同目录
- **类型安全**: 使用 TypeScript 增强代码的类型安全性
- **组件复用**: 可能创建了共享组件库

## 7. 部署准备

- **生产构建**: 通过 `npm run build` 生成生产环境代码
- **静态导出**: 可能支持静态网站生成 (SSG)
- **服务器端渲染 (SSR)**: Next.js 默认支持服务器端渲染
- **增量静态再生成 (ISR)**: 可能使用了 ISR 功能实现静态内容的定时更新

## 8. 进阶功能

- **中间件**: 可能使用了 Next.js 中间件处理请求
- **国际化**: 可能实现了多语言支持
- **认证**: 可能集成了用户认证系统
- **SEO 优化**: 使用元数据 API 优化搜索引擎收录

## 如何运行

```bash
npm install
npm run dev
```

