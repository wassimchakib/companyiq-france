import { useState } from "react";
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
import CompanyProfilePage from "./profile/CompanyProfilePage";

export function ResultsList() {
  const { query } = useSearch();
  const { data, loading, error } = useSuggestions(query);
  const { toggleBookmark, isBookmarked } = useBookmarks();
  
  // Navigation state
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'list' | 'profile'>('list');
  
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

  // Handle card click - navigate to profile
  const handleCardClick = (company: any) => {
    setSelectedCompany(company);
    setCurrentView('profile');
  };

  // Handle back to list
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCompany(null);
  };

  // Render profile page if company is selected
  if (currentView === 'profile' && selectedCompany) {
    return (
      <CompanyProfilePage 
        company={selectedCompany} 
        onBack={handleBackToList} 
      />
    );
  }

  // Render different states for list view
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
            onCardClick={handleCardClick} // Add navigation handler
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