import axios from "axios"
import { useState } from "react";
import { METHOD } from "../utils";

export const useRequest=({ url, body, method })=>{
    let doRequest=async ()=>{
        try{
            if(method===METHOD.POST){
                let {data}=await axios.post(url, body, {
                    withCredentials: true
                });
                return data;
            }
            else{
                let {data}=await axios.get(url,{
                    withCredentials: true
                });
                console.log('DATA IN USEREQUEST:', url, data);
                return data;
            }

        }
        catch(err){
            return err;
        }
    }
    return doRequest;
}