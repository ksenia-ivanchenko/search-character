import { Character } from "@constants";
import styles from "./character-card.module.scss";
import clsx from "clsx";

type CharacterCardProps = {
    character: Character;
};

export const CharacterCard = ({ character }: CharacterCardProps) => (
    <a href={character.url} target="_blank" className={styles.card}>
        <h2 className={styles.title}>
            {character.name} - {character.species}
        </h2>
        <div className={styles.footer}>
            <span className={styles.statusString}>
                Status:{" "}
                <span
                    className={clsx(
                        styles.statusNumber,
                        styles[character.status]
                    )}
                >
                    {character.status}
                </span>
            </span>
            <span className={styles.created}>
                Created: {new Date(character.created).toLocaleDateString()}
            </span>
        </div>
    </a>
);
