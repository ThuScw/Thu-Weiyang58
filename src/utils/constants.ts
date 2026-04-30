export const NAV_LINKS = [
  { label: "首页", path: "/" },
  { label: "班级成果", path: "/achievements" },
  { label: "班级成员", path: "/members" },
  { label: "活动时间线", path: "/activities" },
  { label: "通知公告", path: "/announcements" },
  { label: "专栏文章", path: "/articles" },
  { label: "文件下载", path: "/files" },
  { label: "图片画廊", path: "/gallery" },
] as const;

export const ACHIEVEMENT_CATEGORIES = [
  "全部",
  "集体荣誉",
  "个人荣誉",
  "学术成果",
] as const;

export const ANNOUNCEMENT_CATEGORIES = [
  "全部",
  "班级事务",
  "学业通知",
  "活动通知",
] as const;

export const ARTICLE_CATEGORIES = [
  "全部",
  "班级故事",
  "学习分享",
  "活动回顾",
  "通知转发",
] as const;

export const FILE_CATEGORIES = ["全部", "班级事务", "学习资料", "其他"] as const;

export const GALLERY_CATEGORIES = [
  "全部",
  "集体活动",
  "文体活动",
  "学术活动",
  "志愿活动",
] as const;

export const MEMBER_ROLES = ["全部", "班委", "同学"] as const;

export const FILE_TYPE_ICONS: Record<string, string> = {
  pdf: "📄",
  doc: "📝",
  docx: "📝",
  ppt: "📊",
  pptx: "📊",
  xls: "📈",
  xlsx: "📈",
  zip: "📦",
  rar: "📦",
  txt: "📃",
  other: "📁",
};
