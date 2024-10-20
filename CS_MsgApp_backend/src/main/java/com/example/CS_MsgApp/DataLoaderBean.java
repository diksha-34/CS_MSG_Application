package com.example.CS_MsgApp;

import com.example.CS_MsgApp.Repositories.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoaderBean implements CommandLineRunner {

    @Autowired
    private  DataService dataService;

    @Autowired
    private MessageRepo messageRepo;
    @Override
    public void run(String... args) throws Exception {
        if(messageRepo.count()<1) {
            String csvFilePath = "src/main/resources/MessageData.csv";
            dataService.loadMessages(csvFilePath);
        }
        }
    }

