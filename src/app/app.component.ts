import { Component, OnInit } from "@angular/core";
import { RouteService } from "./core/services/route.service";
import { Observable } from "rxjs";
import { Route } from "./core/models/route";
import { RouterOutlet } from "@angular/router";
import { slider } from "./animation";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	animations: [slider],
})
export class AppComponent {
	title = "szeged-transport";

	prepareRoute(outlet: RouterOutlet) {
		return (
			outlet &&
			outlet.activatedRouteData &&
			outlet.activatedRouteData["animation"]
		);
	}
}
