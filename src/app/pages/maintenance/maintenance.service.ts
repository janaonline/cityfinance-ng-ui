// maintenance.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, timer } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MaintenanceService {

    maintenanceSubject = new BehaviorSubject<boolean>(false);
    maintenance$ = this.maintenanceSubject.asObservable();

    constructor(private http: HttpClient) { }

    checkMaintenance() {
        return this.http.get<{ maintenance: boolean }>(environment.api.url + 'common/maintenance')
            .pipe(
                catchError(() => of({ maintenance: true })),
                tap(response => this.maintenanceSubject.next(response.maintenance))
            );
    }

    pollUntilUp(intervalMs = 30000) {
        return timer(0, intervalMs).pipe(
            switchMap(() => this.checkMaintenance())
        );
    }
}
