package com.chariotsolutions.spaday.api.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "spa_registration")
public class Registration {
    @Id
    @SequenceGenerator(allocationSize = 1, name = "REGISTRATION_ID_GENERATOR", sequenceName = "REGISTRATION_ID_SEQ")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REGISTRATION_ID_GENERATOR")
    @Column(name = "id")
    Long id;

    @Column(name = "session_id")
    Long sessionId;

    @Column(name = "name")
    String name;

    @Column(name = "email")
    String email;

    @Column(name = "treatment")
    String treatment;
}
