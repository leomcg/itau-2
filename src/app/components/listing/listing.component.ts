import { Component, OnInit } from '@angular/core';
import { ItauBranchesService } from 'src/app/itau-branches.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  branches: any;

  constructor(private itauBranchesService: ItauBranchesService) {}

  ngOnInit(): void {
    this.itauBranchesService.getBranches().subscribe((response) => {
      this.branches = response;
      console.log(this.branches);
    });
  }
}
