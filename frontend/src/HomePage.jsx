import { useContext } from "react";
import { UserContext } from "./App";

export const HomePage = ({ setCurrentUser }) => {
    const currentUser = useContext(UserContext);

    function logout() {
        setCurrentUser(undefined);
    }
    return <>
        Hello {currentUser.name}!
    </>
}