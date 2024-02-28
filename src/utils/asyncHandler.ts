import { Request,Response,NextFunction } from "express"
export const asyncHandler = (fn:any) => async (req:Request,res:Response,next:NextFunction)=>{
    try{
        await fn(req,res,next)
    }
    catch(error){
        console.log("Error in middleware function for error handling",error)
    }
}

// this function can be reuse where we need to do error handling

