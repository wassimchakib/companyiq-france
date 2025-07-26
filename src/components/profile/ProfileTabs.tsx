import { Building2, TrendingUp, Users, FileText } from "lucide-react";

export interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
const tabs: Tab[] = [
  { id: "overview", label: "Overview", icon: Building2 },
  { id: "finances", label: "Finances", icon: TrendingUp },
  { id: "dirigeants", label: "Dirigeants", icon: Users },
  { id: "documents", label: "Documents", icon: FileText },
];

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className="flex gap-1 mb-8 bg-white/60 backdrop-blur-sm p-1 rounded-2xl border border-gray-200">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}