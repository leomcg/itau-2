export default interface BranchDetails {
  id: number;
  name: string;
  business: string;
  valuation: number | null;
  active: string;
  action: string;
  cep: number | null;
  cnpj: number | null;
}
