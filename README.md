# Thu-Weiyang58

清华大学未央书院58班班级官方网站。

## 技术栈

| 层面 | 技术 | 说明 |
|------|------|------|
| 框架 | React 19 + TypeScript 5.8 | 类型安全、组件化开发 |
| 构建 | Vite 6.4 | 极速 HMR、Tree-shaking、Code splitting |
| 样式 | Tailwind CSS 3 + PostCSS | Utility-first，生产构建自动 PurgeCSS |
| 路由 | React Router v7 | SPA 客户端路由，URL 参数传递 |
| 动画 | Framer Motion 12 | 页面过渡、滚动触发、手势动画 |
| 图标 | Lucide React | 按需引入，Tree-shaking 优化 |
| 粒子 | 原生 Canvas API | 零依赖点击粒子效果（~200 行） |

## 项目结构

```
Thu-Weiyang58/
├── public/                        # 静态资源，构建时原样复制到 dist/
│   ├── 404.html                   # 404 回退页（GitHub Pages SPA 兼容，基于 segmentio/spa-html）
│   ├── favicon.svg                # 网站图标（青→紫渐变 + 58 文字）
│   ├── files/                     # 文件下载目录 → 直接 URL 访问
│   └── images/                    # 图片根目录
│       ├── hero/                  #   首页大图（class-photo.jpg）
│       ├── gallery/               #   画廊图片（photo-01.jpg ~ photo-06.jpg）
│       ├── gallery/articles/      #   专栏文章配图
│       ├── gallery/thumb/         #   画廊缩略图（按需，若无则直接使用原图）
│       └── members/               #   成员头像（avatar-01.jpg ~ avatar-NN.jpg）
│
├── src/
│   ├── components/                # 可复用组件（~20 个）
│   │   ├── layout/                #   Navbar, Footer, Layout（页面壳）
│   │   ├── ui/                    #   Card, Button, Badge, Modal, Timeline,
│   │   │                          #   FileCard, ImageCard, SectionHeading, ClickParticles
│   │   ├── home/                  #   HeroSection, StatsSection, QuickLinks, LatestUpdates
│   │   ├── achievements/          #   AchievementCard
│   │   ├── members/               #   MemberCard
│   │   ├── articles/              #   ArticleCard
│   │   └── gallery/               #   Lightbox（全屏灯箱）
│   │
│   ├── pages/                     # 页面组件（8 个 + ArticleDetailPage）
│   │   ├── HomePage.tsx           #   首页 /
│   │   ├── AchievementsPage.tsx   #   班级成果 /achievements
│   │   ├── MembersPage.tsx        #   班级成员 /members
│   │   ├── ActivitiesPage.tsx     #   活动时间线 /activities
│   │   ├── AnnouncementsPage.tsx  #   通知公告 /announcements
│   │   ├── ArticlesPage.tsx       #   专栏文章列表 /articles
│   │   ├── ArticleDetailPage.tsx  #   文章详情页 /articles/:id
│   │   ├── FilesPage.tsx          #   文件下载 /files
│   │   └── GalleryPage.tsx        #   图片画廊 /gallery
│   │
│   ├── data/                      # 数据层（9 个 JSON 文件，共 ~8 KB）
│   │   ├── site-config.json       #   网站名称、简介、社交链接
│   │   ├── stats.json             #   首页统计数字
│   │   ├── achievements.json      #   班级成果
│   │   ├── members.json           #   成员信息
│   │   ├── activities.json        #   活动时间线
│   │   ├── announcements.json     #   通知公告
│   │   ├── articles.json          #   专栏文章
│   │   ├── files.json             #   文件元数据
│   │   └── gallery.json           #   画廊图片元数据
│   │
│   ├── hooks/                     # 自定义 Hook
│   │   ├── useScrollReveal.ts     #   元素进入视口时触发动画
│   │   └── useImageLoader.ts      #   图片懒加载 + 模糊占位 + 错误回退
│   │
│   ├── utils/
│   │   ├── constants.ts           #   导航链接、分类选项、文件类型图标
│   │   └── formatters.ts          #   日期格式化、文件大小转换、年份提取
│   │
│   ├── App.tsx                    # 路由定义
│   ├── main.tsx                   # ReactDOM 入口
│   └── index.css                  # Tailwind 指令 + 全局自定义样式 + 动画关键帧
│
├── .github/workflows/deploy.yml   # CI/CD：推送 main → 构建 → 部署 GitHub Pages
├── tailwind.config.ts             # 主题配置（颜色、字体、间距、动画）
├── vite.config.ts                 # Vite 配置（base 路径、构建选项）
├── tsconfig.json                  # TypeScript 配置
└── package.json                   # 依赖与脚本
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（HMR 热更新）
npm run dev

# 构建生产版本
npm run build

# 本地预览生产版本
npm run preview
```

