package kr.or.ddit.users.chat;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.ddit.users.vo.ChatVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ChatHandler extends TextWebSocketHandler{	

	private static List<WebSocketSession> list =  new ArrayList<WebSocketSession>();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		log.info("연결 요청이 왔어용 성공!");
		list.add(session);
	}
	
	
	// 클라이언트 소켓과 통신
	@Override // 클라이언트가 서버에 보냈을 때 실행
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		ObjectMapper mapper = new ObjectMapper();
		
		ChatVO data = mapper.readValue(message.getPayload(), ChatVO.class);
		
		String jsonStr = mapper.writeValueAsString(data);
		
		for(WebSocketSession webSocketSession : list) {
			webSocketSession.sendMessage(new TextMessage(jsonStr));
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		list.remove(session);
	}
}
