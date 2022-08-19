package com.treinamento.crudspring.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	public ResponseEntity<Object> findById(@PathVariable Long id){
		
		Optional<Course> CourseModelOptional = service.findById(id);
		if(!CourseModelOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course Not Found");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(CourseModelOptional.get());
		
		
	}
	
	@PostMapping
	@ResponseStatus(code = HttpStatus.CREATED)
	public Course create(@RequestBody Course course) {
		return this.service.save(course);
	}
	
	@PutMapping
	@ResponseStatus(code = HttpStatus.OK)
	public Course update(@RequestBody Course course) {
		
		return this.service.save(course);
		
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.OK)
	public void remove(@PathVariable Long id) {
		
		
		Optional<Course> optionalCourse = this.service.findById(id);
		
		this.service.remove(optionalCourse.get());

		
	}
	
}
