import {
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    Renderer2,
    SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { S3Service } from '../services/s3.service';

@Directive({
    selector: 'a[appSignedUrl]',
    host: {
        '(click)': 'onClick($event)',
    },
})
export class SignedUrlDirective implements OnDestroy {
    @Input('appSignedUrl') storagePath: string | null | undefined;

    private sub?: Subscription;
    private resolvedHref = '';
    private loading = false;

    constructor(
        private elRef: ElementRef<HTMLAnchorElement>,
        private renderer: Renderer2,
        private sanitizer: DomSanitizer,
        private s3Service: S3Service,
    ) { }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    onClick(event: MouseEvent): void {
        const raw = (this.storagePath || '').trim();

        if (!raw) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        // If already resolved once, let normal anchor behavior continue.
        if (this.resolvedHref) {
            return;
        }

        // Direct https URL: set once and let next click / same click work.
        if (this.isAbsoluteHttpsUrl(raw)) {
            const safeUrl = this.toSafeHttpsUrl(raw);
            if (!safeUrl) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }

            this.applyHref(safeUrl);
            this.resolvedHref = safeUrl;
            return;
        }

        // Prevent navigation until signed URL is ready.
        event.preventDefault();
        event.stopPropagation();

        if (this.loading) {
            return;
        }

        this.loading = true;
        this.renderer.setAttribute(this.elRef.nativeElement, 'aria-busy', 'true');

        this.sub?.unsubscribe();
        this.sub = this.s3Service.getSignedUrl(raw).subscribe({
            next: (signedUrl) => {
                this.loading = false;
                this.renderer.removeAttribute(this.elRef.nativeElement, 'aria-busy');

                const safeUrl = this.toSafeHttpsUrl(signedUrl);
                if (!safeUrl) {
                    return;
                }

                this.applyHref(safeUrl);
                this.resolvedHref = safeUrl;

                const target = this.elRef.nativeElement.getAttribute('target') || '_self';

                if (target === '_blank') {
                    window.open(safeUrl, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = safeUrl;
                }
            },
            error: () => {
                this.loading = false;
                this.renderer.removeAttribute(this.elRef.nativeElement, 'aria-busy');
            },
        });
    }

    private applyHref(url: string): void {
        this.renderer.setAttribute(this.elRef.nativeElement, 'href', url);

        if (this.elRef.nativeElement.getAttribute('target') === '_blank') {
            this.renderer.setAttribute(
                this.elRef.nativeElement,
                'rel',
                'noopener noreferrer'
            );
        }
    }

    private isAbsoluteHttpsUrl(value: string): boolean {
        try {
            const url = new URL(value);
            return url.protocol === 'https:';
        } catch {
            return false;
        }
    }

    private toSafeHttpsUrl(value: string): string {
        const sanitized = this.sanitizer.sanitize(
            SecurityContext.URL,
            (value || '').trim()
        );
        if (!sanitized) return '';

        try {
            const parsed = new URL(sanitized);
            return parsed.protocol === 'https:' ? parsed.toString() : '';
        } catch {
            return '';
        }
    }
}