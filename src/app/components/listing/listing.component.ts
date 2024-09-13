import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import BranchDetails from 'src/app/models/branch-details.model';
import { ItauBranchesService } from 'src/app/services/itau-branches.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
    'delete',
  ];
  dataSource = new MatTableDataSource<BranchDetails>();

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Use the non-null assertion operator
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private itauBranchesService: ItauBranchesService,
    private router: Router,
    public dialog: MatDialog
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

  createNewBranch() {
    this.router.navigate(['/details']);
  }

  openConfirmDialog(
    templateRef: TemplateRef<any>,
    name: string,
    id: number
  ): void {
    this.dialogRef = this.dialog.open(templateRef);

    this.dialogRef.afterClosed().subscribe((yes) => {
      if (yes) {
        this.deleteBranch(name, id);
      }
    });
  }

  deleteBranch(name: string, id: number) {
    // Just a dummy delete, the branch will not be deleted from the database since we are no persisting data
    this.itauBranchesService.deleteBranch(name, id);
    this.dataSource.data = this.dataSource.data.filter(
      (branch) => branch.id !== id
    );
  }
}
