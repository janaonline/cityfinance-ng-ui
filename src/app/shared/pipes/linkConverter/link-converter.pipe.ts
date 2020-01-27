import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "linkConverter"
})
export class LinkConverterPipe implements PipeTransform {
  transform(value: string, CustomName: string, parentElement: HTMLElement) {
    if (this.isLink(value)) {
      const element = document.createElement("a");
      element.href = value;
      element.setAttribute(`target`, "_blank");
      element.innerHTML = CustomName;
      parentElement.appendChild(element);
      return;
    }
    return value;
  }

  private isLink(value: string) {
    return (
      value &&
      (value.startsWith("http") ||
        value.startsWith("https") ||
        value.startsWith("localhost") ||
        value.startsWith("127.0.0.1"))
    );
  }
}
