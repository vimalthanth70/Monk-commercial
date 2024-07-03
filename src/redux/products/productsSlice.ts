import { createSlice,PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductType, Variant,MainProductType } from "../../types/productsTypes";

type InitialValues = {
    selectedProoducts:ProductType[],
    isAddProductModalOpen:boolean,
    allProducts:MainProductType[],
    loading:boolean,
    error:any,
    pageNo:number,
    searchText:string
}

const initialState:InitialValues = {
    selectedProoducts:[],
    isAddProductModalOpen:false,
    allProducts:[],
    loading:false,
    error:{},
    pageNo:1,
    searchText:""
}

export const fetchData:any = createAsyncThunk('fetchAllProducts', async (url: string, thunkAPI) => {
    try {
      const response = await fetch(url,{
        method:"GET",
        headers:{
          "Content-Type":"Application/json",
          "x-api-key":import.meta.env.VITE_APP_KEY
        }
      });
      const data:any = await response.json()
      return data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  

const productSlice = createSlice({
    name:"productSlice",
    initialState:initialState,
    reducers:{
        incrementPage:(state)=>{
            state.pageNo++
        },
        changeSearch:(state,action)=>{
            state.searchText = action.payload
            state.pageNo = 1
        },
        addDiscountToProduct:(state,action:PayloadAction<number>)=>{
            const index = state.selectedProoducts.findIndex((item)=>item.id==action.payload)
            const product = state.selectedProoducts[index] as ProductType
            const newProduct = {...product,isDiscount:true}
            state.selectedProoducts.splice(index,1,newProduct)
        },
        changeOrderOfProducts:(state,action:PayloadAction<ProductType[]>)=>{
            state.selectedProoducts = action.payload
        },
        changeDiscountAmount:(state,action:PayloadAction<{amount:string,id:number}>)=>{
            const index = state.selectedProoducts.findIndex((item)=>item.id==action.payload.id)
            const product:ProductType = state.selectedProoducts[index] 
            const newProduct = {...product,discountValue:+action.payload.amount}
            state.selectedProoducts.splice(index,1,newProduct)
        },
        changeDiscountType:(state,action:PayloadAction<{type:"% off" | "flat off",id:number}>)=>{
            const index = state.selectedProoducts.findIndex((item)=>item.id==action.payload.id)
            const product:ProductType = state.selectedProoducts[index] 
            const newProduct = {...product,discountType:action.payload.type}
            state.selectedProoducts.splice(index,1,newProduct)
        },
        toggleVariants:(state,action:PayloadAction<number>)=>{
            const index = state.selectedProoducts.findIndex((item)=>item.id==action.payload)
            const product:ProductType = state.selectedProoducts[index] 
            const newProduct = {...product,showVariants:!product.showVariants}
            state.selectedProoducts.splice(index,1,newProduct)
        },
        deleteVariant:(state,action:PayloadAction<{productId:number,variantIndex:number}>)=>{
            const index = state.selectedProoducts.findIndex((item)=>item.id==action.payload.productId)
            const product:ProductType = state.selectedProoducts[index] 
            const productVariants = product.variants
            productVariants.splice(action.payload.variantIndex,1)
            const newProduct = {...product,variants:productVariants}
            state.selectedProoducts.splice(index,1,newProduct)
        },
        deleteProduct:(state,action:PayloadAction<number>)=>{
            const index = state.selectedProoducts.findIndex((item)=>item.id==action.payload)
            state.selectedProoducts.splice(index,1)
        },
        addDiscountToVariant:(state,action:PayloadAction<{productId:number,variantIndex:number}>)=>{
            const index = state.selectedProoducts.findIndex((item)=>item.id==action.payload.productId)
            const product:ProductType = state.selectedProoducts[index] 
            const productVariants = product.variants
            const variant = productVariants[action.payload.variantIndex]
            const newVariant:Variant = {...variant,isDiscount:true}
            productVariants.splice(action.payload.variantIndex,1,newVariant)
            const newProduct = {...product,variants:productVariants}
            state.selectedProoducts.splice(index,1,newProduct)
        },
        changeDiscountTypeOfVariant:(state,action:PayloadAction<{productId:number,variantIndex:number,type:"% off" | "flat off"}>)=>{
            const index = state.selectedProoducts.findIndex((item)=>item.id==action.payload.productId)
            const product:ProductType = state.selectedProoducts[index] 
            const productVariants = product.variants
            const variant = productVariants[action.payload.variantIndex]
            const newVariant:Variant = {...variant,discountType:action.payload.type}
            productVariants.splice(action.payload.variantIndex,1,newVariant)
            const newProduct = {...product,variants:productVariants}
            state.selectedProoducts.splice(index,1,newProduct)
        },
        changeDiscountValueOfVariant:(state,action:PayloadAction<{productId:number,variantIndex:number,amount:string}>)=>{
            const index = state.selectedProoducts.findIndex((item)=>item.id==action.payload.productId)
            const product:ProductType = state.selectedProoducts[index] 
            const productVariants = product.variants
            const variant = productVariants[action.payload.variantIndex]
            const newVariant:Variant = {...variant,discountValue:+action.payload.amount}
            productVariants.splice(action.payload.variantIndex,1,newVariant)
            const newProduct = {...product,variants:productVariants}
            state.selectedProoducts.splice(index,1,newProduct)
        },
        selectedProductsChange:(state,action:PayloadAction<{product:ProductType[]}>)=>{
            // const newProduct = addDefaultValues(action.payload.product)
            state.selectedProoducts = [...action.payload.product]
            state.isAddProductModalOpen = false
            // state.pageNo++
        },
        handleModalOpen:(state)=>{
            state.isAddProductModalOpen = true
        },
        handleModalClose:(state)=>{
            state.isAddProductModalOpen = false
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchData.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            if(action.payload){
                state.allProducts = [...state.allProducts,...action.payload];
                }else{
                state.allProducts = [];

            }
          })
          .addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });
      },
})

export default productSlice.reducer

export const {
    addDiscountToProduct,
    changeOrderOfProducts,
    changeDiscountAmount,
    changeDiscountType,
    deleteProduct,
    toggleVariants,
    deleteVariant,
    addDiscountToVariant,
    changeDiscountTypeOfVariant,
    changeDiscountValueOfVariant,
    handleModalClose,
    handleModalOpen,
    incrementPage,
    selectedProductsChange,
    changeSearch
} = productSlice.actions