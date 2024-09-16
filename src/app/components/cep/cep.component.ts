import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BranchAddress } from 'src/app/models/branch-details.model';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss'],
})
export class CepComponent implements OnChanges {
  @Input() cep: string = '';
  @Output() addressFetched = new EventEmitter<any>();
  address: BranchAddress = {
    street: '',
    neighborhood: '',
    city: '',
    state: '',
  };

  constructor(private detailsService: DetailsService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cep']) {
      if (this.cep) {
        this.fetchAddress(this.cep);
      }
    }
  }

  onCepChange(event: KeyboardEvent) {
    const cepInput = event.target as HTMLInputElement;
    this.fetchAddress(cepInput.value);
  }

  fetchAddress(cep: string) {
    if (cep && cep.length === 9) {
      console.log('chamou no componente');
      this.detailsService.getAddressByCEP(cep).subscribe(
        (data) => {
          if (data.erro) {
            console.error('CEP não encontrado');
          } else {
            this.address = data;
            this.addressFetched.emit(this.address);
          }
        },
        (error) => {
          console.error('Erro ao buscar CEP:', error);
        }
      );
    }
  }
}
