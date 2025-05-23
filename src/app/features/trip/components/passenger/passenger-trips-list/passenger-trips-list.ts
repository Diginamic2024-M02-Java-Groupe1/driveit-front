import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CarpoolingService} from "@services/carpooling.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [],
  templateUrl: './passenger-trips-list.component.html',
  styleUrl: './passenger-trips-list.component.css'
})
export class PassengerTripsList implements OnInit {

  private readonly carpoolingService = inject(CarpoolingService);
  private readonly destroyRef$ = inject(DestroyRef);
  protected results: any[] = [];
  // protected filterFields: FilterField[] = [
  //   {
  //     name: 'tripDate',
  //     type: 'date',
  //     label: 'Date du trajet'
  //   }
  // ];

  ngOnInit(): void {
    this.getMyTrips();
  }

  getMyTrips(): void {
    this.carpoolingService.getCarpoolings().pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe({
      next: (data) => {
        this.results = data;
        console.log(data);
      }
    });
  }

  onFilterSubmit(formData: any): void {
    console.log('Données du filtre:', formData);
  }
}
