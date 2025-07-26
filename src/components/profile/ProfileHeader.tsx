import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import type { Company } from "../../types/company";
import { getFoundationBadgeStyle } from "../../utils/foundation-badge";

interface ProfileHeaderProps {
  company: Company;
  onBack: () => void;
}

export function ProfileHeader({ company, onBack }: ProfileHeaderProps) {
  const foundationStyle = getFoundationBadgeStyle(company.date_creation);

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{company.nom_entreprise}</h1>
              <p className="text-sm text-gray-500">SIREN: {company.siren}</p>
            </div>
          </div>
          {foundationStyle && (
            <div className={`${foundationStyle.bg} ${foundationStyle.text} px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2`}>
              <Calendar className="h-4 w-4" />
              <span>{foundationStyle.year} • {foundationStyle.label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}