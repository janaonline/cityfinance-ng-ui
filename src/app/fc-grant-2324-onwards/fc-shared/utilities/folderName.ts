/*

folder structure for uploading file on s3
folder format : ROLE/DESIGN_YEAR/FORM_NAME/CODE

Role: Based on login eg-ULB,STATE,MOHUA
Design year: design year, eg 2021-22, 2023-24
Form Name : shortcut for every form which is mention below and also on design sheet
Code: every ulb and state has a unique code, which we use here, eg - for ULB - UP302,UK012, for state - UK,UP

folder name exmple: ULB/2022-23/pto/UP302, STATE/2022-23/projects_wss/UP
 

*/


// ulb form folder name
export const ulbForm: any = {
    LINKING_OF_PFMS_ACCOUNT: 'pfms',
    SLBS_FOR_WATER_SUPPLY_AND_ANITATION: '4slb',
    GRANT_TRANSFER_CERTIFICATE: 'gtc',
    DETAILED_UTILISATION_REPORT: 'dur',
    ANNUAL_ACCOUNTS: 'annual_accounts',
    PROPERTY_TAX_OPERATIONALISATION: 'pto',
    SLBS_28:'28slb',
    OPEN_DEFECATION_FREE: 'odf',
    GARBAGE_FREE_CITY: 'gfc',

};

// state form folder name
export const stateForm: any = {
    GRANT_TRANSFER_CERTIFICATE:'gtc',
    PROPERTY_TAX_FLOOR_RATE_NOTIFICATION: 'property_tax_notification',
    STATE_FINANCE_COMMISSION_NOTIFICATION: 'sfc',
    INDICATORS_FOR_WATER_SUPPLY_AND_SANITATION : 'indicators_wss',
    PROJECTS_FOR_WATER_SUPPLY_AND_SANITATION: 'projects_wss',
    ACTION_PLAN_FOR_UA_SERVICE_LEVEL_INDICATORS: 'action_plan',
    GRANT_ALLOCATION_TO_ULBS: 'grant_allocation',
    SUBMIT_CLAIMS_FOR_15TH_FC_GRANTS: 'grant-claims'
};

// state form folder name
export const mohuaForm = {
    GRANT_TRANSFER_DATA_UPLOAD: 'grant_transfer',
    STATE_RESOURCES: 'state-resources'
};