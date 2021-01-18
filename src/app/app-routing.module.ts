

import { LoginComponent } from './components/login/login.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { HomeComponent } from './components/home/home.component';
import { SatiliklarComponent } from './components/satiliklar/satiliklar.component';
import { HurdalarComponent } from './components/hurdalar/hurdalar.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const redirectLogin = () => redirectUnauthorizedTo(['/login']);
const routes: Routes = [

  { path: '', component: HomeComponent },


  { path: 'kayitlar',
    component:
      KayitlarComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
  }
  },




  { path: 'satiliklar',
    component:
      SatiliklarComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
  }
  },

  { path: 'hurdalar',
    component:
      HurdalarComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
  }
  },

  { path: 'login', component: LoginComponent }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
