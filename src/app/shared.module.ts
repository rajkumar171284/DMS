import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, FormControl, ReactiveFormsModule, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import {commonInterceptor} from './common.interceptor';
// import {NgxMaskIonicModule} from 'ngx-mask-ionic'

// import { NgxMaskModule, IConfig } from 'ngx-mask'

import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
    imports: [MatInputModule, FormsModule, ReactiveFormsModule, MatCardModule, MatAutocompleteModule, ScrollingModule,
        HttpClientModule,InputMaskModule,InputTextModule,MatDatepickerModule,MatNativeDateModule],
    exports: [MatInputModule, FormsModule, ReactiveFormsModule, MatCardModule, MatAutocompleteModule, ScrollingModule,
        HttpClientModule,InputMaskModule,InputTextModule,MatDatepickerModule,MatNativeDateModule],
    providers: [FormControl,{
        provide: HTTP_INTERCEPTORS, 
        useClass: commonInterceptor, 
        multi: true
      }]
})
export class sharedModule { } 