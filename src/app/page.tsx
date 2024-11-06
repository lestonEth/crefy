// import Connect from '@/components/Connect';
import { AppKit, W3mAccountActivityWidget } from '@reown/appkit'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles['main']}>
    <h1>Hello</h1>
    <w3m-account-button />
    <w3m-connect-button />
      {/* <Connect /> */}
    </main>
  )
}
