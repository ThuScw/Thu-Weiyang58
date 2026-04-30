/**
 * 统一的资源下载工具
 * 支持本地静态文件、外部URL、以及跨域资源的下载
 */

/**
 * 判断路径是否为外部URL
 */
export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/**
 * 从URL中提取文件名
 */
export function getFilenameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
    return filename || "download";
  } catch {
    // 相对路径
    const filename = url.substring(url.lastIndexOf("/") + 1);
    return filename || "download";
  }
}

/**
 * 获取文件扩展名
 */
export function getFileExtension(url: string): string {
  const filename = getFilenameFromUrl(url);
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex > 0 ? filename.slice(dotIndex + 1).toLowerCase() : "";
}

/**
 * 根据文件扩展名推断MIME类型
 */
export function getMimeTypeFromExtension(ext: string): string {
  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    zip: "application/zip",
    rar: "application/x-rar-compressed",
    txt: "text/plain",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    mp4: "video/mp4",
    mp3: "audio/mpeg",
  };
  return mimeTypes[ext] || "application/octet-stream";
}

/**
 * 通用下载函数
 * @param url - 文件URL（本地相对路径或外部绝对路径）
 * @param filename - 可选的自定义文件名
 */
export async function downloadFile(url: string, filename?: string): Promise<void> {
  const finalFilename = filename || getFilenameFromUrl(url);

  // 外部URL：使用 fetch + blob 方式下载（避免跨域问题）
  if (isExternalUrl(url)) {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      triggerDownload(blob, finalFilename);
    } catch {
      // 如果 fetch 失败（比如跨域限制），回退到新窗口打开
      window.open(url, "_blank");
    }
    return;
  }

  // 本地文件：使用 fetch 获取后下载
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    triggerDownload(blob, finalFilename);
  } catch {
    // 回退：直接创建链接点击
    const link = document.createElement("a");
    link.href = url;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

/**
 * 下载图片（专门处理图片的下载，支持跨域）
 * @param imageUrl - 图片URL
 * @param filename - 可选的自定义文件名
 */
export async function downloadImage(imageUrl: string, filename?: string): Promise<void> {
  const finalFilename = filename || getFilenameFromUrl(imageUrl);

  try {
    const response = await fetch(imageUrl, { mode: "cors" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    triggerDownload(blob, finalFilename);
  } catch {
    // 跨域失败时，尝试使用 canvas 方式
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image load failed"));
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) triggerDownload(blob, finalFilename);
      }, "image/png");
    } catch {
      // 最终回退：新窗口打开
      window.open(imageUrl, "_blank");
    }
  }
}

/**
 * 触发浏览器下载
 */
function triggerDownload(blob: Blob, filename: string): void {
  const ext = getFileExtension(filename);
  const mimeType = getMimeTypeFromExtension(ext);

  // 如果blob没有正确的MIME类型，创建一个新的Blob
  const finalBlob = blob.type && blob.type !== "application/octet-stream"
    ? blob
    : new Blob([blob], { type: mimeType });

  const url = window.URL.createObjectURL(finalBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