开发服务器默认监听 `http://localhost:5173/Thu-Weiyang58/`。

## 设计系统 — 「青韵清华」

| 令牌 | 色值 | Tailwind 类 | 用途 |
|------|------|-------------|------|
| Primary | `#0D7377` | `text-primary`, `bg-primary` | 按钮、链接、导航高亮 |
| Primary Light | `#14B8A6` | `from-primary to-primary-light` | 渐变过渡色 |
| Accent（紫） | `#6D28D9` | `text-accent`, `bg-accent` | 高亮标记、未来事件、精选标签 |
| Accent Light | `#8B5CF6` | `bg-accent/10` | 浅色背景标记 |
| Gold | `#C9A84C` | `gold-text`, `Badge variant="gold"` | 特殊文字、置顶徽章 |
| Dark | `#1A1A2E` | `bg-dark` | 标题、深色背景 |
| Light | `#F8F7FC` | `bg-light` | 页面底色 |
| Surface | `#FFFFFF` | `card-base`, `bg-white` | 卡片、容器背景 |

所有颜色在 `tailwind.config.ts` 中定义，**不要在组件中硬编码色值**，始终使用 Tailwind 类名。

## 内容管理 — 完整指南

网站所有内容通过编辑 `src/data/` 下的 JSON 文件来管理，**无需修改任何代码**。

### 总原则

1. **添加新条目**：在对应 JSON 数组末尾追加一个新对象
2. **修改条目**：找到对应 `id` 的对象，修改字段值
3. **删除条目**：从数组中移除该对象
4. **ID 规则**：使用递增数字字符串 `"1"`, `"2"`, `"3"`...，确保不重复
5. **日期格式**：统一 `YYYY-MM-DD`（如 `"2025-12-20"`）
6. **图片路径**：以 `/images/` 开头（对应 `public/images/` 目录）
7. **文件路径**：以 `/files/` 开头（对应 `public/files/` 目录）

### 修改后刷新

编辑 JSON 文件后，Vite HMR 会自动热更新页面。如果是 `npm run build` 静态部署，则需要重新构建。

---

### 1. site-config.json — 网站全局配置

```json
{
  "className": "未央书院58班",           // 导航栏和页脚显示的短名称
  "classFullName": "清华大学未央书院58班", // 首页 Hero 和 SEO title
  "department": "未央书院",
  "university": "清华大学",
  "description": "...",                   // 首页简介段落
  "socialLinks": {
    "wechat": "Weiyang58",               // 微信公众号 ID
    "email": "weiyang58@mails.tsinghua.edu.cn"
  }
}
```

### 2. stats.json — 首页统计数字

```json
{
  "totalMembers": 30,        // 首页「班级成员」计数
  "totalAchievements": 15,   // 首页「班级成果」计数
  "totalActivities": 20,     // 首页「活动」计数
  "established": "2024"      // 成立年份
}
```

> 注意：`totalAchievements` 和 `totalActivities` 是**手动维护**的数字，不会自动从 `achievements.json` / `activities.json` 计算。请确保更新时同步。

---

### 3. achievements.json — 班级成果

每条记录的字段：

```json
{
  "id": "1",                              // 唯一标识，递增
  "title": "校级优秀班集体",               // 成果标题
  "category": "集体荣誉",                  // 分类：集体荣誉 | 个人荣誉 | 学术成果
  "date": "2025-12",                      // 月份格式 YYYY-MM
  "description": "...",                   // 详细描述
  "image": "/images/gallery/achievement-01.jpg",  // 配图路径，空字符串 "" 则不显示图片
  "highlight": true                       // true = 显示金色「亮点」勋章 + 紫边
}
```

