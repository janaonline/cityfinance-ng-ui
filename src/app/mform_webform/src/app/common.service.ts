import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { QUESTION_TYPE, VALIDATION} from "./utilities/appForm/constants/index";
var sanitize = require('sanitize-filename');

const blockChar = [
  '`',
  ';',
  '*',
  '%',
  '&',
  '|',
  '~',
  '<',
  '>',
  '^',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
  '$',
  '\n',
  '\r',
];

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  iconList = [
    { type: "xlsx", icon: "fa fa-file-excel-o" },
    { type: "xls", icon: "fa fa-file-excel-o" },
    { type: "pdf", icon: "fa fa-file-pdf-o" },
    { type: "image", icon: "fa fa-file-image-o" },
    { type: "zip", icon: "fa fa-file-zip-o" },
    { type: "doc", icon: "fas fa-file-word" },
    { type: "docx", icon: "fas fa-file-word" },
    { type: "ppt", icon: "fas fa-file-word" },
    { type: "pptx", icon: "fas fa-file-powerpoint" },
  ];

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar) {}

  setHttpHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'organisation': '61050419b09e441a5382800c',
      'x-access-token': sessionStorage.getItem('token') ?? ''
    });
    return { headers };
  }

  getFormDetails(formId: string = '', lng: string = 'en') {
    return this.httpClient
      .get(
        `https://stagingmgrantadminapi.dhwaniris.in/api/admin/v1/survey-form-builder/form-get/${formId}?language=${lng}`,
        this.setHttpHeaders()
      )
      .pipe(
        map((response: any) => ({
          ...response,
          data: response['data'].map((question: any) =>
            this.mapSurveyorForms(question)
          ),
        }))
      )
      .toPromise();
  }

  private mapSurveyorForms(form: any) {
    return {
      ...form,
      language: this.setEnglishLanguageToZeroIndex(form.language),
    };
  }

  private setEnglishLanguageToZeroIndex(
    languageList: { lng: string; title: string; _id: string }[]
  ) {
    if (languageList.length < 2) {
      return languageList;
    }
    if (languageList.length && languageList[0].lng === 'en') {
      return languageList;
    }
    let newList = [...languageList];
    const englishLanguageIndex = newList.findIndex(
      (language) => language.lng === 'en'
    );
    if (englishLanguageIndex) {
      [newList[0], newList[englishLanguageIndex]] = [
        newList[englishLanguageIndex],
        newList[0],
      ];
    }
    return newList;
  }

  getImageUrl(url: string, img: any) {
    const fd = new FormData();
    fd.append('image', img, img['name'].replaceAll(/–/g, ''));
    return this.httpClient
      .put(url, img)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          console.log(error);
          return error;
        })
      )
      .toPromise();
  }

  async uploadTos3(
    name: string,
    type: string,
    size: number = 0,
    event = {},
    maxFileSize = false,
    isByPassFileNameCheck: boolean = true
  ) {
    //  5242880 B == 5 mb
    // 2097152 B == 2 mb
    if (isByPassFileNameCheck) {
      let blockChars = blockChar;
      name = name.replace(/\s+/g, '_');
      let forNameCheck = name.split('');
      for (const ele of forNameCheck) {
        if (blockChars.includes(ele)) {
          console.log('>>>', ele);
          // isBlackList = true
          this.openSnackBar(
            [`File name should not contain ${blockChars.join(' ')}`],
            4000
          );
          return;
        }
      }
    }
    let isValidFile = await this.checkValidFile(event);
    console.log('resresresres', isValidFile);
    console.log('uploadTos3', size);
    // if(size >= 5242880){
    // if (5242880 <= size) {
    if (Object.keys(event).length != 0 && isValidFile.includes('Unknown')) {
      this.openSnackBar(['Please upload vaild file.'], 4000);
      return;
    }
    let isSize = true;
    if (size == 0 && !maxFileSize) {
      isSize = true;
    }

    if (size < 1000) {
      isSize = false;
      this.openSnackBar(['Please upload file minimum of 1 KB '], 4000);
      return;
    }
    if (2097152 <= size && !maxFileSize) {
      isSize = false;
      this.openSnackBar(['Please upload file upto 2 MB'], 4000);
      return;
    }
    if (size > 10485760 && maxFileSize) {
      this.openSnackBar(['Please upload file upto 10 MB'], 3000);
      return;
    }
    console.log(type);
    name = name.replace(/–/g, '');
    let filename = sanitize(name);
    // console.log('filename', filename)
    //    let isAllowed = filename.match(/\.(jpg|jpeg|png)$/i)
    let isAllowed = filename.match(
      /\.(aspx|asp|css|swf|xhtml|rhtml|shtml|jsp|js|pl|php|cgi|zip|bat|app|bas|cer|cmd|com|csh|exe|htc|msi)$/gim
    );
    // let isAllowed2 = filename.match(/\.(jpg|jpeg|png)$/i)
    console.log('>>isAllowed', isAllowed);
    // console.log(">>isAllowed222", isAllowed2)
    if (isByPassFileNameCheck && isAllowed) {
      console.log(">>isAllowed", isAllowed);
      this.openSnackBar(["Please upload valid file"], 4000);
      const element: HTMLElement = document.getElementById("check-custom-loader")!;	// Get element
      element.style.visibility = "hidden";			// Hide element
      return;
    }
    if (!isAllowed && isSize) {
      return this.httpClient
        .post(
          'https://stagingmgrantadminapi.dhwaniris.in/api/admin/v1/' +
            'getS3Url',
          JSON.stringify([
            {
              file_name: name,
              mime_type: type,
            },
          ]),
          this.setHttpHeaders()
        )
        .pipe(
          map((response: any) => {
            return response;
          }),
          catchError((error) => {
            console.log(error);
            return error;
          })
        )
        .toPromise();
    }
  }

  getAnswerOptionList(bodyContent: any, apiEndPoint: any) {
    return this.httpClient
      .post(
        `https://stgmandm.mgrant.dhwaniris.com/api/admin/v1/${apiEndPoint}`,
        JSON.stringify(bodyContent),
        this.setHttpHeaders()
      )
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error) => {
          console.log(error);
          return error;
        })
      )
      .toPromise();
  }

  getAllDistrictsWithOrWithoutProjectId() {
    return this.httpClient.get('https://stagingmgrantadminapi.dhwaniris.in/api/admin/v1/' + 'district', this.setHttpHeaders())
      .toPromise();
  }

  checkValidFile(event: any) {
    let uploads: any[] = [];
    var file = event.target.files[0];
    let getTypeS;
    var filereader = new FileReader();
    // filereader.onloadend = function(evt) {
    return new Promise<string>((resolve, reject) => {
      filereader.onload = (evt: any) => {
        if (evt.target.readyState === FileReader.DONE) {
          // const uint = new Uint8Array(evt.target.result)
          var uint = new Uint8Array(<ArrayBuffer>evt.target.result).subarray(
            0,
            4
          );
          let bytes: any[] = [];
          uint.forEach((byte) => {
            bytes.push(byte.toString(16));
          });
          let hexCode: string = '';
          const hex = bytes.join('').toUpperCase();
          hexCode = bytes.join('').toUpperCase();

          uploads.push({
            filename: file.name,
            filetype: file.type ? file.type : 'Unknown/Extension missing',
            binaryFileType: this.getMimetype(hex),
            hex: hex,
          });
          getTypeS = this.getMimetype(hex);
          if (uploads) {
            resolve(getTypeS);
          } else {
            reject('fail to do');
          }
        }
      };
      filereader.readAsArrayBuffer(file);
    });
  }

  getMimetype(signature: string) {
    switch (signature) {
      case '89504E47':
        return 'image/png';
      case '47494638':
        return 'image/gif';
      case '25504446':
        return 'application/pdf';
      case 'FFD8FFDB':
      case 'FFD8FFE0':
      case 'FFD8FFE1':
        return 'image/jpeg';
      // case '504B0304':
      //     return 'application/zip'
      case '5F69642C':
      case 'D0CF11E0':
      case 'EFBBBF23':
      case 'EFBBBF44':
      case '4E474F20':
      case '22437573':
      case '546F6B65':
      case '2247616D':
      case 'A557365':
        return 'application/vnd.ms-excel';
      //  case 'D0CF11E0':
      //     return 'application/vnd.ms-excel'
      case '504B34':
        return 'application/document';
      case '00020':
        return 'video/mp4';
      case '1A45DFA3':
        return 'video/x-matroska';
      case '3026B275':
        return 'video/x-ms-wmv';
      default:
        return 'Unknown filetype';
      // return false
    }
  }

  private openSnackBar(message: string[], duration: number) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration,
    });
  }

  getFileExtensionFromURL(url: any) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  /**
   * Given a file type, return the icon for that file type
   * @param {any} fileType - The file type to get the icon for.
   * @returns The icon for the file type.
   */
   getFileTypeIcon(fileType: any) {
    let obj = this.iconList.find(icon => icon?.type == fileType);
    if (obj) {
      return obj?.icon;
    } else {
      return "fa fa-file-alt";
    }
  }

  onFocusEvent(inputFieldId: string) {
    // e.g = <input type="text" id="someId" autocomplete="randomString" name="randomString">
    // inputFieldId is id of html input element. from above example inputFieldId = someId
    let focusElement = document.getElementById(inputFieldId);
    const randomString = Math.random().toString(36).slice(-6);
    if (focusElement) {
      focusElement.setAttribute('name', randomString);
      focusElement.setAttribute('autocomplete', randomString);
    }
  }

  getModalValue(data: any) {
    let modalValue = data && data.selectedValue && data.selectedValue[0];
    if (modalValue) {
      return modalValue.textValue ? modalValue.textValue : modalValue.value ? modalValue.value : (!data.hasOwnProperty('answer_option') || data.answer_option.length == 0) ? '' : modalValue._id;
    } else {
      return "";
    }
  }

  questionMapping(item: any, isViewOnly: boolean = false) {
    item["modelValue"] = this.getModalValue(item);
    item["value"] = this.getModalValue(item);
    if (item && item.validation && item.validation.length) {
      let findQuestionDisabledForUser = item.validation.find((item: any) => item._id == VALIDATION.DISABLED_FOR_USER);
      item["isQuestionDisabled"] = findQuestionDisabledForUser ? true : false;

      let addPrefixTagInField = item.validation.find((prefixValidation: any) => prefixValidation._id == VALIDATION.PREFIX_TAG);
      console.log('addPrefixTagInField', addPrefixTagInField);
      if (addPrefixTagInField) {
        item['addPrefixInsideField'] = true;
        item['prefixValue'] = addPrefixTagInField?.value;

        let prefixValueLength = addPrefixTagInField?.value?.length;
        let modelValuePrefix = item?.modelValue?.substring(0, prefixValueLength);
        if (addPrefixTagInField?.value != modelValuePrefix) {
          const errorMsg = `${item?.title} must be starting with ${item?.addPrefixTagInField?.value}`;
          item['errorMessage'] = item && item.hint ? item.hint : errorMsg;
        }
      }

      let isLabelInstructionValidationExist = item.validation.find((prefixValidation: any) => prefixValidation._id == VALIDATION.LABEL_INSTRUCTION);
      console.log('isLabelInstructionValidationExist', isLabelInstructionValidationExist);
      if (isLabelInstructionValidationExist) {
        item['labelInstruction'] = isLabelInstructionValidationExist?.value;
      }

      let isDecimalValidationExist = item.validation.find((prefixValidation: any) => prefixValidation._id == VALIDATION.DECIMAL_PLACE);
      if (isDecimalValidationExist) {
        item['skipDigitOnlyValidation'] = true;
      } else {
        item['skipDigitOnlyValidation'] = false;
      }
    }
    item.selectedValue = item.selectedValue?item.selectedValue:[]
    for (const answer of item.selectedValue) {
      answer['label'] = answer.label ? answer.label : answer.name ? answer.name : '';
      answer['textValue'] = answer.textValue ? answer.textValue : '';
      answer['value'] = answer.value ? answer.value : (!item.hasOwnProperty('answer_option') || item.answer_option.length == 0) ? '' : answer._id;
    }
    if (item.input_type == "4" || item.input_type == "6") {
      item["value"] = item.selectedValue.map((item: { value: any; }) => item.value);
      item['selectedOptions'] = item.selectedValue.length > 1 ? `${item.selectedValue[0].label}...+ ${item.selectedValue.length - 1} more` : item.selectedValue.length == 1 ? item.selectedValue[0].label : '';
      for (const answer of item.selectedValue) {
        answer['label'] = answer.label ? answer.label : answer.name ? answer.name : '';
        answer['textValue'] = answer.textValue ? answer.textValue : '';
        answer['value'] = answer.value ? answer.value : (!item.hasOwnProperty('answer_option') || item.answer_option.length == 0) ? '' : answer._id;
        for (const option of item.answer_option) {
          option['value'] = option._id;
          option['label'] = option.name;
        }
        let answerOptionIndex = item.answer_option.findIndex(
          (option: { _id: any }) => option._id == answer.value
        );
        console.log("answerOptionIndex", answerOptionIndex);
        if (answerOptionIndex > -1) {
          item.answer_option[answerOptionIndex]["checked"] = true;
        }
      }
    }
    if (isViewOnly) {
      item["isQuestionDisabled"] = true;
    }
    return item;
  }
}
