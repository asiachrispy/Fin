# UI 原型图提示词 (UI Prompts)

本文档包含根据产品需求文档（Product-Spec.md）生成的原型图提示词，可用于 Midjourney、DALL-E、Stable Diffusion 等工具生成设计稿。

---

## 设计风格与配色

**视觉风格**：Clean Professional（专业简洁）

**风格说明**：
- 选择理由：目标用户是企业高管（35-65 岁），需要专业、可信、高效的设计风格
- 适合场景：数据分析、企业级应用、管理后台
- 核心优势：减少视觉干扰，突出关键信息（影响程度分数），提升决策效率

**配色方案**：
- **主色**：#1E3A8A（深蓝色）- 用于导航栏、主要按钮，代表专业和信任
- **辅助色**：#6B7280（中灰色）- 用于次要文本、边框，保持中性
- **强调色**：#DC2626（红色）- 用于高影响事件（7-10分），警示色
- **背景色**：#F9FAFB（浅灰色）- 用于页面背景，减少眼疲劳
- **成功色**：#10B981（绿色）- 用于低影响事件（1-3分）
- **中等色**：#F59E0B（橙色）- 用于中等影响事件（4-6分）

---

## 核心 UI 提示词

### 界面 1：事件列表页（首页）- 版本 A

**功能描述**：展示所有突发事件及其影响分析结果，支持筛选和搜索

**提示词**：
```
A professional web application dashboard interface for enterprise executives to view global news events and their business impact analysis.

Application type: Web application, desktop browser, 1920x1080 resolution
Interface type: Dashboard / Event list page
Visual style: Clean Professional, corporate, data-driven
Color scheme: Primary deep blue #1E3A8A, secondary gray #6B7280, accent red #DC2626 for high impact, background light gray #F9FAFB

Layout structure:
- Top navigation bar: Logo on left, main menu items (Events, Companies, Settings), user profile on right
- Left sidebar: Filter panel with date range picker, impact level filter (All / Low 1-3 / Medium 4-6 / High 7-10), analysis status filter, search input field
- Main content area: Event cards displayed in a clean list layout, 20 events per page
- Bottom: Pagination controls

Key elements:
- Each event card shows: News headline (bold, large font), news source (small badge), publication time (timestamp), impact score (large circular badge with color coding: green for 1-3, orange for 4-6, red for 7-10), analysis status (success icon or warning icon)
- High impact events (7-10) have a subtle red border/background highlight
- Hover effect on cards: subtle shadow elevation, cursor pointer
- Filter panel: Collapsible, clear labels, checkbox selection for impact levels
- Search bar: Large input field with search icon, placeholder text "搜索新闻标题或影响说明..."

Interactive hints:
- Hover on event card: Show "点击查看详情" tooltip
- Click on filter: Auto-refresh list
- Click on pagination: Smooth transition to next page

Quality keywords: Professional, polished, clean, executive-level, trustworthy, data-driven, award-winning UI design
Size ratio: 1920x1080, 16:9 aspect ratio
Language: Chinese interface
```

**使用建议**：
- 适合作为主界面设计稿
- 突出数据可视化和专业感
- 强调信息层次和可读性

---

### 界面 1：事件列表页（首页）- 版本 B

**功能描述**：卡片式布局，更现代的视觉风格

