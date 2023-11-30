/**
 * 
 */

const fSocOpen = ()=>{
	console.log("소켓 연결");
}

const fSocMsg = () =>{
	console.log("서버에서 온 메세지:",event.data);
	$(".chat-message").append(`<div class="chtWrap"><div class="chat-message-form message-right">${event.data}</div></div>`);
}

let webSocket = new WebSocket("ws://localhost/FinalProject/chat");
//클라이언트 소켓
webSocket.onopen = fSocOpen; // 연결된 순간 onopen 이벤트 발생
webSocket.onmessage = fSocMsg;
//서버 -> 클라이언트


keydown = () => {
	if(event.keyCode==13){
		$("#sendMessage").trigger("click");
	}
}

$(function(){
	
	let cPath = this.body.dataset.contextPath;

	$('.regionBtn').on("click",function(){
		location.href = `${cPath}/chatRoom`;
	})
	
	$("#regionChoiceBtn").on("click",function(){
		$(".chat-area[data-tab-idx=1]").attr("style","display:none");
		$(".chat-area[data-tab-idx=2]").attr("style","display:block");
	})
	
	$("#chatReturnBtn").on("click",function(){
		$(".chat-area[data-tab-idx=2]").attr("style","display:none");
		$(".chat-area[data-tab-idx=1]").attr("style","display:block");
	})

	$("#sendMessage").on("click",function(){
		let message = $("input[name=message]").val();
		let data = {
			"sender":"홍길동"
			, "message":message
		};
		webSocket.send(JSON.stringify(data));
		/*webSocket.send(message);*/
	
		$("input[name=message]").val("");
		
	})
	

})