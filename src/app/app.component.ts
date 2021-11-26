import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabIndexName } from 'src/enums/tab-index-name.enum';
import { TabIndexStatus } from 'src/types/tab-index-status.type';
import {
  DateRangeError,
  dateRangeValidator,
} from 'src/validators/date-range.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  TabIndexName: typeof TabIndexName = TabIndexName;
  form: FormGroup;
  tabIndexStatus: TabIndexStatus = {
    [TabIndexName.Information]: true,
    [TabIndexName.MenuItem]: false,
  };

  get menuCode() {
    return this.form.get('menuCode')?.value;
  }

  get menuName() {
    return this.form.get('menuName')?.value;
  }

  @HostListener('window:scroll') onScroll(): void {
    if (
      window.scrollY >=
      document.getElementById(TabIndexName.Information)!.clientHeight
    ) {
      this.tabIndexStatus[TabIndexName.Information] = false;
      this.tabIndexStatus[TabIndexName.MenuItem] = true;
    } else {
      this.tabIndexStatus[TabIndexName.Information] = true;
      this.tabIndexStatus[TabIndexName.MenuItem] = false;
    }
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
      {
        validators: dateRangeValidator(),
      }
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
      if (
        this.form.errors &&
        this.form.errors[DateRangeError.InvalidDateRange]
      ) {
        alert(this.form.errors[DateRangeError.InvalidDateRange]);
      } else {
        alert('One or more inputs are invalid');
      }
    } else {
      alert('All inputs are valid!');
    }
  }
}
