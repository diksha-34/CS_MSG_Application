package com.example.CS_MsgApp.Repositories;

import com.example.CS_MsgApp.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponseRepo extends JpaRepository<Response,Long> {

    @Query("SELECT r FROM Response r WHERE r.userId = :userId")
    public List<Response> getAllResponses(@Param("userId") String userId);

}
