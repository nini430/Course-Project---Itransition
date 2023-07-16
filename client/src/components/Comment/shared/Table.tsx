import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  TableBody,
  TableCell,
  Table as TableElement,
  TableHead,
  TableRow,
} from '@mui/material';
import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { Column, SortedDir } from '../../../types/table';
import { useTranslation } from 'react-i18next';
import { customizeCells } from '../../../utils/tableFormatterFns';
import { Item } from '../../../types/item';
import { ArrowDownward, ArrowUpward, Sort } from '@mui/icons-material';

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
  sortedColumn: string;
  sortedDir: SortedDir;
  sortItem: (sortedCol: string, sortedDir: SortedDir) => void;
  loading:boolean;
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
  sortedColumn,
  sortedDir,
  sortItem,
  loading
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
            <TableCell
              sx={{ cursor: 'pointer', position: 'relative', width: 150, maxWidth:150 }}
              key={column.id}
            >
              {t(`${tableName}.${column.label}`)}
              <SortingIcon>
                {column.isSortable ? (
                  <IconButton
                    onClick={() =>
                      sortItem(
                        column.id,
                        column.id === sortedColumn
                          ? sortedDir === 'asc'
                            ? 'desc'
                            : 'asc'
                          : 'asc'
                      )
                    }
                  >
                    {sortedColumn === column.id ? (
                      sortedDir === 'asc' ? (
                        <ArrowUpward />
                      ) : (
                        <ArrowDownward />
                      )
                    ) : (
                      <Sort/>
                    )}
                  </IconButton>
                ) : (
                  ''
                )}
              </SortingIcon>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? <Box sx={{display:'flex',justifyContent:'center'}}>
                <CircularProgress size={75} />
        </Box>:
        data.map((item: any) => (
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
                checked={selectedIds?.includes(item.id)}
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
        ))
        }

      </TableBody>
    </TableElement>
  );
};

const SortingIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -20px;
`;

export default Table;
