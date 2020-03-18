import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'auditStatusText'
})
export class AuditStatusTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args.row.name !== 'Total') {
      if (args.row.audited) {
        return 'Audited';
      }
      if (args.row.auditNA) {
        return 'Not Available';
      }
      if (args.row.unaudited) {
        return 'Unaudited';
      }
    }
    return null;
  }

}
