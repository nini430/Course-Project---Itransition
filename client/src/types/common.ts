import {SvgIconComponent} from '@mui/icons-material'

export interface CommonInitialState {
    mode:'dark'|'light';
    lang:'en'|'ka';
    isSidebarOpen:boolean;
}

export type PassType = 'text' | 'password';

export type Statuses= 'active' | 'blocked' | 'deleted';

export type AccountStatuses = 'PUBLIC' | 'PRIVATE'

export type AuthTypes= 'login'|'register';


export interface BreadCrumbProps {
    icon:SvgIconComponent;
    title:string;
    path:string;
}