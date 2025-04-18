'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { GrTechnology } from 'react-icons/gr'
import styles from './header.module.css'
import {AiOutlineMenu} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
const Navbar = () => {
    const [toggle, setToggle] = useState(false)
  return (
    <nav className={styles.navbar}>
        <div>
          <Link href="/" className={styles.logo}>
            CLOUD <GrTechnology /> HOSTING
           
          </Link>
          {/** */}
          <div 
          className={styles.menu}
          onClick={() => setToggle(prev => !prev)}
          >
     {toggle ? <IoMdClose/> :<AiOutlineMenu/> }
          </div>
        </div>
       <div
        className={styles.navLinksWrapper}
        style={{clipPath:toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" || ''}}
       >
       <ul className={styles.navLinks}>
          <Link href="/" className={styles.navLink} onClick={() => setToggle(false)}>
            Home
          </Link>
          <Link href="/articles?pageNumber=1" className={styles.navLink} onClick={() => setToggle(false)}>
            Articles
          </Link>
          <Link href="/about" className={styles.navLink} onClick={() => setToggle(false)}>
            About
          </Link>
          <Link href="/admin" className={styles.navLink} onClick={() => setToggle(false)}>
            Admin Dashbaord
          </Link>
        </ul>
       </div>
      </nav>
  )
}

export default Navbar