**添加一个新成果的步骤**：
1. （可选）将配图放入 `public/images/gallery/`
2. 在 `achievements.json` 数组末尾追加一条记录
3. 更新 `stats.json` 中的 `totalAchievements`

**图片显示逻辑**：
- `image` 字段非空 → 卡片顶部显示 160px 高的配图，hover 时放大
- `image` 字段为空 → 显示渐变占位符（青→紫色背景 + 图片图标）
- 图片加载失败（404）→ 自动隐藏图片区域，不影响卡片显示

---

### 4. members.json — 班级成员

每条记录的字段：

```json
{
  "id": "1",
  "name": "张明远",
  "role": "班长",                                          // 职务，普通同学填 "同学"
  "avatar": "/images/members/avatar-01.jpg",                // 头像路径
  "bio": "热爱运动，喜欢篮球和跑步。担任班长一职...",        // 个人简介
  "tags": ["组织能力", "运动达人", "责任心"],                // 标签（1-5 个）
  "contact": {
    "email": "zhangmy@mails.tsinghua.edu.cn",              // 邮箱，空字符串则隐藏
    "wechat": "zhangmingyuan99"                             // 微信，空字符串则隐藏
  }
}
```

**添加一个新成员的步骤**：
1. 将头像图放入 `public/images/members/avatar-NN.jpg`（建议 1:1 比例，≥200×200px）
2. 在 `members.json` 末尾追加
3. 更新 `stats.json` 中的 `totalMembers`

**角色与视觉区别**：
- `role === "同学"` → 顶部青色装饰条
- `role !== "同学"`（班委）→ 顶部紫色装饰条

**卡片交互**：
- 正面：头像 + 姓名 + 职务 + 简介
- 悬停时卡片翻转 → 背面：深色背景 + 联系信息（邮箱可点击 mailto:）
- 头像加载失败 → 自动显示姓名首字（渐变圆角方块）

**头像建议**：
- 尺寸：200×200px 以上
- 格式：JPG 或 WebP（JPG 兼容性更好）
- 命名：`avatar-01.jpg`, `avatar-02.jpg`...

---

### 5. activities.json — 活动时间线

每条记录的字段：

```json
{
  "id": "1",
  "date": "2025-09-15",                          // 日期 YYYY-MM-DD
  "title": "新生入学教育",
  "type": "班级活动",                             // 班级活动 | 文体活动 | 学术活动 | 志愿活动
  "description": "...",
  "images": ["/images/gallery/activity-01.jpg"],  // 图片数组，最多 5 张
  "location": "清华园"                             // 地点，空字符串则不显示
}
```

**未来活动（即将到来）**：
- 日期晚于今天的活动自动归类为「未来活动」
- 未来活动在时间线顶部独立展示，紫色高亮 + 脉冲动画圆点 + 「即将到来」徽章
- 过去活动按年份分组展示

**添加活动**：
1. 图片放入 `public/images/gallery/` 或对应的活动目录
2. 在 `activities.json` 末尾追加
3. 更新 `stats.json` 中的 `totalActivities`

---

### 6. announcements.json — 通知公告

每条记录的字段：

```json
{
  "id": "1",
  "date": "2025-10-01",
  "title": "关于期中考试安排的通知",
  "content": "各位同学：\n\n期中考试将于...",
  "pinned": true,                     // 置顶（始终显示在最前，带金色「置顶」徽章）
  "category": "学业通知"              // 学业通知 | 班级事务 | 活动通知
}
```

**发布新通知**：
- 直接追加到 `announcements.json`
- 重要通知设置 `"pinned": true`，在列表顶部醒目显示
- 点击公告卡片可在页面内展开/折叠全文（不跳转）

---

### 7. articles.json — 专栏文章

每条记录的字段：

```json
{
  "id": "1",
  "title": "新生入学季 | 58班的故事从这里开始",
  "date": "2025-09-03",
  "author": "张明远",
  "category": "班级故事",         // 班级故事 | 学习分享 | 活动回顾 | 通知转发
  "summary": "...",               // 列表页显示的摘要（1-3 句话）
  "content": "...",               // 正文，支持 \n 换行
  "image": "/images/gallery/articles/welcome-01.jpg",  // 头图，空字符串则无图
  "featured": true                // true = 显示金色「精选」徽章，排序靠前
}
```

