export interface Pack {
    id?: string;
    name: string;
    initialValue: number;
    activationDate: Date;
    endDate: Date;
}

export type NewPack = Omit<Pack, "id">;