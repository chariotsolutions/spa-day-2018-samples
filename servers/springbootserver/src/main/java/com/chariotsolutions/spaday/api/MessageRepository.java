package com.chariotsolutions.spaday.api;

import com.chariotsolutions.spaday.api.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, String> {
}
