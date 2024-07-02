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
// export type MainVariant = {
//     id: number,
//     product_id: number,
//     title: string,
//     price: string,
// }



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
// export type MainProductType = {
//     id: number,
//     title: string,
//     variants: MainVariant[],
//     image: {
//         id: number,
//         product_id: number,
//         src: string
//     }
// }

[
    {
        "id": 6542539653327,
        "title": "broken fire",
        "handle": "broken-fire",
        "created_at": "2021-03-07T05:33:51Z",
        "updated_at": "2022-10-04T17:50:18Z",
        "options": [
            {
                "id": 8412910125263,
                "product_id": 6542539653327,
                "name": "Title",
                "position": 1,
                "values": [
                    "Default Title"
                ]
            }
        ],
        "image": {},
        "admin_graphql_api_id": "gid://shopify/Product/6542539653327",
        "status": "active",
        "variants": [
            {
                "id": 39272894464207,
                "product_id": 6542539653327,
                "title": "Default Title",
                "inventory_policy": "deny",
                "price": "90",
                "inventory_management": "shopify",
                "option1": "Default Title",
                "created_at": "2021-03-07T05:33:52Z",
                "updated_at": "2022-10-04T17:50:18Z",
                "inventory_quantity": 1126,
                "admin_graphql_api_id": "gid://shopify/ProductVariant/39272894464207"
            }
        ]
    },
    {
        "id": 6805246771407,
        "title": "Copy of broken fire",
        "handle": "copy-of-broken-fire",
        "created_at": "2021-08-15T18:07:36Z",
        "updated_at": "2021-11-07T10:33:15Z",
        "options": [
            {
                "id": 8720138797263,
                "product_id": 6805246771407,
                "name": "Title",
                "position": 1,
                "values": [
                    "Default Title"
                ]
            }
        ],
        "image": {},
        "admin_graphql_api_id": "gid://shopify/Product/6805246771407",
        "status": "active",
        "variants": [
            {
                "id": 40499618152655,
                "product_id": 6805246771407,
                "title": "Default Title",
                "inventory_policy": "deny",
                "price": "10",
                "inventory_management": "shopify",
                "option1": "Default Title",
                "created_at": "2021-08-15T18:07:36Z",
                "updated_at": "2021-08-15T18:07:36Z",
                "inventory_quantity": 14,
                "admin_graphql_api_id": "gid://shopify/ProductVariant/40499618152655"
            }
        ]
    }
]