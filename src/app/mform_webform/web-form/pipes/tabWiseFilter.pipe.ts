import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tabWiseFilter',
    pure: false
})
export class TabWiseFilterPipe implements PipeTransform {
    transform(items: any[],value?:any,keys?:any[],type?:string): any {
        if (!items) {
            return items;
        }
        if(value && (!keys || !keys.length)){
          return items.map((el:any) => {
            el['isDisplay'] = el.shortKey.includes(value);
            return el;
          });
        }

        return items.map((el:any) => {
          el['isDisplay'] = true;
          return el;
        });
    }
}
