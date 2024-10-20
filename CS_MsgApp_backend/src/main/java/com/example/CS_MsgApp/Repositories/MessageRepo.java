package com.example.CS_MsgApp.Repositories;

import com.example.CS_MsgApp.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE m.state != 'closed'")
    List<Message> findAllOpenMessages();  // You can give the method a descriptive name
}

