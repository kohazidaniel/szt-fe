import { Stop } from './stop';

export class Route {
	id: number;
	agency_id: number;
	route_long_name: string;
	route_desc: string;
	route_type: string;
    route_short_name: string;
    stops: Stop[];

	constructor(data: Partial<Route>) {
		Object.assign(this, data);
	}
}
