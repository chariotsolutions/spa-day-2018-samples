package com.chariotsolutions.spaday.api.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
@Entity
@Table(name = "spa_session")
public class Session {
    @Id
    @SequenceGenerator(allocationSize = 1, name = "SESSION_ID_GENERATOR", sequenceName = "SESSION_ID_SEQ")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SESSION_ID_GENERATOR")
    @Column(name = "id")
    Long id;

    @Column(name = "session_name")
    String name;

    @Column(name = "session_date")
    @Temporal(TemporalType.TIMESTAMP)
    Date date;
}
