import React from 'react'
import { ProductType } from '../types/productsTypes'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import VariantItem from './Variant';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import dragIcon from '../assets/dargIcon.svg'
import editIcon from '../assets/editIcon.svg'
import deleteIcon from '../assets/deleteIcon.svg'
import downIcon from '../assets/downIcon.svg'
import upIcon from '../assets/upIcon.svg'
import {  useDispatch } from 'react-redux';
import { addDiscountToProduct,changeDiscountAmount,changeDiscountType,deleteProduct,handleModalOpen,toggleVariants } from '../redux/products/productsSlice';
import { 
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
 } from './ui/select';
import { Input } from './ui/input';
import PrimaryButton from './PrimaryButton';

export default function ProductItem({product,productIndex,allProducts,handleProductChange}:{product:ProductType,productIndex:number,allProducts:ProductType[],handleProductChange:(data:ProductType[])=>void}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: product.id});
      const dispatch = useDispatch()
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

      const handleDargEndEvent = (e:DragEndEvent)=>{
        const {active,over}= e;
        if(over && active.id !== over.id){
            const oldIndex = product.variants.findIndex(item=>item.id==active.id)
            const newIndex = product.variants.findIndex(item=>item.id==over.id)
            const newArr = arrayMove(product.variants,oldIndex,newIndex)
            const newProductData = [...allProducts]
            const productObj = {...product,variants:newArr}
            newProductData.splice(productIndex,1,productObj)
            handleProductChange(newProductData)
        }
      }
      const isError = ((product.discountType=="% off" && (product.discountValue<0 || product.discountValue>99)) || product.discountValue<0)
  return (
    <div style={style} ref={setNodeRef}>
        <div className='mt-4'>
            <div className='flex items-center'>
                <div className='flex items-center'>
                    <img src={dragIcon} alt='dragIcon' className='w-[7px] h-[14px]' {...attributes} {...listeners} />
                    <p className='ml-[13px] py-[5px]'>{productIndex+1}.</p>
                    <div className='ml-[8px] flex justify-between w-[251px] items-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)] h-[31px] px-[10px]'>
                        <p className='w-[150px] overflow-hidden text-ellipsis whitespace-nowrap ' title={product.title}>{product.title}</p>
                        <img src={editIcon} onClick={()=>dispatch(handleModalOpen())} alt='editIcon' className='cursor-pointer h-[16px] w-[16px]' />
                    </div>
                </div>
                <div className='ml-[13px] flex'>
                    {!product.isDiscount && <PrimaryButton disabled={false} onClick={()=>dispatch(addDiscountToProduct(product.id))}>Add Discount</PrimaryButton>}
                    {product.isDiscount && <div className='flex gap-[6px]'>
                        <Input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                            if(!isNaN(+e.target.value)){
                                dispatch(changeDiscountAmount({id:product.id,amount:e.target.value}))
                            }
                        }} className={`focus:border-2 h-[31px] focus:border-[#008060] w-[69px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)] ${isError ? "border-2 border-red-700":""}`} value={product.discountValue} />
                        <Select onValueChange={(value:"% off" | "flat off")=>{
                            dispatch(changeDiscountType({type:value,id:product.id}))
                        }} value={product.discountType}>
                            <SelectTrigger className="w-[95px] h-[31px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)] !border-none">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectItem value="% off">% off</SelectItem>
                                <SelectItem value="flat off">flat off</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>}
                        {allProducts.length>1 && <img className='cursor-pointer ml-[13px]' src={deleteIcon} onClick={()=>dispatch(deleteProduct(product.id))} alt='deleteIcon' />}
                </div>

            </div>
            <div className='flex cursor-pointer' onClick={()=>dispatch(toggleVariants(product.id))}>
                <p className='text-end w-[500px] text-[12px] underline text-[#006EFF] font-[400]'>{product.showVariants?"Hide variants":"Show variants"}</p>
                <img src={!product.showVariants?downIcon:upIcon} className='h-[21px] w-[11px] mt-[2px] ml-[3px]' alt='downIcon' />

            </div>
        </div>
        {product.showVariants && <div className='ml-[53px] mt-[50px]'>
            <DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDargEndEvent}>
                <SortableContext strategy={verticalListSortingStrategy} items={product.variants}>
                    {product.variants.length>0 && product.variants.map((v,index,arr)=>(
                        <VariantItem productId={product.id} variantIndex={index} allVariants={arr} key={v.id} variant={v} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>}
        {productIndex<allProducts.length-1 && <hr className='border-1 border-black opacity-20 mt-[30px] w-[41%] ml-[40px]' />}
    </div>
  )
}
