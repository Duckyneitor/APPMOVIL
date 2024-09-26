import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
    
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./paginas/configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
  },
  {
    path: 'informacion-cuenta',
    loadChildren: () => import('./paginas/informacion-cuenta/informacion-cuenta.module').then(m => m.InformacionCuentaPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./paginas/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./paginas/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./paginas/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'informacion-cuenta',
    loadChildren: () => import('./paginas/informacion-cuenta/informacion-cuenta.module').then( m => m.InformacionCuentaPageModule)
  },
  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
