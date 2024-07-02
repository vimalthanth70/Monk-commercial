import React from 'react'
import { Variant } from '../types/productsTypes'
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import dragIcon from '../assets/dargIcon.svg'
import deleteIcon from '../assets/deleteIcon.svg'
import { useDispatch } from 'react-redux';
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
import { deleteVariant,addDiscountToVariant,changeDiscountTypeOfVariant,changeDiscountValueOfVariant } from '../redux/products/productsSlice';

export default function VariantItem({variant,allVariants,variantIndex,productId}:{variant:Variant,allVariants:Variant[],variantIndex:number,productId:number}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: variant.id});
      const dispatch = useDispatch()
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
      const isError = ((variant.discountType=="% off" && (variant.discountValue<0 || variant.discountValue>99)) || variant.discountValue<0)
  return (
    <div style={style} ref={setNodeRef} className='flex mt-[22px] items-center'>
        <div className='flex gap-2 h-[31px] items-center'>
            <img src={dragIcon} alt='dragIcon' className='w-[7px] h-[14px]' {...attributes} {...listeners}/>
            <p className='w-[220px] h-[100%] flex items-center overflow-hidden text-ellipsis whitespace-nowrap shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)] px-[10px] rounded-3xl' title={variant.title}>{variant.title}</p>
        </div>
        <div className='ml-[15px] flex'>
            {!variant.isDiscount && <PrimaryButton disabled={false} onClick={()=>dispatch(addDiscountToVariant({productId,variantIndex}))}>Add Discount</PrimaryButton>}
            {variant.isDiscount &&<div className='flex gap-[6px]'>
                    <Input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                            if(!isNaN(+e.target.value)){
                                dispatch(changeDiscountValueOfVariant({productId,variantIndex,amount:e.target.value}))
                            }
                        }} className={`focus:border-2 h-[31px] focus:border-[#008060] w-[69px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)] rounded-3xl ${isError ? "border-2 border-red-700":""}`} value={variant.discountValue} />
                    <Select value={variant.discountType} onValueChange={(value:"% off"|"flat off")=>dispatch(changeDiscountTypeOfVariant({productId,variantIndex,type:value}))}>
                        <SelectTrigger className="w-[95px] h-[31px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)] !border-none rounded-3xl">
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
                {allVariants.length>1 && <img className='cursor-pointer ml-[13px]' src={deleteIcon} 
                onClick={()=>dispatch(deleteVariant({productId:productId,variantIndex:variantIndex}))}
                 alt='deleteIcon' />}
        </div>
    </div>
  )
}
