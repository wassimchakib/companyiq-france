export const formatCurrency = (amount?: number): string => {
  if (!amount) return "N/A";
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(amount);
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString('fr-FR');
};