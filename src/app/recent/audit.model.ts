export interface Audit {
    _id: number;
    searchQuery: string;
    timeTaken: string;
    results: { "AmazonScrapper": number, "EbayScrapper": number };
    createdAt: string; // or Date if you prefer to handle it as a Date object
}
