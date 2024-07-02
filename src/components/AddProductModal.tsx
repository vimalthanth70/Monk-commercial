import {
    AlertDialog,
    AlertDialogContent,
  } from "./ui/alert-dialog"
  import closeModalIcon from '../assets/closeModalIcon.svg'
  import { SearchInput } from "./SearchInput"
import PrimaryButton from "./PrimaryButton"
import { Button } from "./ui/button"
import { useSelector,useDispatch } from "react-redux"
import { RootState } from "../redux/store"
import { changeSearch, fetchData, handleModalClose,incrementPage,selectedProductsChange } from "../redux/products/productsSlice"
import {  useRef, useState } from "react"
import { MainProductType, MainVariant, ProductType, Variant } from "../types/productsTypes"
import { addDefaultValues } from "../utils"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AutoSizer, InfiniteLoader, List,CellMeasurer, CellMeasurerCache } from "react-virtualized"
import React from "react"

  
function AddProductDialogue() {
  const isModalOpen = useSelector((state:RootState)=>state.products.isAddProductModalOpen)
  const allSelectedProducts = useSelector((state:RootState)=>state.products.selectedProoducts)
  const [tempProducts,setTempProducts] = useState<ProductType[]>(allSelectedProducts)
  const dispatch = useDispatch()
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  console.log(allSelectedProducts,tempProducts,'data29')


const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100,
});

const products = useSelector((state:RootState)=>state.products.allProducts)
const pageNo = useSelector((state:RootState)=>state.products.pageNo)

const isProductPresent = (product:MainProductType)=>{
  if(tempProducts.find(value=>value.id==product.id)){
    return true
  }
  return false
}

const isVariantPresent = (variant:MainVariant):boolean=>{
  const product = tempProducts.find((item)=>item.id==variant.product_id)
  if(product){
    if(product.variants.find((item)=>item.title==variant.title)){
      return true
    }else{
      return false
    }
  }else{
    return false
  }
}

const handleAddClick = ()=>{
  dispatch(selectedProductsChange({product:tempProducts}))
}

const getSelectedProductcsText = ()=>{
  return tempProducts.length<=1?`${tempProducts.length} product selected`:`${tempProducts.length} products selected`
}

const isRowLoaded = ({ index }:{index:number}) => !!products[index];

    const loadMoreRows =({ startIndex, stopIndex }:any) => {
      console.log(stopIndex,products.length ,"data206")
      if(stopIndex === products.length ){
        dispatch(incrementPage())
      }
      return Promise.resolve()
    };

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(timerRef.current){
      clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(()=>{
        dispatch(fetchData(`https://stageapi.monkcommerce.app/task/products/search?search=${e.target.value}&page=${1}&limit=10`))
        dispatch(changeSearch(e.target.value))
      },500)
    }

