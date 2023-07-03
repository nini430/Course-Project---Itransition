import {Checkbox, TableBody, TableCell, Table as TableElement, TableHead, TableRow} from '@mui/material'
import { Column } from '../../../types/table';
import { useTranslation } from 'react-i18next';
import { customizeCells } from '../../../utils/tableFormatterFns';

interface ITableProps {
    columns:Column[];
    tableName:string;
    data:any[];
}



const Table = ({columns,tableName,data}:ITableProps) => {
    const {t}=useTranslation();
  return (
    <TableElement>
        <TableHead>
           <TableRow>
            <TableCell>
              <Checkbox/>
            </TableCell>
            {columns.map(column=>(
                <TableCell key={column.id}>{t(`${tableName}.${column.label}`)}</TableCell>
            ))}
           </TableRow>
        </TableHead>
        <TableBody>
            {data.map((item:any)=>(
              <TableRow key={item.id}>
                <TableCell><Checkbox/></TableCell>
                {Object.entries(item).map(([key,value])=>(
                  <TableCell>{customizeCells(value)}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
    </TableElement>
  )
}

export default Table;