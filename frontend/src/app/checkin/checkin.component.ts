import { Component } from '@angular/core';
import { CheckinService } from '../checkin.service';
import { FormBuilder } from '@angular/forms';
import { Checkin } from '../checkin';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent {
  form = this.formBuilder.group({
    pid: '',
  });

  constructor(
    private checkinService: CheckinService,
    private formBuilder: FormBuilder,
  ) { }

  onSubmit(): void {
    let form = this.form.value;
    let pid = parseInt(form.pid ?? "");

    this.checkinService
      .registerCheckin(pid)
      .subscribe({
        next: (checkin) => this.onSuccess(checkin),
        error: (err) => this.onError(err)
      });
  }

  private onSuccess(checkin: Checkin): void {
    window.alert(`Thanks for checking in: ${checkin.user.first_name} ${checkin.user.last_name}`);
    this.form.reset();
  }

  private onError(err: Error) {
    if (err.message) {
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }
}
