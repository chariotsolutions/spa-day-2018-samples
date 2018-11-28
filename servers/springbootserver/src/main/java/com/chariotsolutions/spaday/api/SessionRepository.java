package com.chariotsolutions.spaday.api;

import com.chariotsolutions.spaday.api.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {
    public List<Session> findAllByOrderByDateAsc();
}
