/**
 * 
 */

const fSocOpen = ()=>{
	console.log("소켓 연결");
}

const fSocMsg = () =>{
	console.log(event.data);
	let data = JSON.parse(event.data);
	let sender = data.sender;
	let message = data.message;
	
	let chatCode = ``;
	if(sender=="server"){
		chatCode +=`<div class="chtWrap">
						<div class="message-server">${message}</div>
					</div>
					`;
	}else if(sender=="홍길동"){
		chatCode +=`<div class="chtWrap">
						<div class="message-right">
							<div class="message-sender-form">${sender}</div>
							<div class="message-form">${message}</div>
						</div>
					</div>
				`;
	}else{
		chatCode +=`<div class="chtWrap">
						<div class="message-left">
							<div class="message-sender-form">${sender}</div>
							<div class="message-form">${message}</div>
						</div>
					</div>
				`;
	}
	
	
	$(".chat-message").append(chatCode);
}

let webSocket = new WebSocket("ws://192.168.35.43/FinalProject/chat");
//클라이언트 소켓
webSocket.onopen = fSocOpen; // 연결된 순간 onopen 이벤트 발생
webSocket.onmessage = fSocMsg;
webSocket.onclose = function(e){
	console.log(e);
}
//서버 -> 클라이언트


keydown = () => {
	if(event.keyCode==13){
		$("#sendMessage").trigger("click");
	}
}

$(function(){
	const nameList=["홍길동","이순신","강감찬","성춘향","이몽룡"];
	
	let cPath = this.body.dataset.contextPath;

	/* 보내기 버튼 클릭했을 때 이벤트 */
	$("#sendMessage").on("click",function(){
		/* 임시 이름 만들기 */
		let rnd = parseInt(Math.random()*4);
		console.log(rnd);
		let name = nameList[rnd];
		console.log(name);
	
		let message = $("input[name=message]").val();
		let data = {
			"sender":name
			, "message":message
		};
		webSocket.send(JSON.stringify(data));
		/*webSocket.send(message);*/
	
		$("input[name=message]").val("");
	})
	
	$("#disconnectionBtn").on("click",function(){
		webSocket.close();
		location.href = `${cPath}/`;
	})
	
})