# CheN JT · 摄影作品集

电脑端保留原来的深色布局、首屏比例和瀑布流照片排列；手机端保留暖白简约版、单列大图和可折叠目录。手机端最后的 lone_tree 配图按原始比例完整显示。纯 HTML、CSS 和 JavaScript，不需要安装依赖或编译。

## 日常更新只需改两个文件

| 内容 | 文件 | 方法 |
| --- | --- | --- |
| 照片、标题、地点、描述 | `gallery.js` | 复制一组照片，替换内容 |
| 手记章节、段落、配图 | `journey.js` | 复制一组章节，替换内容 |
| 首页文案 | `index.html` | 搜索现有文字并替换 |
| 颜色、间距和字体 | 桌面 `style.css`，手机 `mobile.css` | 顶部 `:root` 为全站变量，其余按页面区域分段 |
| 页面交互 | `site.js` | 日常内容更新不需要修改 |

保存后刷新即可。线上内容可能有缓存，发布时可修改两页资源地址中的 `?v=20260917-5` 版本号。

## 添加照片

在 `gallery.js` 的 `galleryData` 最后一组后、结尾 `];` 前添加：

```js
  {
    id: "hangzhou-01",
    src: "images/hangzhou.webp",
    title: "湖边的风",
    location: "杭州",
    category: "wild",
    alt: "傍晚湖面上的一艘小船",
    caption: "晚风经过湖面，一天慢慢安静下来。",
    width: 2560,
    height: 1708
  },
```

- `id` 必须唯一；`width`、`height` 填原图实际像素，页面据此预留空间。
- 图片放入项目的 `images` 文件夹，或 `src` 填完整 HTTPS 图片网址。
- 每组 `{ ... }` 之间用逗号分隔。图片上下顺序就是清单顺序。
- 分类键：`city` 城市、`life` 人间、`wild` 旷野、`sky` 天体。
- 新增分类时，在顶部 `galleryCategories` 添加如 `sea: '海边'`，照片填 `category: 'sea'`。按钮、计数、筛选和大图导航自动更新。
- 顶部 `featuredPhotoId` 控制首页封面，填写任意照片 id。封面图片、标题和文字随之更新；社交分享缩略图另在两页的 `og:image` 修改。

## 添加文字章节

在 `journey.js` 最后的 `];` 前添加一组：

```js
  {
    id: "chapter-10",
    title: "下一站，海边",
    quote: false,
    blocks: [
      { text: "第一段文字。" },
      { text: "第二段文字。\n这里换一行。" },
      {
        image: "images/coast.webp",
        alt: "海边日落",
        caption: "海边 · 傍晚",
        width: 2560,
        height: 1708
      },
      { text: "图片之后还可以继续写。" }
    ]
  },
```

`blocks` 按顺序展示，可任意交替增加文字和图片。图片路径始终相对项目根目录填写，不需要写 `../`。中文引号可以直接用；英文双引号需写成 `\"`。`quote: true` 为引用风格，适合短句章节。

章节 `id` 不重复，移动整组可调整顺序。目录、序号、总章数、阅读位置标记都自动生成。手机目录点开选择后自动收起；分享 `dist/JOURNEY.html#chapter-10` 可直达该章节。

## 预览与操作

双击 `index.html` 即可浏览。也可以在项目目录运行：

```sh
python -m http.server 8765 --bind 127.0.0.1
```

访问 `http://127.0.0.1:8765`。HTTP 预览会保留地址栏中的作品分类；直接打开文件也支持筛选。

点击照片进入深色大图模式，可按左右键、点击箭头或在手机上滑动切换；Esc 关闭。图片保持原始画幅，浏览器缩放保留。“联系”显示微信二维码。

二维码在 `index.html` 和 `dist/JOURNEY.html` 中的 `weixin.webp`，修改 `data-src`，两页分别更新。

## 部署与备份

沿用现有静态部署方式，发布整个项目，不能只发布 `dist`。新增 `journey.js`、本地图片也要一同发布。没有新增第三方运行依赖。

本轮修改前的六个原文件备份：`E:/chatgpt_download/2026-09-13/895cm-260cm-15/website-work/backup`。

正文由 `journey.js` 渲染，需要启用 JavaScript。首页保留原有 22 张照片的无脚本备用画廊；正常浏览只需维护 `gallery.js`。若要同步无脚本画廊，可运行 `node scripts/sync-fallbacks.cjs`，该工具也会为旅行页生成最新静态备用正文。

原 MIT License 保留。旧 `libs`、Tailwind 配置和构建文件保留，但当前页面不加载。原有 Vercel 统计仅在 HTTPS 部署时启用。

响应式分界为 760px，两套样式分别加载，修改手机样式不会影响电脑端。
