interface IProduct {
    id : number,
    title: string;
    slug: string;
    description: string;
    price: number;
    active: boolean;
    tags: string[];
    photo: string;
    inStock: number;
}

export default IProduct;