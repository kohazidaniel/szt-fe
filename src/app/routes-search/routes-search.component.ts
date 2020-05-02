import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouteService } from "../core/services/route.service";
import { Route } from "../core/models/route";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Stop } from "../core/models/stop";
import { StopService } from "../core/services/stop.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
	selector: "app-routes-search",
	templateUrl: "./routes-search.component.html",
	styleUrls: ["./routes-search.component.scss"],
})
export class RoutesSearchComponent implements OnInit {
	filterForm: FormGroup;
	routeList: Route[] = [];
	filteredRouteList: Route[] = [];

	stopList: Stop[] = [];
	selectedStops: Stop[] = [];
	filteredStops: Observable<Stop[]>;

	isLoading: boolean = false;

	@ViewChild("stopInput") stopInput: ElementRef<HTMLInputElement>;

	constructor(
		private routeService: RouteService,
		private stopService: StopService,
		private formBuilder: FormBuilder
	) {
		this.filterForm = this.formBuilder.group({
			routeLongName: new FormControl(""),
			fromTime: new FormControl(""),
			toTime: new FormControl(""),
			routeTypes: new FormControl(""),
			selectedStopsCtrl: new FormControl(""),
			occasionalRoutes: new FormControl(true),
		});
	}

	ngOnInit(): void {
		this.loadRoutes();
		this.loadStops();

		this.filteredStops = this.filterForm.controls.selectedStopsCtrl.valueChanges.pipe(
			startWith(""),
			map((value) => {
				return this._filterStops(value);
			})
		);
	}

	loadStops() {
		this.stopService
			.getStops()
			.toPromise()
			.then((res) => {
				for (var key in res) {
					if (res.hasOwnProperty(key)) {
						this.stopList.push(
							new Stop({
								id: res[key].id,
								name: res[key].stop_name,
							})
						);
					}
				}
			});
	}

	loadRoutes(
		fromTime = null,
		toTime = null,
		routeLongName = null,
		routeTypes = null,
		selectedStops = null
	) {
		this.routeList = [];
        this.isLoading = true;
        let showOccasional: Boolean = this.filterForm.controls.occasionalRoutes.value;

		this.routeService
			.getRoutes(fromTime, toTime, selectedStops)
			.toPromise()
			.then((res) => {
				for (var key in res) {
					if (res.hasOwnProperty(key)) {
						let type: string;

						if (
							routeLongName &&
							!res[key].route_long_name
								.toLowerCase()
								.includes(routeLongName.toLowerCase())
						) {
							continue;
                        }

                        if (!showOccasional && res[key].route_desc) {
                            continue;
                        }

						switch (res[key].route_type) {
							case "3":
								type = "Busz";
								break;
							case "800":
								type = "Trolibusz";
								break;
							case "0":
								type = "Villamos";
								break;
							default:
								type = "ismeretlen";
						}

						if (routeTypes && !routeTypes.includes(type)) {
							continue;
						}

						this.routeList.push(
							new Route({
								id: res[key].id,
								agency_id: res[key].agency_id,
								route_long_name: res[key].route_long_name,
								route_desc: res[key].route_desc,
								route_type: type,
								route_short_name: res[key].route_short_name,
							})
						);
					}
				}
			})
			.finally(() => {
				this.filteredRouteList = this.routeList;
				this.isLoading = false;
			});
	}

	searchRoutes() {
		var fromTime = this.filterForm.controls.fromTime.value
			? this.filterForm.controls.fromTime.value.unix()
			: null;
		var toTime = this.filterForm.controls.toTime.value
			? this.filterForm.controls.toTime.value.unix()
			: null;
		var routeLongName = this.filterForm.controls.routeLongName.value
			? this.filterForm.controls.routeLongName.value
			: null;
		var routeTypes =
			this.filterForm.controls.routeTypes.value.length > 0
				? this.filterForm.controls.routeTypes.value
				: null;
		var selectedStops =
			this.selectedStops.length > 0 ? this.selectedStops : null;

		this.loadRoutes(
			fromTime,
			toTime,
			routeLongName,
			routeTypes,
			selectedStops
		);
	}

	getBackgroundColor(route: Route) {
		switch (route.route_type) {
			case "Villamos":
				return "#ffc410";
			case "Trolibusz":
				return "#2ba22b";
			case "Busz":
				return "#1f5b93";
		}
	}

	remove(stop: Stop): void {
		this.selectedStops = this.selectedStops.filter(
			(value) => value.id !== stop.id
		);
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		if (!this.isStopSelected(event.option.value)) {
			this.selectedStops.push(event.option.value);
			this.stopInput.nativeElement.value = "";
		}
		this.filterForm.controls.selectedStopsCtrl.setValue(null);
	}

	isStopSelected(stop: Stop): boolean {
		return (
			this.selectedStops.filter((value) => value.id === stop.id)
				.length !== 0
		);
	}

	private _filterStops(value: string): Stop[] {
		if (typeof value == "string") {
			const filterValue = value.toLowerCase();

			return this.stopList.filter(
				(stop) =>
					stop.name.toLowerCase().includes(filterValue) &&
					!this.isStopSelected(stop)
			);
		}
	}
}