**提示词**：
```
A modern corporate dashboard interface for global news event impact analysis, designed for enterprise executives.

Application type: Web application, desktop browser
Interface type: Dashboard with card-based layout
Visual style: Modern minimalist with corporate touch, inspired by Material Design
Color scheme: Deep blue #1E3A8A, gray #6B7280, alert red #DC2626, success green #10B981, warning orange #F59E0B

Layout structure:
- Header: Compact top bar with logo, navigation tabs, notification bell icon
- Filter bar: Horizontal filter bar below header, pills-style filter buttons (最近7天, 低影响, 中等影响, 高影响, 全部)
- Main content: Grid layout with event cards, 3 columns on desktop, responsive
- Right panel: Statistics summary card showing "今日事件: 15条, 高影响: 3条"

Key elements:
- Event cards: Card-based design with subtle shadow, rounded corners (8px)
- Each card contains: Impact score badge (prominent, color-coded circular badge), headline (truncated to 2 lines), news source tag, timestamp, brief summary of impact analysis
- High impact cards: Red left border accent (4px), slightly elevated shadow
- Filter pills: Active state with filled color, inactive state with outline
- Statistics panel: Mini charts showing impact distribution over time

Interactive hints:
- Hover on card: Lift effect (translateY -4px), shadow intensifies
- Click on filter pill: Smooth animation, content reloads with fade effect
- Hover on impact score: Show tooltip explaining score range

Quality keywords: Modern, clean, professional, refined, sophisticated, intuitive, award-winning UI
Size ratio: 1920x1080
Language: Chinese
```

**使用建议**：
- 适合追求更现代、更视觉化的设计
- 卡片式布局更适合快速浏览
- 适合年轻一代的企业高管

---

### 界面 2：事件详情页 - 版本 A

**功能描述**：展示单个事件的完整信息和 AI 分析结果

**提示词**：
```
A detailed event page for a corporate news impact analysis system, showing comprehensive event information.

Application type: Web application, desktop browser
Interface type: Detail page
Visual style: Clean Professional, consistent with list page
Color scheme: Same deep blue #1E3A8A primary, with color-coded impact indicators

Layout structure:
- Top: Breadcrumb navigation (事件列表 > 事件详情)
- Main content: Two-column layout (60% left, 40% right)
- Left column:
  - News article section: Full headline (large, bold), source info (logo + name), publication time, original article link (external link icon)
  - News content: Article body text with proper typography, readable line height
- Right column:
  - Impact analysis card: Large impact score display (circular progress indicator, color-coded), detailed impact explanation text
  - Company information card: Company name, industry, business description, main markets
  - Related events section: List of related news articles about the same event

Key elements:
- Impact score: Prominent circular badge (120px diameter), shows score number in center, color ring fills based on score value
- Impact explanation: Clear section with heading "影响说明", text in readable paragraphs
- Company info: Icon-based layout (industry icon, market icon, business icon)
- Related events: Compact list, each item shows headline, source, impact score
- Back button: Top left, arrow icon + "返回列表" text

Interactive hints:
- Hover on "原文链接": Show tooltip "在新窗口打开"
- Hover on related event: Highlight effect, cursor pointer
- Sticky right column: Right panel stays visible when scrolling long articles

Quality keywords: Professional, detailed, polished, executive-grade, information-dense but organized
Size ratio: 1920x1080
Language: Chinese
```

**使用建议**：
- 强调信息完整性和可读性
- 适合高管深入了解事件详情
- 布局清晰，左右分栏便于快速定位关键信息

---

### 界面 2：事件详情页 - 版本 B

**功能描述**：更注重视觉层次和 AI 分析展示的详情页

**提示词**：
```
A visually rich event detail page for news impact analysis, emphasizing AI analysis visualization.

Application type: Web application, desktop browser
Interface type: Detail page with enhanced data visualization
Visual style: Modern professional with subtle gradients
Color scheme: Deep blue #1E3A8A with gradient accents for impact visualization

Layout structure:
- Top: Full-width hero section with impact score (large, centered, gradient background)
- Main content: Stacked card layout below hero section
  - Card 1: News article (headline, source, content)
  - Card 2: AI impact analysis (score, explanation, confidence level)
  - Card 3: Company context (business info, markets)
  - Card 4: Related events timeline

Key elements:
- Hero section: Large impact score (150px) with gradient fill (green to red based on score), pulsing animation for high impact events
- Impact analysis card: Visual breakdown of impact factors (supply chain, regulatory, competition, etc.) using progress bars or radar chart
- Confidence indicator: Show AI analysis confidence level as a percentage
- Related events: Timeline visualization showing how the story evolved across multiple sources
- Floating action button: "分享此分析" (bottom right)

Interactive hints:
- Hover on impact factors: Show detailed explanation tooltip
- Click on timeline events: Jump to that related article
- Smooth scroll navigation between cards

Quality keywords: Visually impressive, data-rich, modern, engaging, professional
Size ratio: 1920x1080
Language: Chinese
```

