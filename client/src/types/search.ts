export type SearchItems='collections'|'items'|'users'|'comments'

export interface SearchInitialState {
    searchedItems:any[];
    searchLoading:boolean;
    searchQuery:string;
}