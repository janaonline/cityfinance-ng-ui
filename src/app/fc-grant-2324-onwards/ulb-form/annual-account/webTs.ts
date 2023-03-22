
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  TemplateRef
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
  prepareFormResponse
} from './utilities/appForm/form.util';
import {
  checkIfQuestionHasGivenValidation,
  getDerivedValueFromNumericRestriction,
  getTitleProps,
  isQuestionNested,
  mapChildQuestionDataAsAnswerOptions
} from "./utilities/appForm/question.util";
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { hasChildQuestionsData } from './utilities/appForm/question.util'
import { CommonPreviewTemplateComponent } from './common-preview-template/common-preview-template.component';
import { MatDialog } from '@angular/material/dialog';
const name = ['(', ')', '%'];
const address = ['\n', '(', ')', ',', ';'];

declare const $: any;

@Component({
  selector: 'app-web-form',
  templateUrl: './cityFyTemplate/common-template.component.html',
  styleUrls: ['./cityFyTemplate/common-template.component.scss']
  // templateUrl: './web-form.component.html',
  // styleUrls: ['./web-form.component.scss']
})
export class WebFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() title = 'demo';
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
  @Input() showSubmitButton: boolean | string = true;
  @Input() showDraftButton: boolean | string = true;
  @Input() viewFormTemplate: 'template1' | 'template2' | 'template3' | 'dur' = 'template2';
  @Input() nextBtn = '#';
  @Input() preBtn = '#';
  districtsList: any = [];
  timer: any;
  constructor(
    private commonService: CommonService,
    public snackBar: MatSnackBar,
    public matDialog: MatDialog
  ) {

  }
  @Input() questionresponse: any = {
    timestamp: 1621316934,
    success: true,
    message: 'Form Questionare!',
    data: [
      {
        _id: '5f4656c92daa9921dc1173aa',
        formId: 466,
        language: [

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
  @Output() onPreviewDUR: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLoadInParent: EventEmitter<string> = new EventEmitter<string>();
  @Input() isViewMode: boolean = false;
  @Input() disclaimerMessage: any = '';
  questionData: any = [];
  selectedOptions: any = [];
  cloneAnswerOption: any = [];
  searchedText = '';
  selectedQuestion: any;
  filterChildQuestOfExternalAPICall: any = [];
  isLoading = true;
  imagesExtension = ['png', 'jpg', 'jpeg'];
  proposalName: any;
  @Output() tabChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAddQuestion: EventEmitter<any> = new EventEmitter();
  pdfbuttonhide: boolean = false;
  unBlockCharObject: any = ['&', ";"]
  isAppRestrictFirstDigitAsZero: boolean = false;
  isViewModeOdf: boolean = false;
  @Input() viewTem: string;
  @Input() isProjectLoaded: boolean;
  @Input() scoreOdfGfc;
  odfGfcMarks: number = null;
  @Input() s3FolderName: string = '';
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
    if (this.questionresponse && typeof this.questionresponse != 'object') {
      this.questionresponse = JSON.parse(this.questionresponse);
    }
    if (this.viewTem == 'odf' || this.viewTem == "ptax" || this.viewTem == "gfc") {
      this.isViewModeOdf = true;
    }
    this.processQuestion(
      JSON.parse(JSON.stringify(this.questionresponse)),
      false
    );

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes);
    // let {questionResponse, title, isViewMode, buttonText, isFormSubmittedSuccessfully, enableEditMode, showSubmitButton, viewFormTemplate, disclaimerMessage} = changes;
    let { questionResponse, title, isViewMode, buttonText, isFormSubmittedSuccessfully, enableEditMode, showSubmitButton, viewFormTemplate, disclaimerMessage, showDraftButton } = changes;
    if (title && title.currentValue) {
      this.title = title.currentValue;
    }
    if (isViewMode && isViewMode.currentValue) {
      this.isViewMode = isViewMode.currentValue;
    }
    if (buttonText && buttonText.currentValue) {
      this.buttonText = buttonText.currentValue;
    }
    if (isFormSubmittedSuccessfully && isFormSubmittedSuccessfully.currentValue) {
      this.isFormSubmittedSuccessfully = isFormSubmittedSuccessfully.currentValue;
    }
    if (enableEditMode && enableEditMode.currentValue) {
      this.enableEditMode = enableEditMode.currentValue;
    }
    if (showSubmitButton && showSubmitButton.currentValue) {
      this.showSubmitButton = showSubmitButton.currentValue;
    }
    if (showDraftButton && showDraftButton.currentValue) {
      this.showDraftButton = showDraftButton.currentValue;
    }
    if (viewFormTemplate && viewFormTemplate.currentValue) {
      this.viewFormTemplate = viewFormTemplate.currentValue;
    }
    if (disclaimerMessage && disclaimerMessage.currentValue) {
      this.disclaimerMessage = disclaimerMessage.currentValue;
    }
    // let temp = ["enableEditMode", "showPreviewAnswer", "showFormChange", "isViewMode","showSubmitButton", "isFormSubmittedSuccessfully" ];
    let temp = ["enableEditMode", "showPreviewAnswer", "showFormChange", "isViewMode", "showSubmitButton", "isFormSubmittedSuccessfully", "showDraftButton"];
    temp.forEach((el: any) => {
      let self: any = this;
      if (changes && changes[el] && changes[el].currentValue) {
        let value = changes[el].currentValue;
        console.log('editMode', value)
        if (typeof value == 'string') {
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

    if (changes && changes.questionresponse && changes.questionresponse.currentValue) {
      this.questionresponse = changes.questionresponse.currentValue;
      console.log("typeOF", typeof this.questionresponse);
      if (this.questionresponse && typeof this.questionresponse != 'object') {
        this.questionresponse = JSON.parse(this.questionresponse);
      }
      console.log("parse data", this.questionresponse);
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
        // element.question.map((question: any) => (question.selectedValue = ''));
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

        // for input type 20
        let filteredInputType20Question = this.questionData.filter((item: any) => (item?.input_type == QUESTION_TYPE.NESTED_ONE) || (item?.input_type == QUESTION_TYPE.NESTED_TWO));
        console.log('filteredInputType20Question', filteredInputType20Question);
        if (filteredInputType20Question?.length) {
          for (const nested of filteredInputType20Question) {
            nested['childQuestionData'] = [];
            // nested['childQuestionData'] = Array(nested.modelValue);
            if (nested.hasOwnProperty('nestedAnswer') && nested?.nestedAnswer?.length) {
              for (const nestedAnswer of nested?.nestedAnswer) {
                let answerNestedData = [];
                for (const answerNested of nestedAnswer?.answerNestedData) {
                  let index = nestedAnswer?.answerNestedData.findIndex((nestedOrder: any) => nestedOrder?.order == answerNested?.order);
                  console.log('index', index);
                  let findChildQuestion = nested?.childQuestions.find((item: any) => item?.order == answerNested?.order);
                  console.log('findChildQuestion', findChildQuestion);
                  if (findChildQuestion) {
                    findChildQuestion['selectedValue'] = answerNested?.answer;
                    findChildQuestion = this.commonService.questionMapping(JSON.parse(JSON.stringify(findChildQuestion)));
                    findChildQuestion['forParentValue'] = nestedAnswer?.forParentValue;
                    findChildQuestion['selectedAnswerOption'] = nested?.answer_option.find((el: any) => el._id == nestedAnswer?.forParentValue)
                    findChildQuestion['nestedConfig'] = { parentOrder: nested?.order, index: index, loopIndex: 0 };
                    answerNestedData.push(findChildQuestion);
                  }
                }
                nested.childQuestionData.push(answerNestedData);
              }
            }
          }
        }
        this.bodmasValidations();
        console.log('filteredInputType20Question', filteredInputType20Question);
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

        item['selectedValue'] = []
        item['value'] = [];
        item['selectedOptions'] = '';
        item['modelValue'] = '';
        item['answer_option'].forEach((answerOption: any) => {
          answerOption['checked'] = false;
        })

        switch (item.type) {
          case QUESTION_TYPE.NUMERIC:
            item['value'] = "";
            break;
        }

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

  beforeSubmitPrepareResponse(isSaveAsDraft: boolean = false) {
    const defaultAnswer = [{ label: "", textValue: "", value: "" }];
    let sendResponse = this.questionData.map((item: any) => ({
      // answer: [{ label: item.answer_option && item.answer_option.find(option => option._id == item.selectedValue) ? item.answer_option.find(option => option._id == item.selectedValue).name : '', textValue: item.answer_option && item.answer_option.length ? '' : item.selectedValue, value: item.answer_option && item.answer_option.length ? item.selectedValue : '' }],
      answer: (item.visibility && item.selectedValue) ? item.selectedValue : defaultAnswer,
      input_type: item.input_type,
      nestedAnswer: [],
      order: item.order,
      pattern: item.pattern,
      shortKey: item?.shortKey,
      ...item
    }));
    let form: any = { formId: '1234' }
    let finalQuestionResponse: any;
    prepareFormResponse(sendResponse, form, '123123', '').then((data: any) => {
      console.log('final-data', data)
      finalQuestionResponse = JSON.parse(JSON.stringify(data && data[0] && data[0]?.question));
      console.log('finalQuestionResponse', finalQuestionResponse)
      let obj = { finalQuestionResponse, name: this.proposalName };
      if (obj.finalQuestionResponse?.length) {
        this.submitForm(obj.finalQuestionResponse, obj.name, isSaveAsDraft);
      }
    })
  }

  async submitForm(finalQuestionResponse: any = [], proposalName: string = '', isSaveAsDraft: boolean = false) {
    console.log('this.questionData', this.questionData)
    const defaultAnswer = [{ label: "", textValue: "", value: "" }];
    let sendResponse = this.questionData.map((item: any) => ({
      // answer: [{ label: item.answer_option && item.answer_option.find(option => option._id == item.selectedValue) ? item.answer_option.find(option => option._id == item.selectedValue).name : '', textValue: item.answer_option && item.answer_option.length ? '' : item.selectedValue, value: item.answer_option && item.answer_option.length ? item.selectedValue : '' }],
      answer: (item.visibility && item.selectedValue) ? item.selectedValue : defaultAnswer,
      input_type: item.input_type,
      nestedAnswer: [],
      order: item.order,
      pattern: item.pattern,
      shortKey: item?.shortKey,
      ...item
    }))
    console.log('sendResponse', sendResponse)
    // let form: any = {formId: '1234'}
    // let finalQuestionResponse: any;
    // prepareFormResponse(sendResponse, form , '123123', '').then((data: any) => {
    //   console.log('final-data', data)
    //   finalQuestionResponse = JSON.parse(JSON.stringify(data && data[0] && data[0]?.question));
    // })

    const filterInvalidEnterAnswer = this.questionData.filter((answer: any) => answer?.errorMessage && answer?.visibility);
    console.log('filterInvalidEnterAnswer', filterInvalidEnterAnswer)
    let emptyError: any = [];
    await submitForm(false, this.questionData).then((value: any) => {
      emptyError = value.filter((item: any) => item.visibility);
    });
    console.log('emptyError', emptyError)
    if (isSaveAsDraft) {
      this.prepareFinalResponse(finalQuestionResponse, proposalName, isSaveAsDraft);
      // window.scrollTo({ top: 0, behavior: 'smooth' });
      // console.log("question123", this.questionData, emptyError,finalQuestionResponse);
      // this.questionData.forEach(el => {
      //   if(Array.isArray(el.value) && el.value.length > 0){
      //     el.value = [...new Set([...el.value])]
      //   }
      //   if(el.selectedValue && el.selectedValue.length > 0){
      //     el.selectedValue = el.selectedValue.filter((item , index)=>{
      //       return el.selectedValue.findIndex(ele => ele.value == item.value) == index
      //     })
      //   }
      // })
      // finalQuestionResponse.forEach(el => {
      //   if(el.answer && el.answer.length > 0  ){
      //     el.answer = el.answer.filter((item , index)=> {

      //       return el.answer.findIndex(el => el.value == item.value) == index
      //     })
      //   }
      // })
      // this.submitQuestion.emit({ question: this.questionData, finalData: finalQuestionResponse, name: proposalName, isSaveAsDraft: isSaveAsDraft });
      // console.log("question", this.questionData, emptyError);
      // // this.isFormSubmittedSuccessfully = true;
    } else {
      if (emptyError.length > 0) {
        this.isFormSubmittedSuccessfully = false;
        for (const error of emptyError) {
          let errorIndex = this.questionData.findIndex((item: { order: any; }) => item.order == error.order);
          if (errorIndex > -1) {
            this.questionData[errorIndex]['errorMessage'] = 'This is a required field'
          }
        }

        // let texteditorQuestionError = this.questionData.find(el => el.order == emptyError[0].order)
        // if(texteditorQuestionError.input_type == QUESTION_TYPE.ADDRESS && texteditorQuestionError.formatType && texteditorQuestionError.formatType == 'htmlEditor'){
        //   let shortKeyId = texteditorQuestionError.hasOwnProperty('forParentValue') ? texteditorQuestionError.shortKey + texteditorQuestionError.forParentValue : texteditorQuestionError.shortKey
        //   let textEditorErrorElement = document.getElementById(shortKeyId);
        //   textEditorErrorElement.scrollIntoView();
        // }else{
        //   let errorElement: HTMLElement =  document.getElementById(emptyError[0].order)
        //   errorElement.focus();
        // }
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
        this.isFormSubmittedSuccessfully = true;
      }

      if (emptyError.length == 0 && filterInvalidEnterAnswer.length == 0) {
        // window.scrollTo(0, 0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.prepareFinalResponse(finalQuestionResponse, proposalName, isSaveAsDraft);
        // console.log("question123", this.questionData, emptyError,finalQuestionResponse);
        // this.questionData.forEach(el => {
        //   if(Array.isArray(el.value) && el.value.length > 0){
        //     el.value = [...new Set([...el.value])]
        //   }
        //   if(el.selectedValue && el.selectedValue.length > 0){
        //     el.selectedValue = el.selectedValue.filter((item , index)=>{
        //       return el.selectedValue.findIndex(ele => ele.value == item.value) == index
        //     })
        //   }
        // })
        // finalQuestionResponse.forEach(el => {
        //   if(el.answer && el.answer.length > 0  ){
        //     el.answer = el.answer.filter((item , index)=> {

        //       return el.answer.findIndex(el => el.value == item.value) == index
        //     })
        //   }
        // })
        // // this.submitQuestion.emit({ question: this.questionData, finalData: sendResponse });
        // this.submitQuestion.emit({ question: this.questionData, finalData: finalQuestionResponse, name: proposalName, isSaveAsDraft: isSaveAsDraft });
        // console.log("question", this.questionData, emptyError);
        // this.isFormSubmittedSuccessfully = true;
      }
    }
    // this.submitQuestion.emit({ question: this.questionData});
    console.log("question", this.questionData, emptyError);
  }

  prepareFinalResponse(finalQuestionResponse: any, proposalName: string = '', isSaveAsDraft: boolean = false) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log("question123", this.questionData, finalQuestionResponse);
    this.questionData.forEach((el: any) => {
      if (Array.isArray(el.value) && el.value.length > 0) {
        el.value = [...new Set([...el.value])]
      }
      if (el.selectedValue && el.selectedValue.length > 0) {
        el.selectedValue = el.selectedValue.filter((item: any, index: number) => {
          return el.selectedValue.findIndex((ele: any) => ele.value == item.value) == index
        })
      }
    })
    finalQuestionResponse.forEach((el: any) => {
      if (el.answer && el.answer.length > 0) {
        el.answer = el.answer.filter((item: any, index: number) => {

          return el.answer.findIndex((el: any) => el.value == item.value) == index
        })
      }
    })
    // this.submitQuestion.emit({ question: this.questionData, finalData: sendResponse });
    this.submitQuestion.emit({ question: this.questionData, finalData: finalQuestionResponse, name: proposalName, isSaveAsDraft: isSaveAsDraft });
    console.log("question", this.questionData);
    this.isFormSubmittedSuccessfully = true;
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
    if(question.input_type === QUESTION_TYPE.CONSENT) {
      value.target.value = value.target.checked;
    }
    console.log('onChange', { question, value, option, skip })
    this.isFormSubmittedSuccessfully = false;
    this.tabChange.emit(!this.isFormSubmittedSuccessfully);
    // option["checked"] = !option["checked"]
    if (question.input_type == '21' && option["checked"]) {
      let index = question.answer_option.findIndex((el: any) => el._id == option._id) + 1
      console.log("firstIndex", index);

      let childQuestionIndex = question.childQuestionData.findIndex((el: any) => el[0].forParentValue == index)
      console.log("secondIndex", childQuestionIndex);
      question.childQuestionData.splice(childQuestionIndex, 1)
    }
    console.log("questionsssssssssssss", question, value, option, skip);
    // if (question.validation.length) {
    //   const uniqueCodeValidation = question.validation.find(valid => valid._id == VALIDATION.VALIDATE_UNIQUE_CODE);
    //   console.log('uniqueCodeValidation', uniqueCodeValidation)
    //   if (question.url) {
    //     this.godrejService.validateUniqueCode(question).then((response) => {
    //       if (response && response["success"]) {
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    //   }
    // }
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
    let questionValue: any;
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

    nestedConfig = { 'forParentValue': question?.forParentValue, ...nestedConfig };
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
          ? `${question.selectedValue[0].label}...+ ${question.selectedValue.length - 1
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

    this.sortChildAnswerOptionBasedOnDisabledProperty(question);
    if (question && question.hasOwnProperty('childQuestionData') && question?.childQuestionData?.length) {
      this.setParentValueOnNestedChildQuestion(question, questionIndex);
    }
    this.evaluateEquation(question);
    // this.bodmasValidations();


    if ((question.order.includes('.') && question?.forParentValue)) {
      let nestedQuestionParentOrder: any = question?.order.split('.');
      if (nestedQuestionParentOrder) {
        let parentQuestion = this.questionData.find((parentOrder: { order: any; }) => parentOrder.order == nestedQuestionParentOrder[0]);
        if (parentQuestion) {
          this.bodmasValidations(true, parentQuestion.childQuestionData[question?.forParentValue - 1])
        }
      }
    } else {
      this.bodmasValidations();
    }
    this.bodmasRestrictions(question);
    console.log('questionData here', this.questionData);
  }

  async setParentValueOnNestedChildQuestion(question: any, questionIndex: number) {
    console.log('setParentValueOnNestedChildQuestion', question);
    question?.childQuestionData.forEach((item: any, index: number) => {
      for (const nestedChild of item) {
        console.log('nestedChild', nestedChild);
        nestedChild['forParentValue'] = index + 1;
      }
      console.log('question', item, index)
    })
    this.questionData[questionIndex] = await JSON.parse(JSON.stringify(question));
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
      .catch((response: any) => {
        console.log('response', response);
      });
  }

  async setDocuments(imgObject: any, question: any, event: any) {
    console.log('setDocuments', imgObject);
    console.log('setDocuments question', question);
    let folderName: string = this.s3FolderName
    // this.isImageUploading = true;
    try {
      let response = await this.commonService.uploadTos3(
        imgObject[0].label,//name
        folderName,//folderName
        imgObject[0].type,//type
        imgObject[0].file[0].size,//size
        event,//event
        2097152,//check file size
        false//header options

      );
      console.log('file upload parent response', response);
      if (response && response['success']) {
        if(question?.shortKey == 'audited.standardized_data.excel' || question?.shortKey == 'unAudited.standardized_data.excel'){
          this.verifyExcelSheet(event, response['data'][0]['file_url'], imgObject[0].label, imgObject[0].type, question);
        }
        else{
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
          let prepareImageObject = [{
            "label": imgObject[0]?.label ? imgObject[0]?.label : "",
            "textValue": imgObject[0]?.label ? imgObject[0]?.label : "",
            "value": response['data'][0]['file_url']
          }];
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

  optionIdentity(index: any, item: any) {
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
    return;
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
      const errorMsg = `${selectedQues?.hint ? selectedQues?.hint : 'Error.....'
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

  bodmasValidations(isNestedData: boolean = false, childQuestionData: any = []) {
    console.log('bodmasValidations called', childQuestionData)
    let bodmasQuestionList: any = [];
    let allQuestionData: any = [];
    allQuestionData = isNestedData ? childQuestionData : this.questionData;
    bodmasQuestionList = allQuestionData.filter((item: any) => item?.validation.some((item: { _id: any; }) => item._id == VALIDATION.EQUATION));
    console.log('bodmasQuestionList', bodmasQuestionList);
    if (bodmasQuestionList?.length) {
      for (const item of bodmasQuestionList) {
        let equationValidationData = JSON.parse(JSON.stringify(item.validation.find((valid: any) => valid._id == VALIDATION.EQUATION)));
        console.log('equationValidationData', equationValidationData);
        let orders = allQuestionData.filter((question: any) => equationValidationData?.value.match(new RegExp(`\\b${question.shortKey}\\b`)));
        console.log('orders', orders);
        orders.forEach((order: any) => {
          const questionValue = this.getQuestionValueForBodmas(order);
          console.log('questionValue', questionValue, typeof (questionValue))
          equationValidationData['value'] = equationValidationData?.value.replace(
            order.shortKey,
            questionValue ? `(${questionValue})` : 0
          );
        });
        console.log('final equation', equationValidationData)
        let equationValue: any;
        equationValue = orders?.length ? eval(equationValidationData?.value) : 0;
        console.log('equationValue', equationValue)
        item['selectedValue'] = [{ "label": "", "textValue": "", "value": equationValue }];
        item['modelValue'] = equationValue;
        item['value'] = equationValue;
      }
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
    console.log('getSelectionChange', question, selectedValue);
    // const selectedTarget = { target: { value: selectedValue?.value } };
    // if (question && selectedValue) {
    //   this.onChange(question, selectedTarget);
    // }
    if (this.viewTem == 'odf' || this.viewTem == 'gfc') {
      this.getMarks(question?.selectedValue[0]?.label);
    }
  }

  /**
 * It takes a question object and finds the child question of that question and sorts the answer
 * options of the child question based on the disabled property of the answer option.
 * @param {any} currentQuestion - any = {
 */
  sortChildAnswerOptionBasedOnDisabledProperty(currentQuestion: any) {
    let findDidTypeQuestion: any[] = this.questionData.filter((did: any) => {
      let findChild = did.restrictions.find((res: any) => (res.type == RESTRICTION.DID))
      if (findChild && findChild.orders.some((item: any) => item.order == currentQuestion?.order)) {
        return did;
      }
    });
    if (findDidTypeQuestion?.length > 0) {
      let childQuesIndex = this.getQuestionIndex(findDidTypeQuestion[0]?.shortKey);
      this.questionData[childQuesIndex]['answer_option'] = this.sortAnswerOptions(findDidTypeQuestion[0]['answer_option'], 'disabled');
    }
  }

  getQuestionIndex(shortKey: string) {
    return this.questionData.findIndex((ques: any) => ques?.shortKey == shortKey);
  }

  /**
   * Sort the array of objects by the value of the property specified by the sortKey parameter.
   * @param {any[]} data - any[] - the array of objects to be sorted
   * @param {string} sortKey - the key of the object that you want to sort by
   * @returns The sortAnswerOptions() method returns a sorted array of objects.
   */
  sortAnswerOptions(data: any[], sortKey: string) {
    return data.sort((item1: any, item2: any) => item1[sortKey] - item2[sortKey]);
  }

  ngOnDestroy() {
    this.isFormSubmittedSuccessfully = true;
  }

  lastComment(event: any) {
    console.log("TheEvent", event);
  }

  /**
   * It removes the uploaded file from the questionData array.
   * @param {any} currentQuestion - the current question object
   * @param {number} questionIndex - the index of the question in the array
   */
  removeUploadedFile(currentQuestion: any, questionorder: number) {
    /* Finding the index of the question in the questionData array. */
    let questionIndex = this.questionData.findIndex((ele: any) => ele?.order == questionorder);

    this.questionData[questionIndex]['modelValue'] = '';
    this.questionData[questionIndex]['value'] = '';
    this.questionData[questionIndex]['imgLabel'] = '';
    this.questionData[questionIndex]['imgUrl'] = '';
    this.questionData[questionIndex]['selectedValue'] = [{ "label": "", "textValue": '', 'value': '' }];
  }

  /**
   * It opens a dialog box and displays the image in the dialog box.
   * @param {any} currentQuestion - any - this is the question object that is being passed to the
   * function.
   */
  viewUploadedFile(currentQuestion: any) {
    console.log("viewUploadedFile", currentQuestion)
    // const dialogRef = this.dialog.open(GodrejShowDetailedInfoComponent, {
    //   width: "1200px",
    //   data: {
    //     isOldView: false,
    //     url: currentQuestion?.modelValue,
    //     fileName: currentQuestion?.imgLabel ? currentQuestion?.imgLabel : (currentQuestion?.selectedValue && currentQuestion?.selectedValue?.length) ? currentQuestion?.selectedValue[0]?.label : ''
    //   },
    // });

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   console.log('result', result)
    // });
  }

  bodmasRestrictions(question: any = {}) {
    const bodmasQuestionList = this.questionData.filter((item: any) => item?.restrictions.some((item: any) => item.type == RESTRICTION.SUM_FROM_LOOP))

    let { answer_option: answerOptions, value } = question;
    let dynamicKeysObject: any = { options: question.answer_option, value };
    if (bodmasQuestionList && bodmasQuestionList.length > 0) {
      bodmasQuestionList.forEach((el: any) => {
        const { restrictions, validation } = el;

        restrictions.forEach(({ orders: relatedQuestionsOrders, type }: any) => {
          switch (type) {
            case RESTRICTION.SUM_FROM_LOOP:
              dynamicKeysObject.value = 0;
              relatedQuestionsOrders.forEach((relatedQuestionOrder: any) => {
                const relatedQuestion = this.questionData.find(
                  (question: any) =>
                    question.order === `${parseInt(relatedQuestionOrder.order)}`
                );
                if (relatedQuestion && hasChildQuestionsData(relatedQuestion)) {
                  dynamicKeysObject.value += relatedQuestion.childQuestionData.reduce(
                    (sum: any, child: any) =>
                      sum +
                      Number(
                        child.find(
                          (child: any) => child.order == relatedQuestionOrder.order
                        ).value
                      ) || 0,
                    0
                  );
                }
              });
              break;
            case RESTRICTION.SUBTRACTION:
              dynamicKeysObject.value = getDerivedValueFromNumericRestriction(
                relatedQuestionsOrders,
                "-",
                this.questionData
              );
              dynamicKeysObject.disabled = true;
              break;

            case RESTRICTION.ADDITION:
              dynamicKeysObject.value = getDerivedValueFromNumericRestriction(
                relatedQuestionsOrders,
                "+",
                this.questionData
              );
              dynamicKeysObject.disabled = true;
              break;

            case RESTRICTION.MULTIPLICATION:
              dynamicKeysObject.value = getDerivedValueFromNumericRestriction(
                relatedQuestionsOrders,
                "*",
                this.questionData
              );
              dynamicKeysObject.disabled = true;
              break;
            case RESTRICTION.DIVISION:
              dynamicKeysObject.value = getDerivedValueFromNumericRestriction(
                relatedQuestionsOrders,
                "/",
                this.questionData
              );
              dynamicKeysObject.disabled = true;
              break;
            case RESTRICTION.DYNAMIC_OPTION:
            case RESTRICTION.DYNAMIC_OPTION_LOOP:
              const filtersRestrictionObj = question.restrictions.find(
                (r: any) => r.type === `${type}.1`
              );
              const questionHasOrConditionWhenSelectingDynamicOptionValidation = checkIfQuestionHasGivenValidation(
                question,
                VALIDATION.OR_CONDITION_WHEN_SELECTING_DYNAMIC_OPTION
              );
              relatedQuestionsOrders.forEach((relatedQuestionOrder: any) => {
                if (isQuestionNested(relatedQuestionOrder.order)) {
                  const relatedQuestion = this.questionData.find(
                    (question: any) =>
                      question.order === `${parseInt(relatedQuestionOrder.order)}`
                  );
                  const hideOptionValidation = validation.find(
                    ({ _id }: any) => _id === VALIDATION.HIDE_PREDEFINED_ANSWER
                  );
                  if (relatedQuestion && hasChildQuestionsData(relatedQuestion)) {
                    let newAnswerOptions: any = mapChildQuestionDataAsAnswerOptions(
                      relatedQuestion,
                      relatedQuestionOrder,
                      filtersRestrictionObj,
                      !questionHasOrConditionWhenSelectingDynamicOptionValidation
                    );
                    if (newAnswerOptions?.length) {
                      if (hideOptionValidation) {
                        answerOptions = [...newAnswerOptions];
                      } else {
                        answerOptions = [...newAnswerOptions, ...answerOptions];
                      }
                    } else {
                      if (hideOptionValidation) {
                        answerOptions = [
                          { _id: `99`, name: "No eligible members", did: [] },
                        ];
                      }
                    }
                  } else {
                    if (hideOptionValidation) {
                      answerOptions = [
                        { _id: `99`, name: "No eligible members", did: [] },
                      ];
                    }
                  }
                  dynamicKeysObject = {
                    ...dynamicKeysObject,
                    options: answerOptions,
                  };
                }
              });
              break;
          }
        });

        el['selectedValue'] = [{ "label": "", "textValue": "", "value": dynamicKeysObject.value }];
        el['modelValue'] = dynamicKeysObject.value;
        el['value'] = dynamicKeysObject.value;
      })
    }
  }

  getParent(question) {
    const questionorder = question?.[0]?.nestedConfig?.parentOrder;
    return this.questionData.find((ele: any) => ele?.order == questionorder)
  }

  addQuestion(parent) {
    this.onChange(parent, { target: { value: '' + (parent.childQuestionData.length + 1) } });
  }

  removeLast(parent) {
    this.onChange(parent, { target: { value: '' + (parent.childQuestionData.length - 1) } });
  }

  pickLocation(question) {
    console.log(question);
  }
  getMarks(value) {
    console.log('values....', value)
    const marksObj = this.scoreOdfGfc.filter((obj) => {
      return obj.name === value;
    });
    console.log('marks..', marksObj);
    this.odfGfcMarks = marksObj[0]?.marks;
  }

  onPreview() {
    const dialogRef = this.matDialog.open(CommonPreviewTemplateComponent, {
      data:
      {
        qusResponce: this.questionresponse,
        qusAns: this.questionData,
        // finalRes:
      },
      width: "85vw",
      height: "100%",
      maxHeight: "90vh",
      panelClass: "no-padding-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  loadInParent(type: string) {
    this.onLoadInParent.emit(type)
  }

  showPreview() {
    this.onPreviewDUR.emit(this.questionData);
  }
  async verifyExcelSheet(file: File, fileAlias: string, name, fileType, question) {
    return new Promise((resolve, rej) => {
      let newObj = {
        alias: fileAlias,
        financialYear: "",
        design_year: '606aafc14dff55e6c075d3ec',
      };
      if (question?.shortKey === "unAudited.standardized_data.excel") {
        newObj.financialYear = "2021-22";
      } else {
        newObj.financialYear = "2022-23";
      }
      this.commonService.processData(newObj).subscribe(
        async (res) => {
          try {
            await this.checkExcelStatus(res["data"]);
            // setting url after verify---------
            this.isImageUploading = true;
            let questionValue: any = [
              {
                type: fileType,
                label: name,
                file: file,
                value: fileAlias,
              },
            ];
            console.log('questionValue', questionValue);
            let prepareImageObject = [{
              "label": name,
              "textValue": fileAlias,
              "value": fileAlias
            }];
            question['selectedValue'] = prepareImageObject;
          } catch (error) {
            console.log(
              "error?.data.message upload error",
              error?.data.message
            );
            this.removeUploadedFile(question, question?.order);
            this.openSnackBar(['Please upload valid template'], 4000);
          }
          resolve("Success");
        },
        (err) => {
          this.removeUploadedFile(question, question?.order);
          this.openSnackBar(['Please upload valid template'], 4000);
          rej(err);
        }
      );
    });
  }

  checkExcelStatus(res) {
    return new Promise((resolve, reject) => {
      const { _id } = res;
      this.commonService.getProcessStatus(_id.toString()).subscribe(
        (res) => {
          if (res["data"]["status"] === "FAILED") {
            reject(res);
          }
          resolve("Success");
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}


