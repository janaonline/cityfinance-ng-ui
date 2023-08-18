import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fileIcon'
})

export class GetFileIcon implements PipeTransform{
  transform(name: string): string {
    let iconList = [ // array of icon class list based on type
      { type: "xlsx", icon: "ic-xls" },
      { type: "xls", icon: "ic-xls" },
      { type: "pdf", icon: "ic-pdf" },
      { type: "jpg", icon: "ic-img" },
      { type: "cr2", icon: "ic-img" },
      { type: "png", icon: "ic-img" },
      { type: "gif", icon: "ic-img" },
      { type: "doc", icon: "ic-word" },
      { type: "docx", icon: "ic-word" },
      { type: "zip", icon: "ic-zip" },
      { type: "rar", icon: "ic-zip" },
      { type: "csv", icon: "ic-csv" }
    ];
    let ext = name?.split(".")?.pop()?.toLowerCase();
    let obj = iconList.filter((row: any) => {
      if (row.type === ext) {
        return true;
      } else {
        return false;
      }
    });
    if (obj?.length > 0) {
      let icon = obj[0].icon;
      return icon;
    } else {
      return "";
    }
  }
}