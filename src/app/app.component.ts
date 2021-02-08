import { Component } from '@angular/core';
import { HttpService } from '../app/shared/services/http.service';
import { DeviceDetectorService } from 'ngx-device-detector';
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMobile: boolean;
  title = 'A man will be born...';
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  imageSrc: string = "./assets/images/bob-baby.png";
  loading: boolean;
  isKind: boolean;
  birthdayYear: string;
  birthdayMonth: string;
  birthdayDay: string;
  toastMsg: string;

  constructor(
    private httpService: HttpService,
    private deviceService: DeviceDetectorService) {
    let deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = deviceService.isMobile();
  }

  generateData(): void {
    this.getRandomUser();
  }

  getRandomUser(): void {
    this.loading = true;
    this.httpService.getRundomUser().subscribe(res => {
      if (res) {
        this.isKind = true;
        this.getIid();
        let names = res.results[0].name;
        this.firstName = names.first;
        this.lastName = names.last;
        this.email = res.results[0].email;
        this.phone = res.results[0].phone;
        this.imageSrc = res.results[0].picture.large;
        this.setDob(res.results[0].dob.date);
        this.title = "Let's do another one...";
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  normalizeName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  getInc(num, i) {
    var inc = Number(num) * ((i % 2) + 1);
    return (inc > 9) ? inc -= 9 : inc;
  }
  getIid(): void {
    let iid = "", num, counter = 0;
    for (var i = 0; i < 8; i++) {
      num = this.getRandomInt((i < 2) ? 2 : 0, (i < 2) ? 3 : 9);
      iid += num.toString();
      counter += this.getInc(num, i);
    }
    this.id = iid + (10 - (counter % 10)).toString();
  }
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  setDob(dateStr: string): void {
    let date = new Date(dateStr);

    this.birthdayDay = date.getDate().toString();
    this.birthdayMonth = (date.getMonth() + 1).toString();
    this.birthdayYear = date.getFullYear().toString();
  }
  copyToClipboard(type: string, text: string): void {

    if (!text) {
      return;
    }

    var input = document.body.appendChild(document.createElement("input"));
    input.value = text;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);

    this.addToastMsg(`${type} copied to clipboard`);
  }

  addToastMsg(text: string): void {

    this.toastMsg = text;
    let myToastEl = document.getElementById('toast');
    myToastEl.addEventListener('hidden.bs.toast', function () {
      this.toastMsg = null;
    });
    $("#toast").toast('show');
  }

}

