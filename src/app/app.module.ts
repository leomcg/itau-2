import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { DummyInterceptor } from './interceptors/dummy.interceptor';

import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';

//enable i18n
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
registerLocaleData(localeEn, 'en');
registerLocaleData(localePt, 'pt');

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { ListingComponent } from './components/listing/listing.component';
import { DetailsComponent } from './components/details/details.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { TitleComponent } from './components/title/title.component';
import { CustomMatPaginatorIntl } from './components/custom-paginator-intl/custom-paginator-intl.component';
import { CepComponent } from './components/cep/cep.component';

@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    DetailsComponent,
    TopNavComponent,
    TitleComponent,
    CepComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DummyInterceptor,
      multi: true,
    },
    provideEnvironmentNgxMask(),
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
