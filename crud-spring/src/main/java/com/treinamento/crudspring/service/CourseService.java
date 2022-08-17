package com.treinamento.crudspring.service;

import java.util.List;

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
	

}
