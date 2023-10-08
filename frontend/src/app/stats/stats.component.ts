import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { CheckinService } from '../checkin.service';
import { Checkin } from '../checkin';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private registrationService: RegistrationService, private checkinService: CheckinService) { }

  public users$: Observable<User[]> | undefined;
  public checkins$: Observable<Checkin[]> | undefined;

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.users$ = this.registrationService.getUsers();
    this.checkins$ = this.checkinService.getCheckins();
  }

  deleteUser(pid: number) {
    this.registrationService.deleteUser(pid).subscribe(() => this.loadData())
  }

}