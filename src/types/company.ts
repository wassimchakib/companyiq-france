// types/company.ts
export interface CompanySiege {
  siret: string;
  siret_formate: string;
  nic: string;
  numero_voie?: number;
  indice_repetition?: string;
  type_voie?: string;
  libelle_voie?: string;
  complement_adresse?: string;
  adresse_ligne_1?: string;
  adresse_ligne_2?: string;
  code_postal?: string;
  code_commune?: string;
  ville?: string;
  pays?: string;
  code_pays?: string;
}

export interface Company {
  numero_voie: string;
  type_voie: string;
  libelle_voie: string;
  adresse_ligne_1: string;
  adresse_ligne_2: string;
  complement_adresse: string;
  code_postal: string | undefined;
  pays: string;
  siret: string;
  siret_formate: string;
  code_commune: string;
  code_pays: string;
  siren: string;
  nom_entreprise: string;
  forme_juridique?: string;
  date_creation?: string;
  chiffre_affaires?: number;
  resultat?: number;
  
  // Siege object containing address details
  siege?: CompanySiege;
  
  // Legacy fields (for backward compatibility with CompanyCard)
  adresse_complete?: string;
  siren_formate?: string;
  code_naf?: string;
  effectif?: string;
  domaine_activite?: string;
  ville?: string; // For CompanyCard compatibility
  
  effectifs_finances?: Array<{year: number, effectif: number, ca: number}>;
  dirigeants?: Array<{
    nom: string;
    prenom: string;
    fonction: string;
    date_naissance?: string;
  }>;
  documents?: Array<{
    type: string;
    nom: string;
    date: string;
    url?: string;
  }>;
  publications?: Array<{
    type: string;
    titre: string;
    date: string;
    url?: string;
  }>;
}