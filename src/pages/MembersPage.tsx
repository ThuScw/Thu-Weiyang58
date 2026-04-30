import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import MemberCard from "../components/members/MemberCard";
import members from "../data/members.json";
import { MEMBER_ROLES } from "../utils/constants";

export default function MembersPage() {
  const [activeRole, setActiveRole] = useState("全部");

  const filtered =
    activeRole === "全部"
      ? members
      : activeRole === "班委"
        ? members.filter((m) => m.role !== "同学")
        : members.filter((m) => m.role === "同学");

  return (
    <div className="page-section">
      <SectionHeading
        title="班级成员"
        subtitle="来自五湖四海，相聚于清华园，我们是团结奋进的58班"
      />

      {/* Filter tabs */}
      <div className="flex justify-center gap-2 mb-10">
        {MEMBER_ROLES.map((role) => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeRole === role
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-white text-text-secondary hover:bg-primary/5 hover:text-primary border border-gray-200"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filtered.map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-secondary py-20">暂无该分类的成员</p>
      )}
    </div>
  );
}
