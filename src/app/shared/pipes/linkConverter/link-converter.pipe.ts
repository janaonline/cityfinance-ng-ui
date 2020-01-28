import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "linkConverter"
})
export class LinkConverterPipe implements PipeTransform {
  private regexToExtractLink = /(http.*?(\s+|$))/g;
  transform(value: string, CustomName: string, parentElement: HTMLElement) {
    if (this.containsLink(value)) {
      const links = this.getLinks(value);
      const nonLinks = this.filteroutLinks(value);
      links.forEach((link, index) => {
        const element = this.createLinkElement(link, CustomName);
        parentElement.appendChild(element);
        element.insertAdjacentText("beforebegin", nonLinks[index] || " ");

        /**
         * Why we have adding a br element here?. It is so because we need to show link on a
         * seperate line.
         *
         */
        const brElement = document.createElement("br");
        element.insertAdjacentElement("afterend", brElement);
      });
      return;
    }
    return value;
  }

  private getLinks(stringToExtractLinkFrom: string) {
    return stringToExtractLinkFrom.match(this.regexToExtractLink);
  }

  private filteroutLinks(stringToFormat: string) {
    return stringToFormat
      .split(this.regexToExtractLink)
      .filter(
        value => value && !this.containsLink(value) && !value.match(/^(\r\n)$/g)
      );
  }

  private createLinkElement(link: string, nameToShow: string) {
    const element = document.createElement("a");
    element.href = link;
    element.setAttribute(`target`, "_blank");
    element.innerHTML = nameToShow;
    return element;
  }

  private containsLink(stringToCheck: string) {
    return (
      stringToCheck &&
      (stringToCheck.includes("http") ||
        stringToCheck.startsWith("localhost") ||
        stringToCheck.startsWith("127.0.0.1"))
    );
  }
}
