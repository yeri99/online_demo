/**
 * 메인 화면에 표시될 환율의 정보를 받아옴
 */

const currency = [["USD", "JPY"], ["EUR", "CNH"]];

const buf = $('#rateInfo').val();
//console.log(buf);
const rateInfo = buf.split(' ');

$('#rate-time').text(`${rateInfo[0].slice(0, 4)}년 ${rateInfo[0].slice(4, 6)}월 ${rateInfo[0].slice(6, 8)}일 기준`);

let rateMap = new Map([]);

for(let i=1; i<9; i+=2){
	//console.log(rateInfo[i] + " : " + rateInfo[i+1]);
	rateMap.set(rateInfo[i], rateInfo[i+1]);
}


const insertRateTable = (id, tableNum) => {
	let tableRef = document.getElementById(id);
	
	for(let i=0; i<2; i++){
		let newRow = tableRef.insertRow(i+1);
		let newCell = newRow.insertCell(0);
		let text = null;
		let img = new Image();
		if(currency[tableNum][i]==="USD"){
			text = document.createTextNode(`미국 ${currency[tableNum][i]}`);
			img.src = "image/flag/free-icon-united-states-of-america-555526.png";
		}else if(currency[tableNum][i]==="JPY"){
			text = document.createTextNode(`일본 ${currency[tableNum][i]}`);
			img.src = "image/flag/free-icon-japan-555646.png";
		}else if(currency[tableNum][i]==="EUR"){
			text = document.createTextNode(`유로 ${currency[tableNum][i]}`);
			img.src = "image/flag/free-icon-european-union-206593.png";
		}else if(currency[tableNum][i]==="CNH"){
			text = document.createTextNode(`위안화 ${currency[tableNum][i]}`);
			img.src = "image/flag/free-icon-china-206818.png";
		}
		img.setAttribute("style", "width:20px; margin: 0 5px; ");
		
		newCell.appendChild(img);
		newCell.appendChild(text);
		
		newCell = newRow.insertCell(1);
		text = document.createTextNode(rateMap.get(currency[tableNum][i]));
		newCell.style.textAlign = "end";
		newCell.appendChild(text);
	}
}


insertRateTable("left-rate", 0);
insertRateTable("right-rate", 1);
