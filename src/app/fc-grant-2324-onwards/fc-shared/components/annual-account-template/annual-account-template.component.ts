import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-annual-account-template',
  templateUrl: './annual-account-template.component.html',
  styleUrls: ['./annual-account-template.component.scss']
})
export class AnnualAccountTemplateComponent implements OnInit {

  constructor() { }
  @Input() formData;
  obj = {
    "category": "assessmentByCSR",
    "formName" : "Annual account",
    "assessments": [
        {
            "shortKey": "deskBasedDueDiligence",
            "language": [
                {
                    "title": "Desk Based Due Diligence Of Partner",
                    "question": [
                        {
                            "order": "1",
                            "viewSequence": "1",
                            "title": "Reputational Risks",
                            "shortKey": "reputationalRisksText",
                            "input_type": "10",
                            "parent": [],
                            "child": [],
                            "restrictions": [],
                            "validation": [],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "2",
                            "viewSequence": "2",
                            "shortKey": "isNgoListed",
                            "title": "Is the NGO listed on any of the following:- FCRA blacklist, Ministry of Social Justice Empowerment",
                            "input_type": "5",
                            "answer_option": [
                                {
                                    "_id": "1",
                                    "name": "Yes",
                                    "did": [],
                                    "viewSequence": "1"
                                },
                                {
                                    "_id": "2",
                                    "name": "No",
                                    "did": [],
                                    "viewSequence": "2"
                                }
                            ],
                            "parent": [],
                            "child": [
                                {
                                    "order": "3",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "No",
                                    "textValue": "",
                                    "value": "2"
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "No",
                                    "textValue": "",
                                    "value": "2"
                                }
                            ]
                        },
                        {
                            "order": "3",
                            "viewSequence": "3",
                            "shortKey": "ngoListedDocument",
                            "title": "Upload File (Upload Word document with Date of Search and Link)",
                            "input_type": "11",
                            "parent": [
                                {
                                    "order": "2",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/png"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/pdf"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpeg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/msword"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.ms-excel"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                }
                            ],
                            "answer": [
                                {
                                    "textValue": "https://staging-dhwani.s3.ap-south-1.amazonaws.com/__%20Shri%20Mata%20Vaishno%20Devi%20Shrine%20Board%20__%20Yatra%20Parchi%20Services_c275751c-fa86-4051-835a-b02b9d2944c9.pdf",
                                    "label": "__ Shri Mata Vaishno Devi Shrine Board __ Yatra Parchi Services.pdf",
                                    "value": "https://staging-dhwani.s3.ap-south-1.amazonaws.com/__%20Shri%20Mata%20Vaishno%20Devi%20Shrine%20Board%20__%20Yatra%20Parchi%20Services_c275751c-fa86-4051-835a-b02b9d2944c9.pdf"
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "textValue": "https://staging-dhwani.s3.ap-south-1.amazonaws.com/__%20Shri%20Mata%20Vaishno%20Devi%20Shrine%20Board%20__%20Yatra%20Parchi%20Services_c275751c-fa86-4051-835a-b02b9d2944c9.pdf",
                                    "label": "__ Shri Mata Vaishno Devi Shrine Board __ Yatra Parchi Services.pdf",
                                    "value": "https://staging-dhwani.s3.ap-south-1.amazonaws.com/__%20Shri%20Mata%20Vaishno%20Devi%20Shrine%20Board%20__%20Yatra%20Parchi%20Services_c275751c-fa86-4051-835a-b02b9d2944c9.pdf"
                                }
                            ]
                        },
                        {
                            "order": "4",
                            "viewSequence": "4",
                            "shortKey": "isNgoFeatured",
                            "title": "Is the NGO featured on Guidestar India",
                            "input_type": "5",
                            "answer_option": [
                                {
                                    "_id": "1",
                                    "name": "Yes",
                                    "did": [],
                                    "viewSequence": "1"
                                },
                                {
                                    "_id": "2",
                                    "name": "No",
                                    "did": [],
                                    "viewSequence": "2"
                                }
                            ],
                            "parent": [],
                            "child": [
                                {
                                    "order": "5",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "5",
                            "viewSequence": "5",
                            "shortKey": "ngoFeaturedDocument",
                            "title": "Upload File (Upload Word document with Date of Search and Link)",
                            "input_type": "11",
                            "parent": [
                                {
                                    "order": "4",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/png"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/pdf"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpeg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/msword"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.ms-excel"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                }
                            ],
                            "answer": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "6",
                            "viewSequence": "6",
                            "shortKey": "checkGoogleNegativeNews",
                            "title": "Are there any news items regarding the NGO on Google News?",
                            "input_type": "5",
                            "answer_option": [
                                {
                                    "_id": "1",
                                    "name": "Yes",
                                    "did": [],
                                    "viewSequence": "1"
                                },
                                {
                                    "_id": "2",
                                    "name": "No",
                                    "did": [],
                                    "viewSequence": "2"
                                }
                            ],
                            "parent": [],
                            "child": [
                                {
                                    "order": "7",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "7",
                            "viewSequence": "7",
                            "shortKey": "googleNegativeNewsDocument",
                            "title": "Upload File (Upload Word document with Date of Search and Link)",
                            "input_type": "11",
                            "parent": [
                                {
                                    "order": "6",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/png"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/pdf"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpeg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/msword"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.ms-excel"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                }
                            ],
                            "answer": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "8",
                            "viewSequence": "8",
                            "shortKey": "hasPendingLawsuits",
                            "title": "Does the organization have any pending lawsuits against them? -India Kanoon",
                            "input_type": "5",
                            "answer_option": [
                                {
                                    "_id": "1",
                                    "name": "Yes",
                                    "did": [],
                                    "viewSequence": "1"
                                },
                                {
                                    "_id": "2",
                                    "name": "No",
                                    "did": [],
                                    "viewSequence": "2"
                                }
                            ],
                            "parent": [],
                            "child": [
                                {
                                    "order": "9",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "9",
                            "viewSequence": "9",
                            "shortKey": "pendingLawsuitDocument",
                            "title": "Upload File (Upload Word document with Date of Search and Link)",
                            "input_type": "11",
                            "parent": [
                                {
                                    "order": "8",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/png"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/pdf"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpeg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/msword"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.ms-excel"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                }
                            ],
                            "answer": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "10",
                            "viewSequence": "10",
                            "shortKey": "isNgoRelatedToReligiousBody",
                            "title": "Is the NGO affiliated to any religious body?",
                            "input_type": "5",
                            "answer_option": [
                                {
                                    "_id": "1",
                                    "name": "Yes",
                                    "did": [],
                                    "viewSequence": "1"
                                },
                                {
                                    "_id": "2",
                                    "name": "No",
                                    "did": [],
                                    "viewSequence": "2"
                                }
                            ],
                            "parent": [],
                            "child": [
                                {
                                    "order": "11",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "11",
                            "viewSequence": "11",
                            "shortKey": "ngoReligiousRelatedDocument",
                            "title": "Upload File",
                            "input_type": "11",
                            "parent": [
                                {
                                    "order": "10",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/png"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/pdf"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpeg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/msword"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.ms-excel"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                }
                            ],
                            "answer": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "12",
                            "viewSequence": "12",
                            "shortKey": "areBoardMembersPolitical",
                            "title": "Are office bearers (senior management team and/or board) elected members of any political party?",
                            "input_type": "5",
                            "answer_option": [
                                {
                                    "_id": "1",
                                    "name": "Yes",
                                    "did": [],
                                    "viewSequence": "1"
                                },
                                {
                                    "_id": "2",
                                    "name": "No",
                                    "did": [],
                                    "viewSequence": "2"
                                }
                            ],
                            "parent": [],
                            "child": [
                                {
                                    "order": "13",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "13",
                            "viewSequence": "13",
                            "shortKey": "boardMembersPoliticalDocument",
                            "title": "Upload File",
                            "input_type": "11",
                            "parent": [
                                {
                                    "order": "12",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/png"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/pdf"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpeg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/msword"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.ms-excel"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                }
                            ],
                            "answer": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "14",
                            "viewSequence": "14",
                            "shortKey": "conflictInterestsText",
                            "title": "Conflict of interests",
                            "input_type": "10",
                            "parent": [],
                            "child": [],
                            "restrictions": [],
                            "validation": [],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "15",
                            "viewSequence": "15",
                            "shortKey": "isFamilyMemberInOrgBoard",
                            "title": "Are any G&G team members or their immediate family on the board of the organisation? (If yes, please provide details and evidence that this person has not participated in any decision making related to the project)",
                            "input_type": "5",
                            "answer_option": [
                                {
                                    "_id": "1",
                                    "name": "Yes",
                                    "did": [],
                                    "viewSequence": "1"
                                },
                                {
                                    "_id": "2",
                                    "name": "No",
                                    "did": [],
                                    "viewSequence": "2"
                                }
                            ],
                            "parent": [],
                            "child": [
                                {
                                    "order": "16",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "16",
                            "viewSequence": "16",
                            "shortKey": "familyMemberInOrgBoardDocument",
                            "title": "Upload File",
                            "input_type": "11",
                            "parent": [
                                {
                                    "order": "15",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/png"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/pdf"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpeg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/msword"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.ms-excel"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                }
                            ],
                            "answer": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "17",
                            "viewSequence": "17",
                            "shortKey": "isTeamMemberFinancialInvolved",
                            "title": "Does any G&G team member have any ownership/ partnership or financial involvement with the partner/ third party(If yes,this project must be dropped)",
                            "input_type": "5",
                            "answer_option": [
                                {
                                    "_id": "1",
                                    "name": "Yes",
                                    "did": [],
                                    "viewSequence": "1"
                                },
                                {
                                    "_id": "2",
                                    "name": "No",
                                    "did": [],
                                    "viewSequence": "2"
                                }
                            ],
                            "parent": [],
                            "child": [
                                {
                                    "order": "18",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "18",
                            "viewSequence": "18",
                            "shortKey": "teamMemberFinancialInvolvedDocument",
                            "title": "Upload File",
                            "input_type": "11",
                            "parent": [
                                {
                                    "order": "17",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/png"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/pdf"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpeg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/msword"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.ms-excel"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                }
                            ],
                            "answer": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "19",
                            "viewSequence": "19",
                            "shortKey": "isEmployeeAffiliatedToOrg",
                            "title": "Are you or any G&G team member related to the organization? (If yes, take declaration)",
                            "input_type": "5",
                            "answer_option": [
                                {
                                    "_id": "1",
                                    "name": "Yes",
                                    "did": [],
                                    "viewSequence": "1"
                                },
                                {
                                    "_id": "2",
                                    "name": "No",
                                    "did": [],
                                    "viewSequence": "2"
                                }
                            ],
                            "parent": [],
                            "child": [
                                {
                                    "order": "20",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "Yes",
                                    "textValue": "",
                                    "value": "1"
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "Yes",
                                    "textValue": "",
                                    "value": "1"
                                }
                            ]
                        },
                        {
                            "order": "20",
                            "viewSequence": "20",
                            "shortKey": "employeeAffiliatedToOrgDocument",
                            "title": "Upload File",
                            "input_type": "11",
                            "parent": [
                                {
                                    "order": "19",
                                    "type": "3",
                                    "value": "^([1])$"
                                }
                            ],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/png"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/pdf"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "image/jpeg"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/msword"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.ms-excel"
                                },
                                {
                                    "error_msg": "",
                                    "_id": "83",
                                    "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                }
                            ],
                            "answer": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "textValue": "",
                                    "label": "",
                                    "value": ""
                                }
                            ]
                        }
                    ]
                }
            ],
            "isSkipAllowed": false,
            "isSubmitted": true,
            "isSkipped": false,
            "isClickable": true,
            "skipReason": "",
            "sequence": 1,
            "mode": "edit",
            "eligibilityForClickable": [],
            "comments": {
                "apiEnd": "ProposalDetail-deskBasedDueDiligence",
                "key": "lastComment",
                "subKey": "text",
                "title": "Comments",
                "type": "comment"
            }
        },
        {
            "shortKey": "fieldBasedDueDiligence",
            "language": [
                {
                    "title": "Field Based Due Diligence Of Partner",
                    "question": [
                        {
                            "order": "1",
                            "viewSequence": "1",
                            "shortKey": "fieldBasedDiligenceText",
                            "title": "Field based diligence",
                            "input_type": "10",
                            "parent": [],
                            "child": [],
                            "restrictions": [],
                            "validation": [],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "2",
                            "viewSequence": "2",
                            "shortKey": "hasOrgVisited",
                            "title": "Has the organisation’s office been visited? Has there been an interaction with the project team?",
                            "input_type": "13",
                            "parent": [],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "3",
                            "viewSequence": "3",
                            "shortKey": "dateLocationOfVisit",
                            "title": "Date and location of project visit",
                            "input_type": "13",
                            "parent": [],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "4",
                            "viewSequence": "4",
                            "shortKey": "teamMembers",
                            "title": "G&G team members visiting",
                            "input_type": "13",
                            "parent": [],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "5",
                            "viewSequence": "5",
                            "shortKey": "positiveImpressions",
                            "title": "Positive impressions from visit",
                            "input_type": "13",
                            "parent": [],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "6",
                            "viewSequence": "6",
                            "shortKey": "concernAreas",
                            "title": "Any areas of concern",
                            "input_type": "13",
                            "parent": [],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        },
                        {
                            "order": "7",
                            "viewSequence": "7",
                            "shortKey": "interaction",
                            "title": "Interactions with community/ beneficiaries",
                            "input_type": "13",
                            "parent": [],
                            "child": [],
                            "restrictions": [],
                            "validation": [
                                {
                                    "_id": "1",
                                    "error_msg": ""
                                }
                            ],
                            "answer": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ],
                            "nestedAnswer": [],
                            "selectedValue": [
                                {
                                    "label": "",
                                    "textValue": "",
                                    "value": ""
                                }
                            ]
                        }
                    ]
                }
            ],
            "isSkipAllowed": true,
            "isSubmitted": true,
            "isSkipped": false,
            "isClickable": true,
            "skipReason": "",
            "sequence": 2,
            "mode": "edit",
            "eligibilityForClickable": [
                "deskBasedDueDiligence"
            ],
            "comments": {
                "apiEnd": "ProposalDetail-fieldBasedDueDiligence",
                "key": "lastComment",
                "subKey": "text",
                "title": "Comments",
                "type": "comment"
            }
        },
    ],
    "mode": "edit"
}
  ngOnInit(): void {
    console.log('form data')
  }


}
