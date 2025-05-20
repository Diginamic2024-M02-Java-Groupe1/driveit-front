import {Component, OnInit, inject, DestroyRef} from '@angular/core';
import {FilterFormComponent} from "@components/filter-form/filter-form.component";
import {CarpoolingService} from "@services/carpooling.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [
    FilterFormComponent
  ],
  templateUrl: './my-trips.component.html',
  styleUrl: './my-trips.component.scss'
})
export class MyTripsComponent implements OnInit {

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
