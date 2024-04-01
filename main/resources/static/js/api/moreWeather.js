/**
 * 
 */
console.log("in");

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

let weatherInfo = {
	timezone: '대구광역시 중구',
	temp: 0,
	temp_min: 0,
	temp_max: 0,
	pop: 0,
	humidity: 0,
	sixAm: 0,
	nineAm: 0,
	zeroPm: 0,
	threePm: 0,
	sixPm: 0,
	ninePm: 0,
	pty: 0,
	sky: 0
}

let timeWeatherInfo = {
	sixAm: '',
	nineAm: '',
	zeroPm: '',
	threePm: '',
	sixPm: '',
	ninePm: '',
}

let timeWeatherList = [];

for(let i = 0; i < 3; i++){
	timeWeatherList.push(timeWeatherInfo);
}

const getWeatherInfo = () => {
	const locX = 89;
	const locY = 90;
	
	
	let dateStr = getDate();
	let timeStr = getTime(1);
	 
	
	//const apiKey = $('#weatherKey').val();
	const apiKey = "";
	const curentUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${apiKey}&numOfRows=10&pageNo=1&base_date=${dateStr}&base_time=${timeStr}&nx=${locX}&ny=${locY}&dataType=JSON`;
	const foreUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&numOfRows=300&pageNo=1&base_date=${dateStr}&base_time=0200&nx=${locX}&ny=${locY}&dataType=JSON`;
 
 	fetch(curentUrl)
 		.then((responseData) => {
			const data = responseData.json();
			return data;
		})
		.then((data)=>{
			const items = data.response.body.items.item;
			weatherInfo.temp = items.find(({category})=>category==="T1H").obsrValue;
			weatherInfo.humidity = items.find(({category})=>category==="REH").obsrValue;
			weatherInfo.pty = items.find(({category})=>category==="PTY").obsrValue;
			//weatherInfo.icon = data.weather[0].icon;
		})
		.then(()=>{
			$("#current-temp").text(weatherInfo.temp);
			$("#current-hum").text(weatherInfo.humidity);
		})
		.catch((error) => console.log(error));
		
		
	fetch(foreUrl)
 		.then((responseData) => {
			const data = responseData.json();
			return data;
		})
		.then((data)=>{
			const items = data.response.body.items.item;
			// 최저, 최고 기온
			weatherInfo.temp_min = items.find(({category})=>category==="TMN").fcstValue;
			weatherInfo.temp_max = items.find(({category})=>category==="TMX").fcstValue;
			
			// 비올 확률
			weatherInfo.pop = items.find(({category, fcstTime})=>category==="POP" && fcstTime===getTime(0)).fcstValue;
			weatherInfo.sky = items.find(({category, fcstTime})=>category==="SKY" && fcstTime===getTime(0)).fcstValue;
			
			// 시간별 예측 온도
			weatherInfo.sixAm = items.find(({category, fcstDate, fcstTime})=>category==="TMP" && fcstDate===dateStr && fcstTime==="0600").fcstValue;
			weatherInfo.nineAm = items.find(({category, fcstDate, fcstTime})=>category==="TMP" && fcstDate===dateStr && fcstTime==="0900").fcstValue;
			weatherInfo.zeroPm = items.find(({category, fcstDate, fcstTime})=>category==="TMP" && fcstDate===dateStr && fcstTime==="1200").fcstValue;
			weatherInfo.threePm = items.find(({category, fcstDate, fcstTime})=>category==="TMP" && fcstDate===dateStr && fcstTime==="1500").fcstValue;
			weatherInfo.sixPm = items.find(({category, fcstDate, fcstTime})=>category==="TMP" && fcstDate===dateStr && fcstTime==="1800").fcstValue;
			weatherInfo.ninePm = items.find(({category, fcstDate, fcstTime})=>category==="TMP" && fcstDate===dateStr && fcstTime==="2100").fcstValue;
			
			timeWeatherInfo.sixAm = items.find(({category, fcstDate, fcstTime})=>category==="SKY" && fcstDate===dateStr && fcstTime==="0600").fcstValue;
			timeWeatherInfo.sixAm += items.find(({category, fcstDate, fcstTime})=>category==="PTY" && fcstDate===dateStr && fcstTime==="0600").fcstValue;
			timeWeatherInfo.nineAm = items.find(({category, fcstDate, fcstTime})=>category==="SKY" && fcstDate===dateStr && fcstTime==="0900").fcstValue;
			timeWeatherInfo.nineAm += items.find(({category, fcstDate, fcstTime})=>category==="PTY" && fcstDate===dateStr && fcstTime==="0900").fcstValue;
			timeWeatherInfo.zeroPm = items.find(({category, fcstDate, fcstTime})=>category==="SKY" && fcstDate===dateStr && fcstTime==="1200").fcstValue;
			timeWeatherInfo.zeroPm += items.find(({category, fcstDate, fcstTime})=>category==="PTY" && fcstDate===dateStr && fcstTime==="1200").fcstValue;
			timeWeatherInfo.threePm = items.find(({category, fcstDate, fcstTime})=>category==="SKY" && fcstDate===dateStr && fcstTime==="1500").fcstValue;
			timeWeatherInfo.threePm += items.find(({category, fcstDate, fcstTime})=>category==="PTY" && fcstDate===dateStr && fcstTime==="1500").fcstValue;
			timeWeatherInfo.sixPm = items.find(({category, fcstDate, fcstTime})=>category==="SKY" && fcstDate===dateStr && fcstTime==="1800").fcstValue;
			timeWeatherInfo.sixPm += items.find(({category, fcstDate, fcstTime})=>category==="PTY" && fcstDate===dateStr && fcstTime==="1800").fcstValue;
			timeWeatherInfo.ninePm = items.find(({category, fcstDate, fcstTime})=>category==="SKY" && fcstDate===dateStr && fcstTime==="2100").fcstValue;
			timeWeatherInfo.ninePm += items.find(({category, fcstDate, fcstTime})=>category==="PTY" && fcstDate===dateStr && fcstTime==="2100").fcstValue;
			
		})
		.then(()=>{
			//$("#current-minmax").text(`최저 ${weatherInfo.temp_min}°C/최고 ${weatherInfo.temp_max}°C`);
			$("#current-min").text(`${weatherInfo.temp_min}°C`);
			$("#current-max").text(`${weatherInfo.temp_max}°C`);
			$("#current-pop").text(weatherInfo.pop);
			insertForecast();
			insertIcon();
		})
		.catch((error) => console.log(error));
		
}


