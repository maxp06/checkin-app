import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { Checkin } from './checkin';
import { RegistrationService } from './registration.service';
import { CheckinRequest } from './checkinRequest';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(private http: HttpClient, private registrationService: RegistrationService) { }

  getCheckins(): Observable<Checkin[]> {
    return this.http.get<Checkin[]>("/api/checkins").pipe(
      map((checkins: Checkin[]) => {
        // Map the 'created_at' string to Date for each checkin
        return checkins.map((checkin: Checkin) => {
          return {
            ...checkin,
            created_at: new Date(checkin.created_at)
          };
        });
      })
    );
  }

  registerCheckin(pid: number): Observable<Checkin> {
    let errors: string[] = [];

    if (pid.toString().length !== 9) {
      errors.push(`Invalid PID: ${pid}`);
    }

    if (pid === null) {
      errors.push(`PID required.`);
    }

    if (errors.length > 0) {
      return throwError(() => { return new Error(errors.join("\n")) });
    }

    let checkin: CheckinRequest = { pid }
    return this.http.post<Checkin>('/api/checkins', checkin)
  }
}
