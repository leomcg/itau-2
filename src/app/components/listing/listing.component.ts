import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BranchDetails } from 'src/app/models/branch-details.model';
import { ItauBranchesService } from 'src/app/services/itau-branches.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions: Subscription = new Subscription();

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  private changeDetectorRef!: ChangeDetectorRef;

  constructor(
    private itauBranchesService: ItauBranchesService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllBranches();
    this.subscribeToBranchUpdates();
  }

  ngAfterViewInit() {
    this.enableSorting();
  }

  getAllBranches() {
    this.itauBranchesService.getBranches().subscribe(
      (branches) => {
        this.dataSource.data = branches;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        this.snackBar.open(error, 'OK');
      }
    );
  }

  subscribeToBranchUpdates() {
    const branchCreatedSubscription =
      this.itauBranchesService.branchCreated$.subscribe(
        (newBranch: BranchDetails) => {
          const branches = [...this.dataSource.data, newBranch]; // criando uma deep copy para garantir imutabilidade
          this.dataSource.data = branches;
        }
      );

    const branchUpdatedSubscription =
      this.itauBranchesService.branchUpdated$.subscribe(
        (updatedBranch: BranchDetails) => {
          const index = this.dataSource.data.findIndex(
            (branch) => branch.id === updatedBranch.id
          );
          const branches = [...this.dataSource.data]; // criando uma deep copy para garantir imutabilidade
          branches[index] = updatedBranch;
          this.dataSource.data = branches;
        }
      );

    this.subscriptions.add(branchCreatedSubscription);
    this.subscriptions.add(branchUpdatedSubscription);
  }

  enableSorting() {
    const initialSortState: Sort = { active: 'name', direction: 'asc' };
    this.sort.active = initialSortState.active;
    this.sort.direction = initialSortState.direction;
    this.sort.sortChange.emit(initialSortState);
    this.cdr.detectChanges();
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
    // Apenas para atualizar a UI, os dados não serão salvos pois não estamos conectados a um backend
    this.itauBranchesService.deleteBranch(name, id);
    const branches = [...this.dataSource.data]; // criando uma deep copy para garantir imutabilidade
    this.dataSource.data = branches.filter((branch) => branch.id !== id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value ?? '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
