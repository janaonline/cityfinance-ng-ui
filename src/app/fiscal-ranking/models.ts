export interface Feedback {
    _id: string;
    status: 'PENDING' | 'REJECTED' | 'APPROVED';
    comment: string;
}

export interface Tab {
    _id: string;
    key: string;
    icon: string;
    text: string;
    label: string;
    data: any;
    id: string;
    displayPriority: number;
    __v: number;
    feedback: Feedback;
}

export enum APPROVAL_TYPES {
    'ulbEnteredPmuAccept' = 1,
    'ulbEnteredPmuReject' = 2,
    'enteredPmuAcceptUlb' = 3,
    'enteredPmuRejectUlb' = 4,
    'enteredUlbAcceptPmu' = 5,
    'enteredPmuAcceptPmu' = 6,
    'enteredPmuSecondAcceptPmu' = 7,
    'enteredPmuAcceptPmuAuto' = 8,
}