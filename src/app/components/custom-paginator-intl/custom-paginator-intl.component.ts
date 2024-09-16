import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
// Usei o i18n apenas para traduzir os textos do paginator, como exemplificação
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();
    this.getAndInitTranslations();
    this.translate.onLangChange.subscribe(() => {
      this.getAndInitTranslations();
    });
  }

  getAndInitTranslations() {
    this.translate
      .get([
        'PAGINATOR.ITEMS_PER_PAGE',
        'PAGINATOR.NEXT_PAGE',
        'PAGINATOR.PREVIOUS_PAGE',
        'PAGINATOR.FIRST_PAGE',
        'PAGINATOR.LAST_PAGE',
        'PAGINATOR.RANGE_LABEL',
        'PAGINATOR.TOTAL_RECORDS',
        'PAGINATOR.ITEMS',
      ])
      .subscribe((translation) => {
        this.itemsPerPageLabel = translation['PAGINATOR.ITEMS_PER_PAGE'];
        this.nextPageLabel = translation['PAGINATOR.NEXT_PAGE'];
        this.previousPageLabel = translation['PAGINATOR.PREVIOUS_PAGE'];
        this.firstPageLabel = translation['PAGINATOR.FIRST_PAGE'];
        this.lastPageLabel = translation['PAGINATOR.LAST_PAGE'];
        this.getRangeLabel = (
          page: number,
          pageSize: number,
          length: number
        ) => {
          if (length === 0 || pageSize === 0) {
            return `0 ${translation['PAGINATOR.RANGE_LABEL']} ${length}`;
          }
          const startIndex = page * pageSize;
          const endIndex =
            startIndex < length
              ? Math.min(startIndex + pageSize, length)
              : startIndex + pageSize;
          return `${startIndex + 1} - ${endIndex} ${
            translation['PAGINATOR.TOTAL_RECORDS']
          } ${length} ${translation['PAGINATOR.ITEMS']}`;
        };
        this.changes.next();
      });
  }
}
