package com.example.Backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Result")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String candidateId;

    private String CandidateName;

    private String videoPath; // store file path instead of blob

    
}
