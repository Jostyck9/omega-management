import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase/clientApp";
import { createUserProfileDocument } from "../lib/firebase/user";
import { onSnapshot } from "firebase/firestore";
//import { setCurrentUser } from "../redux/user/actions";

import { useAppDispatch } from "redux/hooks";
import { setCurrentUser } from "redux/userSlice";
import User from "@lib/firebase/models/user";

// Component's children only shown to logged-in users
const AuthCheck = (props: any) => {
    const dispatch = useAppDispatch();

    const [user, loading, error] = useAuthState(auth);

    if (!loading && user) {
        createUserProfileDocument(user).then((userRef) => {
            onSnapshot(userRef, (snapShot) => {
                dispatch(setCurrentUser({ id: snapShot.id, user: snapShot.data() as User }));
            });
        });
    } else {
        dispatch(setCurrentUser({}));
    }
    console.log("Loading:", loading, "|", "Current user:", user);

    return props.children;
};

export default AuthCheck;
