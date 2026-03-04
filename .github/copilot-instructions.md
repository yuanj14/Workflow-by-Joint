# Copilot Instructions

AI 代理在这个工作区的行为准则和最佳实践指南。

---

## Code Style

### TypeScript & React

- **直接函数声明**：避免 `React.FC`，使用 TypeScript 直接推导：
  ```typescript
  const HomePage = () => {
    /* ... */
  }
  ```
- **类型注解**：按 [TypeScript Skill.md] - 让 TS 推导，只在必要时显式标注
- **JSDoc 注释**格式：
  ```typescript
  /**
   * 功能描述
   * @description 详细说明
   */
  ```
- **行注释**使用 emoji：`// ✨` (最佳实践)、`// ⚠️` (警告)、`// 📝` (TODO)

### 导入组织

- 使用 prettier-plugin-organize-imports 自动排序
- 优先导入 `@umijs/max`、Ant Design、项目内部 utilities

### 代码格式

- 运行 `pnpm lint` 和 `pnpm format` 确保遵循 ESLint + Prettier 规则
- 见 `lint-staged` 配置：提交时自动 fix + format

---

## Architecture

### 项目结构

```
src/
├── pages/          → 页面组件（路由对应）
├── layouts/        → 布局组件（Header、Sider、Menu）
├── components/     → 全局通用组件
├── services/       → API 服务层（自动生成）
├── models/         → 全局状态管理（dva/useModel）
├── constants/      → 常量定义
├── locales/        → i18n 多语言资源
└── utils/          → 工具函数（主题、格式化等）
```

### 技术栈

- **框架**：UmiJS 4.x + React 19.x + Ant Design Pro 6.x
- **语言**：TypeScript 5.x
- **状态管理**：@umijs/max 内置 dva / useModel Hooks
- **国际化**：内置 i18n 支持
- **样式**：Ant Design tokens + CSS modules
- **后端**：RuoYi-Cloud 微服务（REST API）

### 页面与路由

- 页面组件定义在 `src/pages/` 对应路由
- 参考 `config/routes.ts` 了解路由配置
- Ant Design Pro 自动生成菜单和权限控制

### 状态管理

- **全局状态**：在 `src/models/` 用 `export default function useXxxModel() { ... }`
- **局部状态**：组件内用 `useState`
- **跨组件通信**：优先用 useModel，避免过度 prop drilling

---

## Build and Test

### 开发流程

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev          # 或 npm start

# 构建生产版本
pnpm build

# 代码检查和格式化
pnpm lint         # ESLint + fix
pnpm format       # Prettier
```

### Git Hooks

- **husky** + **lint-staged** 自动在 commit 前运行 eslint --fix 和 prettier --write
- 无需手动运行，提交时自动触发

### 测试

- 前端测试框架：Vitest + React Testing Library（见 [frontend-testing skill.md]）
- 创建测试文件： `*.spec.tsx` 或 `*.test.tsx`

---

## Project Conventions

### API 集成

- **服务层**在 `src/services/` 中（自动生成）
- 使用 `@umijs/max` 的 `request` 方法或 fetch API
- 示例：[UserController.ts]
- 响应格式：`API.Result<T>` 包含 code、message、data 字段

### 表单与表格

- **表格**：优先用 `ProTable`（Ant Design Pro 组件）
- **表单**：优先用 `ProForm`（内置验证、布局）
- 参考 `src/pages/Table/index.tsx` 中的 ProTable、ProDescriptions 用法

### 主题与国际化

- **主题切换**：由 `src/models/theme.tsx` 管理，支持 light/dark 模式
- **多语言**：在 `src/locales/` 定义，通过 `@umijs/max` 自动加载
- **主题工具**：`src/utils/theme.tsx` 提供 getThemeMode/setThemeMode

### 权限控制

- 见 `src/access.tsx`，定义访问权限规则
- Ant Design Pro 自动集成权限检查

### 常量定义

- 所有常量存放在 `src/constants/index.ts`
- 避免硬编码值，统一管理便于维护

---

## Integration Points

### 外部依赖

- **@ant-design/icons**：Icon 组件库
- **@ant-design/pro-components**：ProTable、ProForm、ProDescriptions 等
- **@umijs/max**：UmiJS 企业级插件集合

### 跨组件通信

- **全局数据**：useModel（如 theme、global）
- **局部数据**：props + state
- **异步状态**：Ant Design Spin、Skeleton 处理 loading

### 后端服务

- API 基础路径：`/api/v1/`
- 服务响应格式：`{ code, message, data }`
- 错误处理：通过 request 拦截器统一处理

---

## Security

### Sensitive Data

- **永远不要**打印 API Key、令牌、用户密码
- 敏感信息保存在 localStorage（themeMode）或内存中
- 见 [TypeScript Skill - Logging 章节]

### Authentication

- 登录状态由后端管理（session/token）
- 前端权限检查在 `src/access.tsx`
- API 请求失败时由拦截器统一处理

### 代码审查

- 参考 [frontend-code-review skill.md] 的审查清单
- 重点关注：类型安全、权限检查、error handling

---

## AI Agent 初始化程序

**新对话启动时的步骤**（AI 必读）：

1. **扫描规则**：阅读 `src/rules/react.md` 获取项目级编码规则
2. **加载 Skills 元数据**：
   - typescript - 类型和代码结构
   - react - 组件设计
   - ant-design\* - UI 组件选择
   - frontend-testing - 单元测试
   - frontend-code-review - 代码审查
   - component-refactoring - 复杂度优化
3. **按需加载全文**：当用户请求相关功能时，加载完整的 skill 文档
4. **遵循约定**：在这个文件中定义的代码风格、架构、命名规范应用到所有建议中

---

## 相关文档

- [.github/skills/](./skills/) - 分领域最佳实践指南
- [.github/rules/](./rules/) - 项目级编码规则
