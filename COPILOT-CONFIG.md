# GitHub Copilot 协作配置

本文件是 AI 与项目团队协作的配置入口，定义了编码约定、代码风格和最佳实践。

> **🤖 对 AI 的初始化指引**（新对话时必读）
>
> 1. **优先读取** `.github/` 文件夹中的 rules 和 skills（见下方完整列表）
> 2. **加载元数据**：扫描所有 SKILL.md 文件的名称和 description 以理解项目约定
> 3. **按需加载全文**：当用户请求相关功能或编码任务时，加载对应 skill 或 rule 的完整内容
> 4. **遵循约定**：在所有代码建议、审查和生成中应用这些规则
>
> 这确保 AI 在新对话中能立即获得项目上下文，而不是依赖用户重复指导。

---

## 📋 注释格式约定

### JSDoc 注释（用于函数/方法/组件）

```typescript
/**
 * 功能描述
 * @description 详细说明（可选）
 */
export const functionName = () => {
  // ...
}
```

**示例**：

```typescript
/**
 * 获取当前主题模式
 * @description 优先从 localStorage 读取，否则返回默认 light
 */
export const getThemeMode = (): ThemeMode => {
  // ...
}
```

### 行注释（用于代码块/逻辑说明）

```typescript
// ✨ 直接函数声明，React 19 最佳实践，避免 React.FC
const HomePage = () => {
  // ...
}
```

使用 emoji 增强可读性：

- `✨` - 最佳实践、关键特性
- `⚠️` - 警告、注意事项
- `🔧` - 配置、设置
- `📝` - 待办、TODO
- `🐛` - BUG、问题

### 特殊注释

```typescript
// TODO: 待实现的功能
// FIXME: 已知的问题
// @ts-ignore 或 @ts-expect-error - TypeScript 指令
```

---

## � .github 文件夹结构（AI 初始化用）

```
.github/
├── rules/                          # 项目级编码规则
│   └── react.md                    # React 编码规则
└── skills/                         # 分领域最佳实践指南
    ├── typescript/
    ├── react/
    ├── ant-design/
    ├── ant-design-pro/
    ├── ant-design-x/
    ├── frontend-testing/
    ├── frontend-code-review/
    ├── component-refactoring/
    └── tailwind-best-practices/
```

**AI 初始化流程**：
1. 读取本文件（COPILOT-CONFIG.md）获取项目概览
2. 扫描 `.github/rules/` 获取项目层级的硬性约定
3. 扫描 `.github/skills/` 的全部 SKILL.md 文件 description，建立能力地图
4. 用户请求相关功能时，按需加载完整的 SKILL.md 内容

---

## �🔗 规则和最佳实践

### 核心开发指南

- **[TypeScript 规则](.github/skills/typescript/SKILL.md)** - 类型安全、代码结构、性能优化
- **[React 开发规则](.github/skills/react/SKILL.md)** - 组件设计、Hook 使用、渲染优化
- **[React 编码规则](.github/rules/react.md)** - 项目级 React 约定

### 业务框架指南

- **[Ant Design Pro 指南](.github/skills/ant-design-pro/SKILL.md)** - 企业级组件、ProTable、权限
- **[Ant Design 指南](.github/skills/ant-design/SKILL.md)** - 组件选择、主题、CSS-in-JS
- **[Ant Design X 指南](.github/skills/ant-design-x/SKILL.md)** - AI 聊天 UI、流式消息

### 测试与代码质量

- **[前端测试指南](.github/skills/frontend-testing/SKILL.md)** - Vitest + RTL 测试
- **[前端代码审查](.github/skills/frontend-code-review/SKILL.md)** - 代码审查清单
- **[组件重构指南](.github/skills/component-refactoring/SKILL.md)** - 复杂度优化

### 样式相关

- **[Tailwind 最佳实践](.github/skills/tailwind-best-practices/SKILL.md)** - CSS 设计系统

---

## 🚀 技术栈关键信息

- **框架**：UmiJS 4.x + React 19.x + Ant Design Pro 6.x
- **语言**：TypeScript 5.x
- **状态管理**：@umijs/max 内置 dva / useModel
- **国际化**：内置 i18n 多语言方案
- **后端**：RuoYi-Cloud 微服务

---

## 💡 快速参考

| 场景 | 查看文件 |
| --- | --- |
| 编写 TypeScript 代码 | [TypeScript SKILL](.github/skills/typescript/SKILL.md) |
| 创建 React 组件 | [React SKILL](.github/skills/react/SKILL.md) |
| 使用 Ant Design 组件 | [Ant Design SKILL](.github/skills/ant-design/SKILL.md) |
| 编写单元测试 | [前端测试 SKILL](.github/skills/frontend-testing/SKILL.md) |
| 审查代码 | [前端代码审查 SKILL](.github/skills/frontend-code-review/SKILL.md) |
| 优化复杂组件 | [组件重构 SKILL](.github/skills/component-refactoring/SKILL.md) |

---

## 📞 使用建议

在与 Copilot 协作时，可以参考本配置文件指导 AI 遵循约定。

**示例提示词**：

- _"按照 COPILOT-CONFIG.md 中的注释格式添加 JSDoc"_
- _"参考 TypeScript SKILL 的最佳实践重构这段代码"_
- _"查看代码审查指南为这个改动做审查"_
