import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import BranchDetails from 'src/app/models/branch-details.model';
import { ItauBranchesService } from 'src/app/services/itau-branches.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  title = 'Polos Itaú';
  subtitle = 'confira abaixo alguns dos principais polos do itaú';
  displayedColumns: string[] = [
    'name',
    'business',
    'valuation',
    'active',
    'action',
  ];
  dataSource = new MatTableDataSource<BranchDetails>();

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Use the non-null assertion operator

  constructor(
    private itauBranchesService: ItauBranchesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllBranches();
  }

  getAllBranches() {
    this.itauBranchesService.getBranches().subscribe((branches) => {
      this.dataSource.data = branches;
      this.dataSource.paginator = this.paginator;
    });
  }

  goToBranchDetails(id: number) {
    this.router.navigate(['/details'], { queryParams: { id } });
  }
}
