import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomesComponent } from './homes/homes.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TestComponent } from './test/test.component';
import { HealthPackagesComponent } from './health-packages/health-packages.component';
import { BloodSugarComponent } from './blood-sugar/blood-sugar.component';



const routes: Routes = [

  {path: '', component: HomesComponent},
  { path: 'about-us', component:AboutUsComponent},
  { path: 'blood-sugar', component:BloodSugarComponent},
  { path: 'Test', component: TestComponent },    
  { path: 'Health-Packages', component:HealthPackagesComponent},
  { path: 'authentication', loadChildren: () => import('../../src/app/account/authentication.module').then(m => m.AuthenticationModule) },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents=[

NavMenuComponent,
FooterComponent  ,
HomesComponent,
AboutUsComponent,
ContactUsComponent,
TestComponent,
HealthPackagesComponent,
BloodSugarComponent


]
