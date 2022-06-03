import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { List, update } from 'immutable';
import { CommonService } from './common.service';
import {
  QUESTION_TYPE,
  DEFAULT_USER_LANGUAGE,
  VALIDATION,
  RESTRICTION,
  FILETYPE_EXT_ERROR_MSG,
} from './utilities/appForm/constants/index';
import {
  setInitialQuestions,
  questionInputChange,
  validateTextInputValueByValidationAndRestrictions,
  submitForm,
} from './utilities/appForm/form.util';
import { getTitleProps } from './utilities/appForm/question.util';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

const name = ['(', ')', '%'];
const address = ['\n', '(', ')', ',', ';'];

declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'demo';
  language = DEFAULT_USER_LANGUAGE;
  QUESTION_TYPE = QUESTION_TYPE;
  VALIDATION = VALIDATION;
  isOpenChevron: boolean = false;
  formtitle: string = '';
  formId: string = '';
  whitelistCharacters: any = {
    nameCharacters: name,
    textareaCharacters: address,
  };
  @Input() enableEditMode = false;
  @Input() showPreviewAnswer = false;
  isImageUploading = false;
  expanded = false;
  @Input() isFormSubmittedSuccessfully = false;
  @Input() showSubmitButton:boolean | string  = true;
  @Input() viewFormTemplate: 'template1' | 'template2' | 'template3' =
    'template2';
  districtsList: any = [];
  timer: any;
  constructor(
    private commonService: CommonService,
    public snackBar: MatSnackBar
  ) // private godrejService: GodrejService,
  // private commonFunction: CommonFunctionService,
  // private geographyService: GeographyService
  {}
  @Input() questionresponse: any = {
    timestamp: 1621316934,
    success: true,
    message: 'Form Questionare!',
    data: [
      {
        _id: '5f4656c92daa9921dc1173aa',
        formId: 466,
        language: [
          {
            _id: '6062bab22593ae5edeab92d7',
            lng: 'en',
            title: 'Harsh Test',
            question: [
              {
                _id: '5f50ce10b6ca7c58d2b71dba',
                order: '5',
                title: 'semester.',
                hint: '',
                weightage: [],
                input_type: '3',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [
                  {
                    order: '34',
                    value: '^([2]|[4])$',
                    type: '3',
                  },
                ],
                restrictions: [],
                answer_option: [
                  {
                    _id: '1',
                    viewSequence: '1',
                    did: [],
                    shortKey: '',
                    name: '1',
                  },
                  {
                    _id: '2',
                    viewSequence: '2',
                    did: [],
                    shortKey: '',
                    name: '2',
                  },
                  {
                    _id: '3',
                    viewSequence: '3',
                    did: [],
                    shortKey: '',
                    name: '3',
                  },
                  {
                    _id: '4',
                    viewSequence: '4',
                    did: [],
                    shortKey: '',
                    name: '4',
                  },
                  {
                    _id: '99',
                    viewSequence: '5',
                    did: [],
                    shortKey: '',
                    name: 'None',
                  },
                ],
                validation: [],
                viewSequence: '2',
                information: '',
                shortKey: 'order5',
                label: '2',
              },
              {
                _id: '5f55485d8316ea5347ab0896',
                order: '12',
                title: 'science2',
                hint: '',
                weightage: [],
                min: 1,
                max: 3,
                pattern: '',
                input_type: '2',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [],
                viewSequence: '3',
                information: '',
                shortKey: 'order12',
                label: '3',
              },
              {
                _id: '5f55c8f28316ea5347ab08e7',
                order: '14',
                title: 'total3',
                hint: '',
                weightage: [],
                min: 1,
                max: 3,
                pattern: '',
                input_type: '2',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [
                  {
                    _id: '5',
                    error_msg: '',
                    value: '(order12+order16)',
                  },
                ],
                viewSequence: '5',
                information: '',
                shortKey: 'order14',
                label: '5',
              },
              {
                _id: '5f57df6e1a71991f9c3f9c2a',
                order: '16',
                title: 'maths2',
                hint: '',
                weightage: [],
                min: 1,
                max: 3,
                pattern: '',
                input_type: '2',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [],
                viewSequence: '4',
                information: '',
                shortKey: 'order16',
                label: '4',
              },
              {
                _id: '5f620919d11e1971a56824ae',
                order: '17',
                title: 'ques for length check mandatory',
                hint: '',
                weightage: [],
                min: 1,
                max: 3,
                pattern: '',
                input_type: '2',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [
                  {
                    error_msg: '',
                    _id: '1',
                  },
                ],
                viewSequence: '6',
                information: '',
                shortKey: 'order17',
                label: '6',
              },
              {
                _id: '5f62092bd11e1971a56824c3',
                order: '18',
                title: 'ques for pattern check pin code',
                hint: '',
                weightage: [],
                min: 6,
                max: 6,
                pattern: '^[1-9][0-9]{5}$',
                input_type: '2',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [
                  {
                    error_msg: '',
                    _id: '2',
                  },
                ],
                viewSequence: '7',
                information: '',
                shortKey: 'order18',
                label: '7',
              },
              {
                _id: '5f6209fed11e1971a56824db',
                order: '19',
                title: 'quest for skip logic - age group',
                hint: '',
                weightage: [],
                input_type: '3',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [
                  {
                    order: '20',
                    value: '^([1])$',
                    type: '2',
                  },
                  {
                    order: '34',
                    value: '^([2]|[3])$',
                    type: '3',
                  },
                ],
                restrictions: [
                  {
                    _id: '5f69fe367206c55fabf72a7c',
                    type: '11',
                    orders: [
                      {
                        _id: '5f69fe367206c55fabf72a7d',
                        order: '5',
                        value: '',
                      },
                    ],
                  },
                ],
                answer_option: [
                  {
                    _id: '1',
                    viewSequence: '1',
                    did: [],
                    shortKey: '',
                    name: '0-18',
                  },
                  {
                    _id: '2',
                    viewSequence: '2',
                    did: [
                      {
                        parent_option: '^([1]|[2])$',
                      },
                    ],
                    shortKey: '',
                    name: '19-40',
                  },
                  {
                    _id: '3',
                    viewSequence: '3',
                    did: [
                      {
                        parent_option: '^([3])$',
                      },
                    ],
                    shortKey: '',
                    name: '41-60',
                  },
                  {
                    _id: '4',
                    viewSequence: '4',
                    did: [
                      {
                        parent_option: '^([4])$',
                      },
                    ],
                    shortKey: '',
                    name: '60+',
                  },
                ],
                validation: [],
                viewSequence: '8',
                information: '',
                shortKey: 'order19',
                label: '8',
              },
              {
                _id: '5f620a1fd11e1971a56824f6',
                order: '20',
                title: '0-18 based question',
                hint: '',
                weightage: [],
                min: 1,
                max: 3,
                pattern: '',
                input_type: '2',
                editable: false,
                resource_urls: [],
                parent: [
                  {
                    order: '19',
                    type: '3',
                    value: '^([1])$',
                  },
                ],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [
                  {
                    error_msg: '',
                    _id: '1',
                  },
                ],
                viewSequence: '9',
                information: '',
                shortKey: 'order20',
                label: '9',
              },
              {
                _id: '5f62e28f6ab3db08fe30e88c',
                order: '21',
                title: 'restriction question - less than total',
                hint: '',
                weightage: [],
                min: 1,
                max: 3,
                pattern: '',
                input_type: '2',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [
                  {
                    _id: '5f6882febe87205a4267412b',
                    type: '3',
                    orders: [
                      {
                        _id: '5f6882febe87205a4267412c',
                        order: '14',
                        value: '',
                      },
                    ],
                  },
                ],
                answer_option: [],
                validation: [],
                viewSequence: '10',
                information: '',
                shortKey: 'order21',
                label: '10',
              },
              {
                _id: '5f62ea636ab3db08fe30e936',
                order: '22',
                title: 'looping single select - member',
                hint: '',
                weightage: [],
                input_type: '20',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [
                  {
                    _id: '1',
                    viewSequence: '1',
                    did: [],
                    shortKey: '',
                    name: '1',
                  },
                  {
                    _id: '2',
                    viewSequence: '2',
                    did: [],
                    shortKey: '',
                    name: '2',
                  },
                  {
                    _id: '3',
                    viewSequence: '3',
                    did: [],
                    shortKey: '',
                    name: '3',
                  },
                ],
                validation: [],
                viewSequence: '11',
                information: '',
                shortKey: 'order22',
                label: '11',
              },
              {
                _id: '5f697efa7206c55fabf721c8',
                order: '22.001',
                title: 'Name',
                hint: '',
                weightage: [],
                pattern: '',
                min: 1,
                max: null,
                input_type: '1',
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [],
                viewSequence: '12',
                information: '',
                shortKey: 'order22_001',
                label: '1',
              },
              {
                _id: '5f697f237206c55fabf721fd',
                order: '22.002',
                title: 'Age',
                hint: '',
                weightage: [],
                min: 1,
                max: 3,
                pattern: '^([0-9]|[1-9][0-9]|10[0-9]|110)$',
                input_type: '2',
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [
                  {
                    error_msg: '',
                    _id: '2',
                  },
                ],
                viewSequence: '13',
                information: '',
                shortKey: 'order22_002',
                label: '2',
              },
              {
                _id: '5f62ecc76ab3db08fe30e9b1',
                order: '23',
                title: 'looping multi select - member occupation',
                hint: '',
                weightage: [],
                input_type: '21',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [
                  {
                    _id: '1',
                    viewSequence: '1',
                    did: [],
                    shortKey: '',
                    name: '1',
                  },
                  {
                    _id: '2',
                    viewSequence: '2',
                    did: [],
                    shortKey: '',
                    name: '2',
                  },
                  {
                    _id: '3',
                    viewSequence: '3',
                    did: [],
                    shortKey: '',
                    name: '3',
                  },
                  {
                    _id: '4',
                    viewSequence: '4',
                    did: [],
                    shortKey: '',
                    name: '4',
                  },
                ],
                validation: [],
                viewSequence: '14',
                information: '',
                shortKey: 'order23changed',
                label: '12',
              },
              {
                _id: '5f62ed016ab3db08fe30ea6a',
                order: '23.001',
                title: 'name',
                hint: '',
                weightage: [],
                pattern: '',
                min: 1,
                max: null,
                input_type: '1',
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [],
                viewSequence: '15',
                information: '',
                shortKey: 'order23_001',
                label: '1',
              },
              {
                _id: '5f62f6026ab3db08fe30ebf3',
                order: '23.002',
                title: 'occupation',
                hint: '',
                weightage: [],
                input_type: '3',
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [
                  {
                    _id: '1',
                    viewSequence: '1',
                    did: [],
                    shortKey: '',
                    name: 'pvt',
                  },
                  {
                    _id: '2',
                    viewSequence: '2',
                    did: [],
                    shortKey: '',
                    name: 'govt',
                  },
                  {
                    _id: '3',
                    viewSequence: '3',
                    did: [],
                    shortKey: '',
                    name: 'student',
                  },
                  {
                    _id: '4',
                    viewSequence: '4',
                    did: [],
                    shortKey: '',
                    name: 'other',
                  },
                ],
                validation: [],
                viewSequence: '16',
                information: '',
                shortKey: 'order23_002',
                label: '2',
              },
              {
                _id: '5f68821043d2af5a3d123bf0',
                order: '24',
                title: 'image type question',
                hint: '',
                weightage: [],
                min: null,
                max: null,
                pattern: '',
                input_type: '7',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [],
                viewSequence: '17',
                information: '',
                shortKey: 'order24',
                label: '13',
              },
              {
                _id: '5f6b31d57d0fee7f1c960d75',
                order: '25',
                title: 'question for text type',
                hint: '',
                weightage: [],
                pattern: '',
                min: 1,
                max: null,
                input_type: '1',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [],
                viewSequence: '18',
                information: '',
                shortKey: 'order25',
                label: '14',
              },
              {
                _id: '5f6b31fa7d0fee7f1c960df2',
                order: '27',
                title: 'time type',
                hint: '',
                weightage: [],
                min: null,
                max: null,
                pattern: '',
                input_type: '28',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [],
                viewSequence: '19',
                information: '',
                shortKey: 'order27',
                label: '15',
              },
              {
                _id: '5f6b32ce7d0fee7f1c960e77',
                order: '28',
                title: 'file upload',
                hint: '',
                weightage: [],
                min: null,
                max: null,
                pattern: '',
                input_type: '11',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [
                  {
                    error_msg: '',
                    _id: '83',
                    value: 'image/png',
                  },
                  {
                    error_msg: '',
                    _id: '83',
                    value: 'image/jpg',
                  },
                  {
                    error_msg: '',
                    _id: '83',
                    value: 'image/jpeg',
                  },
                  {
                    error_msg: '',
                    _id: '83',
                    value: 'application/pdf',
                  },
                  {
                    error_msg: '',
                    _id: '81',
                    value: '5120',
                  },
                  {
                    error_msg: '',
                    _id: '82',
                    value: '4',
                  },
                ],
                viewSequence: '20',
                information: '',
                shortKey: 'order28',
                label: '16',
              },
              {
                _id: '5f6c249d7d0fee7f1c9610e7',
                order: '29',
                title: 'date future',
                hint: '',
                weightage: [],
                input_type: '14',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [
                  {
                    _id: '21',
                    error_msg: '',
                  },
                ],
                viewSequence: '21',
                information: '',
                shortKey: 'order29',
                label: '17',
              },
              {
                _id: '5f6c24c97d0fee7f1c96112d',
                order: '30',
                title: 'date future or present',
                hint: '',
                weightage: [],
                input_type: '14',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [
                  {
                    _id: '22',
                    error_msg: '',
                  },
                ],
                viewSequence: '22',
                information: '',
                shortKey: 'order30',
                label: '18',
              },
              {
                _id: '5f6c24d67d0fee7f1c961176',
                order: '31',
                title: 'date past',
                hint: '',
                weightage: [],
                input_type: '14',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [
                  {
                    _id: '23',
                    error_msg: '',
                  },
                ],
                viewSequence: '23',
                information: '',
                shortKey: 'order31',
                label: '19',
              },
              {
                _id: '5f6c24e47d0fee7f1c9611c2',
                order: '32',
                title: 'date past or present',
                hint: '',
                weightage: [],
                input_type: '14',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [
                  {
                    _id: '24',
                    error_msg: '',
                  },
                ],
                viewSequence: '24',
                information: '',
                shortKey: 'order32',
                label: '20',
              },
              {
                _id: '5f6c24f57d0fee7f1c961211',
                order: '33',
                title: 'date present',
                hint: '',
                weightage: [],
                input_type: '14',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [
                  {
                    _id: '25',
                    error_msg: '',
                  },
                  {
                    _id: '3',
                    error_msg: '',
                  },
                ],
                viewSequence: '25',
                information: '',
                shortKey: 'order33',
                label: '21',
              },
              {
                _id: '5f6c8c54d24b8332e2291da9',
                order: '34',
                title: 'Year - multiple parent OR',
                hint: '',
                weightage: [],
                input_type: '3',
                editable: false,
                resource_urls: [],
                parent: [
                  {
                    order: '5',
                    type: '3',
                    value: '^([2]|[4])$',
                  },
                  {
                    order: '19',
                    type: '3',
                    value: '^([2]|[3])$',
                  },
                ],
                child: [],
                restrictions: [],
                answer_option: [
                  {
                    _id: '1',
                    viewSequence: '1',
                    did: [],
                    shortKey: '',
                    name: '1',
                  },
                  {
                    _id: '2',
                    viewSequence: '2',
                    did: [],
                    shortKey: '',
                    name: '2',
                  },
                  {
                    _id: '3',
                    viewSequence: '3',
                    did: [],
                    shortKey: '',
                    name: '3',
                  },
                  {
                    _id: '4',
                    viewSequence: '4',
                    did: [],
                    shortKey: '',
                    name: '4',
                  },
                ],
                validation: [
                  {
                    _id: '6',
                    error_msg: '',
                  },
                ],
                viewSequence: '26',
                information: '',
                shortKey: 'order34',
                label: '22',
              },
              {
                _id: '5f716ea8d972e134414cb6f5',
                order: '35',
                title: 'all must be selected - val33',
                hint: '',
                weightage: [],
                input_type: '6',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [
                  {
                    _id: '1',
                    viewSequence: '1',
                    did: [],
                    shortKey: '',
                    name: 'Choice 1',
                  },
                  {
                    _id: '2',
                    viewSequence: '2',
                    did: [],
                    shortKey: '',
                    name: 'Choice 2',
                  },
                  {
                    _id: '3',
                    viewSequence: '3',
                    did: [],
                    shortKey: '',
                    name: 'Choice 3',
                  },
                  {
                    _id: '4',
                    viewSequence: '4',
                    did: [],
                    shortKey: '',
                    name: 'Choice 4',
                  },
                ],
                validation: [
                  {
                    _id: '33',
                    error_msg: '',
                    value: '2',
                  },
                ],
                viewSequence: '27',
                information: '',
                shortKey: 'order35',
                label: '23',
              },
              {
                _id: '5f716ec1d972e134414cb74d',
                order: '36',
                title: 'limited must be selected - val32',
                hint: '',
                weightage: [],
                input_type: '6',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [
                  {
                    _id: '1',
                    viewSequence: '1',
                    did: [],
                    shortKey: '',
                    name: 'Choice 1',
                  },
                  {
                    _id: '2',
                    viewSequence: '2',
                    did: [],
                    shortKey: '',
                    name: 'Choice 2',
                  },
                  {
                    _id: '3',
                    viewSequence: '3',
                    did: [],
                    shortKey: '',
                    name: 'Choice 3',
                  },
                  {
                    _id: '4',
                    viewSequence: '4',
                    did: [],
                    shortKey: '',
                    name: 'Choice 4',
                  },
                ],
                validation: [
                  {
                    _id: '32',
                    error_msg: '2',
                  },
                ],
                viewSequence: '28',
                information: '',
                shortKey: 'order36',
                label: '24',
              },
              {
                _id: '5f8d7c1831945f6e3b473ead',
                order: '37',
                title: 'village',
                hint: '',
                weightage: [],
                input_type: '3',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [
                  {
                    _id: '6064b4be948d3e7bc9f3c649',
                    type: '11',
                    orders: [
                      {
                        _id: '6064b4be948d3e7bc9f3c64a',
                        order: '38',
                        value: '',
                      },
                    ],
                  },
                ],
                answer_option: [
                  {
                    _id: '5f87eb16259e87212ed9d0a6',
                    viewSequence: '1',
                    did: [
                      {
                        parent_option:
                          '^(5e59fc232a5e8107e05e83d5|5ec2ac4296314f5b19b16fa2|5f87ea77259e87212ed9d09f|5f87eae5259e87212ed9d0a1)$',
                      },
                    ],
                    shortKey: 'V1',
                    name: 'B1 - GP1 - V1',
                  },
                  {
                    _id: '5f87eb16259e87212ed9d0a8',
                    viewSequence: '1',
                    did: [
                      {
                        parent_option:
                          '^(5e59fc232a5e8107e05e83d5|5ec2ac4296314f5b19b16fa2|5f87ea77259e87212ed9d09f|5f87eae5259e87212ed9d0a1)$',
                      },
                    ],
                    shortKey: 'V5',
                    name: 'B1 - GP1 - V5',
                  },
                  {
                    _id: '5f87eb168d582a21332d52a6',
                    viewSequence: '1',
                    did: [
                      {
                        parent_option:
                          '^(5e59fc232a5e8107e05e83d5|5ec2ac4296314f5b19b16fa2|5f87ea77259e87212ed9d09f|5f87eae58d582a21332d52a0)$',
                      },
                    ],
                    shortKey: 'V6',
                    name: 'B1 - GP2 - V6',
                  },
                ],
                validation: [],
                viewSequence: '29',
                information: '',
                shortKey: 'order37',
                label: '25',
              },
              {
                _id: '5f92afd043387532a03299d9',
                order: '38',
                title: 'block',
                hint: '',
                weightage: [],
                input_type: '3',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [
                  {
                    _id: '5fbb5130e0d0c428c72e4a64',
                    type: '11',
                    orders: [
                      {
                        _id: '5fbb5130e0d0c428c72e4a65',
                        order: '37',
                        value: '',
                      },
                    ],
                  },
                ],
                answer_option: [
                  {
                    _id: '5f87ea77259e87212ed9d09f',
                    viewSequence: '1',
                    did: [
                      {
                        parent_option:
                          '^(5e59fc232a5e8107e05e83d5|5ec2ac4296314f5b19b16fa2)$',
                      },
                    ],
                    shortKey: 'B11',
                    name: 'UP - D1 - B1',
                  },
                ],
                validation: [],
                viewSequence: '30',
                information: '',
                shortKey: 'order38',
                label: '26',
              },
              {
                _id: '6062baa12593ae5edeab9252',
                order: '39',
                title: 'name from form1',
                hint: '',
                weightage: [],
                pattern: '',
                min: 1,
                max: null,
                input_type: '1',
                editable: false,
                resource_urls: [],
                parent: [],
                child: [],
                restrictions: [],
                answer_option: [],
                validation: [],
                viewSequence: '1',
                information: '',
                shortKey: 'order39',
                label: '1',
              },
            ],
            buttons: [],
          },
        ],
        groupOrder: 37,
        createDynamicOption: [],
        getDynamicOption: [],
      },
    ],
  };
  @Input() buttonText: string = 'Submit';
  @Input() showFormChange: boolean = false;
  // @Input() showProjectDetailsComp: boolean = false;
  @Input() formTitle: any = 'Web Form';
  @Input() formDescription: any = '';
  @Output() submitQuestion: EventEmitter<any> = new EventEmitter<any>();
  @Input() isViewMode: boolean = false;
  questionData: any = [];
  selectedOptions: any = [];
  cloneAnswerOption: any = [];
  searchedText = '';
  selectedQuestion: any;
  filterChildQuestOfExternalAPICall: any = [];
  isLoading = true;
  imagesExtension = ['png', 'jpg', 'jpeg'];

  ngOnInit() {
    // console.log("question", this.questionresponse);
    // this.processQuestion(this.questionresponse)
    // this.getDistrictData();
    // if(typeof this.showSubmitButton == 'string'){
    //   let showSubmitButton = this.showSubmitButton.toLowerCase();
    //   if(showSubmitButton == 'true' || showSubmitButton == 'yes'){
    //     this.showSubmitButton = true;
    //   }else{
    //     this.showSubmitButton = false;
    //   }
    // }
    if (
      this.isViewMode &&
      this.viewFormTemplate != 'template1' &&
      this.viewFormTemplate != 'template2' &&
      this.viewFormTemplate != 'template3'
    ) {
      this.viewFormTemplate = 'template2';
    }
    if(this.questionresponse && typeof this.questionresponse != 'object'){
      this.questionresponse = JSON.parse(this.questionresponse);
    }
    // this.processQuestion(
    //   JSON.parse(JSON.stringify(this.questionresponse)),
    //   false
    // );
  }

  ngOnChanges(changes:SimpleChanges){
    console.log('ngOnChanges', changes);
    let temp = ["enableEditMode", "showPreviewAnswer", "showFormChange", "isViewMode","showSubmitButton", "isFormSubmittedSuccessfully" ];
    temp.forEach((el:any) => {
      let self:any = this;
      if(changes && changes[el] && changes[el].currentValue){
        let value = changes[el].currentValue;
        console.log('editMode', value)
        if(typeof value == 'string'){
          value = value.trim();
          if (value.toLowerCase() == 'true' || value.toLowerCase() == 'yes') {
            self[el] = true;
        } else {
          self[el] = false;
        }
        console.log("enableEditMode", this.enableEditMode);
      }
      }
    })
    // if(changes && changes.enableEditMode && changes.enableEditMode.currentValue){
    //   let editMode = changes.enableEditMode.currentValue;
    //   console.log('editMode', editMode)
    //   if(typeof editMode == 'string'){
    //     if (editMode.toLowerCase() == 'true' || editMode.toLowerCase() == 'yes') {
    //       this.enableEditMode = true;
    //     } else {
    //       this.enableEditMode = false;
    //     }
    //     console.log("enableEditMode", this.enableEditMode);
    //   }
    // }

    if(changes && changes.questionresponse && changes.questionresponse.currentValue){
      this.questionresponse = changes.questionresponse.currentValue;
      console.log("typeOF",typeof this.questionresponse);
      if(this.questionresponse && typeof this.questionresponse != 'object'){
        this.questionresponse = JSON.parse(this.questionresponse);
      }
      console.log("parse data",this.questionresponse);
      this.processQuestion(
        JSON.parse(JSON.stringify(this.questionresponse)),
        true
      );
    }
  }

  onFocusEvent(questionOrder: string) {
    this.commonService.onFocusEvent(questionOrder);
    // let focusElement = document.getElementById(questionOrder);
    // const randomString = Math.random().toString(36).slice(-6);
    // focusElement.setAttribute('name', randomString);
    // focusElement.setAttribute('autocomplete', randomString);
  }

  processQuestion(response: any, direct = false) {
    // $(document).ready(function(){
    //   console.log('called 1st tym')
    //   $("input").attr("autocomplete", "disabled");
    // });
    let questionData: any = {
      question: [],
      title: '',
    };
    if (!direct) {
      response.data[0].language.forEach((element: any) => {
        element.question.map((question: any) => (question.selectedValue = ''));
      });
      questionData = response.data[0].language.find(
        (item: any) => item.lng == this.language
      );
    } else {
      questionData.question = response;
    }
    // console.log("this.language", this.language);
    // response.data[0].map((question) => (question.selectedValue = ""));

    // console.log('response.data[0]', response.data[0])
    // let questionData = response.data[0].find(
    //   (item) => item.lng == this.language
    // );

    const imgValidation = [
      {
        error_msg: '',
        _id: '83',
        value: 'image/png',
      },
      {
        error_msg: '',
        _id: '83',
        value: 'image/jpg',
      },
      {
        error_msg: '',
        _id: '83',
        value: 'image/jpeg',
      },
      // {
      // "error_msg": "",
      // "_id": "83",
      // "value": "application/pdf"
      // },
      {
        error_msg: '',
        _id: '81',
        value: '5120',
      },
      {
        error_msg: '',
        _id: '82',
        value: '4',
      },
    ];

    const imageAdditionalValidation = [
      {
        error_msg: '',
        _id: '81',
        value: '5120',
      },
      {
        error_msg: '',
        _id: '82',
        value: '4',
      },
    ];
    if (questionData) {
      //just for test start
      // questionData.question = [
      //   {
      //     title: "ABC",
      //     input_type: "1",
      //     shortKey: "abc",
      //     order: "1",
      //   },
      //   {
      //     title: "ABC2245",
      //     input_type: "1",
      //     shortKey: "abc",
      //     order: "12",
      //   },
      //   {
      //     title: "ABC2123",
      //     input_type: "1",
      //     shortKey: "abc",
      //     order: "123",
      //   },
      //   {
      //     title: "ABC223",
      //     input_type: "1",
      //     shortKey: "abc",
      //     order: "124",
      //   },
      //   {
      //     title: "ABC2325",
      //     input_type: "1",
      //     shortKey: "abc",
      //     order: "1255",
      //   },
      //   {
      //     title: "ABC22454",
      //     input_type: "1",
      //     shortKey: "abc",
      //     order: "124",
      //   },
      //   {
      //     title: "ABC21233",
      //     input_type: "1",
      //     shortKey: "abc",
      //     order: "1233",
      //   },
      //   {
      //     title: "ABC2232",
      //     input_type: "1",
      //     shortKey: "abc",
      //     order: "1242",
      //   },
      //   {
      //     title: "ABC2321",
      //     input_type: "1",
      //     shortKey: "abc",
      //     order: "1251",
      //   },
      // ];

      // questionData.question = response.data[0]
      //test end
      const defaultValidation: any[] = [];
      questionData.question = questionData.question.map((item: any) => ({
        ...item,
        value: item.value ? item.value : item.modelValue,
        resource_urls: item.resource_urls ? item.resource_urls : [],
        parent: item.parent ? item.parent : [],
        child: item.child ? item.child : [],
        restrictions: item.restrictions ? item.restrictions : [],
        answer_option: item.answer_option ? item.answer_option : [],
        validation:
          item.input_type == '11'
            ? [...imageAdditionalValidation, ...item.validation]
            : item.validation
            ? item.validation
            : defaultValidation,
        // validation: item.input_type == '11' ? imgValidation : (item.validation ? item.validation : defaultValidation),
        // validation: item.validation ? item.validation : defaultValidation,
        acceptableType:
          item.input_type == '11'
            ? this.getFileType(item)['allowedFileType']
            : '',
        acceptableFileType:
          item.input_type == '11'
            ? this.getFileType(item)['allowedFileTypeList']
            : '',
      }));

      this.questionData = setInitialQuestions(questionData.question);
      this.questionData = this.questionData.map(
        (question: any, index: number) => {
          return getTitleProps(question, index);
        }
      );

      // call external api if validation 126.1 exists
      let filterExternalCallAPIQuestions = [];
      filterExternalCallAPIQuestions = this.questionData.filter(
        (ques: any) =>
          (!ques.restrictions || ques.restrictions.length == 0) &&
          ques &&
          ques.validation &&
          ques.validation.find(
            (validation: any) => validation._id == VALIDATION.CALL_EXTERNAL_API
          )
      );
      console.log(
        'filterExternalCallAPIQuestions',
        filterExternalCallAPIQuestions
      );
      if (filterExternalCallAPIQuestions.length > 0) {
        for (const option of filterExternalCallAPIQuestions) {
          console.log('option', option)
          let findExternalCallValidation = option.validation.find(
            (validation: any) => validation._id == VALIDATION.CALL_EXTERNAL_API
          );
          const apiEndPoint = findExternalCallValidation
            ? findExternalCallValidation?.value.substring(1)
            : '';
          let questionIndex = this.questionData.findIndex(
            (item: { order: string }) => item.order == option?.order
          );
          this.commonService
            .getAnswerOptionList({}, apiEndPoint)
            .then((res: any) => {
              if (res && res.status) {
                this.questionData[questionIndex]['answer_option'] = res.data;
              }
            })
            .catch((error: any) => {
              console.log('external Call error', error);
            });
        }
      }
      this.filterChildQuestOfExternalAPICall = [];
      this.filterChildQuestOfExternalAPICall = this.questionData.filter(
        (d: any) =>
          d.restrictions.some(
            (restri: any) =>
              restri.type == RESTRICTION.PARAMS_FOR_THIRD_PARTY_CALL
          ) &&
          d &&
          d.validation &&
          d.validation.find(
            (validation: any) => validation._id == VALIDATION.CALL_EXTERNAL_API
          )
      );
      // end
      if (this.enableEditMode) {
        /**
         * this is trigger in edit mode. here we are accessing the child data from total question
         * and then looping over each question of parent data (if available) to find the exact match
         * if exact object matched then we set visibility to true because creation time we submitted
         * data for 'did' question. if not matched then we clear the previous selected value so that when
         * user select other option then data must not be show selected
         * **/
        this.setVisibility(true);
        if (this.filterChildQuestOfExternalAPICall.length > 0) {
          let filterMatchedOrderQues: any[] = [];
          for (const temp of this.filterChildQuestOfExternalAPICall) {
            for (const res of temp.restrictions) {
              for (const orderName of res.orders) {
                filterMatchedOrderQues = [
                  ...filterMatchedOrderQues,
                  ...this.questionData.filter(
                    (ordr: any) => ordr.order == orderName.order
                  ),
                ];
              }
            }
          }
          if (filterMatchedOrderQues.length > 0) {
            for (const ques of filterMatchedOrderQues) {
              this.getChildQuesAnsOptionByExternalAPICall(
                JSON.parse(JSON.stringify(ques))
              );
            }
          }
        }
        // restriction 11 type question visibility on edit
        let restrictedQuestion = this.questionData.filter(
          (item: any) => item.restrictions && item.restrictions.length
        );
        for (const item of restrictedQuestion) {
          if (item.restrictions.some((type: any) => type.type == '11')) {
            let restrict11 = item.restrictions.find(
              (resType: any) => resType.type == '11'
            );
            for (const res of restrict11.orders) {
              let findObj = this.questionData.find(
                (result: any) => result.order == res.order
              );
              // console.log('final Data', findObj, {target: {value: findObj.modelValue}})
              if (findObj) {
                this.onChange(findObj, {
                  target: { value: findObj.modelValue },
                });
              }
            }
          }
        }
        // restriction 11 type question visibility on edit end
      } else {
        this.setVisibility(true);
      }
      this.formtitle = questionData.title;
      console.log('questionData', this.questionData);
      const isStateOrderExist = this.questionData.find(
        (ques: any) => ques.order == 'state'
      );
      if (isStateOrderExist) {
        this.getDistrictData();
      }

      let passwordQuesIndex = this.questionData.findIndex(
        (item: any) => item.order == 'password'
      );
      let confirmPasswordIndex = this.questionData.findIndex(
        (item: any) => item.order == 'confirmPassword'
      );
      if (passwordQuesIndex > -1 || confirmPasswordIndex > -1) {
        this.questionData[passwordQuesIndex]['isPassword'] = true;
        this.questionData[confirmPasswordIndex]['isPassword'] = true;
        this.questionData[passwordQuesIndex]['passwordMode'] = true;
        this.questionData[confirmPasswordIndex]['passwordMode'] = true;
      }
    }
  }

  setVisibility(isStateDropdownChanges: boolean = false) {
    /**
     * this is trigger in edit mode. here we are accessing the child data from total question
     * and then looping over each question of parent data (if available) to find the exact match
     * if exact object matched then we set visibility to true because creation time we submitted
     * data for 'did' question. if not matched then we clear the previous selected value so that when
     * user select other option then data must not be show selected
     * **/
    let childOptionValue = [];
    childOptionValue = this.questionData.filter(
      (item: any) => item.child && item.child.length > 0
    );
    console.log('childOptionValue', childOptionValue);
    for (const item of this.questionData) {
      if (item.parent && item.parent.length) {
        console.log('parent', item.parent);
        for (const option of childOptionValue) {
          console.log('else if called', option, option.title, option.value);
          if (!item.visibility) {
            for (const data of item.parent) {
              console.log('data', data);
              if (option.order == data.order) {
                if (Array.isArray(option.value)) {
                  console.log('if called');
                  option.value.forEach((regexOption: any) => {
                    if (new RegExp(data.value).test(regexOption)) {
                      item['visibility'] = true;
                    }
                  });
                } else if (new RegExp(data.value).test(option.value)) {
                  console.log(
                    'else if called',
                    data.value,
                    option.value,
                    new RegExp(data.value).test(option.value)
                  );
                  item['visibility'] = true;
                }
              }
              // else {
              //   item['selectedValue'] = []
              //   item['value'] = [];
              //   item['selectedOptions'] = '';
              //   item['modelValue'] = '';
              //   item['answer_option'].forEach(answerOption => {
              //     answerOption['checked'] = false;
              //   })
              // }
            }
          }
        }
      }
      if (isStateDropdownChanges) {
        if (item && item.order == 'state') {
          let districtOrderIndex = this.questionData.findIndex(
            (item: { order: string }) => item.order == 'district'
          );
          // console.log('districtOrderIndex', districtOrderIndex)
          let stateObject = this.questionData.find(
            (item: { order: string }) => item.order == 'state'
          );
          // console.log('stateObject', stateObject)
          if (districtOrderIndex > -1) {
            // this.questionData[districtOrderIndex]['selectedValue'] = [];
            // this.questionData[districtOrderIndex]['modelValue'] = '';
            // this.questionData[districtOrderIndex]['value'] = '';
            this.questionData[districtOrderIndex]['answer_option'] =
              this.getFilterDistrict(stateObject.modelValue);
          }
        }
      }
    }
  }

  cleanNonVisibleQuestionValues() {
    for (const item of this.questionData) {
      if (!item.visibility) {
        item['selectedValue'] = [];
        item['value'] = [];
        item['selectedOptions'] = '';
        item['modelValue'] = '';
        item['answer_option'].forEach((answerOption: any) => {
          answerOption['checked'] = false;
        });
      }
    }
  }

  getFileType(question: any) {
    console.log('getFileType', question);
    if (question && question.validation && question.validation.length) {
      return {
        allowedFileType: question?.validation
          .filter((filterItem: any) => filterItem?.value)
          .map((mapItem: any) => mapItem?.value)
          .join(', '),
        allowedFileTypeList: question?.validation
          .filter((filterItem: any) => filterItem?.value)
          .map((mapItem: any) => mapItem?.value),
      };
      // return question?.validation.filter(filterItem => filterItem?.value).map(mapItem => mapItem?.value).join(', ');
    } else {
      return {};
    }
  }

  getData(value: any, question: any) {
    console.log('value', value, question);
  }

  async submitForm() {
    this.isFormSubmittedSuccessfully = true;
    const defaultAnswer = [{ label: '', textValue: '', value: '' }];
    let sendResponse = this.questionData.map((item: any) => ({
      // answer: [{ label: item.answer_option && item.answer_option.find(option => option._id == item.selectedValue) ? item.answer_option.find(option => option._id == item.selectedValue).name : '', textValue: item.answer_option && item.answer_option.length ? '' : item.selectedValue, value: item.answer_option && item.answer_option.length ? item.selectedValue : '' }],
      answer:
        item.visibility && item.selectedValue
          ? item.selectedValue
          : defaultAnswer,
      input_type: item.input_type,
      nestedAnswer: [],
      order: item.order,
      pattern: item.pattern,
    }));
    console.log('sendResponse', sendResponse);

    const filterInvalidEnterAnswer = this.questionData.filter(
      (answer: any) => answer.errorMessage
    );
    console.log('filterInvalidEnterAnswer', filterInvalidEnterAnswer);
    let emptyError: any = [];
    await submitForm(false, this.questionData).then((value) => {
      emptyError = value.filter((item:any | { visibility: any; }) => item.visibility);
    });
    console.log('emptyError', emptyError);
    if (emptyError.length > 0) {
      this.isFormSubmittedSuccessfully = false;
      for (const error of emptyError) {
        let errorIndex = this.questionData.findIndex(
          (item: { order: any }) => item.order == error.order
        );
        if (errorIndex > -1) {
          this.questionData[errorIndex]['errorMessage'] =
            'This is a required field';
        }
      }
      let errorElement: HTMLElement | null = document.getElementById(
        emptyError[0].order
      );
      // console.log('errorElement', errorElement)
      if (errorElement) {
        errorElement.focus();
      }
      // const dialogRef = this.dialog.open(PendingListDialogComponent, {
      //   panelClass: "modal-md",
      //   // height: "400px",
      //   width: "50%",
      //   data: { title: "Pending List", pendingList: emptyError },
      // });
      // dialogRef.afterClosed().subscribe((response) => {
      //   console.log("response", response);
      // });
    } else if (filterInvalidEnterAnswer.length > 0) {
      this.isFormSubmittedSuccessfully = false;
    }

    if (emptyError.length == 0 && filterInvalidEnterAnswer.length == 0) {
      console.log({
        question: this.questionData,
        finalData: sendResponse,
      });
      this.submitQuestion.emit({
        question: this.questionData,
        finalData: sendResponse,
      });
      console.log('question', this.questionData, emptyError);
      this.isFormSubmittedSuccessfully = false;
    }
    // this.submitQuestion.emit({ question: this.questionData});
    console.log('question', this.questionData, emptyError);
  }

  completedLenegth() {
    let completedCount = this.questionData.filter(
      (item: any) => item.selectedValue && item.selectedValue.length
    ).length;
    let totalLength = this.questionData.length;
    let completedText = `Completed ${completedCount} out of ${totalLength}`;
    return completedText;
  }

  onChange(question: any, value: any = {}, option: any = {}, skip = false) {
    console.log('this.cloneAnswerOption', this.cloneAnswerOption);
    if (this.cloneAnswerOption.length > 0) {
      question.value = [
        ...new Set([...question.value, ...this.selectedQuestion.value]),
      ];
      question.selectedValue = [
        ...question.selectedValue,
        ...this.selectedQuestion.selectedValue,
      ];
      let ids = new Set(this.cloneAnswerOption.map((d: any) => d._id));
      let mergedAnswerOption = [
        ...this.cloneAnswerOption,
        ...question?.answer_option.filter((d: any) => !ids.has(d._id)),
      ];
      question['answer_option'] = mergedAnswerOption;
    }
    // console.log("mergedAnswerOption", question,);

    if (question && question.order == 'state') {
      let districtOrderIndex = this.questionData.findIndex(
        (item: any) => item.order == 'district'
      );
      console.log('districtOrderIndex', districtOrderIndex);
      if (districtOrderIndex > -1) {
        this.questionData[districtOrderIndex]['selectedValue'] = [];
        this.questionData[districtOrderIndex]['modelValue'] = '';
        this.questionData[districtOrderIndex]['value'] = '';
        this.questionData[districtOrderIndex]['answer_option'] =
          this.getFilterDistrict(question.modelValue);
      }
    }

    let nestedConfig: any = question.hasOwnProperty('nestedConfig')
      ? question.nestedConfig
      : {};
    let allQuestion = this.questionData;

    let selectedValue: any = [];
    let questionValue;
    /* if user selected the value from dropdown then set isSelectValue  to true other wise false
     * this condition is used for the did type question where based on parent selected value
     * we remove/disabled the child question value.
     */
    question['isSelectValue'] = value?.target?.isSelected
      ? value?.target?.isSelected
      : false;
    if (!skip) {
      question.previousValue = question.modelValue ? question.modelValue : '';
      // value.value is used in case of radio option and value.checked is used for checkbox
      question.modelValue = option.hasOwnProperty('_id')
        ? value.value
          ? value.value
          : value.checked
        : value.target.value.trim();
      questionValue = option.hasOwnProperty('_id')
        ? { checked: value.checked, value: option._id }
        : question.modelValue;

      if (question.modelValue) {
        console.log('if called 1');
        selectedValue = [
          {
            label:
              question.answer_option &&
              question.answer_option.find(
                (option: any) => option._id == question.modelValue
              )
                ? question.answer_option.find(
                    (option: any) => option._id == question.modelValue
                  ).name
                : '',
            textValue:
              question.input_type == '2'
                ? ''
                : question.answer_option && question.answer_option.length
                ? ''
                : question.modelValue,
            value:
              question.input_type == '2'
                ? question.modelValue
                : question.answer_option && question.answer_option.length
                ? question.modelValue
                : '',
          },
        ];
      } else {
        console.log('else called ');
        if (question && question.input_type == '5') {
          let radioOption = question.answer_option.find(
            (item: any) => item._id == value.value
          );
          selectedValue = [
            {
              label: radioOption.name,
              textValue: '',
              value: radioOption._id,
            },
          ];
        } else {
          console.log('else else called ', question.answer_option);
          selectedValue = question.answer_option
            .filter((item: any) => item.checked)
            .map((option: any) => ({
              label: option.name,
              textValue: '',
              value: option._id,
            }));
        }
      }
      console.log('selectedValue', selectedValue);
      question.selectedValue = selectedValue;
    } else {
      questionValue = value;
    }

    let valueUpdate = validateTextInputValueByValidationAndRestrictions(
      questionValue,
      {
        questions: allQuestion,
        order: question.order,
        prevValue: question.previousValue,
        nestedConfig,
      }
    );
    console.log('valueUpdate', valueUpdate);

    let updatedQuestion = questionInputChange(
      questionValue,
      question,
      allQuestion,
      {},
      nestedConfig
    );
    console.log('rest', updatedQuestion);
    // question = updatedQuestion.updatedQuestion;
    question = JSON.parse(JSON.stringify(updatedQuestion.updatedQuestion));

    question.errorMessage =
      valueUpdate && valueUpdate[1] ? valueUpdate[1].message : '';
    if (!List.isList(updatedQuestion.questions))
      updatedQuestion.questions = List(updatedQuestion.questions);
    if (updatedQuestion.errors && updatedQuestion.errors.length)
      this.openSnackBar([updatedQuestion.errors[0].message], 2000);
    this.questionData = updatedQuestion.questions.toJS();
    // document.getElementById(focucId).scrollIntoView();
    let questionIndex = this.questionData.findIndex(
      (item: any) => item.order == question.order
    );
    // this.questionData[questionIndex] = { ...question };

    /* this condition is used for the did type question where based on parent selected value
     * we remove/disabled the child question value. after final updation we set the value to false
     */
    question['isSelectValue'] = false;
    this.questionData[questionIndex] = JSON.parse(
      JSON.stringify({ ...question })
    );
    // return;
    this.cleanNonVisibleQuestionValues();
    if (
      updatedQuestion.updatedQuestion &&
      updatedQuestion.updatedQuestion.input_type == '4'
    ) {
      this.expanded = false;
      this.questionData[questionIndex]['selectedOptions'] =
        updatedQuestion.updatedQuestion.selectedValue.length > 1
          ? `${question.selectedValue[0].label}...+ ${
              question.selectedValue.length - 1
            } more`
          : updatedQuestion.updatedQuestion.selectedValue.length == 1
          ? question.selectedValue[0].label
          : '';
      // this.showCheckboxes(updatedQuestion.updatedQuestion.order);
    }
    if (this.cloneAnswerOption.length > 0) {
      this.cloneAnswerOption = [];
      this.getFilterAnswerOption(
        this.searchedText,
        updatedQuestion.updatedQuestion
      );
    }

    if (this.filterChildQuestOfExternalAPICall.length > 0) {
      this.getChildQuesAnsOptionByExternalAPICall(
        JSON.parse(JSON.stringify(question))
      );
    }

    // let questionData = this.questionData
    // this.questionData = []

    // this.questionData.forEach(question => {
    //   if( question.childQuestionData){
    //     question.childQuestionData.map((value, idx) => {
    //       value.map(
    //         (child, index) =>
    //           child.visibility && ({...child, nestedConfig:{
    //             parentOrder: question.order,
    //             index,
    //             loopIndex: idx
    //           }
    //           }))
    //     })

    //    }
    // });
    // this.questionData = updatedQuestion.questions.toJS()
    // this.questionData = this.questionData.map(item => {
    //   return {
    //     ...item,
    //     ...item.childQuestions &&{childQuestionData: item.childQuestionData && item.childQuestionData.toJS()}
    //   }
    // })

    // check if questions has order = password and confirmPassword
    let passwordQuesIndex = this.questionData.findIndex(
      (item: any) => item.order == 'password'
    );
    if (
      question.order == 'confirmPassword' &&
      this.questionData[passwordQuesIndex].modelValue
    ) {
      if (
        question.modelValue != this.questionData[passwordQuesIndex].modelValue
      ) {
        const errorMsg = 'Password & Confirm Password must be same';
        this.questionData[questionIndex]['errorMessage'] =
          question && question.hint ? question.hint : errorMsg;
      } else {
        this.questionData[questionIndex]['errorMessage'] = '';
      }
    }
    // check if questions has order = password and confirmPassword end

    /** to check the prefix value in required question (validation type = 190.1) */
    if (question.hasOwnProperty('addPrefixInsideField')) {
      this.checkPrefixValueValidation(JSON.parse(JSON.stringify(question)));
    }

    this.evaluateEquation(question);
    console.log('questionData here', this.questionData);
  }

  // questionChildData(question){
  //      if( question.childQuestionData){
  //       question.childQuestionData = question.childQuestionData.toJS().map((value, idx) => {
  //         value.map(
  //           (child, index) =>
  //             child.visibility && ({...child, nestedConfig:{
  //               parentOrder: question.order,
  //               index,
  //               loopIndex: idx
  //             }
  //             }))
  //       })

  //      }
  //      console.log("qqqq", question.childQuestionData)
  //      return question.childQuestionData
  // }

  checkBoxSwitch(questionType: any) {
    return [
      QUESTION_TYPE.MULTI_SELECT_CHECKBOX,
      QUESTION_TYPE.NESTED_TWO,
    ].includes(questionType);
  }

  imageInputClickHandler(event: any, question: any) {
    document.getElementById(question.order)?.click();
  }

  openSnackBar(data: string[], duration: any) {
    this.snackBar.openFromComponent(SnackBarComponent, { data, duration });
  }

  async docsInputChangeHandler(event: any, question: any) {
    // this.openSnackBar(['Uploading Image...'], 5000);
    console.log('docsInputChangeHandler', event, question);
    if (question.hasOwnProperty('acceptableType')) {
      var mimeType = event.target.files[0].type;
      if (!question?.acceptableFileType.includes(mimeType)) {
        this.openSnackBar(
          [
            FILETYPE_EXT_ERROR_MSG[mimeType]
              ? FILETYPE_EXT_ERROR_MSG[mimeType]
              : FILETYPE_EXT_ERROR_MSG['defaultMessage'],
          ],
          4000
        );
        return false;
      }
      // if (!mimeType.match(/image\/*/)) {
      //   this.openSnackBar(['Invalid file. Only image files could be uploaded.'], 3000);
      //   return false;
      // }
    }
    let questionValue: any = [];
    questionValue = [
      {
        type: event.target.files[0].type,
        label: event.target.files[0].name,
        file: event.target.files,
      },
    ];
    // console.log('questionValue', questionValue)
    if (question.value) questionValue.push(...question.value);
    // console.log("file", questionValue, question);
    this.onChange(
      question,
      [
        {
          type: event.target.files[0].type,
          label: event.target.files[0].name,
          file: event.target.files,
        },
      ],
      {},
      true
    );
    let imageQuestionValue = [
      {
        type: event.target.files[0].type,
        label: event.target.files[0].name,
        file: event.target.files,
      },
    ];
    this.setDocuments(imageQuestionValue, question, event);
    return true;
  }
  onChangeForm() {
    console.log('formId', this.formId);
    this.commonService
      .getFormDetails(this.formId, this.language)
      .then(async (response: any) => {
        this.processQuestion(response);
      })
      .catch((response:any) => {
        console.log('response', response);
      });
  }

  async setDocuments(imgObject: any, question: any, event: any) {
    console.log('setDocuments', imgObject);
    console.log('setDocuments question', question);
    // this.isImageUploading = true;
    try {
      let response = await this.commonService.uploadTos3(
        imgObject[0].label,
        imgObject[0].type,
        imgObject[0].file[0].size,
        event,
        true
      );
      console.log('file upload parent response', response);
      if (response && response['success']) {
        this.isImageUploading = true;
        let questionValue: any = [
          {
            type: imgObject[0].type,
            label: imgObject[0].label,
            file: imgObject[0].file,
            value: response['data'][0]['file_url'],
          },
        ];
        console.log('questionValue', questionValue);
        let prepareImageObject = [
          {
            label: '',
            textValue: '',
            value: response['data'][0]['file_url'],
          },
        ];
        question['selectedValue'] = prepareImageObject;
        question['imgUrl'] = response['data'][0]['file_url'];
        try {
          let imageResponse = await this.commonService.getImageUrl(
            response['data'][0]['url'],
            imgObject[0].file[0]
          );

          let questionIndex = this.questionData.findIndex(
            (item: any) => item.order == question.order
          );
          // if (question['value']) {
          //   question['value'][0]['value'] = response['data'][0]['file_url'];
          //   this.questionData[questionIndex]['selectedValue'] = prepareImageObject;
          //   this.questionData[questionIndex]['imgUrl'] = response['data'][0]['file_url'];
          //   this.questionData[questionIndex]['value'][0]['value'] = questionValue;
          //   this.questionData[questionIndex]['imgLabel'] = imgObject[0].label;
          // } else {
          //   question['value'] = questionValue;
          //   this.questionData[questionIndex]['selectedValue'] = prepareImageObject;
          //   this.questionData[questionIndex]['imgUrl'] = response['data'][0]['file_url'];
          //   this.questionData[questionIndex]['value'] = questionValue;
          //   this.questionData[questionIndex]['imgLabel'] = imgObject[0].label;
          // }
          question['value'] = questionValue;
          this.questionData[questionIndex]['selectedValue'] =
            prepareImageObject;
          this.questionData[questionIndex]['imgUrl'] =
            response['data'][0]['file_url'];
          this.questionData[questionIndex]['modelValue'] =
            response['data'][0]['file_url'];
          this.questionData[questionIndex]['value'] = questionValue;
          this.questionData[questionIndex]['imgLabel'] = imgObject[0].label;
          console.log('question', this.questionData);
          console.log('question sele', question);
          this.isImageUploading = false;
          this.snackBar.dismiss();
        } catch (e: any) {
          console.log('catch e', e);
          this.isImageUploading = false;
          this.openSnackBar([e ? e : 'Unable to save file'], 3000);
          console.error(e);
        }
      }
    } catch (e: any) {
      console.log('catch eee', e);
      this.isImageUploading = false;
      this.openSnackBar([e ? e : 'Unable to save file'], 3000);
    }
  }

  showCheckboxes(order: any) {
    var checkboxes = document.getElementById('checkboxes' + order);
    let questionIndex = this.questionData.findIndex(
      (item: { order: any }) => item.order == order
    );
    if (!this.expanded) {
      console.log('this.cloneAnswerOption', this.cloneAnswerOption);
      if (checkboxes) {
        checkboxes.style.display = 'block';
      }
      this.expanded = true;
      this.questionData[questionIndex][`checkboxes${order}`] = this.expanded;
      if (this.cloneAnswerOption.length) {
        this.questionData[questionIndex]['answer_option'] = [];
        this.questionData[questionIndex]['answer_option'] =
          this.cloneAnswerOption;
        setTimeout(() => {
          this.cloneAnswerOption = [];
          this.searchedText = '';
        }, 1000);
      }
      console.log('this.questionData', this.questionData);
    } else {
      console.log('this.cloneAnswerOption', this.cloneAnswerOption);
      if (checkboxes) {
        checkboxes.style.display = 'none';
      }
      this.expanded = false;
      this.questionData[questionIndex][`checkboxes${order}`] = this.expanded;
      if (this.cloneAnswerOption.length) {
        this.questionData[questionIndex]['answer_option'] = [];
        this.questionData[questionIndex]['answer_option'] =
          this.cloneAnswerOption;
        setTimeout(() => {
          this.cloneAnswerOption = [];
          this.searchedText = '';
        }, 1000);
      }
      console.log('this.questionData', this.questionData);
    }
  }

  collapseMultiSelectDropdown(order: string) {
    console.log('this.cloneAnswerOption', this.cloneAnswerOption);
    var checkboxes = document.getElementById('checkboxes' + order);
    let questionIndex = this.questionData.findIndex(
      (item: { order: string }) => item.order == order
    );
    if (checkboxes) {
      checkboxes.style.display = 'none';
    }
    this.expanded = false;
    this.questionData[questionIndex][`checkboxes${order}`] = this.expanded;
    if (this.cloneAnswerOption.length) {
      this.questionData[questionIndex]['answer_option'] = [];
      this.questionData[questionIndex]['answer_option'] =
        this.cloneAnswerOption;
      setTimeout(() => {
        this.cloneAnswerOption = [];
        this.searchedText = '';
      }, 1000);
    }
    console.log('this.questionData', this.questionData);
  }

  modifiedOptions(question: any) {
    console.log('modifiedOptions question', question);
    console.log('modifiedOptions selectedOptions', this.selectedOptions);
    // for (const item of question.answer_option) {
    //   item['checked'] = false;
    // }
    // question['value'] = [];
    // question['value'] = this.selectedOptions.map(item => item.value);
    for (const selectedOption of this.selectedOptions) {
      // let answerOptionIndex = question.answer_option.findIndex(item => item._id == selectedOption.value);
      // console.log('answerOptionIndex', answerOptionIndex)
      // if (answerOptionIndex > -1) {
      //   question.answer_option[answerOptionIndex]['checked'] = true;
      // }
      // let isSelectedItemExist = question.selectedValue.some((id: any) => id == selectedOption.value);
      // console.log('isSelectedItemExist', isSelectedItemExist)
      let isSelectedItemChecked: any = { checked: false, source: {} };
      // console.log('isSelectedItemChecked 1st', isSelectedItemChecked)
      // if (isSelectedItemExist) {
      //   isSelectedItemChecked['checked'] = false;
      // } else {
      //   isSelectedItemChecked['checked'] = true;
      // }
      isSelectedItemChecked['checked'] = true;
      console.log('isSelectedItemChecked', isSelectedItemChecked);
      let findSelectedOption = question.answer_option.find(
        (item: any) => item._id == selectedOption.value
      );
      console.log('findSelectedOption', findSelectedOption);
      this.onChange(question, isSelectedItemChecked, findSelectedOption);
    }
  }

  onDropDownClose(question: any) {
    console.log('onDropDownClose called');
    // question['value'] = [];
    // question['value'] = this.selectedOptions.map(item => item.value);
    // question['value'] = question['value'].splice(this.selectedOptions.length-1, 1);
    this.modifiedOptions(question);
  }

  onItemSelect(question: any, selectedOption: any) {
    console.log('onItemSelect question', question);
    console.log('onItemSelect', selectedOption);
    // let prepareObject = {
    //   textValue: "",
    //   value: selectedOption.value,
    //   label: selectedOption.label
    // };
    // if (this.selectedOptions.length == 0) {
    //   let findSelectedOption = question.answer_option.find((item: any) => item.name == question.selectedOptions);
    //   console.log('findSelectedOption', findSelectedOption)
    //   if (findSelectedOption) {
    //     let prepareObject = {
    //       textValue: "",
    //       value: findSelectedOption._id,
    //       label: findSelectedOption.name
    //     };
    //     this.selectedOptions.push(prepareObject);
    //   }
    //   this.selectedOptions.push(prepareObject);
    // } else {
    //   this.selectedOptions.push(prepareObject);
    // }
    // // this.selectedOptions.push(selectedOption);
    // console.log('global selectedOptions', this.selectedOptions)
    // // let selectedOptions = [];
    // // selectedOptions = this.selectedOptions;

    // // console.log('selectedOptions', selectedOptions)
    // return;
    // let isSelectedItemExist = question.value.some((id: any) => id == selectedOption.value);
    // console.log('isSelectedItemExist', isSelectedItemExist)
    let isSelectedItemChecked: any = { checked: true, source: {} };
    console.log('isSelectedItemChecked 1st', isSelectedItemChecked);
    // if (isSelectedItemExist) {
    //   isSelectedItemChecked['checked'] = false;
    // } else {
    //   isSelectedItemChecked['checked'] = true;
    // }
    // console.log('isSelectedItemChecked', isSelectedItemChecked)
    let findSelectedOption = question.answer_option.find(
      (item: any) => item._id == selectedOption.value
    );
    console.log('findSelectedOption', findSelectedOption);
    this.onChange(question, isSelectedItemChecked, findSelectedOption);
  }

  onItemDeSelect(question: any, selectedOption: any) {
    console.log('onItemDeSelect question', question);
    console.log('onItemDeSelect', selectedOption);
    // console.log('this.selectedOptions', this.selectedOptions)
    // let findIndex = this.selectedOptions.findIndex(item => item.value == selectedOption.value);
    // console.log('findIndex', findIndex)
    // if (findIndex > -1) {
    //   this.selectedOptions.splice(findIndex, 1);
    // }
    // console.log('selectedOption', selectedOption);
    // return;
    // let isSelectedItemExist = question.value.some((id: any) => id == selectedOption.value);
    // console.log('isSelectedItemExist', isSelectedItemExist)
    let isSelectedItemChecked: any = { checked: false, source: {} };
    console.log('isSelectedItemChecked 1st', isSelectedItemChecked);
    // if (isSelectedItemExist) {
    //   isSelectedItemChecked['checked'] = false;
    // } else {
    //   isSelectedItemChecked['checked'] = true;
    // }
    // console.log('isSelectedItemChecked', isSelectedItemChecked)
    let findSelectedOption = question.answer_option.find(
      (item: any) => item._id == selectedOption.value
    );
    console.log('findSelectedOption', findSelectedOption);
    this.onChange(question, isSelectedItemChecked, findSelectedOption);
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  onUnSelectAll() {
    console.log('onUnSelectAll fires');
  }

  // Treat the item's order as the unique identifier for the object
  identity(index: any, item: any) {
    // console.log('identity', index, item)
    return item.order;
    // return index;
  }

  optionIndentity(index: any, item: any) {
    // console.log('optionIndentity', index, item)
    return item._id;
    // return index;
  }

  getDistrictData() {
    this.commonService
      .getAllDistrictsWithOrWithoutProjectId()
      .then((response: any) => {
        if (response && response['success']) {
          let districtList = response['data'].filter((el: any) => !!el.state);
          this.districtsList = districtList;
          // console.log('districtsList', this.districtsList)
          // console.log('filter state', this.getFilterDistrict('5f4288703a4ffa7a7dd57b30'))
          this.setDistrictAnswerOptionDropdownOnEdit();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  setDistrictAnswerOptionDropdownOnEdit() {
    if (this.enableEditMode) {
      for (const item of this.questionData) {
        if (item && item.order == 'state') {
          let districtOrderIndex = this.questionData.findIndex(
            (item: { order: string }) => item.order == 'district'
          );
          // console.log('districtOrderIndex', districtOrderIndex)
          let stateObject = this.questionData.find(
            (item: { order: string }) => item.order == 'state'
          );
          // console.log('stateObject', stateObject)
          if (districtOrderIndex > -1) {
            // this.questionData[districtOrderIndex]['selectedValue'] = [];
            // this.questionData[districtOrderIndex]['modelValue'] = '';
            // this.questionData[districtOrderIndex]['value'] = '';
            this.questionData[districtOrderIndex]['answer_option'] =
              this.getFilterDistrict(stateObject.modelValue);
          }
        }
      }
    }
  }

  getFilterDistrict(stateId: string) {
    return this.districtsList
      .filter(
        (district: { state: { _id: string } }) => district.state._id == stateId
      )
      .map((option: any) => {
        return {
          name: option.name,
          _id: option._id,
          did: [{ parent_option: `^(${option.state._id})$` }],
        };
      })
      .sort((firstName: any, secondName: any) =>
        firstName.name > secondName.name ? 1 : -1
      );
  }

  getFilterAnswerOption(event: any, selectedQuestion: any) {
    clearTimeout(this.timer);
    let searchValue = event;
    // let alreadySelectedOptions = [];
    this.selectedQuestion = JSON.parse(JSON.stringify(selectedQuestion));
    console.log('this.selectedQuestion', this.selectedQuestion);
    if (this.cloneAnswerOption.length == 0) {
      this.cloneAnswerOption = JSON.parse(
        JSON.stringify(selectedQuestion?.answer_option)
      );
      console.log('cloneAnswerOption', this.cloneAnswerOption);
      // alreadySelectedOptions = this.cloneAnswerOption.filter(option => option?.checked);
      // console.log('alreadySelectedOptions', alreadySelectedOptions);
    }
    let questionIndex = this.questionData.findIndex(
      (item: { order: string }) => item.order == selectedQuestion.order
    );
    // console.log('questionIndex',questionIndex)
    if (searchValue) {
      this.searchedText = searchValue;
      this.timer = setTimeout(() => {
        console.log('getFilterAnswerOption', event, selectedQuestion);
        console.log('search...', searchValue);
        const searchedData = this.cloneAnswerOption.filter((item: any) =>
          item?.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        console.log('searchedData', searchedData);
        if (searchedData && searchedData.length > 0) {
          this.questionData[questionIndex]['answer_option'] = [...searchedData];
        } else {
          this.questionData[questionIndex]['answer_option'] = [];
          // this.questionData[questionIndex]['answer_option'] = this.cloneAnswerOption;
        }
      }, 0);
    } else {
      this.questionData[questionIndex]['answer_option'] = [];
      this.questionData[questionIndex]['answer_option'] =
        this.cloneAnswerOption;
    }
  }

  onSelectionClose(order: string) {
    console.log('onSelectionClose called', order);
    let questionIndex = this.questionData.findIndex(
      (item: { order: string }) => item.order == order
    );
    console.log('questionIndex', questionIndex);
    if (this.cloneAnswerOption.length) {
      this.questionData[questionIndex]['answer_option'] = [];
      this.questionData[questionIndex]['answer_option'] =
        this.cloneAnswerOption;
      // this.cloneAnswerOption = [];
      // this.searchedText = '';
      setTimeout(() => {
        this.cloneAnswerOption = [];
        this.searchedText = '';
      }, 0);
    }
    console.log('this.questionData', this.questionData);
  }

  getChildQuesAnsOptionByExternalAPICall(question: any) {
    // console.log('getChildQuesAnsOptionByExternalAPICall', question)
    let checkParentQuestionExistOrNot: any;
    for (const temp of this.filterChildQuestOfExternalAPICall) {
      for (const res of temp.restrictions) {
        checkParentQuestionExistOrNot = res.orders.find(
          (orderName: any) => orderName.order == question?.order
        );
        // checkParentQuestionExistOrNot = res.orders.find(orderName => orderName.order == 'state');
        if (checkParentQuestionExistOrNot) {
          let findExternalCallValidation = temp.validation.find(
            (validation: any) => validation._id == VALIDATION.CALL_EXTERNAL_API
          );
          const apiEndPoint = findExternalCallValidation
            ? findExternalCallValidation?.value.substring(1)
            : '';
          let childQuestionIndex = this.questionData.findIndex(
            (childInd: any) => childInd.order == temp.order
          );
          let questionIndex = this.questionData.findIndex(
            (item: { order: string }) => item.order == question?.order
          );
          let parentQuesAnswer = {
            question: [
              {
                answer: this.questionData[questionIndex]['selectedValue'],
                input_type: this.questionData[questionIndex]['input_type'],
                nestedAnswer: [],
                order: this.questionData[questionIndex]['order'],
                // order: 'state',
                pattern: this.questionData[questionIndex]?.pattern,
              },
            ],
          };
          this.commonService
            .getAnswerOptionList(parentQuesAnswer, apiEndPoint)
            .then((res: any) => {
              if (res && res.status) {
                this.questionData[childQuestionIndex]['answer_option'] =
                  res.data;
              }
            })
            .catch((error: any) => {
              console.log('external Call error', error);
            });
        }
      }
    }
  }

  restrictManuallyEnterDate() {
    return false;
  }

  checkPrefixValueValidation(question: any) {
    // console.log('checkPrefixValueValidation', question)
    let prefixValueLength = question?.prefixValue?.length;
    let modelValuePrefix = question?.modelValue?.substring(
      0,
      prefixValueLength
    );
    if (question?.prefixValue != modelValuePrefix) {
      const errorMsg = `${question?.title} must be starting with ${question?.prefixValue}`;
      let quesIndex = this.questionData.findIndex(
        (item: any) => item.order == question?.order
      );
      this.questionData[quesIndex]['errorMessage'] =
        question && question.hint ? question.hint : errorMsg;
      return false;
    }
    return ;
  }

  getSelectedValue(question: any) {
    let value = '';
    let selectedArray: any[] = question.selectedValue;
    if (selectedArray.length && selectedArray.length == 1) {
      // console.log(selectedArray[0]);
      if (selectedArray[0].label) {
        value = selectedArray[0].label;
      } else if (selectedArray[0].textValue) {
        value = selectedArray[0].textValue;
      } else if (selectedArray[0].value) {
        value = selectedArray[0].value;
      } else {
        value = '';
      }
    } else if (selectedArray.length && selectedArray.length > 1) {
      value = selectedArray.map((el) => el.label).join(', ');
    } else {
      value = '';
    }
    return value;
  }

  evaluateEquation(selectedQues: any) {
    console.log('evaluateEquation called', selectedQues);
    if (
      selectedQues?.validation?.length &&
      selectedQues?.validation.some(
        (item: any) => item._id == VALIDATION.EQUATION
      )
    ) {
      let equationQuesIndex = this.questionData.findIndex(
        (item: any) => item.order == selectedQues?.order
      );
      const errorMsg = `${
        selectedQues?.hint ? selectedQues?.hint : 'Error.....'
      }`;
      const { restrictions, validation } = selectedQues;
      validation.forEach((v: any) => {
        if (v._id === VALIDATION.EQUATION) {
          let equation = v.value;
          console.log('equation', equation);
          let orders = this.questionData.filter((question: any) =>
            equation.match(new RegExp(`\\b${question.shortKey}\\b`))
          );
          console.log('orders', orders);
          orders.forEach((order: any) => {
            const questionValue = this.getQuestionValueForBodmas(order);
            console.log('questionValue', questionValue, typeof questionValue);
            equation = equation.replace(
              order.shortKey,
              questionValue ? `(${questionValue})` : 0
            );
          });
          console.log('final equation', equation);
          let equationValue: any;
          equationValue = orders?.length ? eval(equation) : 0;
          console.log('equationValue', equationValue);

          if (typeof equationValue == 'boolean' && !equationValue) {
            this.questionData[equationQuesIndex]['errorMessage'] = errorMsg;
          } else if (
            typeof equationValue != 'boolean' &&
            equationValue != selectedQues?.modelValue
          ) {
            this.questionData[equationQuesIndex]['errorMessage'] = errorMsg;
          }
        }
      });
    }
  }

  getQuestionValueForBodmas = (question: any) => {
    const questionInputType = question?.input_type;
    if (
      !(
        questionInputType === QUESTION_TYPE.MULTI_SELECT ||
        questionInputType === QUESTION_TYPE.MULTI_SELECT_CHECKBOX ||
        questionInputType === QUESTION_TYPE.SINGLE_SELECT ||
        questionInputType === QUESTION_TYPE.RADIO
      ) ||
      this.checkIfQuestionHasGivenValidation(
        question,
        VALIDATION.DIRECT_VALUE_IN_BODMAS
      )
    ) {
      return isNaN(question?.modelValue) ? 0 : question?.modelValue;
    }
    return Array.isArray(question?.value) ? 0 : question?.value;
  };

  checkIfQuestionHasGivenValidation = (
    question: any,
    validationToCheckInQuestion: any
  ) => {
    return question?.validation?.some(
      (validation: any) => validation._id === validationToCheckInQuestion
    );
  };

  getFileExtensionFromURL(url: string) {
    if (url) {
      return this.commonService.getFileExtensionFromURL(url);
    }
  }

  /**
   * A helper function that is used to get the selected value from the question.
   * @param {any} question - the question that the user selected.
   * @param {any} selectedValue - The selected value.
   */
  getSelectionChange(question: any, selectedValue: any) {
    const selectedTarget = { target: { value: selectedValue?.value } };
    if (question && selectedValue) {
      this.onChange(question, selectedTarget);
    }
  }

  ngOnDestroy() {
    this.isFormSubmittedSuccessfully = false;
  }

}

