package com.example.CS_MsgApp;

import com.example.CS_MsgApp.Repositories.MessageRepo;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

@Service
public class DataService {


    @Autowired
    MessageRepo messageRepo;


    @Transactional
    public void loadMessages(String csvFilePath) throws IOException {
        try(CSVReader reader = new CSVReader(new FileReader(csvFilePath))) {
            String[] line;
            while((line = reader.readNext())!= null){
                String userId = line[0].trim();
                String timeStamp = line[1].trim();
                String text = line[2].trim();

                Message message = new Message(userId,timeStamp,text);
                messageRepo.save(message);
                }
            } catch (CsvValidationException ex) {
            throw new RuntimeException(ex);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
