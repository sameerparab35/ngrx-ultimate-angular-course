import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { map } from 'rxjs/operators';

import { IPizza } from '../../models/pizza.model';
import { ITopping } from '../../models/topping.model';

@Component({
  selector: 'pizza-form',
  styleUrls: ['pizza-form.component.scss'],
  template: `
    <div class="pizza-form">
      <form [formGroup]="form">
      
        <label>
          <h4>Pizza name</h4>
          <input 
            type="text" 
            formControlName="name"
            placeholder="e.g. Pepperoni"
            class="pizza-form__input"
            [class.error]="nameControlInvalid">
          <div
            class="pizza-form__error"
            *ngIf="nameControlInvalid">
            <p>Pizza must have a name</p>
          </div>
        </label>
      
        <ng-content></ng-content>

        <label>
          <h4>Select toppings</h4>
        </label>
        <div class="pizza-form__list">

          <pizza-toppings
            [toppings]="toppings"
            formControlName="toppings">
          </pizza-toppings>

        </div>

        <div class="pizza-form__actions">
          <button
            type="button"
            class="btn btn__ok"
            *ngIf="!exists"
            (click)="createPizza(form)">
            Create Pizza
          </button>

          <button
            type="button"
            class="btn btn__ok"
            *ngIf="exists"
            (click)="updatePizza(form)">
            Save changes
          </button>

          <button
            type="button"
            class="btn btn__warning"
            *ngIf="exists"
            (click)="removePizza(form)">
            Delete Pizza
          </button>
        </div>

      </form>
    </div>
  `,
})
export class PizzaFormComponent implements OnChanges {
  exists = false;

  @Input() pizza: IPizza;
  @Input() toppings: ITopping[];

  @Output() selected = new EventEmitter<number[]>();
  @Output() create = new EventEmitter<IPizza>();
  @Output() update = new EventEmitter<IPizza>();
  @Output() remove = new EventEmitter<IPizza>();

  form = this.fb.group({
    name: ['', Validators.required],
    toppings: [[]],
  });

  constructor(private fb: FormBuilder) {}

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.pizza && this.pizza.id) {
      this.exists = true;
      this.form.patchValue(this.pizza);
    }
    this.form
      .get('toppings')
      .valueChanges.pipe(
        map(toppings => toppings.map((topping: ITopping) => topping.id))
      )
      .subscribe(value => this.selected.emit(value));
  }

  createPizza(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updatePizza(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.pizza, ...value });
    }
  }

  removePizza(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.pizza, ...value });
  }
}
