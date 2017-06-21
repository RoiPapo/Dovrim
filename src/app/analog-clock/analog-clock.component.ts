import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.css']
})
export class AnalogClockComponent implements OnInit {
  @ViewChild('clock') clock;
  stylesDeg: string;
  constructor() { }

  ngOnInit() {
    this.analogClockStart();
  }


analogClockStart() {
    //generate clock animations
    var now = new Date(),
      hourDeg = now.getHours() / 12 * 360 + now.getMinutes() / 60 * 30,
      minuteDeg = now.getMinutes() / 60 * 360 + now.getSeconds() / 60 * 6,
      secondDeg = now.getSeconds() / 60 * 360;
    this.stylesDeg = [
      "@-webkit-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
      "@-webkit-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
      "@-webkit-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}",
      "@-moz-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
      "@-moz-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
      "@-moz-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}"
    ].join("");
    this.clock.nativeElement.outerHTML = `<style>${this.stylesDeg}</style>` + this.clock.nativeElement.outerHTML;
    // document.getElementById("clock-animations").innerHTML = this.stylesDeg;

  }

}
