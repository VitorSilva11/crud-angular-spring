package com.treinamento.crudspring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.treinamento.crudspring.model.Course;
import com.treinamento.crudspring.repository.CourseRepository;

@Service
public class CourseService {
	
	private CourseRepository repository;
	
	public CourseService(CourseRepository repository) {
		this.repository = repository;
	}
	
	
	public List<Course> findAll(){
		return repository.findAll();
	}
	
	
	public Course save(Course course) {
		return repository.save(course);
	}
	
	public Optional<Course> findById(Long id) {
		
		return repository.findById(id);
		
	}
	
	public void remove(Course course) {
		repository.delete(course);
	}
	

}
