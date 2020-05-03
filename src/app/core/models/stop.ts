export class Stop {
	id: number;
	name: string;
	lat: string;
	lon: string;
	stop_sequence: number;
	arrival_time:number;
	direction_id: number;

	constructor(data: Partial<Stop>) {
		Object.assign(this, data);
	}
}
