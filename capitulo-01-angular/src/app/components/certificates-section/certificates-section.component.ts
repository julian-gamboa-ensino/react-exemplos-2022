import { Component } from '@angular/core';
import { BootcampCertificatesComponent } from "./bootcamp-certificates/bootcamp-certificates.component";
import { AllCertificatesComponent } from "./all-certificates/all-certificates.component";


@Component({
  selector: 'app-certificates-section',
  standalone: true,
  imports: [BootcampCertificatesComponent, AllCertificatesComponent],
  templateUrl: './certificates-section.component.html',
  styleUrl: './certificates-section.component.scss'
})
export class CertificatesSectionComponent {

}
