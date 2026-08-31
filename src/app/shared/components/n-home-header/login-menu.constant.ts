
import { USER_TYPE } from '../../../models/user/userType';

export interface IRoutePages {
    type: string;
    label: string;
    link?: string;
    isMenu: boolean;
    route?: string;
    roles?: USER_TYPE[];
    isHiddenInProd?: boolean; // hidden once environment.isProduction is true; still shown in dev/staging/local
}
export const ROUTE_PAGES: IRoutePages[] = [{
    type: '15thFC',
    label: 'XV FC Grant',
    link: '/fc-home-page',
    isMenu: true,
    roles: [USER_TYPE.ULB, USER_TYPE.STATE, USER_TYPE.MoHUA, USER_TYPE.ADMIN]
},
{
    // isMenu: false on purpose — this row is rendered separately, as a hardcoded, isProd-gated
    // <li> in n-home-header.component.html (unlike SSR/V2, UI's *ngFor loop below has no
    // isHiddenInProd check, so it can't gate this row itself). This object exists only so
    // loginLogout('16thFC') has somewhere to read type/roles from.
    // XVIFC_PROD_CUTOVER: the actual prod/dev gating lives in the .html's *ngIf="!isProd" (on
    // this row's <hr> and <li>) — remove that there, not here. This entry has no isHiddenInProd
    // flag precisely so there's only one place to edit at cutover, not two that could drift.
    type: '16thFC',
    label: 'XVI FC Grant',
    route: '/xvifc/year',
    isMenu: false,
    roles: [USER_TYPE.ULB, USER_TYPE.STATE, USER_TYPE.MoHUA, USER_TYPE.ADMIN]
},
{
    type: 'XVIFC',
    label: 'XVI FC Data Collection',
    route: '/xvifc-form',
    isMenu: true,
    roles: [USER_TYPE.ULB]
},
{
    type: 'XVIFC',
    label: 'XVI FC Review',
    route: '/admin/xvi-fc-review',
    isMenu: false,
    roles: [USER_TYPE.XVIFC_STATE, USER_TYPE.XVIFC]
},
{
    // Rankings temporarily disabled for all users
    type: 'ranking',
    label: 'Rankings 2022',
    link: '/rankings/ulb-form',
    isMenu: false,
    roles: [USER_TYPE.ULB, USER_TYPE.STATE, USER_TYPE.MoHUA, USER_TYPE.ADMIN]
},
{
    type: 'state-dashboard',
    label: 'State Dashboard',
    link: '/state-dashboard',
    isMenu: true,
}
];