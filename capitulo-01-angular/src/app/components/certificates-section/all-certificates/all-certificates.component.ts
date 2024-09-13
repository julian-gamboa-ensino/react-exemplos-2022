import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CertificadoService } from '../../../services/bootcamps-certificates.service';
import { Certificado } from '../../../models/certificado.model';


@Component({
  selector: 'app-all-certificates',
  standalone: true,
  imports: [
    NgFor ,
    NgIf
  ],
  templateUrl: './all-certificates.component.html',
  styleUrl: './all-certificates.component.scss'
})


export class AllCertificatesComponent implements OnInit {
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
        }
      });
  }
}

