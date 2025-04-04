import {
    Directive,
    ElementRef,
    Input,
    Output,
    HostListener,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    NgZone, Inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CountUp, CountUpOptions } from './countUp';

@Directive({
    selector: '[countUp]'
})
export class CountUpDirective implements OnChanges {

    countUp: CountUp;
    // the value you want to count to
    @Input('countUp') endVal: number;

    @Input() options: CountUpOptions = {};
    @Input() reanimateOnClick = true;
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() complete = new EventEmitter<void>();

    // Re-animate if preference is set.
    @HostListener('click')
    onClick() {
        if (this.reanimateOnClick) {
            this.animate();
        }
    }

    constructor(
        private el: ElementRef,
        private zone: NgZone,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        // don't animate server-side (universal)
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const { options, endVal } = changes;
        if (endVal?.currentValue !== undefined) {
            if (this.countUp !== undefined) {
                this.zone.runOutsideAngular(() => {
                    this.countUp.update(this.endVal);
                });
            } else {
                this.initAndRun();
            }
        }
        else if (options?.currentValue !== undefined) {
            this.initAndRun();
        }
    }

    animate(): void {
        this.zone.runOutsideAngular(() => {
            this.countUp.reset();
            this.countUp.start(() => {
                this.zone.run(() => {
                    this.complete.emit();
                });
            });
        });
    }

    private initAndRun(): void {
        this.zone.runOutsideAngular(() => {
            this.countUp = new CountUp(this.el.nativeElement, this.endVal, this.options);
            if (!this.options.enableScrollSpy) {
                this.animate();
            }
        });
    }
}