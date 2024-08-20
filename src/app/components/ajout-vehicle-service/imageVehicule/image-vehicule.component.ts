import { Component } from '@angular/core';

@Component({
  selector: 'app-image-vehicule',
  standalone: true,
  imports: [],
  templateUrl: './image-vehicule.component.html',
  styleUrl: './image-vehicule.component.scss'
})
export class ImageVehiculeComponent {
  imageUrl: string | ArrayBuffer | null | undefined;

  onUrlInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.imageUrl = input.value;
  }
}
