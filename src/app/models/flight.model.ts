export interface FlightModel {
    /** Unique flight identifier. Example: AB1234 */
    flightNumber: string;
    status: string;
    takeoffTime: string;
    landingTime: string;
    takeoffAirport: string;
    landingAirport: string;
    updates?: string;
}