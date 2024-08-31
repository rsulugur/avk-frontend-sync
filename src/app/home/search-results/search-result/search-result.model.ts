
export class Product {
    // Define the properties of the class
    public name: string;
    public image: string;
    public source: 'amazon' | 'ebay';
    public ratings: string;
    public price: string;
    public url: string;

    // Constructor with parameter types
    constructor(name: string, image: string, source: 'amazon' | 'ebay', ratings: string, price: string, url: string) {
        this.source = source;
        this.name = name;
        this.price = price;
        this.image = image;
        this.ratings = ratings;
        this.url = url;
    }
}