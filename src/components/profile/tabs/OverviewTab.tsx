import { Building2, MapPin } from "lucide-react";
import { Card, CardHeader, CardContent } from "../../ui/card";
import { CopyableField } from "../../ui/CopyableField";
import type { Company } from "../../../types/company";
import { formatDate } from "../../../utils/formatters";

interface OverviewTabProps {
  company: Company;
}

export function OverviewTab({ company }: OverviewTabProps) {
  const siege = company.siege;
  // Format complete address
  const formatCompleteAddress = () => {
    const parts = [];
    
    // Street address
    if (siege?.numero_voie && siege?.type_voie && siege?.libelle_voie) {
      const streetAddress = `${siege?.numero_voie} ${siege?.type_voie} ${siege?.libelle_voie}`;
      parts.push(streetAddress);
    } else if (siege?.adresse_ligne_1) {
      parts.push(siege?.adresse_ligne_1);
    }
    
    // Second address line
    if (siege?.adresse_ligne_2) {
      parts.push(siege?.adresse_ligne_2);
    }
    
    // Complement
    if (siege?.complement_adresse) {
      parts.push(siege?.complement_adresse);
    }
    
    // City with postal code
    if (siege?.code_postal && siege?.ville) {
      parts.push(`${siege?.code_postal} ${siege?.ville}`);
    } else if (siege?.ville) {
      parts.push(siege?.ville);
    }
    
    // Country
    if (siege?.pays) {
      parts.push(siege?.pays);
    }
    
    return parts.filter(Boolean).join(', ');
  };

  const completeAddress = formatCompleteAddress();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Informations générales
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <CopyableField
            label="Nom de l'entreprise"
            value={company.nom_entreprise}
          />
          
          <CopyableField
            label="SIREN"
            value={company.siren}
            valueClassName="font-mono"
          />
          
          {company.siret && (
            <CopyableField
              label="SIRET"
              value={company.siret_formate || company.siret}
              valueClassName="font-mono"
            />
          )}
          
          {company.forme_juridique && (
            <CopyableField
              label="Forme juridique"
              value={company.forme_juridique}
            />
          )}
          
          {company.date_creation && (
            <CopyableField
              label="Date de création"
              value={formatDate(company.date_creation)}
            />
          )}

          {company.code_naf && (
            <CopyableField
              label="Code NAF"
              value={company.code_naf}
            />
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Adresse
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {completeAddress && (
            <CopyableField
              label="Adresse complète"
              value={completeAddress}
            />
          )}

          <div className="grid grid-cols-1 gap-4">
            {siege?.adresse_ligne_1 && (
              <CopyableField
                label="Adresse ligne 1"
                value={siege?.adresse_ligne_1}
              />
            )}
            
            {siege?.adresse_ligne_2 && (
              <CopyableField
                label="Adresse ligne 2"
                value={siege?.adresse_ligne_2}
              />
            )}
            
            {siege?.complement_adresse && (
              <CopyableField
                label="Complément d'adresse"
                value={siege?.complement_adresse}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              {siege?.code_postal && (
                <CopyableField
                  label="Code postal"
                  value={siege?.code_postal}
                />
              )}
              
              {siege?.ville && (
                <CopyableField
                  label="Ville"
                  value={siege?.ville}
                />
              )}
            </div>

            {siege?.code_commune && (
              <CopyableField
                label="Code commune"
                value={siege?.code_commune}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              {siege?.pays && (
                <CopyableField
                  label="Pays"
                  value={siege?.pays}
                />
              )}
              
              {siege?.code_pays && (
                <CopyableField
                  label="Code pays"
                  value={siege?.code_pays}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}