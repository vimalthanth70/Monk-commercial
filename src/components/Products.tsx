import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ProductItem from './ProductItem'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { ProductType } from '../types/productsTypes'
import { useDispatch,useSelector } from 'react-redux'
import { changeOrderOfProducts } from '../redux/products/productsSlice'
import { RootState } from '../redux/store'
import SecondaryButton from './SecondaryButton'
import AddProductDialogue from './AddProductModal'
import { handleModalOpen } from '../redux/products/productsSlice'
import dragIcon from '../assets/dargIcon.svg'
import editIcon from '../assets/editIcon.svg'
import PrimaryButton from './PrimaryButton'



export default function Products() {
    const productList = useSelector((state:RootState)=>state.products.selectedProoducts)
    const dispatch = useDispatch()
    const handleProductChange = (data:ProductType[])=>{
        dispatch(changeOrderOfProducts(data))
    }
  return (
    <div className='mt-[67px] ml-[305px]'>
        <h2 className='font-[600] text-[#202223] text-[16px] ml-[16px]'>Add Products</h2>
        <div className='mt-[33px]'>
            <div className='flex ml-[56px]'>
                <div className='font-[500] text-[14px] text-black'>
                    Product
                </div>
                <div className='font-[500] text-[14px] ml-[210px] text-black'>
                    Discount
                </div>

            </div>
        </div>
        <DndContext collisionDetection={closestCenter}
         modifiers={[restrictToVerticalAxis]}
          onDragEnd={(e:DragEndEvent)=>{
                const {active,over}= e;
                if(over && active.id !== over.id){
                    const oldIndex = productList.findIndex(item=>item.id==active.id)
                    const newIndex = productList.findIndex(item=>item.id==over.id)
                    dispatch(changeOrderOfProducts(arrayMove(productList,oldIndex,newIndex)))
                }
                console.log(productList,'data102')
            }}>
            <SortableContext strategy={verticalListSortingStrategy}  items={productList}>
                {productList.length>0 && productList.map((product,index,arr)=>(
                    <ProductItem key={product.id} handleProductChange={handleProductChange} allProducts={arr} product={product}  productIndex={index} />
                ))}
            </SortableContext>
        </DndContext>
        {productList.length==0 && <div className='mt-4'>
            <div className='flex items-center'>
                <div className='flex items-center'>
                    <img src={dragIcon} alt='dragIcon' className='w-[7px] h-[14px]' />
                    <p className='ml-[13px] py-[5px]'>1.</p>
                    <div className='ml-[8px] flex justify-between w-[251px] items-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)] h-[31px] px-[10px]'>
                        <p className='w-[150px] overflow-hidden text-ellipsis whitespace-nowrap '>Select product</p>
                        <img src={editIcon} onClick={()=>dispatch(handleModalOpen())} alt='editIcon' className='cursor-pointer h-[16px] w-[16px]' />
                    </div>
                </div>
                <div className='ml-[13px] flex'>
                    <PrimaryButton disabled={true}
                     onClick={()=>{}}
                     >Add Discount</PrimaryButton>
                 </div>

            </div>
        </div>}
        <div className='ml-[300px] mt-[43px]'>
            <SecondaryButton onClick={()=>dispatch(handleModalOpen())}>Add Product</SecondaryButton>

        </div>
        <AddProductDialogue />
    </div>
  )
}
