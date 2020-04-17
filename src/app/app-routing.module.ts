import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guard';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  { path: 'notes', loadChildren: './notes/notes.module#NotesModule', canActivate: [AuthGuard] },
  {path:"**",redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