**文章发布流程**：
1. 将头图放入 `public/images/gallery/articles/`（建议 16:9 比例，≥1200px 宽）
2. 在 `articles.json` 中写完整正文（`content` 字段）
3. 用 `\n\n` 分隔段落，`\n` 换行
4. 设置 `featured: true` 标记精选文章

**文章展示**：
- 列表页：3 列卡片网格，显示头图 + 标题 + 摘要 + 日期 + 作者
- 详情页 `/articles/:id`：独立全宽页面，头图 + 元信息 + 正文

---

### 8. files.json — 文件下载

每条记录的字段：

```json
{
  "id": "1",
  "name": "班级通讯录",
  "description": "2025-2026学年班级通讯录",
  "category": "班级事务",           // 班级事务 | 学习资料 | 其他
  "filePath": "/files/通讯录.pdf",   // 相对 public/ 的路径
  "fileSize": 245760,               // 字节数
  "fileType": "pdf",                // pdf | doc | docx | ppt | pptx | xls | xlsx | zip | rar | txt | png | jpg
  "uploadDate": "2025-09-01"
}
```

**添加文件**：
1. 将文件放入 `public/files/`
2. 在 `files.json` 追加记录
3. `fileSize` 是字节数，Windows 右键→属性可查看
4. 文件页支持按分类筛选和文字搜索

**文件类型图标**：根据 `fileType` 自动显示（PDF→📄、PPT→📊、Excel→📈、压缩包→📦）

---

### 9. gallery.json — 图片画廊

每条记录的字段：

```json
{
  "id": "1",
  "title": "开学典礼合影",
  "description": "2025年秋季学期开学典礼",
  "imagePath": "/images/gallery/photo-01.jpg",            // 原图路径
  "thumbnailPath": "/images/gallery/thumb/photo-01.jpg",  // 缩略图路径（可选）
  "date": "2025-09-01",
  "category": "集体活动"                                   // 集体活动 | 文体活动 | 学术活动 | 志愿活动
}
```

**添加图片**：
1. 将原图放入 `public/images/gallery/`
2. （可选）生成缩略图放入 `public/images/gallery/thumb/`
3. 在 `gallery.json` 追加记录
4. 如果无缩略图，将 `thumbnailPath` 设为与 `imagePath` 相同

**图片规范**：
- 原图：建议 ≤2MB，宽度 1200-2400px
- 缩略图：建议宽度 400px，用于列表快速加载
- 格式：JPG 或 WebP

**画廊功能**：
- 瀑布流布局（CSS columns）
- 按分类筛选
- 点击打开全屏灯箱：键盘 ← → 切换，Esc 关闭
- 图片加载失败自动隐藏该卡片

---

### 10. 首页大图

替换 `public/images/hero/class-photo.jpg` 即可更新首页 Hero 背景图。

建议：16:9 或更宽比例，≥1920px 宽，≤500KB。

---

## 部署 — GitHub Pages

### 自动部署

推送 `main` 分支即自动触发 `.github/workflows/deploy.yml`：

1. checkout 代码
2. 安装依赖 `npm ci`
3. 构建 `npm run build`
4. 部署 `dist/` 到 `gh-pages` 分支

### 首次配置 GitHub Pages

1. GitHub 仓库 → Settings → Pages
2. Source 选择 **Deploy from a branch**
3. Branch 选择 `gh-pages`，目录 `/ (root)`
4. Save

### 404 回退说明

