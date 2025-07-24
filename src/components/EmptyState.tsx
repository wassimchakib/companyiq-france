import { Building2, Search, Bookmark } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="max-w-2xl mx-auto">
        {/* Hero illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            {/* Animated building icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Building2 className="h-20 w-20 text-blue-500 animate-pulse" />
            </div>
            
            {/* Floating elements around the building */}
            {[
              { icon: '🏢', delay: '0s', position: 'top-0 left-4' },
              { icon: '💼', delay: '0.5s', position: 'top-4 right-0' },
              { icon: '📊', delay: '1s', position: 'bottom-0 left-0' },
              { icon: '🎯', delay: '1.5s', position: 'bottom-4 right-4' }
            ].map((item, i) => (
              <div
                key={i}
                className={`absolute ${item.position} text-2xl animate-bounce opacity-70`}
                style={{ animationDelay: item.delay, animationDuration: '2s' }}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Welcome content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Découvrez les entreprises françaises
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Recherchez parmi des milliers d'entreprises et accédez à leurs informations détaillées
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: Search,
                title: 'Recherche Avancée',
                description: 'Trouvez rapidement les entreprises par nom, secteur ou localisation'
              },
              {
                icon: Building2,
                title: 'Données Complètes',
                description: 'Accédez aux informations officielles et vérifiées des entreprises'
              },
              {
                icon: Bookmark,
                title: 'Sauvegarde',
                description: 'Marquez vos entreprises favorites pour y accéder facilement'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
            <p className="text-gray-700 font-medium flex items-center justify-center gap-2">
              <Search className="h-5 w-5 text-blue-500" />
              Commencez à taper pour rechercher une entreprise
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}