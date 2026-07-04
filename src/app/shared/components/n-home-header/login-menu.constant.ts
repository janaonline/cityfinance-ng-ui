
import { USER_TYPE } from '../../../models/user/userType';

export interface IRoutePages {
    type: string;
    label: string;
    link?: string;
    isMenu: boolean;
    route?: string;
    roles?: USER_TYPE[];
}
export const ROUTE_PAGES: IRoutePages[] = [{
    type: '15thFC',
    label: 'XV FC Grant',
    link: '/fc-home-page',
    isMenu: true,
    roles: [USER_TYPE.ULB, USER_TYPE.STATE, USER_TYPE.MoHUA, USER_TYPE.ADMIN]
},
// {
//     type: '16thFC',
//     label: 'XVI FC Grant',
//     route: '/xvifc/year',
//     isMenu: true,
//     roles: [USER_TYPE.ULB, USER_TYPE.STATE, USER_TYPE.MoHUA, USER_TYPE.ADMIN]
// },
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
    type: 'ranking',
    label: 'Rankings 2022',
    link: '/rankings/ulb-form',
    isMenu: true,
    roles: [USER_TYPE.ULB, USER_TYPE.STATE, USER_TYPE.MoHUA, USER_TYPE.ADMIN]
},
{
    type: 'state-dashboard',
    label: 'State Dashboard',
    link: '/state-dashboard',
    isMenu: true,
}
];