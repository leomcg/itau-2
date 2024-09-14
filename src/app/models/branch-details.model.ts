export default interface BranchDetails {
  id: number;
  name: string;
  business: string;
  valuation: number | null;
  active: boolean | null;
  cep: string;
  cnpj: number | null;
}
