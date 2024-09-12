import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import BranchDetails from 'src/app/models/branch-details.model';
import { ItauBranchesService } from 'src/app/services/itau-branches.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  branchDetails: BranchDetails = {
    id: 0,
    name: '',
    business: '',
    valuation: 0,
    active: '',
    action: '',
    cep: 0,
    cnpj: 0,
  };

  title = '';
  subtitle = '';

  branchDetailsForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private itauBranchesService: ItauBranchesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getBranchDetails();
  }

  getBranchDetails() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.itauBranchesService.getBranch(id).subscribe((branch) => {
        this.branchDetails = branch;
        this.setTitle();
        this.initializeForm(this.branchDetails);
      });
    });
  }

  setTitle() {
    this.title = `Polo ${this.branchDetails.name}`;
    this.subtitle = `Exibindo detalhes do polo ${this.branchDetails.business}#${this.branchDetails.id}`;
  }

  // formatCNPJ(cnpj: string): string {
  //   cnpj = cnpj.toString().replace(/\D/g, '');
  //   return cnpj.replace(
  //     /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
  //     '$1.$2.$3/$4-$5'
  //   );
  // }

  // formatCurrency(data: any): BranchDetails {
  //   const formatter = new Intl.NumberFormat('pt-BR', {
  //     style: 'currency',
  //     currency: 'BRL',
  //   });

  //   return {
  //     ...data,
  //     valuation: formatter.format(Number(data.valuation)),
  //     cnpj: this.formatCNPJ(data.cnpj),
  //   };
  // }

  initializeForm(branchData: BranchDetails = this.branchDetails) {
    this.branchDetailsForm = this.fb.group({
      cep: [branchData.cep, [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(10)]],
      neighborhood: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', [Validators.required, Validators.maxLength(100)]],
      name: [branchData.name, [Validators.required, Validators.maxLength(100)]],
      business: [
        branchData.business,
        [Validators.required, Validators.maxLength(100)],
      ],
      valuation: [
        branchData.valuation,
        [Validators.required, Validators.maxLength(100)],
      ],
      cnpj: [branchData.cnpj, [Validators.required, Validators.maxLength(100)]],
      active: [
        branchData.active,
        [Validators.required, Validators.maxLength(100)],
      ],
    });
  }

  onSubmit(): void {
    if (this.branchDetailsForm.valid) {
      console.log(this.branchDetailsForm.value);
      return;
    }
  }
}
