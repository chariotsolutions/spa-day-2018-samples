package com.chariotsolutions.spaday.api.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "MESSAGE")
public class Message {
    @Id
    @Column(name = "id")
    String id;

    @Column(name = "message_text")
    String messageText;
}
