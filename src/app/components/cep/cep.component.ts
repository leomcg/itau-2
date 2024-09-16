import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss'],
})
export class CepComponent {
  @Input() cep: string = '';
  @Output() addressFetched = new EventEmitter<any>();
  address: any;
  cepForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private detailsService: DetailsService,
    private snackBar: MatSnackBar
  ) {
    this.cepForm = this.fb.group({
      cep: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });
  }

  ngOnInit() {
    if (this.cep) {
      this.cepForm.get('cep')?.setValue(this.cep);
      this.fetchAddress(this.cep);
    }

    this.cepForm
      .get('cep')
      ?.valueChanges.pipe(
        debounceTime(1000), // Adjust the debounce time as needed
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.onCepChange(value);
      });
  }

  onCepChange(cep: string) {
    if (this.cepForm.valid) {
      this.fetchAddress(cep);
    } else {
      this.address = null;
      this.addressFetched.emit(null);
      if (cep.length !== 8) {
        this.snackBar.open('CEP inválido', 'OK', {
          duration: 3000,
        });
      }
    }
  }

  fetchAddress(cep: string) {
    this.detailsService.getAddressByCEP(cep).subscribe(
      (data) => {
        if (data.erro) {
          console.error('CEP inválido', data.erro);
          this.address = null;
          this.addressFetched.emit(null);
          this.snackBar.open('CEP inválido', 'Close');
        } else {
          this.address = data;
          this.addressFetched.emit(this.address);
        }
      },
      (error) => {
        console.error('Ops! Ocorreu um erro: CEP não encontrado', error);
        this.address = null;
        this.addressFetched.emit(null);
        this.snackBar.open('Ops! Ocorreu um erro: CEP não encontrado', 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
