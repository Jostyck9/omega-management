import Account from '@lib/firebase/models/account';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../clientApp';

export const createAccount = (userId: string, account: Account) => {
    const newAccountRef = doc(collection(db, `users/${userId}/accounts`));
    return setDoc(newAccountRef, account);
}

export const deleteAccount = (userId: string, accountId: string) => {
    const accountRef = doc(db, `users/${userId}/accounts/`, accountId);

    return deleteDoc(accountRef);
}