package com.example.demo.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class ExchangeRateUtils {
	private static HttpURLConnection connection;
	
	public static String getExchangeRate (String apiKey) {
		Calendar calendar = Calendar.getInstance();
		int nowHour = calendar.get(Calendar.HOUR_OF_DAY);
		
		String searchDate = "";
		Date today = new Date();
		
		
		int before = 0;
		if(nowHour < 11 )
			before++;
		
		
		String dataType = "AP01";
		String exchangeRate = "";
		
		BufferedReader reader;
	    String line;
	    StringBuffer responseContent = new StringBuffer();
	    JSONParser parser = new JSONParser();
		
	    int loop = 1;

	    do {
	    	searchDate = new SimpleDateFormat("yyyyMMdd").format(today.getTime() - (24 * 60 * 60 * 1000)*before);
			//System.out.println("date : "+searchDate);
		    try {
		    	URL url = new URL("https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=" + apiKey + "&searchdate=" + searchDate + "&data=" + dataType);
		        connection = (HttpURLConnection) url.openConnection();
		        
		        connection.setRequestMethod("GET");
		        connection.setConnectTimeout(5000);
		        connection.setReadTimeout(5000);
		        
		        int status = connection.getResponseCode();
		        
		        
		     // API 호출
		        // 실패했을 경우 Connection Close
		        if (status > 299) {
		            reader = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
		            while ((line = reader.readLine()) != null) {
		                responseContent.append(line);
		            }
		            reader.close();
		        } else { // 성공했을 경우 환율 정보 추출
		            reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
		            while ((line = reader.readLine()) != null) {
		            	if(!line.equals("[]")) {
		            		JSONArray exchangeRateInfoList = (JSONArray) parser.parse(line);
		            		exchangeRate += searchDate;
			                for (Object o : exchangeRateInfoList) {
			                    JSONObject exchangeRateInfo = (JSONObject) o;
			                    if (exchangeRateInfo.get("cur_unit").equals("USD")) {
			                        exchangeRate += " USD " + exchangeRateInfo.get("deal_bas_r").toString();
			                    }else if (exchangeRateInfo.get("cur_unit").equals("JPY(100)")) {
			                        exchangeRate += " JPY " + exchangeRateInfo.get("deal_bas_r").toString();
			                    }else if (exchangeRateInfo.get("cur_unit").equals("EUR")) {
			                        exchangeRate += " EUR " + exchangeRateInfo.get("deal_bas_r").toString();
			                    }else if (exchangeRateInfo.get("cur_unit").equals("CNH")) {
			                        exchangeRate += " CNH " + exchangeRateInfo.get("deal_bas_r").toString();
			                    }
			                }
			                loop = 0;
		            	}else {
		            		before++;
		            	}
		                
		           }
		           reader.close();
		        }
		    }catch(MalformedURLException e) {
		    	throw new RuntimeException(e);
		    }catch (IOException e) {
		        throw new RuntimeException(e);
		    }catch (ParseException e) {
		        throw new RuntimeException(e);
		    }finally {
		        connection.disconnect();
		    }
	    }while(loop == 1);
	    
	    
	    
		return exchangeRate;
	}
}
