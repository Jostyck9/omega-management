export default interface Account {
    id?: string;
    name: string;
    login: string;
}

export type NewAccount = Omit<Account, "id">;