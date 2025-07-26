export interface FoundationBadgeStyle {
  bg: string;
  text: string;
  label: string;
  year: number;
}

export const getFoundationBadgeStyle = (dateCreation?: string): FoundationBadgeStyle | null => {
  if (!dateCreation) return null;
  
  const currentYear = new Date().getFullYear();
  const foundationYear = parseInt(dateCreation.split('-')[0]);
  const age = currentYear - foundationYear;
  
  if (age >= 100) {
    return { bg: 'bg-slate-900', text: 'text-white', label: 'Centenaire', year: foundationYear };
  } else if (age >= 75) {
    return { bg: 'bg-slate-700', text: 'text-white', label: 'Établie', year: foundationYear };
  } else if (age >= 50) {
    return { bg: 'bg-slate-600', text: 'text-white', label: 'Expérimentée', year: foundationYear };
  } else if (age >= 25) {
    return { bg: 'bg-blue-700', text: 'text-white', label: 'Mature', year: foundationYear };
  } else if (age >= 10) {
    return { bg: 'bg-blue-500', text: 'text-white', label: 'Établie', year: foundationYear };
  } else if (age >= 5) {
    return { bg: 'bg-blue-400', text: 'text-white', label: 'En croissance', year: foundationYear };
  } else {
    return { bg: 'bg-green-400', text: 'text-white', label: 'Jeune', year: foundationYear };
  }
};