
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileUrlCheck'
})
export class FileUrlCheckPipe implements PipeTransform {
  transform(url: string, targetExtension: string, allowedExtensions: string[]): boolean {
    const fileExtensionRegex = new RegExp(`\\.${targetExtension}$`, 'i');
    const hasTargetExtension = fileExtensionRegex.test(url);
    const isAllowedExtension = allowedExtensions.includes(targetExtension.toLowerCase());

    return hasTargetExtension && isAllowedExtension;
  }
}