`public/404.html` 使用了 [segmentio/spa-html](https://github.com/segmentio/spa-html) 方案：

- 当用户直接访问 `/articles/1` 等 SPA 路由时，GitHub Pages 返回 404
- `404.html` 将当前 URL 的路径和查询参数保存到 `sessionStorage`
- 然后重定向到 `index.html`，由 React Router 根据保存的路径正确渲染

**无需额外配置。**

### Vite base 路径

`vite.config.ts` 中 `base` 配置为 `/Thu-Weiyang58/`。如果你的仓库名不同，需要修改此值：

```ts
// vite.config.ts
export default defineConfig({
  base: "/你的仓库名/",  // ← 改这里
  // ...
});
```

同时更新 `index.html` 和 `404.html` 中所有 `/Thu-Weiyang58/` 前缀引用。

---

## 配色主题定制

修改 `tailwind.config.ts` 中的颜色即可全局更新：

```ts
colors: {
  primary: {
    DEFAULT: "#0D7377",        // 主色（青）
    light: "#14B8A6",          // 主色浅
    lighter: "#5EEAD4",        // 主色超浅
  },
  accent: {
    DEFAULT: "#6D28D9",        // 强调色（紫）
    light: "#8B5CF6",          // 强调色浅
    lighter: "#C4B5FD",        // 强调色超浅
  },
  gold: "#C9A84C",             // 金色（置顶/精选徽章）
  // ...
}
```

修改后直接 `npm run dev` 即可看到效果。

---

## 响应式断点

| 断点 | 宽度 | 布局行为 |
|------|------|----------|
| 默认（mobile） | < 640px | 单列，汉堡菜单 |
| `sm` | ≥ 640px | 双列网格 |
| `md` | ≥ 768px | 三列、时间线左右交替 |
| `lg` | ≥ 1024px | 桌面导航栏、四列画廊 |
| `xl` | ≥ 1280px | 内容区最大宽度 `max-w-7xl` |

---

## 技术注意事项

### JSON 数据文件

- **TypeScript 直接 import JSON**：`import data from "../data/foo.json"` 无需额外配置
- **编码**：全部 UTF-8，确保中文字符正确显示
- **尾逗号**：JSON 标准不允许，但编辑器通常会自动格式化
- **验证**：如果 JSON 格式错误，`npm run build` 会直接失败并提示

### 图片注意事项

- **未上传的图片不会导致页面崩溃**：`useImageLoader` hook 会捕获 404 并回退到占位符
- **生产构建不会内联大图**：小于 4KB 的图片才会被 Vite 内联为 base64
- **画廊图片过多时**：考虑自行生成缩略图，将原图尺寸控制在 2MB 内

### 路由注意事项

- `AnimatePresence mode="wait"` 使页面切换动画等待出场完成
- `/articles/:id` 中无效 id（如 `/articles/999`）会显示「文章不存在」提示
- 组件中的 `<Link>` 使用 SPA 内跳转，不会刷新页面

### Framer Motion

- 滚动触发的动画使用 `whileInView` + `viewport={{ once: true }}`，仅触发一次
- 列表动画使用 `AnimatePresence` + `layout` 支持筛选时的平滑过渡
- 点击粒子使用原生 Canvas，不依赖 Framer Motion，避免大量对象时的性能问题

### 构建产物

| 文件 | 大小（未压缩） | 说明 |
|------|----------------|------|
| `index.html` | 1.0 KB | 入口 HTML |
| `assets/index-*.css` | ~43 KB | Tailwind + 自定义样式 |
| `assets/index-*.js` | ~445 KB | React + Router + Motion + 业务代码 |
| **gzip 合计** | **~148 KB** | 首次访问的实际下载量 |

---

## 常见操作备忘

### 发布一篇新专栏文章

1. 配图 → `public/images/gallery/articles/新文章.jpg`
2. 编辑 `src/data/articles.json`，追加：
```json
{
  "id": "N",
  "title": "文章标题",
  "date": "2026-05-01",
  "author": "作者名",
  "category": "班级故事",
  "summary": "1-3句话摘要",
  "content": "正文，\n换行，\n\n分段。",
  "image": "/images/gallery/articles/新文章.jpg",
  "featured": false
}
```
3. 本地 `npm run dev` 预览
4. `git add . && git commit -m "新增文章：xxx" && git push`
5. GitHub Actions 自动部署

### 添加一批活动照片

1. 照片 → `public/images/gallery/`
2. （可选）缩略图 → `public/images/gallery/thumb/`
3. 编辑 `src/data/gallery.json`，每张照片一条记录
4. 提交推送

### 修改首页统计数字

编辑 `src/data/stats.json`，改数字，保存。无需重启开发服务器。

### 上传一个可下载文件

1. 文件 → `public/files/`
2. 编辑 `src/data/files.json`，追加记录
3. 在 Windows 上右键文件→属性→查看「大小」字节数，填入 `fileSize`

### 切换 Navbar 链接或新增页面

1. 编辑 `src/utils/constants.ts` 中的 `NAV_LINKS`
2. 在 `src/App.tsx` 添加 `<Route>`
3. 在 `src/pages/` 创建页面组件
