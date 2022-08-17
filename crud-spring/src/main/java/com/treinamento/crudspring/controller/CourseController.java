package com.treinamento.crudspring.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.treinamento.crudspring.model.Course;
import com.treinamento.crudspring.service.CourseService;

@RestController
@RequestMapping("/api/course")
public class CourseController {

	private CourseService service;
	
	public CourseController(CourseService service) {
		this.service = service;
	}
	
	
	@GetMapping
	public List<Course> listCourses(){
		return service.findAll();
	}
	
}
