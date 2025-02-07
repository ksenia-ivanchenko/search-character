import { ChangeEvent, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";

import { Input } from "@ui-kit";
import { getCharactersByName } from "@api";
import { CharacterCard } from "@components";
import styles from "./search-page.module.scss";

export const SearchPage = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [characters, setCharacters] = useState([]);
    const [charactersCount, setCharactersCount] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        return () => debouncedFetch.cancel();
    }, []);

    const getNewCharacters = async () => {
        const newPage = page + 1;
        setPage(newPage);
        const response = await getCharactersByName({
            name: inputValue,
            page: newPage,
        });
        setCharacters((prev) => [...prev, ...response.results]);
        setCharactersCount(response.info.count);
    };

    const getCharacters = async (name: string) => {
        try {
            const response = await getCharactersByName({
                name: name,
                page: 1,
            });
            setCharacters(response.results);
            setCharactersCount(response.info.count);
        } catch (error) {
            setCharactersCount(0);
            setCharacters([]);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetch = useRef(debounce(getCharacters, 500)).current;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setPage(1);

        if (value.length === 3) {
            setLoading(true);
            getCharacters(value);
        }

        if (value.length > 3) {
            setLoading(true);
            debouncedFetch(value);
        }

        if (value.length === 0) {
            setCharacters([]);
            setCharactersCount(null);
        }
    };

    return (
        <InfiniteScroll
            dataLength={characters.length}
            next={getNewCharacters}
            hasMore={characters.length < charactersCount}
            loader={<div key="loader">Loading...</div>}
            className={styles.content}
        >
            <Input
                placeholder="Search characters..."
                value={inputValue}
                onChange={handleInputChange}
                ref={inputRef}
                hintMesage={
                    charactersCount !== null &&
                    `Found characters: ${charactersCount}`
                }
                id="search"
            />

            <div className={styles.charactersContainer}>
                {characters?.map((item) => (
                    <CharacterCard character={item} key={item.id} />
                ))}
                {loading && <ClipLoader size={50} />}
            </div>
        </InfiniteScroll>
    );
};