**使用建议**：
- 适合强调 AI 能力和数据可视化
- 更有视觉冲击力
- 适合展示技术先进性

---

### 界面 3：企业管理页 - 版本 A

**功能描述**：管理企业信息，支持添加、编辑、删除企业

**提示词**：
```
A company management page for enterprise news impact analysis system.

Application type: Web application, desktop browser
Interface type: Management page / Settings page
Visual style: Clean Professional, form-based interface
Color scheme: Deep blue #1E3A8A primary, standard form styling

Layout structure:
- Top: Page header with title "企业管理" and "添加企业" button (right aligned)
- Main content: Two-column layout
  - Left column (70%): Company list table
  - Right column (30%): Quick stats (total companies, active companies)

Key elements:
- Company table: Columns include company logo/name, industry, main markets, last updated, actions (edit, delete)
- Each row: Hover effect, action buttons visible on hover
- "添加企业" button: Prominent CTA button, primary color background
- Table header: Sortable columns (click column name to sort)
- Search bar: Above table, search by company name or industry

Interactive hints:
- Click "添加企业": Open modal dialog with form
- Click "编辑": Open pre-filled modal dialog
- Click "删除": Show confirmation dialog
- Hover on row: Subtle background highlight

Quality keywords: Clean, functional, professional, intuitive, well-organized
Size ratio: 1920x1080
Language: Chinese
```

**使用建议**：
- 适合传统的表格式管理界面
- 高效展示多个企业信息
- 适合有多个企业的集团用户

---

### 界面 3：企业管理页 - 版本 B

**功能描述**：卡片式企业管理界面，更现代的布局

**提示词**：
```
A modern card-based company management interface for news impact analysis system.

Application type: Web application, desktop browser
Interface type: Management page with card layout
Visual style: Modern, grid-based, visual
Color scheme: Deep blue #1E3A8A with card accents

Layout structure:
- Top: Page header with title and search/add controls
- Main content: Grid of company cards (3 columns)
- Right side: Filter panel (industry, market filters)

Key elements:
- Company card: Card shows company logo, name, industry tag, markets (chips), brief business description (truncated), last analyzed timestamp
- Each card: Edit/delete actions in card footer
- Hover effect: Card lifts, shadow increases
- Add company card: Empty card with "+" icon and "添加企业" text
- Filter panel: Collapsible, checkbox filters

Interactive hints:
- Click on card: Open company detail view
- Click on edit/delete: Inline actions or modal
- Drag and drop: Reorder cards (optional)

Quality keywords: Modern, visual, card-based, clean, engaging
Size ratio: 1920x1080
Language: Chinese
```

**使用建议**：
- 适合企业数量不多（<20家）的场景
- 更有视觉吸引力
- 卡片式布局便于快速识别企业

---

## 交互流程提示词

### 流程 1：添加企业并自动获取企业信息（AI增强）

**流程描述**：用户输入企业名称 → AI 自动获取企业信息 → 用户确认 → 保存

**关键界面**：
- 界面 1：企业管理页（点击"添加企业"按钮）
- 界面 2：添加企业对话框（输入企业名称）
- 界面 3：AI 信息加载状态（显示加载动画）
- 界面 4：确认企业信息（显示 AI 获取的信息，用户可编辑）
- 界面 5：成功提示（企业已添加）

