import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import Angular Animations
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { ListingComponent } from './listing/listing.component';

@NgModule({
  declarations: [AppComponent, ListingComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [MatButtonModule, MatButtonModule, MatDividerModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
