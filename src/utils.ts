import { MainProductType, MainVariant, ProductType, Variant } from "./types/productsTypes";

export const addDefaultValues = (product:MainProductType):ProductType=>{
    let newProduct:ProductType = {...product,isDiscount:false,discountType:"% off",discountValue:0,showVariants:false,variants:[]}
    if(product.variants.length>0){
        const newVariants:Variant[] = []
        product.variants.map((item)=>{
            const v:Variant = {...item,isDiscount:false,discountType:"% off",discountValue:0}
            newVariants.push(v)
        })
        newProduct = {...newProduct,variants:newVariants}
        
    }else{
        const newVariants:Variant[] = []
        newProduct = {...newProduct,variants:newVariants}

    }
    return newProduct
}