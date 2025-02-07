import { ComponentProps, forwardRef } from "react";
import styles from "./input.module.scss";
import clsx from "clsx";

interface InputProps extends ComponentProps<"input"> {
    hintMesage?: string;
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ hintMesage, className, ...props }, ref) => (
        <div className={clsx(styles.container, className)}>
            <input className={styles.input} ref={ref} {...props} />
            {hintMesage && <span className={styles.hint}>{hintMesage}</span>}
        </div>
    )
);
