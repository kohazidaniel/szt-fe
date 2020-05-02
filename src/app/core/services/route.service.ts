import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Stop } from "../models/stop";

@Injectable({
	providedIn: "root",
})
export class RouteService {
	constructor(private http: HttpClient) {}

	getRoutes(fromTime = null, toTime = null, selectedStops = null) {
		var apiUrl = environment.apiUrl + "/routes/search";

		if (fromTime && toTime) {
			apiUrl = apiUrl + `?from=${fromTime}&to=${toTime}`;
		}

		if (selectedStops) {
			fromTime && toTime
				? (apiUrl = apiUrl + "&stops=")
				: (apiUrl = apiUrl + "?stops=");

			selectedStops.forEach((stop: Stop, index: number) => {
				if (index + 1 === selectedStops.length) {
					apiUrl = apiUrl + stop.id + "";
				} else {
                    apiUrl = apiUrl + stop.id + ",";
                }
			});
		}

		return this.http.get(apiUrl);
    }

    getRouteById(id: string) {
        var apiUrl = environment.apiUrl + "/routes/" + id;

        return this.http.get(apiUrl);
    }
}
