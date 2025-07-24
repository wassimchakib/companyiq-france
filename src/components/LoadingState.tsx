
export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Animated search indicator */}
      <div className="relative mb-8">
        {/* Outer rotating ring */}
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin" style={{animationDuration: '1s'}}></div>
        </div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -inset-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
              style={{
                top: `${Math.sin(i * Math.PI / 3) * 30 + 50}%`,
                left: `${Math.cos(i * Math.PI / 3) * 30 + 50}%`,
                animationDelay: `${i * 0.2}s`,
                animation: 'float 2s ease-in-out infinite'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Loading text with typewriter effect */}
      <div className="text-center space-y-3">
        <h3 className="text-xl font-semibold text-gray-700 animate-pulse">
          Recherche en cours
        </h3>
        <div className="flex items-center justify-center space-x-1">
          <span className="text-gray-500">Analyse des entreprises</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>

      {/* Animated progress bars */}
      <div className="mt-8 w-full max-w-md space-y-3">
        {['Connexion à la base de données', 'Filtrage des résultats', 'Optimisation des données'].map((step, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{step}</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
                style={{
                  width: '100%',
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1.5s'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}