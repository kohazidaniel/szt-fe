import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouteService } from "../core/services/route.service";
import { Route } from "../core/models/route";
import { Stop } from '../core/models/stop';
import { logging } from 'protractor';

@Component({
	selector: "app-route",
	templateUrl: "./route.component.html",
	styleUrls: ["./route.component.scss"],
})
export class RouteComponent implements OnInit {
    route: Route;
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
				.then((res) => {

                    let stops: Stop[] = [];

                    res.stops.forEach(stop => {
                        stops.push(new Stop({
                            arrival_time: stop.arrival_time,
                            direction_id: stop.direction_id,
                            id: stop.id,
                            lat: stop.lat,
                            lon: stop.lon,
                            name: stop.name,
                            stop_sequence: stop.stop_sequence
                        }))
                    });

					this.route = new Route({
						id: res.id,
						agency_id: res.agency_id,
						route_desc: res.route_desc,
						route_long_name: res.route_long_name,
						route_short_name: res.route_short_name,
                        route_type: res.route_type,
                        stops
                    });
				}).finally(() => {
                    this.isLoading = false;
                });;
		});
	}
}
