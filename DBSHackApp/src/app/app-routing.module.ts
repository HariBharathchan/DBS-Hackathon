import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookTrainComponent } from './book-train/book-train.component';
import { HelpCompComponent } from './help-comp/help-comp.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { PnrStatusComponent } from './pnr-status/pnr-status.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path:'', redirectTo:'registration', pathMatch:'full'},
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent},
  { path: 'pnrstatus', component: PnrStatusComponent },
  { path: 'booking', component:BookTrainComponent},
  { path: 'help', component: HelpCompComponent},
  { path: 'payment', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
