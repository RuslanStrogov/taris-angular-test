import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-auto-refresh',
  templateUrl: './auto-refresh.component.html',
  styleUrls: ['./auto-refresh.component.scss'],
})
export class AutoRefreshComponent implements OnInit {
  @Input('autoStart') autoStart: boolean;
  @Input('seconds') seconds: number;
  @Output('refresh') refresh = new EventEmitter<any>();

  timerSeconds: number = 10;
  timerCurrent: number = 0;
  timerLeft: number;

  subscription: any;

  constructor() {}

  ngOnInit(): void {
    if (this.seconds) {
      this.timerSeconds = this.seconds;
    }
    if (this.autoStart) {
      this.timerStart();
    }
  }

  timerClear() {
    this.timerStop();
    this.timerCurrent = 0;
    this.timerLeft = this.timerSeconds;
  }

  timerStart() {
    this.timerClear();
    this.subscription = timer(1000, 1000).subscribe((val) => {
      this.timerCurrent = val + 1;
      this.timerLeft = this.timerSeconds - this.timerCurrent;
      if (this.timerLeft === 0) {
        this.doRefresh();
        this.timerClear();
        // this.timerStart();
      }
    });
  }

  timerStop() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  timerChange(event: any) {
    if (event.checked) {
      this.timerStart();
    } else {
      this.timerStop();
    }
  }

  doRefresh() {
    this.refresh.emit();
  }
}
