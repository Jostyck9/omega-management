import { collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../clientApp";
import { Pack, NewPack } from '../models/pack';

export const createPack = (userId: string, accountId: string, pack: NewPack) => {
    const newPackRef = doc(collection(db, `users/${userId}/accounts/${accountId}/packs`));

    return setDoc(newPackRef, pack).catch((error) => console.error(error));
};

export const updatePack = (userId: string, accountId: string, pack: Pack) => {
    const packRef = doc(db, `users/${userId}/accounts/${accountId}/packs`, pack.id!);
    const { activationDate, endDate, initialValue, name } = pack;

    return updateDoc(packRef, {
        name,
        activationDate,
        endDate,
        initialValue,
    });
};

export const deletePack = (userId: string, accountId: string, packId: string) => {
    const packRef = doc(db, `users/${userId}/accounts/${accountId}/packs`, packId);

    return deleteDoc(packRef).catch(() => console.error(`An error occured while deleting pack ${packId}`));
};
