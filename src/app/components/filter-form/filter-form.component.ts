import {Component, input, OnInit, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";

interface FilterField {
  name: string;
  type: string;
  label: string;
}

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent implements OnInit{
  filterFields = input.required<FilterField[]>();
  filterSubmit = output();

  filterForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({});
    this.filterFields()?.forEach(field => {
      if (field.type === "text") {
        this.filterForm.addControl(field.name, this.fb.control(''));
      }
      if (field.type === "number") {
        this.filterForm.addControl(field.name, this.fb.control(''));
      }
      if (field.type === "boolean") {
        this.filterForm.addControl(field.name, this.fb.control(false));
      }
    });
  }

  onSubmit(): void {
    if(this.filterForm.valid){
      this.filterSubmit.emit(this.filterForm.value);
    }
  }

}
