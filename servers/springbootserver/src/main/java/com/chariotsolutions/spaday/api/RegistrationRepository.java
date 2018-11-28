package com.chariotsolutions.spaday.api;

import com.chariotsolutions.spaday.api.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    public List<Registration> findAllBySessionId(Long id);
    public Registration save(Registration registration);
}
