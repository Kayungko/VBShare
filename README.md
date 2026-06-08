# VBShare

AI 分享会 Web Slide Deck。当前项目已经从普通静态网页方向，补充为可模块化维护的网页演示稿骨架。

## 快速开始

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
```

预览构建结果：

```bash
npm run preview
```

## 演示控制

- `ArrowRight` / `Space` / `PageDown`：下一页
- `ArrowLeft` / `PageUp`：上一页
- 鼠标滚轮向下：下一页
- 鼠标滚轮向上：上一页
- `Home`：回到第一页
- `End`：跳到最后一页

## 如何改内容

主要修改：

```text
src/content/ai-share/slides.ts
```

每一页都是一个 `SlideConfig` 对象。调整数组顺序即可调整演示顺序。

示例：

```ts
{
  id: 'new-slide',
  type: 'case',
  section: 'case',
  eyebrow: '案例',
  title: '新的案例标题',
  cards: [
    { title: '过去', description: '原来的做法' },
    { title: '现在', description: 'AI 工作流做法' },
  ],
}
```

## 如何改页面样式

- 主题变量：`src/styles/theme.css`
- 演示布局：`src/styles/deck.css`
- 动画：`src/styles/animations.css`

## 如何新增页面模板

1. 在 `src/types/deck.ts` 的 `SlideType` 增加类型。
2. 在 `src/components/slides/templates` 新增模板组件。
3. 在 `src/components/slides/SlideRenderer.tsx` 注册模板。
4. 在 `src/content/ai-share/slides.ts` 使用新的 `type`。

## 模块化原则

```text
改文案：src/content/ai-share/slides.ts
改页面模板：src/components/slides/templates/*.tsx
改翻页逻辑：src/components/deck/Deck.tsx 或 src/lib/deck/navigation.ts
改动画参数：src/lib/animation/presets.ts
改主题风格：src/styles/theme.css
```

这样后续修改分享会内容、页面顺序、视觉样式和动画节奏时不会互相影响。

## 旧静态网页说明

仓库原本 README 提到的旧静态网页路径是：

```text
ai-coding-share-web/index.html
```

如果还需要保留旧版本作为参考，可以继续保留该目录；新的模块化版本从仓库根目录的 Vite 项目启动。
