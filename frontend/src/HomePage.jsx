import { useContext } from "react";
import { UserContext } from "./App";

export const HomePage = ({ setCurrentUser }) => {
    const currentUser = useContext(UserContext);

    function logout() {
        setCurrentUser(undefined);
    }

    if (currentUser.ceo_id) { //CEO homepage
        return <>
            Hello {currentUser.cname}!
        </>
    } 
    
    else if (currentUser.employee_id) { //Employee or Financial Manager homepage
        return <>
            Hello {currentUser.ename}!
        </>
    }
}