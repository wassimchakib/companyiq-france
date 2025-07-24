import { Building2 } from "lucide-react";

// NoResultsState.tsx - When search has no results
interface NoResultsStateProps {
  query: string;
}

export function NoResultsState({ query }: NoResultsStateProps) {
  return (
    <div className="text-center py-16">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 max-w-md mx-auto">
        <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun résultat trouvé</h3>
        <p className="text-gray-500 mb-4">Aucune entreprise ne correspond à "{query}"</p>
        <p className="text-sm text-gray-400">Essayez avec d'autres termes de recherche</p>
      </div>
    </div>
  );
}