const getDate = () => {
	const date = new Date();
	
	const y = String(date.getFullYear());
	const m = String(date.getMonth()+1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	
	$("#current-date").text(`${m}.${d}(${WEEKDAY[date.getDay()]})`);
	
	return y+m+d;
}

const getTime = (type) => {
	const date = new Date();
	
	let h = date.getHours();
	let m = date.getMinutes();
	
	if(m < 30 && type == 1){
		return String(h-1).padStart(2, 0) + "00";
	}else{
		return String(h).padStart(2, 0) + "00";
	}
}

const insertForecast = () => {
	let tableRef = document.getElementById("fore-table");
	let newRow = tableRef.insertRow(1);
	
	insertCell(weatherInfo.sixAm, newRow, 0, timeWeatherInfo.sixAm);
	insertCell(weatherInfo.nineAm, newRow, 1, timeWeatherInfo.nineAm);
	insertCell(weatherInfo.zeroPm, newRow, 2, timeWeatherInfo.zeroPm);
	insertCell(weatherInfo.threePm, newRow, 3, timeWeatherInfo.threePm);
	insertCell(weatherInfo.sixPm, newRow, 4, timeWeatherInfo.sixPm);
	insertCell(weatherInfo.ninePm, newRow, 5, timeWeatherInfo.ninePm);
}

const insertCell = (data, row, idx, iconData) => {
	let newCell = row.insertCell(idx);
	let newImg = document.createElement("object");
	newImg.setAttribute("data", `image/1/${getFileName(Number(iconData[0]), Number(iconData[1]))}`);
	newImg.setAttribute("type", "image/svg+xml");
	newImg.setAttribute("style", "width:30px;display:block;");
	newCell.appendChild(newImg);
	let newText = document.createTextNode(data+"°C");
	newCell.appendChild(newText);
}

const insertIcon = () => {
	let infoBox = document.getElementById("current-pop");
	let infoIcon = document.createElement("object");
	infoIcon.setAttribute("data", "image/1/날씨-1-비.svg");
	infoIcon.setAttribute("type", "image/svg+xml");
	infoIcon.setAttribute("style", "width:20px;margin:0 10px 0 7px;");
	infoBox.parentNode.insertBefore(infoIcon, infoBox);
	
	let iconBox = document.getElementById("date-icon");
	let newImg = document.createElement("object");
	newImg.setAttribute("data", `image/1/${getFileName(weatherInfo.sky, weatherInfo.pty)}`);
	newImg.setAttribute("type", "image/svg+xml");
	newImg.setAttribute("style", "width:50px;");
	iconBox.appendChild(newImg);
}

const getFileName = (sky, pty) => {
	if(sky == 1)
		return "날씨-1-맑음.svg";
	else if(sky == 3 && pty == 0)
		return "날씨-1-약간 맑음.svg";
	else if(sky == 4 && pty == 0)
		return "날씨-1-흐림.svg";
	else if(pty == 1 || pty == 2 || pty == 4)
		return "날씨-1-비.svg";
	else if(pty == 3)
		return "날씨-1-눈.svg";
}

const timeCheck = () => {
	let time = Number(getTime(0).slice(0,2));
	let idx = Math.floor(time/3) - 2;
	let table = document.getElementById('fore-table');
	
	let row = table.rows[0];
	row.cells[idx].style.color = "red";
}

timeCheck();
 getWeatherInfo();
 
