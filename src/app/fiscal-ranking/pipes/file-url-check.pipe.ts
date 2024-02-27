
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileUrlCheck'
})
export class FileUrlCheckPipe implements PipeTransform {
  transform(url: string, targetExtension: string, allowedExtensions: string[]): boolean {
    /* this method check the target extension from allowedExtensions and file url */
    const fileExtensionRegex = new RegExp(`\\.${targetExtension}$`, 'i');
    const hasTargetExtension = fileExtensionRegex.test(url);
    const isAllowedExtension = allowedExtensions.includes(targetExtension.toLowerCase());

    return hasTargetExtension && isAllowedExtension;
  }
}