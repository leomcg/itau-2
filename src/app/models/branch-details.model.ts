export interface BranchDetails {
  id: number;
  name: string;
  business: string;
  valuation: number | null;
  active: boolean | null;
  cep: string;
  cnpj: number | null;
}

export interface BranchAddress {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface BranchForm {
  details: BranchDetails;
  address: BranchAddress;
}
