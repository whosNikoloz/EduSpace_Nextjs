'use client'

import { title } from "@/components/Home/primitives";
import { Hero } from "@/components/verificationsuccessful/Hero";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import Cookies from "universal-cookie";

export default function VerificationSuccessfulPage() {

    const router = useRouter()
    const [userUserName , setUserUserName] = useState(null);
    const [userEmail , setUserEmail] = useState(null);

    useEffect(() => {
        var cookie = new Cookies();
        setUserUserName(cookie.get("regUserName")) 
        setUserEmail(cookie.get("regEmail"))      
            
        cookie.remove("regUserName")
        cookie.remove("regEmail")

        setTimeout(() => {
            router.push("/users/auth");
        }, 3000); 
    }, []); 

	return (
		<Hero userEmail={userEmail} userName={userUserName}/>
	);
}
