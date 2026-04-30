import { useState } from "react";
import { Download, ExternalLink, Loader2 } from "lucide-react";
import { formatFileSize, formatDate } from "../../utils/formatters";
import { downloadFile, isExternalUrl } from "../../utils/download";
import { FILE_TYPE_ICONS } from "../../utils/constants";
import Card from "./Card";
import Badge from "./Badge";

interface FileCardProps {
  name: string;
  description: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  category: string;
}

export default function FileCard({
  name,
  description,
  filePath,
  fileSize,
  fileType,
  uploadDate,
  category,
}: FileCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const icon = FILE_TYPE_ICONS[fileType] || FILE_TYPE_ICONS.other;
  const external = isExternalUrl(filePath);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      await downloadFile(filePath, `${name}.${fileType}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card hover className="p-5 flex items-start gap-4 group">
      {/* File icon */}
      <div className="text-3xl flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
        {icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-heading font-bold text-text-primary truncate">
            {name}
          </h3>
          <Badge>{category}</Badge>
          {external && (
            <Badge variant="primary">外链</Badge>
          )}
        </div>
        <p className="text-sm text-text-secondary mb-2 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-3 text-xs text-text-secondary font-mono">
          <span>{fileType.toUpperCase()}</span>
          <span>{formatFileSize(fileSize)}</span>
          <span>{formatDate(uploadDate)}</span>
        </div>
      </div>

      {/* Download / Open */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex-shrink-0 p-2.5 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
        title={external ? "下载文件（外部链接）" : "下载文件"}
      >
        {isDownloading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : external ? (
          <ExternalLink size={20} className="group-hover/btn:scale-110 transition-transform" />
        ) : (
          <Download size={20} className="group-hover/btn:scale-110 transition-transform" />
        )}
      </button>
    </Card>
  );
}
