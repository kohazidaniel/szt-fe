import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class StopService {
	private apiUrl = environment.apiUrl + "/stops";

	constructor(private http: HttpClient) {}

	getStops() {
		return this.http.get(this.apiUrl);
	}
}
