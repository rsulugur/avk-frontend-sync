export interface ProductLink {
    detailedName: string
    url: string;
    price: number;
}

export interface Product {
    productName: string;
    productDescription: string;
    links: ProductLink[];
}