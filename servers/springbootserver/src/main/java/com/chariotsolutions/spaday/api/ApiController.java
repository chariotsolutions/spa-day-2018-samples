package com.chariotsolutions.spaday.api;

import com.chariotsolutions.spaday.api.entity.Message;
import com.chariotsolutions.spaday.api.entity.Registration;
import com.chariotsolutions.spaday.api.entity.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping(path = "/api")
public class ApiController {
    private static Logger logger = Logger.getLogger(ApiController.class.getName());

    @Autowired
    ApiService apiService;

    @GetMapping(path = "/message/{id}")
    public ResponseEntity<Message> getMessage(@PathVariable("id") String id) {
        return mapResponse(apiService.getMessage(id));
    }

    @GetMapping(path = "/session")
    public ResponseEntity<List<Session>> getSessions() {
        List<Session> sessions = apiService.getSessions();
        return ResponseEntity.ok(sessions);
    }

    @GetMapping(path = "/session/{sessionId}")
    public ResponseEntity<Session> getSession(@PathVariable Long sessionId) {
        return mapResponse(apiService.getSession(sessionId));
    }

    @PostMapping(path = "/session/{sessionId}/subscribe")
    public ResponseEntity<Registration> registerForSession(
            @PathVariable("sessionId") Long sessionId,
            @RequestBody Registration registration) {

        registration.setSessionId(sessionId);

        return ResponseEntity.ok(apiService.saveRegistration(registration));
    }

    @GetMapping(path = "/session/{sessionId}/subscriptions")
    public ResponseEntity<List<Registration>> getRegistrationsForSessionId(@PathVariable("sessionId") Long sessionId) {
        List<Registration> registrations = apiService.getRegistrationsForSession(sessionId);
        return ResponseEntity.ok(registrations);
    }

    public static <T> ResponseEntity<T> mapResponse(Optional<T> optionalResult) {
        return optionalResult.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
