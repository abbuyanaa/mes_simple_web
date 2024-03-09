// Grouping
export const defaultGroupingProps = {
  allowCollapsing: true,
  autoExpandAll: true,
  expandMode: 'rowClick',
};

// GroupPanel
export const defaultGroupPanelProps = {
  visible: false,
  allowColumnDragging: true,
};

// KeyboardNavigation
export const defaultKeyboardNavigationProps = {
  editOnKeyPress: false,
  enabled: false,
  enterKeyAction: 'moveFocus',
  enterKeyDirection: 'row',
};

// Pager
export const defaultPagerProps = {
  allowedPageSizes: [5, 10, 25, 50],
  displayMode: 'full', // adaptive
  showInfo: true,
  showPageSizeSelector: true,
  showNavigationButtons: true,
  visible: true,
};

// Paging
export const defaultPagingProps = {
  enabled: true,
  defaultPageIndex: 0,
  defaultPageSize: 10,
};

// SearchPanel
export const defaultSearchPanelProps = {
  visible: false,
  highlightSearchText: true,
  highlightCaseSensitive: false,
};

// Column Selection
export const defaultSelectionProps = {
  mode: 'multiple',
  selectAllMode: 'page',
  // allowSelectAll: true,
  showCheckBoxesMode: 'always',
};

// ColumnFixing
export const defaultColumnFixing = {
  enabled: true,
};

// Summary TotalItem
export const defaultSummaryTotals = {
  cssClass: 'gridSumTotals',
  summaryType: 'sum',
  displayFormat: '{0}',
  valueFormat: '#,##0.##',
};

// Number Column
export const defaultNumberColumn = {
  alignment: 'right',
  format: '#,##0.##',
};

// Grid
const defaultDataGridProps = {
  allowColumnReordering: true,
  allowColumnResizing: true,
  columnResizingMode: 'widget',
  columnAutoWidth: true,
  showBorders: true,
  showColumnLines: true,
  showRowLines: true,
  rowAlternationEnabled: false,
  hoverStateEnabled: true,
  grouping: defaultGroupingProps,
  groupPanel: defaultGroupPanelProps,
  keyboardNavigation: defaultKeyboardNavigationProps,
  pager: defaultPagerProps,
  // paging: defaultPagingProps,
  searchPanel: defaultSearchPanelProps,
  selection: defaultSelectionProps,
  columnFixing: defaultColumnFixing,
};

export default defaultDataGridProps;
