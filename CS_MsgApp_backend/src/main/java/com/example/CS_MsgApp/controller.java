package com.example.CS_MsgApp;

import com.example.CS_MsgApp.Repositories.AgentRepo;
import com.example.CS_MsgApp.Repositories.MessageRepo;
import com.example.CS_MsgApp.Repositories.ResponseRepo;
import com.example.CS_MsgApp.Websockets.MessageWebSocketHandler;
import com.sun.net.httpserver.HttpsServer;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/")
@CrossOrigin
public class controller {

    @Autowired
    MessageRepo messageRepo ;
    @Autowired
    MessageWebSocketHandler socketHandler;

    @Autowired
    AgentRepo agentRepo;

    @Autowired
    ResponseRepo responseRepo;

    @GetMapping("messages")
    ResponseEntity<List<Message>> getMessages(){
        List<Message> messages = messageRepo.findAllOpenMessages();
        return  new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @PutMapping("/updateState/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable Long id,@RequestParam boolean handled,@RequestBody String response) throws IOException {
        Optional<Message> opMsg = messageRepo.findById(id);
        if (opMsg.isPresent()) {
            Message msg = opMsg.get();
            if (handled) {
                msg.setState("closed");
                responseRepo.save(new Response(msg.getUserId(),response));
            }
            else {
                msg.setState("in-progress");
            }

            messageRepo.save(msg);
                        socketHandler.broadcast("Message Id: " + id + " state is updated ");
        return new ResponseEntity<>(msg,HttpStatus.OK);
        } else {
            return null;
        }
    }

    @PostMapping("/agentLogin")
    public ResponseEntity<String> adminLogin(@RequestParam String username, @RequestParam String password){

        Agent agent = agentRepo.getAgentById(username);

        if(agent != null && agent.getPassword().equals(password)){
            return  new ResponseEntity<>("Login successful ", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("password does not matched",HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/getAllResponses")
    public ResponseEntity<List<String>> getAllResponses(@RequestParam String userId){

        List<Response> responses = responseRepo.getAllResponses(userId);
        List<String> resp = new ArrayList<>();
        for(Response response:responses){
            resp.add(response.getResponse());

        }
        return new ResponseEntity<>(resp,HttpStatus.OK);
    }


    @PostMapping("/askQuestion")
    public ResponseEntity<String> askQuestions(@RequestBody Message msg){
        try{
            messageRepo.save(msg);
            return  new ResponseEntity<>("query submitted",HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return  new ResponseEntity<>("Error! ",HttpStatus.CONFLICT);

        }
    }


    @PostMapping("/sendResponse")
    public  ResponseEntity<String> sendResponse(@RequestBody Response response){
        try{
            responseRepo.save(response);
            return new ResponseEntity<>("Response sent",HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error! ",HttpStatus.CONFLICT);
        }
    }



    @PostMapping("/addAgent")
    public ResponseEntity<String> addAgent(@RequestBody Agent agent){
        try {
            agentRepo.save(agent);
            return  new ResponseEntity<>("added ",HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return  new ResponseEntity<>("New agent not  Added: ", HttpStatus.CONFLICT);
        }

    }





}
