const API_BASE = 'https://suggestions.pappers.fr/v2';

export async function fetchSuggestions(
  query: string,
  token = import.meta.env.VITE_API_TOKEN
) {
  if (!query) return { resultats_nom_entreprise: [], resultats_representant: [] };

  if (!token) {
    throw new Error('Token API manquant');
  }

  const params = new URLSearchParams({
    api_token: token,
    q: query,
    longueur: "5",
    cibles: "nom_entreprise,representant",
  });

  const res = await fetch(`${API_BASE}?${params}`, {
    headers: { Accept: "application/json" },
  });
  
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data = await res.json();
  return data;
}
