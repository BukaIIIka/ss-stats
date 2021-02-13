export interface IDistrictData {
        area_avg: number;
        area_maxi: number,
        area_mini: number,
        district: string,
        pps_avg: number,
        pps_maxi: number,
        pps_mini: number,
        price_avg: number,
        price_maxi: number,
        price_mini: number,
        rooms_avg: number,
        rooms_maxi: any,
        rooms_mini: number,
        total_flats: number,
        total_stories_avg: number,
        total_stories_maxi: number,
        total_stories_mini: number
}

export class DistrictData {
        area_avg: number = 0;
        area_maxi: number = 0;
        area_mini: number = 0;
        district: string = '';
        pps_avg: number = 0;
        pps_maxi: number = 0;
        pps_mini: number = 0;
        price_avg: number = 0;
        price_maxi: number = 0;
        price_mini: number = 0;
        rooms_avg: number = 0;
        rooms_maxi: any = 0;
        rooms_mini: number = 0;
        total_flats: number = 0;
        total_stories_avg: number = 0;
        total_stories_maxi: number = 0;
        total_stories_mini: number = 0;
}
