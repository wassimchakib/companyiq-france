interface ResultsHeaderProps {
  startIndex: number;
  endIndex: number;
  totalResults: number;
  currentPage: number;
  totalPages: number;
}

export function ResultsHeader({ 
  startIndex, 
  endIndex, 
  totalResults, 
  currentPage, 
  totalPages 
}: ResultsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">
        Affichage de {startIndex + 1}-{Math.min(endIndex, totalResults)} sur {totalResults} résultats
      </p>
      <p className="text-sm text-gray-500">
        Page {currentPage} sur {totalPages}
      </p>
    </div>
  );
}