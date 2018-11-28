import styles from './Header.module.scss';
import React, { PureComponent } from 'react';
import Logo from '../../assets/head.png';
import Chariot from '../../assets/chariot.svg';

export class Header extends PureComponent {
    public render() {
        return (
            <div className={styles.header}>
                <img className={styles.spaLogo} src={Logo}/>
                <span className={styles.title}>Chariot SPA Day</span>
                <img className={styles.chariotLogo} src={Chariot}/>
            </div>
        );
    }
}
