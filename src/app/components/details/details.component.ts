import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BranchForm } from '../../models/branch-details.model';
import { ItauBranchesService } from 'src/app/services/itau-branches.service';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  update = false;

  branchForm: BranchForm = {
    details: {
      id: 0,
      name: '',
      business: '',
      valuation: null,
      active: null,
      cep: '',
      cnpj: null,
    },
    address: { street: '', neighborhood: '', city: '', state: '' },
  };

  title = '';
  subtitle = '';

  branchDetailsForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private itauBranchesService: ItauBranchesService,
    private fb: FormBuilder,
    private detailsService: DetailsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getBranchDetails();
  }

  getBranchDetails() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.update = true;
        this.itauBranchesService.getBranch(id).subscribe(
          (branch) => {
            this.branchForm.details = branch;
            this.setTitle();
            this.initializeForm(this.branchForm);
          },
          (error) => {
            this.snackBar.open(error, 'OK');
          }
        );
      } else {
        this.setTitle(true);
        this.initializeForm();
      }
    });
  }

  setTitle(newBranch = false) {
    if (newBranch) {
      this.title = 'Novo Polo';
      this.subtitle = 'preencha os campos abaixo para criar um novo polo';
      return;
    }
    this.title = `Polo ${this.branchForm.details.name}`;
    this.subtitle = `exibindo detalhes do polo ${this.branchForm.details.business}#${this.branchForm.details.id}`;
  }

  initializeForm(branchData: BranchForm = this.branchForm) {
    this.branchDetailsForm = this.fb.group({
      id: [
        this.update
          ? branchData.details.id
          : this.detailsService.getRandomInt(7, 99),
      ],
      cep: [branchData.details.cep, [Validators.required]],
      street: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      name: [branchData.details.name, [Validators.required]],
      business: [branchData.details.business, [Validators.required]],
      valuation: [branchData.details.valuation, [Validators.required]],
      cnpj: [branchData.details.cnpj, [Validators.required]],
      active: [branchData.details.active, [Validators.required]],
    });
  }

  fillAdress($event: any) {
    this.branchDetailsForm.patchValue({
      street: $event?.logradouro || '',
      neighborhood: $event?.bairro || '',
      city: $event?.localidade || '',
      state: $event?.uf || '',
      cep: $event?.cep || '',
    });
  }

  onSubmit(): void {
    // Apenas simulando chamadas para atualizar a UI, os dados não serão salvos pois não estamos conectados a um backend
    const branch = this.branchDetailsForm.value;
    if (this.branchDetailsForm.valid) {
      if (this.update) {
        this.itauBranchesService.updateBranch(branch);
        this.detailsService.successMessage(
          branch.name,
          branch.id,
          'atualizado'
        );
      } else {
        this.itauBranchesService.createBranch(branch);
        this.detailsService.successMessage(branch.name, branch.id, 'criado');
      }
      this.goBack();
    } else {
      this.detailsService.errorMessage();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
