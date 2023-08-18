import { Pipe, PipeTransform } from '@angular/core';

const sequencePriority = {
  sanitation_tableView: 9,
  solidWaste_tableView: 18,
  stormWater_tableView: 26
}

@Pipe({
  name: 'tableSequence'
})
export class TableSequencePipe implements PipeTransform {

  transform(value: unknown, parent): unknown {
    return Math.round(value + (sequencePriority[parent.shortKey] || 0));
  }

}
