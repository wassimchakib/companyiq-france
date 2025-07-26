import { useState } from "react";
import type { Company } from "../../types/company";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs } from "./ProfileTabs";
import { OverviewTab } from "./tabs/OverviewTab";

interface CompanyProfilePageProps {
  company: Company;
  onBack: () => void;
}

export default function CompanyProfilePage({ company, onBack }: CompanyProfilePageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab company={company} />;
      case "finances":
        return <div>Finance (TODO later)</div>;
      case "dirigeants":
        return <div>Dirigeants (TODO later)</div>;
      case "documents":
        return <div>Documents (TODO later)</div>;
      default:
        return <OverviewTab company={company} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <ProfileHeader company={company} onBack={onBack} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="space-y-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}