**提示词**：
```
A multi-step onboarding flow for adding a new company in a news impact analysis system, featuring AI-powered auto-fill.

Step 1 - Modal dialog:
- Clean modal dialog centered on screen
- Title: "添加企业"
- Single input field: "企业名称" (large, prominent)
- "自动获取信息" button: Primary CTA, AI icon + text
- Subtle hint text below input: "输入企业名称，AI 将自动填充企业信息"

Step 2 - Loading state:
- Same modal with loading animation
- Spinning AI/brain icon or pulsing effect
- Loading text: "正在获取企业信息..." with animated dots
- Progress bar or skeleton screen showing what fields are being filled

Step 3 - Confirmation form:
- Modal expands to show filled form fields:
  - 企业名称 (pre-filled, editable)
  - 所属行业 (dropdown, pre-selected)
  - 主要业务 (textarea, pre-filled)
  - 主要市场 (dropdown, pre-selected)
  - 竞争对手 (text input, pre-filled, comma-separated)
- Each field has an edit icon (pencil)
- Highlighting effect: Fields animate in one by one to show AI filling them
- Footer: "确认保存" and "重新获取" buttons

Step 4 - Success state:
- Modal closes
- Success toast notification: "企业已成功添加"
- Company list updates with new entry (highlight animation)

Quality keywords: Smooth, intelligent, automated, user-friendly, modern interaction design
Size ratio: 1920x1080 (showing modal on top of dashboard)
Language: Chinese
```

---

### 流程 2：查看高影响事件详情并分析

**流程描述**：用户在列表中看到高影响事件 → 点击查看详情 → 阅读完整分析 → 查看相关事件

**关键界面**：
- 界面 1：事件列表页（高影响事件高亮显示）
- 界面 2：点击高影响事件卡片
- 界面 3：事件详情页（完整信息）
- 界面 4：滚动查看相关事件

**提示词**：
```
A user journey flow showing how an executive discovers and analyzes a high-impact news event.

Frame 1 - List view:
- Dashboard showing event list
- One high-impact event card (red border, score 8/10) prominently displayed
- User's cursor hovering over the card
- Tooltip: "点击查看详情"

Frame 2 - Detail page (initial view):
- Event detail page loads with smooth transition
- Hero section with large impact score (8/10, red gradient)
- User's eye path: Score → Headline → Impact explanation

Frame 3 - Scrolling:
- User scrolls down to see full article and related events
- Right column (impact analysis) stays sticky/fixed
- Smooth scroll behavior

Frame 4 - Related events:
- User reaches "相关事件" section at bottom
- Timeline visualization of how story evolved
- User clicks on a related event

Quality keywords: Intuitive, informative, decision-support, executive-grade UX
Size ratio: 1920x1080 for each frame (or show as 4-panel comic strip layout)
Language: Chinese
```

---

## AI 交互界面提示词

### AI 功能 1：自动获取企业信息

**AI 交互特点**：输入企业名称后，AI 自动填充表单字段，展现智能能力

**提示词**：
```
An AI-powered form autofill interface for company information entry.

Key elements to include:
- Input field: Large, prominent "企业名称" field at top
- AI trigger: "让 AI 填写" button with brain/sparkle icon, positioned next to input
- Loading state: Animated loading indicator showing AI is "thinking" and retrieving data
- Form fields: Below input, show multiple fields (行业, 业务, 市场, 竞争对手) with skeleton screens initially
- AI filling animation: Fields populate one by one with smooth transitions, as if AI is typing
- Confidence indicators: Small badges showing AI's confidence level for each field (e.g., "95% 置信度")
- Editable state: All pre-filled fields are editable, with pencil icons
- Success message: "AI 已自动填充企业信息，请确认或修改"

Visual style: Modern, magical but professional, subtle glow effects around AI elements
Color scheme: Use purple/blue gradient for AI-related elements to distinguish from standard UI
Quality keywords: Intelligent, automated, smooth, magical, time-saving, user-friendly
Size ratio: 1920x1080 (showing modal dialog)
Language: Chinese
```

