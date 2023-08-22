import { Directive, HostListener, Input } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../../snack-bar/snack-bar.component";
import { VALIDATION } from "../../utilities/appForm/constants";

@Directive({
    selector: "[wordLimit]",
})
export class WordLimitClassDirective {
    @Input() wordLimit: any;
    pasteData: string = '';
    constructor( public snackBar: MatSnackBar) {}

    @HostListener("keydown", ["$event"]) onKeydown(e: any) {
        let validation = this.wordLimit?.validation.find((el: { _id: string; }) => el?._id == VALIDATION?.WORD_LIMIT);
        this.pasteData = e.target.value;
        let limit = this.pasteData.split(/\s+/).length;
        this.restrictWordAccordingToLimit(limit,validation,e)
    }

    @HostListener("paste", ["$event"]) async pasteEvent(e: any) {
        let validation = this.wordLimit.validation.find((el: { _id: string; }) => el._id == VALIDATION?.WORD_LIMIT);
        let clipboardData = e.clipboardData || window.Clipboard;
        this.pasteData += clipboardData.getData("text");
        let arr = await this.pasteData.trim().split(/\s+/)
        this.restrictWordAccordingToLimit(arr.length,validation,e)
    }

    showMessage(validation: any = {}) {
        this.openSnackBar([`Maximum ${validation?.value} words are allowed to enter`], 3000);
    }

    openSnackBar(data: string[], duration: number) {
        this.snackBar.openFromComponent(SnackBarComponent, { data, duration });
    }

    restrictWordAccordingToLimit(limit: any,validation: any,e: any){
        if (limit > (Number(validation?.value))) {
            if (e.key && e.key == "Backspace") {
                return ;
            } else {
                e.preventDefault();
                this.showMessage(validation);
            }
        }else{
            return
        }
}
}
