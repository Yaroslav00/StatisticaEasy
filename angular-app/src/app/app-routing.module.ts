import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import {RegChartComponent} from './components/reg-chart/reg-chart.component';
import {RegDnnComponent} from './components/reg-dnn/reg-dnn.component';

const routes: Routes = [
  {path:'', component:MainPageComponent},
  {path:'regression', component:RegChartComponent},
  {path:'dnn', component:RegDnnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
