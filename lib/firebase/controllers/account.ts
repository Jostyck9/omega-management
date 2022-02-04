import Account, { NewAccount } from "@lib/firebase/models/account";
import { collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../clientApp";

export const createAccount = (userId: string, account: NewAccount) => {
    const newAccountRef = doc(collection(db, `users/${userId}/accounts`));
    const newAccount: NewAccount = account;

    return setDoc(newAccountRef, newAccount).catch((error) => console.error(error));
};

export const updateAccount = (userId: string, account: Account) => {
    const accountRef = doc(db, `users/${userId}/accounts/`, account.id!);
    const { name, login } = account;

    return updateDoc(accountRef, {
        name,
        login,
    });
};

export const deleteAccount = (userId: string, accountId: string) => {
    const accountRef = doc(db, `users/${userId}/accounts/`, accountId);

    return deleteDoc(accountRef).catch(() => console.error(`An error occured while deleting account ${accountId}`));
};
