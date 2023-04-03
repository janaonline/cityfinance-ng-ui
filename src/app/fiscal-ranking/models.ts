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
