import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  durationInSeconds = 5;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  persona: any;
  bannerUrl = "";
  constructor(fb: FormBuilder,
    private readonly mainService: MainService) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });

    this.persona = mainService.persona;

  }

  ngOnInit(): void {

  }

  uriCambiada(uri: string) {
    this.bannerUrl = uri;
  }

}