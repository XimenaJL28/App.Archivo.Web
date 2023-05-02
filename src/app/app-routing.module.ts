import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './guards/validate-token.guard';
// import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageUnauthorizedComponent } from './pages/page-unauthorized/page-unauthorized.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [ValidateTokenGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'recovery', component: RecoveryPasswordComponent },
  { path: 'unauthorized', component: PageUnauthorizedComponent},
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'not-found'},
  // { path: '**', component: NotpagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [ValidateTokenGuard]
})
export class AppRoutingModule { }
