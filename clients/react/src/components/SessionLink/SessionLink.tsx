import styles from './SessionLink.module.scss';
import React, { StatelessComponent } from 'react';
import format from 'date-fns/format'
import addHours from 'date-fns/add_hours';
import { Session } from '../../domain/session';
import { Link } from 'react-router-dom';

export const SessionLink: StatelessComponent<Session> = (props) => {
    const endDate = addHours(props.date, 1)
    const startTime = format(props.date, 'h a')
    const endTime = format(endDate, 'h a')
    return (
        <div className={styles.sessionLink}>
            <div>
                <div className={styles.time}>{`${startTime} - ${endTime}`}</div>
                <div className={styles.date}>{format(props.date, 'MMMM Do')}</div>
            </div>
            <div className={styles.attendees}>
                {props.registrations.length}
            </div>
            <Link to={`/schedule/${props.id}/register`} className={styles.link}/>
        </div>
    );
};
