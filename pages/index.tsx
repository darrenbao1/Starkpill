import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}></div>
        <div className={styles.optionsContainer}>
        <div className={styles.trait}>
            <div>prescribe yourself</div>
            <div>left arrow right arrow</div>
            <div className={styles.name}>trait</div>
          </div>
        <div className={styles.mintButton}>mint</div>
        <div className={styles.mintButton}>premium mint</div>

        </div>
      </div>
    </div>
    <picture ><img src="/background.png" alt="background" className="background"></img></picture>
    </>
  )
}
