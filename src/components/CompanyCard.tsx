import { Building2, MapPin, Users, Bookmark, ExternalLink, DownloadCloud, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";

interface CompanyCardProps {
  company: {
    siren: string;
    nom_entreprise: string;
    siren_formate?: string;
    code_naf?: string;
    ville?: string;
    effectif?: string;
    domaine_activite?: string;
    date_creation?: string; // Format: "YYYY-MM-DD" or "YYYY"
  };
  isBookmarked: boolean;
  onToggleBookmark: (siren: string) => void;
  onExport?: (company: any) => void;
  onCardClick: (company: any) => void; // New prop for navigation
}

export function CompanyCard({ company, isBookmarked, onToggleBookmark, onExport, onCardClick }: CompanyCardProps) {
  // Calculate company age and get appropriate color
  const getFoundationBadgeStyle = (dateCreation?: string) => {
    if (!dateCreation) return null;
    
    const currentYear = new Date().getFullYear();
    const foundationYear = parseInt(dateCreation.split('-')[0]);
    const age = currentYear - foundationYear;
    
    // Color progression based on age - older = more serious/darker
    if (age >= 100) {
      return {
        bg: 'bg-slate-900',
        text: 'text-white',
        label: 'Centenaire',
        year: foundationYear,
        hover: 'hover:bg-slate-800'
      };
    } else if (age >= 75) {
      return {
        bg: 'bg-slate-700',
        text: 'text-white',
        label: 'Établie',
        year: foundationYear,
        hover: 'hover:bg-slate-600'
      };
    } else if (age >= 50) {
      return {
        bg: 'bg-slate-600',
        text: 'text-white',
        label: 'Expérimentée',
        year: foundationYear,
        hover: 'hover:bg-slate-500'
      };
    } else if (age >= 25) {
      return {
        bg: 'bg-blue-700',
        text: 'text-white',
        label: 'Mature',
        year: foundationYear,
        hover: 'hover:bg-blue-600'
      };
    } else if (age >= 10) {
      return {
        bg: 'bg-blue-500',
        text: 'text-white',
        label: 'Établie',
        year: foundationYear,
        hover: 'hover:bg-blue-400'
      };
    } else if (age >= 5) {
      return {
        bg: 'bg-blue-400',
        text: 'text-white',
        label: 'En croissance',
        year: foundationYear,
        hover: 'hover:bg-blue-300'
      };
    } else {
      return {
        bg: 'bg-green-400',
        text: 'text-white',
        label: 'Jeune',
        year: foundationYear,
        hover: 'hover:bg-green-300'
      };
    }
  };

  const foundationStyle = getFoundationBadgeStyle(company.date_creation);

  // Handle card click but prevent action buttons from triggering it
  const handleCardClick = (e: React.MouseEvent) => {
    // Check if the click target is a button or inside a button
    const target = e.target as HTMLElement;
    const isButton = target.closest('button');
    
    if (!isButton) {
      onCardClick(company);
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Foundation date badge */}
      {foundationStyle && (
        <div className="absolute top-4 right-4 z-10">
          <div className={`${foundationStyle.bg} ${foundationStyle.text} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all duration-300 ${foundationStyle.hover} cursor-default`}>
            <Calendar className="h-3 w-3" />
            <span className="font-semibold">{foundationStyle.year}</span>
            <span className="hidden sm:inline">• {foundationStyle.label}</span>
          </div>
        </div>
      )}

      <CardHeader className="relative z-10 pb-3 pr-24">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-1 pr-2 break-words">
              {company.nom_entreprise}
            </h3>
            {company.siren_formate && (
              <p className="text-sm text-gray-500 font-mono">{company.siren_formate}</p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        {/* Company details */}
        <div className="grid grid-cols-1 gap-3">
          {company.code_naf && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="h-4 w-4" />
              <span><strong>Code NAF:</strong> {company.code_naf}</span>
            </div>
          )}
          {company.ville && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span><strong>Ville:</strong> {company.ville}</span>
            </div>
          )}
          {company.effectif && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span><strong>Effectif:</strong> {company.effectif}</span>
            </div>
          )}
          {company.date_creation && foundationStyle && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span><strong>Fondée en:</strong> {foundationStyle.year}</span>
              <span className="text-xs text-gray-500">({new Date().getFullYear() - foundationStyle.year} ans)</span>
            </div>
          )}
        </div>
        
        {/* Activity description */}
        {company.domaine_activite && (
          <p className="text-gray-600 leading-relaxed line-clamp-3 mt-3 pt-3 border-t border-gray-100">
            {company.domaine_activite}
          </p>
        )}
      </CardContent>

      <CardFooter className="relative z-10 flex justify-between items-center pt-4">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              onToggleBookmark(company.siren);
            }}
            className={`h-10 w-10 rounded-full transition-all duration-300 ${
              isBookmarked 
                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              // Handle external link action here
            }}
            className="h-10 w-10 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            <ExternalLink className="h-5 w-5" />
          </Button>
        </div>

        <Button 
          variant="outline" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            onExport?.(company);
          }}
          className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 rounded-full px-4 py-2"
        >
          <DownloadCloud className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </CardFooter>
    </Card>
  );
}