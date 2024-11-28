import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabWiseFilter',
  pure: false
})
export class TabWiseFilterPipe implements PipeTransform {
  transform(
    items: any[],
    value?: any,
    keys?: any[],
    showOptionBox?: boolean
  ): any {
    if (!items) {
      return items;
    }
    if (value && (!keys || !keys.length)) {
      return items.map((el: any) => {

        if (showOptionBox == false && el.shortKey.includes(value) && ["audited.submit_annual_accounts", "unAudited.submit_annual_accounts"].includes(el.shortKey)) {
          el['isDisplay'] = false;
        }
        else { el['isDisplay'] = el.shortKey.includes(value); }

        return el;
      });
    }

    return items.map((el: any) => {
      el['isDisplay'] = true;
      return el;
    });
  }
}
