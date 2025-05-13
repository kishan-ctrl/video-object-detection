package com.example.Backend.Controller;

import com.example.Backend.Entity.Result;

import com.example.Backend.Service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/results")
@CrossOrigin("*")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @PostMapping("/upload")
    public Result uploadResult(
            @RequestParam("candidateId") String candidateId,
            @RequestParam("candidateName") String candidateName,
            @RequestParam("video") MultipartFile videoFile
    ) throws Exception {
        return resultService.saveResult(candidateId, candidateName, videoFile);
    }
}
