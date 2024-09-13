import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BasicInfoComponent } from "./components/basic-info/basic-info.component";

import { AllCertificatesComponent } from './components/certificates-section/all-certificates/all-certificates.component';
import { BootcampCertificatesComponent } from './components/certificates-section/bootcamp-certificates/bootcamp-certificates.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BasicInfoComponent,
    BasicInfoComponent,

    AllCertificatesComponent,
    BootcampCertificatesComponent


  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'capitulo-01-angular';
}
