import { ColumnsSchema, TableButton } from '@trustsystems/dynamic-lib';

export function initTableOption(
  goToDetails: (row: any) => void,
  goToCancel: (row: any) => void,
): {
  buttonsArray: TableButton[];
  displayColumns: string[];
  columnsSchema: ColumnsSchema[];
} {
  let buttonsArray: TableButton[] = [];
  let displayColumns: string[] = [];
  let columnsSchema: ColumnsSchema[] = [];
  displayColumns = ['name', 'location', 'category', 'prize', 'details', 'cancel'];
  columnsSchema = [
    {
      key: 'name',
      label: 'tournament.name',
    },
    {
      key: 'location',
      label: 'tournament.location',
    },
    {
      key: 'category',
      label: 'tournament.category',
    },
    {
      key: 'prize',
      label: 'tournament.prize',
    },
  ];
  buttonsArray = [
    {
      column: 'details',
      column_name: 'tournament.details',
      title: 'tournament.details',
      icon: 'info',
      function: goToDetails,
      elevation: false,
    },
    {
      column: 'cancel',
      column_name: 'tournament.cancel',
      title: 'tournament.cancel',
      icon: 'cancel',
      function: goToCancel,
      elevation: false,
    },
  ];

  return { displayColumns, columnsSchema, buttonsArray };
}
