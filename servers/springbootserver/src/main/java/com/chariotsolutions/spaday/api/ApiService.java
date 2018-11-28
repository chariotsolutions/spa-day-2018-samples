package com.chariotsolutions.spaday.api;

import com.chariotsolutions.spaday.api.entity.Message;
import com.chariotsolutions.spaday.api.entity.Registration;
import com.chariotsolutions.spaday.api.entity.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApiService {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    SessionRepository sessionRepository;

    @Autowired
    RegistrationRepository registrationRepository;

    public Optional<Message> getMessage(String id) {
        return messageRepository.findById(id);
    }

    public List<Session> getSessions() {
        return sessionRepository.findAllByOrderByDateAsc();
    }

    public Optional<Session> getSession(Long sessionId) {
        return sessionRepository.findById(sessionId);
    }

    public List<Registration> getRegistrationsForSession(Long sessionId) {
        return registrationRepository.findAllBySessionId(sessionId);
    }

    public Registration saveRegistration(Registration registration) {
        return registrationRepository.save(registration);
    }
}
