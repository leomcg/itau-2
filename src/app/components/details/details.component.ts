import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBranchDetails();
  }

  getBranchDetails() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
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
    if (this.branchDetailsForm.valid) {
      this.snackBar.open('Salvo com sucesso! Dados no console.', 'OK', {
        duration: 3000,
      });
      console.log(this.branchDetailsForm.value);
      return;
    }
    this.snackBar.open(
      'Por favor preencha todos os campos obrigatórios.',
      'OK',
      { duration: 3000 }
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
