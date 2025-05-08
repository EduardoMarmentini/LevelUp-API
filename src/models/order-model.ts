interface IOrder
{
    number: string;
    customer?: string;
    createDate: Date;
    status: "created" | "done";
    items: Array<{
        quantity?: number;
        price: number;
        product?: string;
    }>;
}

export default IOrder;