package com.example.CS_MsgApp;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Message {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(columnDefinition = "TEXT")
    String userId;
    @Column(columnDefinition = "TEXT")
    String timeStamp;
    @Column(columnDefinition = "TEXT")
    String text;

    String state = "open";

    public Message(String userId, String timeStamp, String  text){
        this.userId = userId;
        this.timeStamp = timeStamp;
        this.text = text;

    }



}
