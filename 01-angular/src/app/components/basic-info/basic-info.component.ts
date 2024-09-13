import { Component,Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatListModule } from '@angular/material/list'; 

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    MatListModule
  ],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss'
})

export class BasicInfoComponent {
  @Input() name!: string;
  @Input() email!: string;
  @Input() linkedinUrl!: string;
  @Input() gitUrl!: string;
  @Input() photoUrl!: string;
}

