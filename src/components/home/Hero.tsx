import { TiTick } from "react-icons/ti";
import Image from "next/image";
import styles from './hero.module.css'
const Hero = () => {
  return (
    <div className={styles.hero}>
      {/**content */}
      <div className={styles.heroLeft}>
        <h1 className={styles.title}>Cloud Hosting</h1>
        <p className={styles.desc}>The best web hosting solution for your online sucess.</p>

        <div className={styles.services}>
        <div  className={styles.serviceItem} >
          <TiTick /> Easy To Use Control Panel
        </div>
        <div  className={styles.serviceItem}>
          <TiTick /> ecure Hosting
        </div >
        <div  className={styles.serviceItem}>
          <TiTick />
          Website Maintenance
        </div>
        </div>
      </div>
      {/**Cloud hosting image */}
      <div className="">
        <Image 
        src="/cloud-hosting.png"
        alt="Cloud hosting Image"
        width={500}
        height={500}
        />
      </div>
    </div>
  );
};

export default Hero;
