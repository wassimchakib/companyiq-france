import { useSearch } from "../hooks/useSearch";
import { useSuggestions } from "../hooks/useSuggestions";
import { usePagination } from "../hooks/usePagination";
import { useBookmarks } from "../hooks/useBookmarks";
import { CompanyCard } from "./CompanyCard";
import { Pagination } from "./Pagination";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { NoResultsState } from "./NoResultsState";
import { ErrorState } from "./ErrorState";
import { ResultsHeader } from "./ResultsHeader";

export function ResultsList() {
  const { query } = useSearch();
  const { data, loading, error } = useSuggestions(query);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  
  const companies = data?.resultats_nom_entreprise || [];
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    currentItems
  } = usePagination(companies, 10);

  // Handle export functionality
  const handleExport = (company: any) => {
    console.log('Exporting company:', company);
    // TODO later
  };

  // Render different states
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!query.trim()) return <EmptyState />;
  if (!companies.length) return <NoResultsState query={query} />;

  return (
    <div className="space-y-6">
      <ResultsHeader
        startIndex={startIndex}
        endIndex={endIndex}
        totalResults={companies.length}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentItems.map((company: any) => (
          <CompanyCard
            key={company.siren}
            company={company}
            isBookmarked={isBookmarked(company.siren)}
            onToggleBookmark={toggleBookmark}
            onExport={handleExport}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}