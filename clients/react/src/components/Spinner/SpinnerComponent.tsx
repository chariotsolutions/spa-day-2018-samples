import styles from './Spinner.module.scss';
import React, { StatelessComponent } from 'react';
import Logo from '../../assets/head.png';

export const SpinnerComponent: StatelessComponent = () => (
  <div className={styles.wrapper}>
    <img className={styles.spinner} src={Logo}/>
  </div>
);
