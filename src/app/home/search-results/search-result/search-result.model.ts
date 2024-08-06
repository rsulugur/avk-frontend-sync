export interface ProductLink {
    url: string;
    price: number;
}

export interface Product {
    productName: string;
    productDescription: string;
    links: ProductLink[];
}