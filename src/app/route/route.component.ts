import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouteService } from "../core/services/route.service";
import { Route } from "../core/models/route";
import { Stop } from "../core/models/stop";

@Component({
	selector: "app-route",
	templateUrl: "./route.component.html",
	styleUrls: ["./route.component.scss"],
})
export class RouteComponent implements OnInit {
	route: Route;
	direction: number = 0;
	isLoading: boolean = false;

	constructor(
		private routeService: RouteService,
		private activatedroute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.isLoading = true;
		this.activatedroute.paramMap.subscribe((params) => {
			this.routeService
				.getRouteById(params.get("id"))
				.toPromise()
				.then((res: any) => {
					let stops: Stop[] = [];

					res.stops.forEach((stop) => {
						stops.push(
							new Stop({
								arrival_time: stop.arrival_time,
								direction_id: stop.direction_id,
								id: stop.id,
								lat: stop.lat,
								lon: stop.lon,
								name: stop.name,
								stop_sequence: stop.stop_sequence,
							})
						);
					});

					this.route = new Route({
						id: res.id,
						agency_id: res.agency_id,
						route_desc: res.route_desc,
						route_long_name: res.route_long_name,
						route_short_name: res.route_short_name,
						route_type: res.route_type,
						stops,
					});
				})
				.finally(() => {
					this.isLoading = false;
				});
		});
	}

	getBackgroundColor() {
		switch (this.route.route_type) {
			case "0":
				return "#ffc410";
			case "800":
				return "#2ba22b";
			case "3":
				return "#1f5b93";
		}
	}

	toggleDirection() {
		if (this.direction === 1) {
			this.direction = 0;
		} else {
			this.direction = 1;
        }
	}

	filterDirection() {
		return this.route.stops.filter(
			(stop) => stop.direction_id === this.direction
		);
	}
}
