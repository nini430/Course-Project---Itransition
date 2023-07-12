import {
  Checkbox,
  TableBody,
  TableCell,
  Table as TableElement,
  TableHead,
  TableRow,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Column } from '../../../types/table';
import { useTranslation } from 'react-i18next';
import { customizeCells } from '../../../utils/tableFormatterFns';
import { Item } from '../../../types/item';

interface ITableProps {
  columns: Column[];
  tableName: string;
  data: any[];
  viewCustom?: (item: Item) => void;
  viewReacts?: (item: Item) => void;
  viewComments?: (item: Item) => void;
  viewCollections?: (item: any) => void;
  viewFollows?: (item: any) => void;
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
}

const Table = ({
  columns,
  tableName,
  data,
  viewCustom,
  viewReacts,
  viewComments,
  viewCollections,
  viewFollows,
  selectedIds,
  setSelectedIds,
}: ITableProps) => {
  const { t } = useTranslation();
  return (
    <TableElement>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              onChange={() =>
                setSelectedIds(
                  selectedIds.length === data.length
                    ? []
                    : data.map((item) => item.id)
                )
              }
              checked={selectedIds?.length === data?.length}
            />
          </TableCell>
          {columns.map((column) => (
            <TableCell key={column.id}>
              {t(`${tableName}.${column.label}`)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell>
              <Checkbox
                onChange={() =>
                  setSelectedIds((prev) =>
                    prev.includes(item.id)
                      ? prev.filter((elem) => elem !== item.id)
                      : [...prev, item.id]
                  )
                }
                checked={selectedIds.includes(item.id)}
              />
            </TableCell>
            {Object.entries(item).map(([key, value]) => (
              <TableCell>
                {customizeCells(
                  value,
                  viewCustom,
                  item,
                  viewReacts,
                  viewComments,
                  viewCollections,
                  viewFollows
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableElement>
  );
};

export default Table;
