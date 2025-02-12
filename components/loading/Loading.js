import styles from './loading.module.css';

export default function Loading() {
    return (
        <div className={styles.loadingContainer}>
            <img src="/ramenload.png" alt="Loading" className={styles.ramenImage} />
        </div>
    );
}   