import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { modulesRoutes } from './modules-routes';
import { HomeComponent } from './components/home/home.component';
import { UserConfigComponent } from './components/user-config/user-config.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CountdownModule } from 'ngx-countdown';
import { ModulesComponent } from './modules.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ModulesComponent,
        HomeComponent,
        UserConfigComponent,
        ItemDetailComponent,
        NavBarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(modulesRoutes),
        CountdownModule,
        NgbModule
    ],
    providers: [],
    bootstrap: []
})
export class ModulesModule { }
