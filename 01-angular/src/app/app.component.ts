import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BasicInfoComponent } from "./components/basic-info/basic-info.component";
import { AllCertificatesComponent } from './components/certificates-section/all-certificates/all-certificates.component';
import { BootcampCertificatesComponent } from './components/certificates-section/bootcamp-certificates/bootcamp-certificates.component';
import { CertificatesSectionComponent } from './components/certificates-section/certificates-section.component';
import { ProjectsSectionComponent } from "./components/projects-section/projects-section.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BasicInfoComponent,
    AllCertificatesComponent,
    BootcampCertificatesComponent,
    CertificatesSectionComponent,    ProjectsSectionComponent,
    
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Setembro 12';
}