import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../utils/constants";
import siteConfig from "../../data/site-config.json";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Top decorative gradient */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary-light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-primary via-primary-light to-accent rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
                58
              </div>
              <span className="font-heading text-xl font-bold">
                {siteConfig.classFullName}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {siteConfig.description.slice(0, 80)}...
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-5 gold-text">
              快速导航
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-slate-400 hover:text-primary-light transition-colors text-sm py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-5 gold-text">
              联系我们
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              {siteConfig.socialLinks.wechat && (
                <p>微信：{siteConfig.socialLinks.wechat}</p>
              )}
              {siteConfig.socialLinks.email && (
                <p>邮箱：{siteConfig.socialLinks.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.classFullName}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
