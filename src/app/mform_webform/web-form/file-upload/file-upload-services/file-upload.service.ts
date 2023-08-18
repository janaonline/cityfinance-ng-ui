import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError, map } from "rxjs/operators";
import { SnackBarComponent } from "../../snack-bar/snack-bar.component";
// import { environment } from "../../../../environments/environment";
// import { AuthService } from "../../../services/auth.service";
// import * as moment from 'moment'
import moment from "moment"
import { Subject } from "rxjs";

const blockChar = ["`", ";", "*", "%", "&", "|", "~", "<", ">", "^", "(", ")", "[", "]", "{", "}", "$", "\n", "\r"];

var sanitize = require("sanitize-filename");

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  hexCode: string | any;
  uploads: any[] = [];

  public afterMethodFileSelect: Subject<any> = new Subject();

  constructor(
    private httpClient: HttpClient,
    public snackBar: MatSnackBar,
    // private auth: AuthService
  ) // private commonService: CommonFunctionService,
  {}

  handlehttpError(request: any) {
    // const element = document.getElementById("check-custom-loader"); // Get element
    // element.style.visibility = "hidden"; // Hide element
    return throwError(request.message || "SERVER ERROR");
  }

  getS3Url(name: string,
    type: string,
    custom: boolean = false,
    label: string){
    let fileId = name+moment();
    return this.httpClient
        .post(
          'environment.base_uri' + "getS3Url", // url part need to be changed
          JSON.stringify([
            {
              file_name: name,
              mime_type: type,
              custom: custom,
              label: label,
            },
          ]),
          // this.auth.setHttpBasicHeaders()
          {} // add headers part
        ).pipe(map((response: any) => {
            return {...response, fileId }
          }),
          catchError( (error:any) => this.handlehttpError(error))
        ).toPromise();
  }

  uploadFileUrl(url:string, img:any, fileId:any) {
    console.log(url,img,fileId)
    let progress;
    const fd = new FormData();
    fd.append("image", img, img["name"].replaceAll(/–/g, ""));
    return this.httpClient.put(url, img, { reportProgress: true, observe: "events" })
      .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            progress = Math.round((100 / event.total) * event.loaded);
            return {progress};
            // console.log("###",progress)
          } else if (event.type == HttpEventType.Response) {
            progress = null;
            return {progress,success:true};
          } else {
            return event;
          }
        }),
        catchError((err: any) => {
          progress = null;
          return throwError({ error: err, fileId });
        })
      )
  }

  async uploadDataTos3(
    name: string,
    type: string,
    custom: boolean = false,
    label: string,
    size: number = 0,
    event = {},
    maxFileSize = 2101546
  ) {
    /**
     * @param maxFileSize in Bytes(B)
     * 1000     =   1 KB;
     * 2500000  = 2.5 MB;
     * 5500000  = 5.5 MB;
     * 10490000 = 10.49 MB;
     ** */
    name = name.replace(/\s+/g, "_");
    let isValidFile;
    if (Object.keys(event).length != 0) {
      isValidFile = await this.checkValidFile(event);
    }
    if (Object.keys(event).length != 0 && isValidFile && isValidFile.includes("Unknown")) {
      this.openSnackBar(["Please upload vaild file."], 4000);
      return;
    }
    // let blockChar =["`", ";", "*", "%", "&", "|", "*", "~", "<", ">", "^", "(", ")", "[", "]", "{", "}", "$", "\n", "\r",";"];
    let blockChars = blockChar;
    let forNameCheck = name.split("");
    console.log("blockChars", blockChars);
    for (const ele of forNameCheck) {
      if (blockChars.includes(ele)) {
        console.log(">>>");
        this.openSnackBar(
          [`File name should not contain ${blockChars.join(" ")}`],
          4000
        );
        return;
      }
    }

    let isSize = false;
    await this.checkSize(size,maxFileSize).then(res => isSize = res);

    console.log(type);
    name = name.replace(/–/g, "");
    let filename = sanitize(name);
    let isAllowed = filename.match(
      /\.(aspx|asp|css|swf|xhtml|rhtml|shtml|jsp|js|pl|php|cgi|zip|bat|app|bas|cer|cmd|com|csh|exe|htc|msi)$/gim
    );
    if (!isAllowed && isSize) {
      return this.getS3Url(name,type,custom,label);
    }
  }

  checkSize(size:any,maxFileSize = 2101546){
    /**
     * @param maxFileSize in Bytes(B)
     * 1000     =   1 KB;
     * 2500000  = 2.5 MB;
     * 5500000  = 5.5 MB;
     * 10490000 = 10.49 MB;
     ** */
    console.log(maxFileSize);
    let isSize;
    if (size == 0 && !maxFileSize) {
      isSize = true;
    }
    if (size < 1000) {
      isSize = false;
      this.openSnackBar([`Please upload file minimum of 1 KB`], 4000);
      // return throwError("Please upload file minimum of 1 KB");
      return Promise.reject(`Please upload file minimum of 1 KB`);
    }
    if (size > maxFileSize) {
      isSize = false;
      let size = this.formatBytesToDisplay(maxFileSize);
      this.openSnackBar([`Please upload file upto ${size}`], 4000);
      // return throwError(`Please upload file upto ${size}`);
      return Promise.reject(`Please upload file upto ${size}`);
    }
    return Promise.resolve(true)
  }

  checkValidFile(event:any) {
    let uploads:any[] = [];
    var file = event.target.files[0];
    let getTypeS;
    var filereader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      filereader.onload = (evt: any) => {
        if (evt.target.readyState === FileReader.DONE) {
          // const uint = new Uint8Array(evt.target.result)
          var uint = new Uint8Array(<ArrayBuffer>evt.target.result).subarray(0 ,4 );
          let bytes:any[] = [];
          uint.forEach((byte) => {
            bytes.push(byte.toString(16));
          });
          this.hexCode = "";
          const hex = bytes.join("").toUpperCase();
          this.hexCode = bytes.join("").toUpperCase();
          uploads.push({
            filename: file.name,
            filetype: file.type ? file.type : "Unknown/Extension missing",
            binaryFileType: this.getMimetype(hex),
            hex: hex,
          });
          this.uploads = uploads;
          // render()
          getTypeS = this.getMimetype(hex);
          if (uploads) {
            resolve(getTypeS);
          } else {
            reject("fail to do");
          }
        }
      };
      filereader.readAsArrayBuffer(file);
    });
  }

  getMimetype(signature:string) {
    console.log(signature);
    switch (signature) {
      case "89504E47":
        return "image/png";
      case "47494638":
        return "image/gif";
      case "25504446":
        return "application/pdf";
      case "FFD8FFDB":
      case "FFD8FFE0":
      case "FFD8FFE1":
        return "image/jpeg";
      // case '504B0304':
      //   return 'application/zip'
      case "5F69642C":
      case "D0CF11E0":
      case "EFBBBF23":
      case "EFBBBF44":
      case "4E474F20":
      case "22437573":
        return "application/vnd.ms-excel";
      // case 'D0CF11E0':
      //   return 'application/vnd.ms-excel'
      case "504B34":
        return "application/document";
      case "00020":
        return "video/mp4";
      case "1A45DFA3":
        return "video/x-matroska";
      case "3026B275":
        return "video/x-ms-wmv";
      default:
        return "Unknown filetype";
    }
  }

  formatBytesToDisplay(bytes:number){
    let kb = 1024;
    let ndx = Math.floor( Math.log(bytes) / Math.log(kb) );
    let fileSizeTypes = ["bytes", "KB", "MB", "GB", "TB", "PB"];
    return (bytes / kb / kb).toFixed(1)+fileSizeTypes[ndx]
  }

  private openSnackBar(message: string[], duration: number) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration,
    });
  }
}
