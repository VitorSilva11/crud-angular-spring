package com.treinamento.crudspring.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
	
	@GetMapping("/{id}")
	public ResponseEntity<Course> findById(@PathParam(value = "id") Long id){
		
		return service.findById(id).map(record -> ResponseEntity.ok().body(record))
									.orElse(ResponseEntity.notFound().build());
		
	}
	
	@PostMapping
	@ResponseStatus(code = HttpStatus.CREATED)
	public Course create(@RequestBody Course course) {
		return this.service.save(course);
	}
	
	
}
