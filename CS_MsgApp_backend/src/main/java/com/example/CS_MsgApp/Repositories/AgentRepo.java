package com.example.CS_MsgApp.Repositories;

import com.example.CS_MsgApp.Agent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AgentRepo extends JpaRepository<Agent, Long> {

    @Query("SELECT A FROM Agent A WHERE A.username = :username")
    public Agent getAgentById(@Param("username") String username);

}
