# VBShare 文档索引

这个目录用于沉淀 AI 分享会相关文档，方便内容评审、视觉评审和后续落地到网页演示稿。

---

## 当前最重要的文档

### 1. 内容讨论稿 / 评审稿

```text
AI_SHARE_CONTENT_DRAFT.md
```

用途：

```text
记录分享会背景、内容定位、章节大纲、逐页正式文案、口播稿、视觉需求和评审问题。
```

当前状态：

```text
已整理为评审稿，并已按 24 页结构同步到 src/content/ai-share/slides.ts。
后续内容调整应先更新该文档，再同步页面数据。
```

建议评审重点：

```text
1. 分享定位是否清楚：网上零散 AI Coding 知识整理，而不是岗位 SOP。
2. 前半部分通用方法和后半部分 Unity UI 入版 Demo 是否衔接自然。
3. 是否出现不适合的表达，例如“替人”“公司期待”“风险”“失控”等。
4. 页面数量是否需要压缩。
5. 标题和正文是否适合中文演讲阅读。
6. Demo 是否足够贴合 Unity UI 入版岗位。
```

---

### 2. 评审与模块化改造方案

```text
AI_SHARE_REVIEW_AND_MODULAR_REFACTOR_PLAN.md
```

用途：

```text
记录早期对 AI 分享会网页演示稿的评审、模块化改造思路、组件拆分方向和工程落地建议。
```

适合用于：

```text
页面结构评审
模块化开发参考
后续改造 React/Vite Slide Deck 时查阅
```

---

## 仓库根目录相关文档

### 3. 原始分享大纲

```text
../ai-coding-share-outline.md
```

用途：

```text
记录最早的 AI Coding 分享大纲。
内容方向大体正确，可作为当前内容稿的来源参考。
```

说明：

```text
当前内容稿没有完全照搬原始大纲，而是根据讨论重新整理为：
通用 AI Coding 小知识 + Unity UI 入版 Demo。
```

---

### 4. 视觉设计参考

```text
../DESIGN.md
```

用途：

```text
记录一个暗色、终端感、等宽字体风格的设计系统说明。
```

注意：

```text
该文件标题是 Design System: OpenCode。
如果后续要参考 VoltAgent / VoltAgent 的视觉语言，需要另行确认 VoltAgent 的设计来源，不能直接把此文件当成 VoltAgent 规范。
```

---

## 当前网页与代码位置

### 5. 旧静态网页版本

```text
../ai-coding-share-web/index.html
../ai-coding-share-web/styles.css
../ai-coding-share-web/app.js
```

用途：

```text
早期静态网页演示版本。
视觉上已经有暗色、终端和任务卡片方向，可作为风格参考之一。
```

---

### 6. React/Vite Slide Deck 版本

```text
../src/content/ai-share/slides.ts
../src/content/ai-share/deck.config.ts
../src/components/deck/
../src/components/slides/
../src/styles/
```

用途：

```text
后续正式网页演示稿的模块化实现。
```

当前建议：

```text
slides.ts 已开始承载新版内容稿。
页面文案仍建议以 AI_SHARE_CONTENT_DRAFT.md 为内容来源，避免代码和文档分叉。
```

---

## 开发进度与变更记录

### 2026-06-09 文案落地

```text
1. 将 AI_SHARE_CONTENT_DRAFT.md 中的新版主线同步为 24 页网页演示稿。
2. 更新 deck.config.ts，使标题和副标题与新版内容一致。
3. 轻微调整封面、卡片页和流程页模板，支持章节封面与结论句展示。
4. 调整标题排版和流程节点换行，降低长中文标题溢出的概率。
5. 移除封面页与内容无关的稿件状态和 Web Deck 标签。
```

---

## 推荐评审流程

```text
1. 先评审 docs/AI_SHARE_CONTENT_DRAFT.md
2. 确认分享定位、章节结构、页面数量和口播稿
3. 再评审视觉方向：是否参考 VoltAgent / 其他暗色产品语言
4. 根据确认后的内容更新 src/content/ai-share/slides.ts
5. 根据视觉方向调整 src/styles 和 slide templates
6. 最后补充图片/流程图/卡片组件
```

---

## 给评审 AI 的建议 Prompt

可以复制下面这段给其他 AI：

```text
请评审这份 AI Coding 分享会内容稿。

背景：这不是工具测评，也不是完整自动化平台方案，而是把网上零散的 AI Coding 小知识整理成一个更容易上手的最小流程。主体内容保持中性，最后用 Unity UI 活动入口入版任务包生成器作为岗位贴合 Demo。

请重点检查：
1. 分享定位是否清楚。
2. 大纲是否连贯。
3. 页面数量是否合适。
4. 页面标题是否适合中文演讲。
5. 正文是否适合放在页面上。
6. 口播稿是否自然。
7. Demo 是否贴合 Unity UI 入版岗位。
8. 是否出现不合适表述，例如“替人”“公司期待”“风险”“失控”等。
9. 哪些页面建议合并、删除或改写。
10. 图片和视觉需求是否足够明确。
```
