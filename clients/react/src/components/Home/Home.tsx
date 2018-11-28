import styles from './Home.module.scss';
import React, { Component } from 'react';
import { Routes } from '../../Routes/routes';
import { Welcome } from '../Welcome/Welcome';

export class Home extends Component {
    public render() {
        return (
            <div className={styles.home}>
                <h1>Welcome to the SPA</h1>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <Welcome/>
                    </div>

                    <div className={styles.column}>
                        <Routes/>
                    </div>
                </div>
            </div>
        );
    }
}
