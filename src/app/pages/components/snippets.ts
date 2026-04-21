export const SNIPPETS = {
  buttons: `<button mat-button>Basic</button>
<button mat-flat-button>Flat</button>
<button mat-stroked-button>Stroked</button>
<button mat-raised-button>Raised</button>
<button mat-fab><mat-icon>add</mat-icon></button>
<button mat-mini-fab><mat-icon>edit</mat-icon></button>
<button mat-icon-button><mat-icon>favorite</mat-icon></button>
<button mat-button disabled>Disabled</button>

// imports: [MatButtonModule, MatIconModule]`,

  buttonToggle: `<mat-button-toggle-group name="alignment">
  <mat-button-toggle value="left"><mat-icon>format_align_left</mat-icon></mat-button-toggle>
  <mat-button-toggle value="center"><mat-icon>format_align_center</mat-icon></mat-button-toggle>
  <mat-button-toggle value="right"><mat-icon>format_align_right</mat-icon></mat-button-toggle>
  <mat-button-toggle value="justify"><mat-icon>format_align_justify</mat-icon></mat-button-toggle>
</mat-button-toggle-group>

// imports: [MatButtonToggleModule, MatIconModule]`,

  badge: `<button mat-icon-button matBadge="4" matBadgeColor="accent">
  <mat-icon>notifications</mat-icon>
</button>
<button mat-icon-button matBadge="22" matBadgeOverlap="false">
  <mat-icon>mail</mat-icon>
</button>
<span matBadge="!" matBadgeSize="small" matBadgeColor="warn">Alert</span>

// imports: [MatBadgeModule, MatIconModule, MatButtonModule]`,

  icon: `<mat-icon>home</mat-icon>
<mat-icon>settings</mat-icon>
<mat-icon>favorite</mat-icon>
<mat-icon>star</mat-icon>
<mat-icon>delete</mat-icon>

// imports: [MatIconModule]`,

  progress: `<mat-progress-spinner mode="determinate" [value]="65" diameter="50" />
<mat-progress-spinner mode="indeterminate" diameter="50" />

<mat-progress-bar mode="determinate" [value]="65" />
<mat-progress-bar mode="indeterminate" />
<mat-progress-bar mode="buffer" [value]="65" [bufferValue]="85" />

// imports: [MatProgressSpinnerModule, MatProgressBarModule]`,

  ripple: `<div matRipple class="ripple-box">
  Click anywhere in this box to see a ripple effect.
</div>

// imports: [MatRippleModule]`,

  formField: `<mat-form-field appearance="fill">
  <mat-label>Fill appearance</mat-label>
  <input matInput placeholder="Your name" />
  <mat-icon matSuffix>person</mat-icon>
</mat-form-field>

<mat-form-field appearance="outline">
  <mat-label>Outline appearance</mat-label>
  <input matInput type="email" placeholder="email@example.com" />
  <mat-hint>We'll never share your email</mat-hint>
</mat-form-field>

<mat-form-field appearance="outline">
  <mat-label>Textarea</mat-label>
  <textarea matInput rows="3"></textarea>
</mat-form-field>

// imports: [MatFormFieldModule, MatInputModule, MatIconModule]`,

  select: `<mat-form-field appearance="outline">
  <mat-label>Favorite food</mat-label>
  <mat-select [(value)]="selectedFood">
    <mat-option value="pizza">Pizza</mat-option>
    <mat-option value="tacos">Tacos</mat-option>
    <mat-option value="sushi">Sushi</mat-option>
  </mat-select>
</mat-form-field>

// imports: [MatSelectModule, MatFormFieldModule]`,

  autocomplete: `<mat-form-field appearance="outline">
  <mat-label>Pick a fruit</mat-label>
  <input matInput [formControl]="myControl" [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete">
    @for (option of filteredOptions(); track option) {
      <mat-option [value]="option">{{ option }}</mat-option>
    }
  </mat-autocomplete>
</mat-form-field>

// imports: [MatAutocompleteModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule]`,

  checkboxRadio: `<mat-checkbox [(ngModel)]="checked">Checked</mat-checkbox>
<mat-checkbox [indeterminate]="true">Indeterminate</mat-checkbox>
<mat-checkbox disabled>Disabled</mat-checkbox>

<mat-radio-group [(ngModel)]="favoriteSeason">
  <mat-radio-button value="Spring">Spring</mat-radio-button>
  <mat-radio-button value="Summer">Summer</mat-radio-button>
  <mat-radio-button value="Fall">Fall</mat-radio-button>
  <mat-radio-button value="Winter">Winter</mat-radio-button>
</mat-radio-group>

// imports: [MatCheckboxModule, MatRadioModule, FormsModule]`,

  toggleSlider: `<mat-slide-toggle [(ngModel)]="toggle">Notifications</mat-slide-toggle>

<mat-slider min="0" max="100" step="5" discrete>
  <input matSliderThumb [(ngModel)]="sliderValue" />
</mat-slider>

// imports: [MatSlideToggleModule, MatSliderModule, FormsModule]`,

  datepicker: `<mat-form-field appearance="outline">
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker" />
  <mat-datepicker-toggle matIconSuffix [for]="picker" />
  <mat-datepicker #picker />
</mat-form-field>

// imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule]
// providers: [provideNativeDateAdapter()]`,

  chips: `<mat-chip-set>
  @for (chip of chips(); track chip) {
    <mat-chip-row (removed)="removeChip(chip)">
      {{ chip }}
      <button matChipRemove><mat-icon>cancel</mat-icon></button>
    </mat-chip-row>
  }
</mat-chip-set>

// imports: [MatChipsModule, MatIconModule]`,

  card: `<mat-card>
  <mat-card-header>
    <div mat-card-avatar class="avatar"></div>
    <mat-card-title>Shiba Inu</mat-card-title>
    <mat-card-subtitle>Dog Breed</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <p>The Shiba Inu is the smallest of the six original spitz breeds.</p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>

// imports: [MatCardModule, MatButtonModule]`,

  tabs: `<mat-tab-group>
  <mat-tab label="First"><p>Content of the first tab.</p></mat-tab>
  <mat-tab label="Second"><p>Content of the second tab.</p></mat-tab>
  <mat-tab label="Third"><p>Content of the third tab.</p></mat-tab>
</mat-tab-group>

// imports: [MatTabsModule]`,

  expansion: `<mat-accordion>
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>Personal data</mat-panel-title>
      <mat-panel-description>Type your name and age</mat-panel-description>
    </mat-expansion-panel-header>
    <!-- content -->
  </mat-expansion-panel>
</mat-accordion>

// imports: [MatExpansionModule]`,

  stepper: `<mat-stepper [linear]="false">
  <mat-step label="First step"><p>Step 1 content</p></mat-step>
  <mat-step label="Second step"><p>Step 2 content</p></mat-step>
  <mat-step label="Done"><p>You're finished!</p></mat-step>
</mat-stepper>

// imports: [MatStepperModule]`,

  list: `<mat-list>
  <mat-list-item><mat-icon matListItemIcon>folder</mat-icon>Photos</mat-list-item>
  <mat-list-item><mat-icon matListItemIcon>folder</mat-icon>Videos</mat-list-item>
  <mat-list-item><mat-icon matListItemIcon>folder</mat-icon>Documents</mat-list-item>
</mat-list>

// imports: [MatListModule, MatIconModule]`,

  gridList: `<mat-grid-list cols="4" rowHeight="80px" gutterSize="8px">
  <mat-grid-tile>1</mat-grid-tile>
  <mat-grid-tile [colspan]="2">2</mat-grid-tile>
  <mat-grid-tile>3</mat-grid-tile>
  <mat-grid-tile>4</mat-grid-tile>
</mat-grid-list>

// imports: [MatGridListModule]`,

  tree: `<mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
  <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle>
    {{ node.name }}
  </mat-tree-node>
  <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild">
    <div class="mat-tree-node">
      <button mat-icon-button matTreeNodeToggle>
        <mat-icon>{{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}</mat-icon>
      </button>
      {{ node.name }}
    </div>
    <div [class.tree-invisible]="!treeControl.isExpanded(node)">
      <ng-container matTreeNodeOutlet />
    </div>
  </mat-nested-tree-node>
</mat-tree>

// imports: [MatTreeModule, MatIconModule, MatButtonModule]
// + NestedTreeControl from @angular/cdk/tree`,

  toolbar: `<mat-toolbar color="primary">
  <mat-icon>menu</mat-icon>
  <span>App Title</span>
  <span class="spacer"></span>
  <button mat-icon-button><mat-icon>favorite</mat-icon></button>
</mat-toolbar>

// imports: [MatToolbarModule, MatIconModule, MatButtonModule]`,

  menu: `<button mat-flat-button [matMenuTriggerFor]="menu">
  Open Menu
  <mat-icon iconPositionEnd>expand_more</mat-icon>
</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item><mat-icon>dialpad</mat-icon>Redial</button>
  <button mat-menu-item disabled><mat-icon>voicemail</mat-icon>Voicemail</button>
  <button mat-menu-item><mat-icon>notifications_off</mat-icon>Disable alerts</button>
</mat-menu>

// imports: [MatMenuModule, MatButtonModule, MatIconModule]`,

  sidenav: `<mat-sidenav-container class="sidenav-container">
  <mat-sidenav #sidenav mode="side" [opened]="sidenavOpen()">
    <mat-nav-list>
      <a mat-list-item>Inbox</a>
      <a mat-list-item>Starred</a>
      <a mat-list-item>Sent Mail</a>
    </mat-nav-list>
  </mat-sidenav>
  <mat-sidenav-content>
    <button (click)="sidenavOpen.set(!sidenavOpen())">Toggle</button>
  </mat-sidenav-content>
</mat-sidenav-container>

// imports: [MatSidenavModule, MatListModule]`,

  tooltip: `<button mat-stroked-button matTooltip="This is a helpful tooltip">
  Hover me
</button>

// imports: [MatTooltipModule, MatButtonModule]`,

  dialogSnackbar: `// Component:
private dialog = inject(MatDialog);
private snackBar = inject(MatSnackBar);
private bottomSheet = inject(MatBottomSheet);

openDialog() {
  this.dialog.open(MyDialogComponent, { width: '400px' });
}

openSnackBar() {
  this.snackBar.open('Message!', 'Dismiss', { duration: 3000 });
}

openBottomSheet() {
  this.bottomSheet.open(MyBottomSheetComponent);
}

// Template:
<button mat-flat-button (click)="openDialog()">Open Dialog</button>
<button mat-flat-button (click)="openSnackBar()">Show Snackbar</button>
<button mat-flat-button (click)="openBottomSheet()">Open Bottom Sheet</button>

// imports: [MatDialogModule, MatSnackBarModule, MatBottomSheetModule, MatButtonModule]`,

  table: `<table mat-table [dataSource]="dataSource" matSort (matSortChange)="sortData($event)">
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>
    <td mat-cell *matCellDef="let row">{{ row.id }}</td>
  </ng-container>
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
    <td mat-cell *matCellDef="let row">{{ row.name }}</td>
  </ng-container>
  <!-- more columns... -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
</table>
<mat-paginator [length]="total" [pageSize]="5" [pageSizeOptions]="[3, 5, 10]" />

// imports: [MatTableModule, MatSortModule, MatPaginatorModule]`,
};
