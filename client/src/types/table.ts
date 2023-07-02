export interface Column {
    id:string;
    label:string;
    minWidth?:number;
    align?:'right';
    format?:(value:any)=>any;
    isSortable?:boolean;
}

export type SortedDir='asc'|'desc'