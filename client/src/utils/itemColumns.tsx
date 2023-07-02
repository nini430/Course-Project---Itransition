import { Column } from "../types/table";


export const itemColumns:Column[]=[
    {
        id:'name',
        minWidth:200,
        label:'name',
        isSortable:true,
    },
    {
        id:'tags',
        minWidth:200,
        label:'tags',
        isSortable:true,
    },
    {
        id:'reactions.length',
        minWidth:200,
        label:'reactions',
    },
    {
        id:'comments',
        minWidth:200,
        label:'comments',
    },
    {
        id:'createdAt',
        minWidth:200,
        label:'created_at',
        isSortable:true
    },
    {
        id:'collection',
        minWidth:200,
        label:'collection'
    },
    {
        id:'author',
        minWidth:200,
        label:'author'
    },
    {
        id:'custom_fields',
        minWidth:200,
        label:'custom_fields'
    }
]