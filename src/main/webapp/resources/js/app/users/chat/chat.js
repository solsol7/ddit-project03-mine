/**
 * 
 */

const fSocOpen = ()=>{
	console.log("소켓 연결");
	
	//let messageList = $(".chat-message").data("messageList");
	let region = $(".chat-message").data("region");
	
		console.log("messageList",messageList);
		let jsonMessage = JSON.parse(messageList);
		
		let chatCode = '';
		for(let i=0; i<jsonMessage.length; i++){
			if(jsonMessage[i].region==region){
				for(j=0; j<jsonMessage[i].chatMessage.length; j++){
					if(jsonMessage[i].chatMessage[j].sender=="server"){
					console.log("chatMessage[i]",jsonMessage[i].chatMessage[j]);
						chatCode += `
								<div class="chtWrap">
											<div class="message-server">${jsonMessage[i].chatMessage[j].message }</div>
										</div>
							`;
					}else if(jsonMessage[i].chatMessage[j].sender=="홍길동"){
						chatCode += `<div class="chtWrap">
											<div class="message-right">
												<div class="message-sender-form">${jsonMessage[i].chatMessage[j].sender }</div>
												<div class="message-form">${jsonMessage[i].chatMessage[j].message }</div>
											</div>
										</div>
							`;
					}else{
						chatCode += `<div class="chtWrap">
											<div class="message-left">
												<div class="message-sender-form">${jsonMessage[i].chatMessage[j].sender }</div>
												<div class="message-form">${jsonMessage[i].chatMessage[j].message }</div>
											</div>
										</div>
							`;
					}
				}
			}
		}
		$(".chat-message").html(chatCode);

	/*$(".chat-message").append(code);*/


	let message = "홍길동님이 입장했습니다.";
	let data = {
		"sender":"server"
		, "message":message
	};
	
	webSocket.send(JSON.stringify(data));
	
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
	
	
	


const fSocClose = () => {
	console.log()
	let message = "홍길동님이 퇴장했습니다.";
	let data = {
		"sender":"server"
		, "message":message
	};
	webSocket.send(JSON.stringify(data));
}

// 사기를 쪼메,  회사가면 도메인명이 있으니깡, 상관없는뎅, 요긴 도메인이 없으니깡, 일시 땜방

let domainName = location.href.split("/")[2];

let webSocket = new WebSocket(`ws://${domainName}/FinalProject/chat`);
//클라이언트 소켓
webSocket.onopen = fSocOpen; // 연결된 순간 onopen 이벤트 발생
webSocket.onmessage = fSocMsg;
webSocket.onclose = fSocClose;
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