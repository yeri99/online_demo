package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WeatherController {
	@GetMapping("/moreWeather")
	public String moreWeatherPage() {
		return "index/WeatherPop";
	}
}
