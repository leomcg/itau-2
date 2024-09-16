import { Component, Inject, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  // Usei o i18n apenas para traduzir os textos do paginator, como exemplificação
  languageText = 'PT';
  constructor(
    private translate: TranslateService,
    @Inject(LOCALE_ID) private locale: string,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
    this.setLocale('pt');
  }

  switchLanguage() {
    if (this.locale === 'pt') {
      this.translate.use('en');
      this.setLocale('en');
    } else {
      this.translate.use('pt');
      this.setLocale('pt');
    }
    this.languageText = this.locale === 'pt' ? 'PT' : 'EN';
  }

  setLocale(locale: string) {
    this.document.documentElement.lang = locale;
    this.locale = locale;
  }
}
