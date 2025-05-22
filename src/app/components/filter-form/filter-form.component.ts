import {Component, input, OnInit, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {Button} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";
import {AutoCompleteModule} from "primeng/autocomplete";

type FieldType = 'text' | 'number' | 'boolean' | 'date' | 'select' | 'autocomplete';

export interface GenericFilterConfig<T> {
  name: string;
  type: FieldType;
  label: string;
  defaultValue?: any;
  options?: Array<{label: string, value: T}>;
  // Ajout des propriétés pour l'autocomplete
  suggestions?: Array<any>;
  filterMethod?: (event: any) => void;
  minLength?: number;
  placeholder?: string;
  optionLabel?: string;
  optionValue?: string;
  dropdown?: boolean;
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
    AutoCompleteModule
  ],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent implements OnInit {
  filterConfig = input.required<GenericFilterConfig<any>[]>();
  filterSubmit = output();
  filterReset = output();
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
      const formValues = {...this.filterForm.value};
      Object.keys(formValues).forEach(key => {
        if (formValues[key] && formValues[key] instanceof Date) {
          const date = new Date(formValues[key]);
          date.setHours(12, 0, 0, 0);
          formValues[key] = date;
        }
      });
      this.filterSubmit.emit(formValues);
    }
  }

  hasAnyValue(): boolean {
    if (!this.filterForm) return false;

    const formValues = this.filterForm.value;
    return Object.keys(formValues).some(key => {
      const value = formValues[key];

      if (value === null || value === undefined) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      if (Array.isArray(value) && value.length === 0) return false;

      return true;
    });
  }

  clearForm(): void {
    this.filterConfig().forEach(config => {
      const defaultValue = this.getDefaultValueForType(config.type, config.defaultValue);
      this.filterForm.get(config.name)?.setValue(defaultValue);
    });
    this.filterReset.emit();
  }

  triggerFilterMethod(event: any, config: GenericFilterConfig<any>): void {
    if (config.filterMethod) {
      config.filterMethod(event);
    }
  }

  getSuggestions(config: GenericFilterConfig<any>): any[] {
    return config.suggestions || [];
  }

  protected readonly Date = Date;
}
