import { Component, OnInit } from '@angular/core';
import {  NgFor, NgIf } from '@angular/common';
import { CertificadoService } from '../../services/bootcamps-certificates.service';
import { Certificado } from '../../models/certificado.model';


@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [
    NgFor ,
    NgIf
  ],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss'
})


export class ProjectsSectionComponent implements OnInit {
  certificados: Certificado[] = [];
  isLoading = true;
  error: any = null;

  constructor(private certificadoService: CertificadoService) {}

  ngOnInit(): void {
    this.certificadoService.getCertificados()
      .subscribe({
        next: (data) => {
          this.certificados = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = err;
          this.isLoading = false;
          console.log("htpclient   "+err);
        }
      });
  }
}

