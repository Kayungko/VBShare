# AI 分享会网页演示稿评审与模块化改造方案

> 目标：把当前“网页资料页”改造成更像 PPT 的网页演示稿，同时保持内容、动画、页面结构可模块化维护。

## 1. 当前核心问题

当前反馈集中在四个方面：

1. **结构不像 PPT**：页面更接近长网页或资料页，缺少一页一观点的演示节奏。
2. **演示方式不符合演讲场景**：没有明确的下一页/上一页控制，也缺少当前进度反馈。
3. **内容不像 PPT**：信息密度偏高，容易变成说明文，而不是现场演讲可控的视觉页面。
4. **缺少开场钩子和动画节奏**：没有在前 30 秒制造问题、对比或结果冲击，也没有通过动画控制观众注意力。

结论：不要只在现有网页上补动画，而是应该整体改成 **Web Slide Deck**。

---

## 2. 改造目标

最终形态应该是：

- 全屏分页演示，而不是普通长页面滚动。
- 每一页只表达一个核心观点。
- 支持键盘、滚轮、点击按钮翻页。
- 有页码、章节进度、底部进度条。
- 页面内容由数据驱动，方便后续替换主题或调整顺序。
- 动画以“讲解节奏”为核心，而不是单纯装饰。
- 内容、页面模板、动画、主题样式分离，避免所有逻辑堆在一个页面组件里。

---

## 3. 推荐的信息架构

建议将分享会拆成 5 个章节：

```text
01 开场钩子：为什么今天要聊 AI
02 认知转变：AI 不是搜索引擎，而是协作对象
03 使用方法：如何给 AI 一个好任务
04 工作流案例：从真实工作场景看 AI 如何落地
05 风险与总结：哪些事情不能完全交给 AI
```

推荐页数：18 - 22 页。

| 页码 | 页面类型 | 页面主题 | 目的 |
| --- | --- | --- | --- |
| 1 | CoverSlide | AI 不是工具，是新的工作方式 | 建立主题 |
| 2 | HookSlide | 3 分钟完成 1 小时工作 | 制造冲击 |
| 3 | QuestionSlide | 为什么很多人用了 AI 反而没效率 | 抛出问题 |
| 4 | RevealSlide | 因为他们把 AI 当搜索引擎 | 给出观点 |
| 5 | AgendaSlide | 今天只讲三件事 | 建立路线 |
| 6 | CompareSlide | 普通提问 vs 高质量提问 | 建立对比 |
| 7 | MethodSlide | 好问题的五个组成部分 | 给方法论 |
| 8 | ExampleSlide | 错误 Prompt 示例 | 降低理解门槛 |
| 9 | ExampleSlide | 正确 Prompt 示例 | 给可复制模板 |
| 10 | WorkflowSlide | 人负责判断，AI 负责生成和整理 | 建立工作流 |
| 11 | CaseSlide | 写作场景 | 讲一个实际案例 |
| 12 | CaseSlide | 客服知识库场景 | 讲一个实际案例 |
| 13 | CaseSlide | 代码审查场景 | 讲一个实际案例 |
| 14 | ProcessSlide | 从资料到演示稿 | 展示流程 |
| 15 | DemoSlide | 现场演示或模拟演示 | 提升现场感 |
| 16 | RiskSlide | 幻觉、隐私、版权、过度依赖 | 讲边界 |
| 17 | ActionSlide | 从低风险重复任务开始 | 给落地建议 |
| 18 | SummarySlide | 会用 AI 的人，是更快完成判断 | 总结金句 |
| 19 | QASlide | Q&A | 收尾 |

---

## 4. 模块化目录建议

如果使用 React / Vite，建议采用下面的结构：

```text
src/
  app/
    App.tsx
    routes.tsx

  content/
    ai-share/
      deck.config.ts
      slides.ts
      speaker-notes.ts

  types/
    deck.ts
    slide.ts

  components/
    deck/
      Deck.tsx
      SlideViewport.tsx
      SlideShell.tsx
      DeckProgress.tsx
      SlideCounter.tsx
      KeyboardController.tsx
      WheelController.tsx
      PresenterControls.tsx

    reveal/
      StepReveal.tsx
      TypewriterText.tsx
      AnimatedNumber.tsx
      HighlightText.tsx

    slides/
      CoverSlide.tsx
      HookSlide.tsx
      AgendaSlide.tsx
      CompareSlide.tsx
      MethodSlide.tsx
      WorkflowSlide.tsx
      CaseSlide.tsx
      RiskSlide.tsx
      SummarySlide.tsx
      QASlide.tsx

    visual/
      GlassCard.tsx
      GradientBlob.tsx
      CodeBlock.tsx
      ChatBubble.tsx
      FlowLine.tsx
      Timeline.tsx

  lib/
    deck/
      navigation.ts
      slide-registry.ts
      step-state.ts

    animation/
      presets.ts
      variants.ts

  styles/
    theme.css
    deck.css
    animations.css
```

