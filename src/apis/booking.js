import { Api } from './api'


export const book=async(slot_id)=>{
    
    const response = await Api().post(`slots/${slot_id}/book`, {
        booked:true
      })
    
    return response.data}

    
export const unBook=async(slot_id)=>{
    
    const response = await Api().post(`slots/${slot_id}/unbook`, {
       booked:false 
      })
    
    return response.data}