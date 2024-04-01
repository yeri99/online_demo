package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.utils.ExchangeRateUtils;

@Controller
public class IndexController {
	
	@Value("${EXCH_API_KEY}")
	String exchKey;
	
	@Value("${WEATHER_API_KEY}")
	String weatherKey;
	
	@GetMapping("/")
	public String indexPage(Model model) {
		String rateInfo = ExchangeRateUtils.getExchangeRate(exchKey);
		
		model.addAttribute("rateInfo", rateInfo);
		model.addAttribute("weatherKey", weatherKey);
		
		
		return "index";
	}
}
