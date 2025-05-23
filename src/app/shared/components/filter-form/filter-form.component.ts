import {Component, input, OnInit, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {Button} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";

type FieldType = 'text' | 'number' | 'boolean' | 'date' | 'select';

export interface GenericFilterConfig<T> {
  name: string;
  type: FieldType;
  label: string;
  defaultValue?: any;
  options?: Array<{label: string, value: T}>;
}

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    InputNumberModule,
    Button,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
  ],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent implements OnInit {
  filterConfig = input.required<GenericFilterConfig<any>[]>();
  filterSubmit = output();
  today = new Date();
  filterForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({});
    this.initializeFormControls();
  }

  private initializeFormControls(): void {
    this.filterConfig()?.forEach(config => {
      const defaultValue = this.getDefaultValueForType(config.type, config.defaultValue);
      this.filterForm.addControl(config.name, this.fb.control(defaultValue));
    });
  }

  private getDefaultValueForType(type: FieldType, customDefault?: any): any {
    if (customDefault !== undefined) return customDefault;

    switch (type) {
      case 'text': return '';
      case 'number': return null;
      case 'boolean': return false;
      case 'date': return null;
      case 'select': return '';
      default: return null;
    }
  }

  onSubmit(): void {
    if(this.filterForm.valid){
      this.filterSubmit.emit(this.filterForm.value);
    }
  }

  protected readonly Date = Date;
}