---

### AI 功能 2：智能推送预览

**AI 交互特点**：展示 AI 如何筛选和推送高影响事件

**提示词**：
```
An AI-powered smart notification preview interface.

Key elements to include:
- Settings panel: "推送设置" section
- Threshold slider: Interactive slider for "推送阈值" (default: 7/10)
- Live preview: As user adjusts slider, show preview of what would be pushed today
- Preview card: Shows "今日分析 100 条事件，AI 筛选出 15 条高影响事件" (dynamic count based on threshold)
- Event summary: AI-generated summary text: "今天发现 15 条高影响事件，主要涉及供应链、政策变化、竞争对手动态"
- List of events: Mini cards showing events that meet threshold
- Toggle: "启用智能推送" switch with on/off states
- Insight text: "AI 智能推送可减少 85% 的信息噪音"

Visual style: Clean, with emphasis on data visualization
Interactive elements: Slider, toggle switches, dynamic counters
Quality keywords: Smart, personalized, noise-reduction, efficient, AI-driven
Size ratio: 1920x1080
Language: Chinese
```

---

### AI 功能 3：事件聚类展示

**AI 交互特点**：展示 AI 如何将多个新闻报道聚合成一个事件

**提示词**：
```
An AI-powered event clustering visualization showing how multiple news articles about the same story are grouped together.

Key elements to include:
- Main event card: Large card showing representative article (most authoritative source)
- Impact score: Prominently displayed (e.g., 8/10)
- Cluster indicator: Badge showing "10 条相关报道"
- Related articles: Collapsible section showing all 10 articles from different sources (BBC, CNN, Reuters, Bloomberg, etc.)
- Source logos: Small logos or badges for each source
- Expandable: Click to expand/collapse related articles
- AI insight: Text explaining "AI 检测到 10 个媒体报道同一事件，已聚合显示"
- Timeline: Mini timeline showing when each source published the story

Visual style: Data-rich but organized, clear visual hierarchy
Interactive elements: Expand/collapse animation, hover on source to see details
Quality keywords: Intelligent, organized, noise-free, comprehensive, AI-curated
Size ratio: 1920x1080
Language: Chinese
```

---

## 设计建议

### 布局建议
- **信息密度平衡**：高管用户需要快速获取信息，但不要过度拥挤。使用留白和视觉层次区分重要性
- **影响分数突出**：无论在哪个页面，影响程度分数都应该是视觉焦点（使用大号字体、颜色编码、圆形徽章）
- **一致的布局模式**：所有页面使用相同的导航结构、字体系统、间距系统（8px grid）
- **响应式考虑**：虽然主要针对桌面端，但应保证在 1366x768 分辨率下正常显示

### 交互建议
- **悬停反馈**：所有可点击元素都应该有明确的悬停效果（阴影、颜色变化、光标变化）
- **加载状态**：AI 操作可能需要时间，必须显示加载动画和进度提示
- **错误处理**：AI 分析失败时，显示友好的错误提示和重试按钮
- **快捷操作**：提供键盘快捷键（如 ESC 关闭弹窗，Ctrl+F 搜索）

### 动效建议
- **页面过渡**：使用淡入淡出（fade）或滑动（slide）效果，避免突兀的页面切换
- **数据加载**：使用骨架屏（skeleton screen）代替传统的加载转圈
- **微交互**：按钮点击、卡片悬停、表单聚焦时添加微妙的动画（100-200ms）
- **AI 填充动画**：AI 自动填充表单时，字段逐个出现，模拟"打字"效果

### 响应式设计
- **桌面端（1920x1080）**：主要设计目标，充分利用屏幕空间
- **笔记本（1366x768）**：隐藏次要信息，使用可折叠侧边栏
- **大屏（2560x1440）**：增加信息密度，显示更多并列内容
- **移动端**：暂不优先支持，但布局应具备基本的响应能力

---