### 拆分原则

- `content/ai-share` 只放内容，不放复杂 UI 逻辑。
- `components/slides` 只负责页面模板。
- `components/deck` 负责翻页、进度、控制器。
- `components/reveal` 负责逐步出现、打字机、数字动画。
- `lib/animation` 统一管理动画参数。
- `styles/theme.css` 管主题变量，避免颜色散落在各组件中。

---

## 5. 数据驱动的页面结构

不要把每页内容硬编码在 JSX 里。推荐使用配置数据生成页面。

示例：

```ts
// src/content/ai-share/slides.ts
import type { SlideConfig } from '@/types/deck'

export const slides: SlideConfig[] = [
  {
    id: 'cover',
    type: 'cover',
    section: 'opening',
    title: 'AI 不是工具，是新的工作方式',
    subtitle: '从“会用工具”到“会设计工作流”',
  },
  {
    id: 'hook-3-minutes',
    type: 'hook',
    section: 'opening',
    title: '3 分钟完成原本 1 小时的工作',
    metric: {
      from: '60 min',
      to: '3 min',
      label: '资料整理 + 初稿生成',
    },
  },
  {
    id: 'prompt-compare',
    type: 'compare',
    section: 'method',
    title: '普通提问 vs 高质量提问',
    left: {
      label: '普通提问',
      content: '帮我写一个活动文案',
    },
    right: {
      label: '高质量提问',
      content: '你是资深电商运营，请根据产品信息写一份适合微信群转化的活动文案，突出限时优惠、稀缺感和行动按钮。',
    },
  },
]
```

这样修改内容时只需要改 `slides.ts`，不需要进入复杂组件里找文案。

---

## 6. Slide 类型建议

建议先固定一批页面模板，不要每一页都单独写样式。

### 6.1 CoverSlide

用途：封面、章节封面。

结构：

```text
大标题
副标题
分享人 / 日期 / 组织信息
背景光效
```

### 6.2 HookSlide

用途：开场钩子。

适合表现：

- 数字对比
- 结果先行
- 强问题
- 反常识观点

### 6.3 CompareSlide

用途：对比。

适合表现：

- 普通提问 vs 高质量提问
- 人工流程 vs AI 流程
- 原始资料 vs AI 整理结果

### 6.4 MethodSlide

用途：方法论。

适合表现：

```text
角色 + 任务 + 背景 + 标准 + 格式
```

### 6.5 WorkflowSlide

用途：流程页。

适合表现：

```text
输入资料 -> AI 生成 -> 人判断 -> 修订输出
```

### 6.6 CaseSlide

用途：真实案例。

适合表现：

- 客服问答库
- 代码审查
- 文案生成
- 资料总结

### 6.7 RiskSlide

用途：风险边界。

适合表现：

- 幻觉
- 隐私
- 版权
- 过度依赖

### 6.8 SummarySlide

用途：总结页。

结构：

```text
一句金句
三个行动建议
Q&A 入口
```

---

## 7. 交互控制建议

演示控制应该统一放在 `components/deck` 和 `lib/deck` 中。

必要能力：

- `ArrowRight` / `Space`：下一步或下一页。
- `ArrowLeft`：上一步或上一页。
- 鼠标滚轮向下：下一页。
- 鼠标滚轮向上：上一页。
- 当前页有 step 时，先推进 step，step 结束后再切下一页。
- 底部进度条显示整体进度。
- 右下角显示 `03 / 19`。
- 可选：按 `P` 进入演讲者模式。

建议封装为：

```ts
useDeckNavigation()
useSlideSteps()
useKeyboardNavigation()
useWheelNavigation()
```

---

## 8. 动画策略

动画不要作为装饰，而是服务讲解节奏。

### 8.1 页面切换动画

推荐：

```text
淡入 + 上移 16px
持续时间 400ms - 600ms
```

避免：

```text
旋转、弹跳、过度夸张的转场
```

### 8.2 分步出现动画

用于控制观众注意力。

适合：

- 列表逐项出现
- 流程节点逐个出现
- Prompt 结构逐段高亮
- 风险卡片逐个展示

