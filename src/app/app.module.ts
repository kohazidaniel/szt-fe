import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { HttpClientModule } from "@angular/common/http";
import { RoutesSearchComponent } from "./routes-search/routes-search.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NavbarComponent } from './navbar/navbar.component';
import { RouteComponent } from './route/route.component';

@NgModule({
	declarations: [AppComponent, RoutesSearchComponent, NavbarComponent, RouteComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule,
		ReactiveFormsModule,
		FlexLayoutModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
