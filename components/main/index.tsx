import {ReactNode} from "react";
import styles from './main.module.scss'

export default function Main({children}: { children: ReactNode }) {
    return (
        <main className={styles.main}>
            {/*<section style={{minHeight: "100vh"}}>*/}
            <section>
                {children}
            </section>
        </main>
    )
}
