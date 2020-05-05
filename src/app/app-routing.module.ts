import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoutesSearchComponent } from "./routes-search/routes-search.component";
import { RouteComponent } from "./route/route.component";

const routes: Routes = [
	{ path: "", component: RoutesSearchComponent },
	{ path: "routes/:id", component: RouteComponent, data: { animation: 'isRight' } },
	{ path: "**", redirectTo: "/" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
	exports: [RouterModule],
})
export class AppRoutingModule {}
