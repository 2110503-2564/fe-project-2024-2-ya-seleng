export interface HotelItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    __v: number,
    id: string
  }
  
export interface HotelJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: HotelItem[]
  }

export interface BookingItem {
    nameLastname: string;
    tel: string;
    hotel: string;
    bookDate: string;
  }

export interface HotelItemJson {
    success: boolean,
    data: HotelItem
}