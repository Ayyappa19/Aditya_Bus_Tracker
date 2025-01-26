import React,{useState,useRef, useEffect} from 'react';
import './onOtp.css';
const OtpInput= ({length=6,onOtpSubmit=()=>{}})=>{
    const [otp1,setOtp]=useState(new Array(length).fill(""));
    const inputRefs=useRef([]);

    useEffect(()=>{
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }
    },[]);
    // console.log(inputRefs);
    const handleChange=(index,e)=>{
        const value=e.target.value;
        if(isNaN(value)) return;
        const newOtp=[...otp1];
        newOtp[index]=value.substring(value.length-1);
        setOtp(newOtp);

        const combineOtp=newOtp.join("");
        if(combineOtp.length===length)
        onOtpSubmit(combineOtp)
       if(value && index<length-1 && inputRefs.current[index+1]){
        inputRefs.current[index+1].focus();
       }
     
    };

    const handleClick=(index)=>{
        inputRefs.current[index].setSelectionRange(1,1);
        if(index>0 && !otp1[index-1]){
            inputRefs.current[otp1.indexOf(" ")].focus();
        }
    };
    const handleKeyDown=(index,e)=>{
        if(e.key==="Backspace" && !otp1[index] && index>0  &&inputRefs.current[index-1] ){
            inputRefs.current[index-1].focus();

        }
    };
    return(
        <div className='hello'>
            {
            otp1.map((value,index)=>{
              return <input
                key={index}
                type="text"
                ref={(input)=>{inputRefs.current[index]=input}}
                value={value} 
                onChange={(e)=>handleChange(index,e)} 
                onClick={()=> handleClick(index)} 
                onKeyDown={(e)=>handleKeyDown(index,e)}
                className='otpInput'
                />
            })
          }
        </div>
    )
}
export default OtpInput;