## 使用指南

### 生成设计稿的步骤

1. **选择提示词版本**：根据你的偏好选择版本 A（经典专业）或版本 B（现代创新）
2. **复制完整提示词**：将提示词（包括所有细节）完整复制到图像生成工具
3. **调整工具参数**：
   - Midjourney：使用 `--ar 16:9` 设置宽高比，`--v 6` 使用最新版本
   - DALL-E：在 prompt 中明确指定 "1920x1080 resolution"
   - Stable Diffusion：设置尺寸为 1920x1080 或 1024x768
4. **生成多个版本**：建议生成 3-5 个版本，对比选择最佳方案
5. **迭代优化**：如果不满意，调整提示词中的关键元素（如配色、布局密度）
6. **保持风格一致**：使用相同的风格关键词和配色方案生成所有界面

### 推荐的图像生成工具

**Midjourney**
- 优点：艺术性强，设计感好，适合生成高质量 UI mockup
- 参数建议：
  - `--ar 16:9`（宽高比）
  - `--v 6`（最新版本）
  - `--style raw`（更真实的照片风格）
  - `--q 2`（高质量）
- 示例：`[prompt] --ar 16:9 --v 6 --style raw --q 2`

**DALL-E 3**
- 优点：理解能力强，细节还原度高
- 使用建议：在 prompt 中强调 "professional UI design", "Chinese interface", "1920x1080"
- 适合生成：具体功能界面的细节设计

**Stable Diffusion**
- 优点：可控性强，适合迭代调整
- 推荐模型：SDXL 1.0 或 Realistic Vision
- 参数设置：
  - Steps: 30-50
  - CFG Scale: 7-9
  - Size: 1024x768 或 1920x1080（需要 SDXL）

**Leonardo AI**
- 优点：UI/UX 设计专用模型，生成速度快
- 推荐模型：PhotoReal 或 Leonardo Diffusion XL
- 适合快速迭代：可以快速生成多个版本对比

### 常见问题

**Q：生成的图片文字是乱码怎么办？**
A：AI 图像生成工具不擅长渲染文字。建议使用提示词生成整体布局和视觉风格，然后用设计工具（如 Figma）手动添加文字。或者在提示词中使用英文占位符，后续替换为中文。

**Q：如何保持多个界面风格一致？**
A：在所有提示词中使用相同的：
- 视觉风格关键词（Clean Professional, Modern Minimalist）
- 配色方案（相同的色值）
- 布局模式（导航栏位置、内容区域结构）
- 字体系统关键词（sans-serif, professional）

**Q：生成的图片颜色不准确怎么办？**
A：在提示词中更明确地指定颜色，如 "deep blue #1E3A8A", "alert red #DC2626"。或者在生成后使用图像编辑工具调整颜色。

**Q：如何生成更具体的交互细节？**
A：在提示词中详细描述交互状态，如 "hover state with shadow elevation", "loading spinner", "active tab with filled color"。可以分别生成"默认状态"和"悬停状态"两个版本。

**Q：可以作为开发参考吗？**
A：可以，但需要注意：
  - AI 生成的图片可能在细节上有偏差（按钮尺寸、间距）
  - 建议将生成的设计稿导入 Figma/Sketch 进行规范化调整
  - 与开发团队沟通时，强调视觉风格和布局结构，而非精确像素

---

## 版本历史

- **1.0.0** - 2026-01-21：根据 Product-Spec.md 1.0.0 生成
  - 新增：事件列表页（版本 A/B）
  - 新增：事件详情页（版本 A/B）
  - 新增：企业管理页（版本 A/B）
  - 新增：AI 交互界面提示词（3个AI功能）
  - 新增：2个交互流程提示词

---

**文档版本**：1.0.0

**最后更新**：2026-01-21

**对应的产品文档**：Product-Spec.md 1.0.0

**下次更新计划**：UI 设计确认后，如需调整界面或交互，将更新此文档