const rowRenderer = ({key,index,style,parent}:any)=>{
  const item = products[index]
  return <CellMeasurer
      key={key}
      cache={cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
  {({ measure, registerChild }) => (
    <div 
    // ref={registerChild}
     key={item.id} style={{...style,height:'50px'}} className="productItem">
    <div className="flex items-center h-[61px] border-b-[1px] border-gray-400">
      <input checked={isProductPresent(item)?true:false} onChange={(e)=>{
        if(e.target.checked){
          const newProduct = addDefaultValues(item)
          const allNewProducts = [...tempProducts,newProduct]
          setTempProducts(allNewProducts)
          }else{
            const index = tempProducts.findIndex((product)=>product.id==item.id)
            const products = [...tempProducts]
            products.splice(index,1)
            setTempProducts(products)
        }
      }}  className="accent-[#008060] ml-[28px] cursor-pointer h-[24px] w-[24px] rounded-md" type="checkbox" />
      <LazyLoadImage
        style={{marginLeft:"15px"}}
        alt="product"
        height={36}
        src={item.image.src}
        width={36} />
      <p className="ml-[14px]">{item.title}</p>
    </div>
  
    {item.variants && item.variants.length>0 && item.variants.map((variant)=>(
      <div>
        <div className="flex items-center h-[54px] border-b-[1px] border-gray-400">
          <input onChange={(e)=>{
            const index = tempProducts.findIndex((p)=>p.id == variant.product_id)
            if(index!==-1){
              const allProducts = [...tempProducts]
              if(e.target.checked){
                const product = tempProducts[index]
                const newVariant:Variant = {...variant,isDiscount:false, discountType:"% off", discountValue:0}
                const allVariants = [...product.variants,newVariant]
                const newProduct = {...product,variants:allVariants}
                allProducts.splice(index,1,newProduct)
              }else{
                  const product = tempProducts[index]
                  const variantIndex = product.variants.findIndex((v)=>v.id==variant.id)
                  const allVariants = product.variants
                  if(product.variants.length==1){
                    allProducts.splice(index,1)
                  }else{
                    allVariants.splice(variantIndex,1)
                    const newProduct = {...product,variants:allVariants}
                    allProducts.splice(index,1,newProduct)
  
                  }
                  }
                setTempProducts(allProducts)
  
            }else{
              if(e.target.checked){
                const mainProduct = {...item}
                console.log(mainProduct)
                const newVariant:Variant = {...variant,isDiscount:false, discountType:"% off", discountValue:0}
                const newProduct:ProductType = {...mainProduct,variants:[newVariant],isDiscount:false, discountType:"% off", discountValue:0,showVariants:false}
                const allProducts:ProductType[] = [...tempProducts,newProduct]
                setTempProducts(allProducts)
              }
            }
          }} 
          checked={isVariantPresent(variant)?true:false}
           className="accent-[#008060] ml-[70px] cursor-pointer h-[24px] w-[24px] rounded-md" type="checkbox" />
          <p className="ml-[23px] w-[400px]">{variant.title}</p>
          <p className="">${variant.price}</p>
        </div>
      </div>
    ))}
    
  </div>
  )}
</CellMeasurer>

}


  return (
    <AlertDialog open={isModalOpen}>
        <AlertDialogContent className="p-0 min-w-[663px]">
          <div className="flex justify-between items-center pt-[14px]">
            <p className="font-[500] text-[18px] pl-[28px] text-black">Select Products</p>
            <img className="h-[17px] w-[17px] mr-[24px]  cursor-pointer" onClick={()=>dispatch(handleModalClose())} src={closeModalIcon} alt="closeIcon" />
          </div>
          <hr className="border-1 border-black opacity-20" />
          <div className="px-[28px] pb-3 border-b-[1px] border-gray-400">
            <SearchInput onChange={(e)=>handleSearchChange(e)} placeholder="Search product" className="placeholder:text-gray-500 placeholder:text-[14px] font-[400] rounded-none" />
          </div>
          <div style={{
            width: 660,
            }}>
          {products && products.length>0 ? <AutoSizer>
            
            {({ height, width }) => (
                <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={products.length + 1 }
                >
                {({ onRowsRendered, registerChild }) => (
                  <div>
                    <List
                      style={{background:"white"}}
                    height={300}
                    width={width}
                    rowHeight={cache.rowHeight}
                    rowCount={products.length}
                    rowRenderer={rowRenderer}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    />
                  </div>
                )}
                </InfiniteLoader>
            )}
            </AutoSizer>:<p className="text-center">No Data</p>}

            
          </div>
          <div className="py-[8px] flex justify-between px-[21px] mt-[300px]">
            <p>{getSelectedProductcsText()}</p>
            <div>
              <Button variant={"outline"} className="w-[104px] h-[32px] bg-white border-2 border-gray-500 hover:bg-white" onClick={()=>dispatch(handleModalClose())}>Cancel</Button>
              <PrimaryButton disabled={tempProducts.length>0?false:true} className="w-[72px] h-[32px] ml-[10px]" onClick={()=>handleAddClick()}>Add</PrimaryButton>

            </div>
          </div>
        </AlertDialogContent>
    </AlertDialog>

  )
}

export default React.memo(AddProductDialogue)