### 8.3 对比动画

推荐节奏：

```text
先出现左侧“普通做法”
再出现右侧“AI 改造后”
最后出现结论
```

### 8.4 AI 生成感动画

适合 AI 分享会的视觉语言：

- 打字机效果
- loading 后生成卡片
- 代码 diff 高亮
- 对话气泡逐条出现
- 文档变成大纲的变形/流程动画

---

## 9. 内容改写原则

把网页说明文改成 PPT 语言。

### 9.1 每页只保留一个观点

不推荐：

```text
AI 可以帮助写作、客服、编程、总结、数据分析、流程管理等，可以提升效率。
```

推荐：

```text
AI 最擅长压缩重复性的脑力劳动。
```

然后下面用 3 个卡片补充：

```text
写
查
整理
```

### 9.2 开场不要先讲概念

不推荐：

```text
什么是人工智能？
```

推荐：

```text
为什么很多人用了 AI，效率反而没有提升？
```

### 9.3 尽量使用对比，而不是解释

推荐结构：

```text
过去：人工搜索资料、整理结构、写初稿
现在：AI 生成初稿，人负责判断和修订
```

---

## 10. 推荐第一阶段任务清单

### 2026-06-09 当前进度

```text
已将 docs/AI_SHARE_CONTENT_DRAFT.md 的新版内容主线落地到 src/content/ai-share/slides.ts。
当前页面结构为 24 页：欢迎页、开场钩子、目录、5 个小细节章节、Unity UI Demo、总结和致谢。
已完成一轮视觉重构：从蓝紫玻璃感调整为深黑工程控制台风格，并移除内容页无关眉标。
```

### Phase 1：把网页改成 Slide Deck

- [ ] 建立 `slides.ts`，用数据描述全部页面。
- [ ] 建立 `Deck.tsx`，只渲染当前页。
- [ ] 支持键盘翻页。
- [ ] 支持滚轮翻页。
- [ ] 加入页码和底部进度条。
- [ ] 建立基础页面模板：Cover / Hook / Compare / Method / Case / Summary。

### Phase 2：重写内容结构

- [ ] 按 18 - 22 页重排内容。
- [ ] 增加开场钩子页。
- [ ] 增加“普通提问 vs 高质量提问”对比页。
- [ ] 增加 2 - 3 个真实工作流案例。
- [ ] 增加风险边界页。
- [ ] 增加最终总结金句页。

### Phase 3：增加动画和演讲节奏

- [ ] 页面切换动画。
- [ ] 分步出现动画。
- [ ] 数字放大动画。
- [ ] Prompt 高亮动画。
- [ ] 打字机效果。
- [ ] 流程线动画。

### Phase 4：提升可维护性

- [ ] 将主题色、字体、间距写入 CSS 变量。
- [ ] Slide 模板组件不要写死具体文案。
- [ ] 所有页面内容集中在 `content/ai-share`。
- [ ] 动画参数集中在 `lib/animation/presets.ts`。
- [ ] 建立 README，说明如何新增一页、删除一页、调整顺序。

---

## 11. 建议的最小可行版本

不要一开始做得太复杂。第一版只需要完成：

```text
全屏分页 + 19 页内容结构 + 基础动画 + 键盘/滚轮翻页
```

优先级从高到低：

1. 结构像 PPT。
2. 内容像演讲稿。
3. 有开场钩子。
4. 有基础动画。
5. 再做复杂视觉效果。

---

## 12. 后续代码落地建议

如果仓库后续加入前端代码，建议优先检查这些点：

- 是否存在一个过大的首页组件。
- 文案是否硬编码在组件里。
- 翻页逻辑是否和具体页面耦合。
- 动画是否散落在各个组件中。
- 是否有统一的 Slide 类型定义。
- 是否可以通过移动 `slides.ts` 中的数组顺序调整演示顺序。
- 是否能单独修改一个 Slide 模板而不影响其他页面。

目标是让后续改内容时做到：

```text
改文案：只改 content/ai-share/slides.ts
改页面布局：只改 components/slides/*.tsx
改动画节奏：只改 lib/animation/presets.ts
改主题风格：只改 styles/theme.css
```

---

## 13. 总结

这次改造的关键不是“给网页加动画”，而是把它从资料页面改成演示系统：

```text
Slide Deck 结构
+
数据驱动内容
+
模块化页面模板
+
可控演讲节奏
+
适度动画
```

只要先完成这个骨架，后续无论是换主题、换内容、加案例还是调整动画，都会更容易维护。
