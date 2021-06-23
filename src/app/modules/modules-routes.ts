import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { UserConfigComponent } from './components/user-config/user-config.component';
import { ModulesComponent } from './modules.component';

export const modulesRoutes: Routes = [
  {
    path: '', component: ModulesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'item/:id', component: ItemDetailComponent },
      { path: 'user-config', component: UserConfigComponent }
    ]
  }
];
