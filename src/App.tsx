import { SearchProvider } from './context/SearchContext';
import { SearchBar } from './components/SearchBar';
import { ResultsList } from './components/ResultsList';

function App() {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Recherche d'Entreprises
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Découvrez et explorez les entreprises françaises avec notre interface moderne et intuitive
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-3xl mx-auto mb-12">
            <SearchBar />
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <ResultsList />
          </div>

        </div>
      </div>
    </SearchProvider>
  );
}

export default App;