import { Character } from "@constants";
import { api } from "../instance";

type GetCharactersByNameRequest = {
    name: string;
    page?: number;
};

type GetCharactersByNameResponse = {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: null | string;
    };
    results: Character[];
};

export const getCharactersByName = async ({
    name,
    page,
}: GetCharactersByNameRequest) => {
    try {
        const response = await api.get<GetCharactersByNameResponse>(
            `/character/?page=${page}&name=${name}`
        );
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
