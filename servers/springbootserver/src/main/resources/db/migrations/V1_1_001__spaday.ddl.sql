
CREATE TABLE message (
    id          VARCHAR2(48) NOT NULL PRIMARY KEY,
    message_text VARCHAR2(20) NOT NULL
);


insert into message(id, message_text) values ('id123', 'this is a message');


create table spa_session(id number primary key, session_name varchar2(255) not null, session_date datetime not null);
create sequence SESSION_ID_SEQ;

insert into spa_session(id, session_name, session_date) values(SESSION_ID_SEQ.nextval, 'Session 1', '2018-11-28T11:00:00-04:00');
insert into spa_session(id, session_name, session_date) values(SESSION_ID_SEQ.nextval, 'Session 2', '2018-11-28T12:00:00-04:00');


create table spa_registration(id number primary key, session_id number not null, name varchar2(255) not null, email varchar2(255) not null, treatment varchar2(255));
create sequence REGISTRATION_ID_SEQ;
