export type Variant = {
    id: number,
    product_id: number,
    title: string,
    inventory_policy: string,
    price: string,
    inventory_management: string,
    option1: string,
    created_at: string,
    updated_at: string,
    inventory_quantity: number,
    admin_graphql_api_id: string
    isDiscount:boolean,
    discountType:"% off" | "flat off",
    discountValue:number
}

export type ProductType = {
    id: number,
    title: string,
    handle: string,
    created_at: string
    updated_at: string,
    options: {
        id: number,
        product_id: number,
        name: string,
        position: number,
        values: string[]
    }[],
    image: {
        id?: number,
        product_id?: number,
        src?: string
    },
    admin_graphql_api_id: string,
    status: string,
    variants: Variant[],
    isDiscount:boolean,
    discountType:"% off" | "flat off",
    discountValue:number,
    showVariants:boolean,
}

export type MainVariant = {
    id: number,
    product_id: number,
    title: string,
    inventory_policy: string,
    price: string,
    inventory_management: string,
    option1: string,
    created_at: string,
    updated_at: string,
    inventory_quantity: number,
    admin_graphql_api_id: string
}




export type MainProductType = {
    id: number,
        title: string,
        handle: string,
        created_at: string
        updated_at: string,
        options: {
            id: number,
            product_id: number,
            name: string,
            position: number,
            values: string[]
        }[],
        image: {
            id?: number,
            product_id?: number,
            src?: string
        },
        admin_graphql_api_id: string,
        status: string,
        variants:MainVariant[]
}

