export interface ICompany {
    id: string;
    name: string;
    location: string;
    isActive: boolean;
    web?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    github?: string;
}

export interface ISale {
    id: string;
    type: string;
    createdAt: string;
    cardId: string;
    notes: string;
}

export interface IPerson {
    id: string;
    name: string;
    cardId: string;
    surname?: string;
    documentId?: string;
    notes?: string;
    age?: number;
    phone?: string;
    createdAt: string;
}


