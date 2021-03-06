import {ReactNode} from "react";
import styles from './main.module.scss'

export default function Main({children}: { children: ReactNode }) {
    return (
        <main className={styles.main}>
            <section>
                {children}
            </section>
        </main>
    )
}
