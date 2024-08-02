export interface Product {
    id: number;
    name: string;
    url: string;
    price: number;
    source: string;
    desc: string;
    logo: string,
    createdAt: string; // or Date if you prefer to handle it as a Date object
}
