import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateRangeValidator } from 'src/validators/date-range.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  TabIndexName: typeof TabIndexName = TabIndexName;
  form: FormGroup;

  get menuCode() {
    return this.form.get('menuCode')?.value;
  }

  get menuName() {
    return this.form.get('menuName')?.value;
  }

  constructor(private scroller: ViewportScroller, private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        menuCode: ['', Validators.required],
        menuName: ['', Validators.required],
        description: [''],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      },
      { validators: dateRangeValidator() }
    );
  }

  onClickTabIndex(tabIndex: TabIndexName): void {
    var myElement = document.getElementById(tabIndex);
    myElement!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    // this.scroller.scrollToAnchor(tabIndex);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      if (this.form.errors && this.form.errors['invalidDateRange']) {
        alert(this.form.errors['invalidDateRange']);
      } else {
        alert('Invalid input');
      }
    } else {
      alert('All inputs are valid!');
    }
  }
}

export enum TabIndexName {
  Information = 'information',
  MenuItem = 'menuItem',
}
