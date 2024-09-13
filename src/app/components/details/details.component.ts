import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import BranchDetails from '../../models/branch-details.model';
import { ItauBranchesService } from 'src/app/services/itau-branches.service';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  update = false;

  branchDetails: BranchDetails = {
    id: 0,
    name: '',
    business: '',
    valuation: null,
    active: '',
    action: '',
    cep: null,
    cnpj: null,
  };

  title = '';
  subtitle = '';

  branchDetailsForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private itauBranchesService: ItauBranchesService,
    private fb: FormBuilder,
    private detailsService: DetailsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBranchDetails();
  }

  getBranchDetails() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.update = true;
        this.itauBranchesService.getBranch(id).subscribe((branch) => {
          this.branchDetails = branch;
          this.setTitle();
          this.initializeForm(this.branchDetails);
        });
      } else {
        this.setTitle(true);
        this.initializeForm();
      }
    });
  }

  setTitle(newBranch = false) {
    if (newBranch) {
      this.title = 'Novo Polo';
      this.subtitle = 'Preencha os campos abaixo para criar um novo polo';
      return;
    }
    this.title = `Polo ${this.branchDetails.name}`;
    this.subtitle = `Exibindo detalhes do polo ${this.branchDetails.business}#${this.branchDetails.id}`;
  }

  initializeForm(branchData: BranchDetails = this.branchDetails) {
    this.branchDetailsForm = this.fb.group({
      id: [
        this.update ? branchData.id : this.detailsService.getRandomInt(7, 99),
      ],
      cep: [branchData.cep, [Validators.required]],
      street: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      name: [branchData.name, [Validators.required]],
      business: [branchData.business, [Validators.required]],
      valuation: [branchData.valuation, [Validators.required]],
      cnpj: [branchData.cnpj, [Validators.required]],
      active: [branchData.active, [Validators.required]],
    });
  }

  onSubmit(): void {
    const branch = this.branchDetailsForm.value;
    if (this.branchDetailsForm.valid) {
      if (this.update) {
        this.detailsService.successMessage(
          branch.name,
          branch.id,
          'atualizado'
        );
      } else {
        this.detailsService.successMessage(branch.name, branch.id, 'criado');
      }
      console.log(this.branchDetailsForm.value);
      this.goBack();
    } else {
      this.detailsService.errorMessage();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
