import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { DemoBlock } from '../../shared/demo-block/demo-block';
import { SNIPPETS } from './snippets';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-dialog-demo',
  template: `
    <h2 mat-dialog-title>Hello from a Dialog</h2>
    <mat-dialog-content>This is a Material dialog. Click the button below to close it.</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="ref.close()">Close</button>
      <button mat-flat-button (click)="ref.close('confirmed')">Confirm</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDemo {
  ref = inject(MatDialogRef<DialogDemo>);
}

@Component({
  selector: 'app-bottom-sheet-demo',
  template: `
    <mat-nav-list>
      <a mat-list-item><mat-icon matListItemIcon>share</mat-icon>Share</a>
      <a mat-list-item><mat-icon matListItemIcon>content_copy</mat-icon>Copy link</a>
      <a mat-list-item><mat-icon matListItemIcon>delete</mat-icon>Delete</a>
    </mat-nav-list>
  `,
  imports: [MatListModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetDemo {}

@Component({
  selector: 'app-components',
  templateUrl: './components.html',
  styleUrl: './components.scss',
  imports: [
    DemoBlock,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsPage {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private bottomSheet = inject(MatBottomSheet);

  snippets = SNIPPETS;

  checked = signal(true);
  indeterminate = signal(false);
  toggle = signal(true);
  favoriteSeason = signal('Spring');
  sliderValue = signal(40);
  selectedFood = signal('pizza');
  autocompleteControl = new FormControl('');
  options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  filteredOptions = signal<string[]>(this.options);

  chips = signal(['Angular', 'Material', 'TypeScript']);

  progress = signal(65);

  displayedColumns = ['id', 'name', 'role', 'email'];
  tableData: User[] = [
    { id: 1, name: 'Alice Johnson', role: 'Engineer', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', role: 'Designer', email: 'bob@example.com' },
    { id: 3, name: 'Carol Davis', role: 'Manager', email: 'carol@example.com' },
    { id: 4, name: 'David Wilson', role: 'Engineer', email: 'david@example.com' },
    { id: 5, name: 'Eve Martinez', role: 'QA', email: 'eve@example.com' },
    { id: 6, name: 'Frank Brown', role: 'DevOps', email: 'frank@example.com' },
  ];
  dataSource = new MatTableDataSource<User>(this.tableData.slice(0, 3));
  pageSize = signal(3);

  treeData: TreeNode[] = [
    {
      name: 'src',
      children: [
        { name: 'app', children: [{ name: 'components' }, { name: 'pages' }] },
        { name: 'styles.scss' },
      ],
    },
    { name: 'package.json' },
  ];
  treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
  treeDataSource = new MatTreeNestedDataSource<TreeNode>();
  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  sidenavOpen = signal(false);

  constructor() {
    this.treeDataSource.data = this.treeData;
    this.autocompleteControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      const v = (value || '').toLowerCase();
      this.filteredOptions.set(this.options.filter((o) => o.toLowerCase().includes(v)));
    });
  }

  removeChip(chip: string) {
    this.chips.update((list) => list.filter((c) => c !== chip));
  }

  openDialog() {
    this.dialog.open(DialogDemo, { width: '400px' });
  }

  openSnackBar() {
    this.snackBar.open('This is a snack bar message!', 'Dismiss', { duration: 3000 });
  }

  openBottomSheet() {
    this.bottomSheet.open(BottomSheetDemo);
  }

  sortData(sort: Sort) {
    const data = [...this.tableData];
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data.slice(0, this.pageSize());
      return;
    }
    const key = sort.active as keyof User;
    const sorted = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const av = a[key];
      const bv = b[key];
      return (av < bv ? -1 : av > bv ? 1 : 0) * (isAsc ? 1 : -1);
    });
    this.dataSource.data = sorted.slice(0, this.pageSize());
  }
}
