import moment from 'moment';

import { Column } from "../types/table";


export const itemColumns:Column[]=[
    {
        id:'name',
        minWidth:200,
        label:'name',
    },
    {
        id:'tags',
        minWidth:200,
        label:'tags',
        format:(value:string)=>value.split(',').map((item:string)=>`#${item}`)
    },
    {
        id:'collection',
        minWidth:200,
        label:'collection',
    },
    {
        id:'author',
        minWidth:200,
        label:'author',
    },
    {
        id:'createdAt',
        minWidth:200,
        label:'created_at',
        format:(value:string)=>moment(value).format('LL')
    },
    {
        id:'comments',
        minWidth:200,
        label:'comments',
    },
    {
        id:'reactions',
        minWidth:200,
        label:'reactions',
    },
    {
        id:'custom_fields',
        minWidth:200,
        label:'custom_fields',
    },
]