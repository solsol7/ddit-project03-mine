package kr.or.ddit.users.chat;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.ddit.users.vo.ChatVO;
import kr.or.ddit.users.vo.RegionVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ChatHandler extends TextWebSocketHandler{	

	private static List<RegionVO> chatRoom = new ArrayList<>();
	
	ObjectMapper mapper = null;
	
	// chatRoom에 지역 세팅
	static {
		String[] regions = {
				"seoul"	
				, "gyeonggi"	
				, "incheon"	
				, "busan"	
				, "daegu"	
				, "gyeongju"	
				, "daejeon"	
				, "ulsan"	
				, "sejong"	
				, "gangwon"	
				, "gyeongnam"
				, "gyeongbuk"
				, "jeonnam"	
				, "jeonbuk"	
				, "chungnam"	
				, "chungbuk"	
				, "jeju"		
			};

		for(String region : regions) {
			RegionVO regionVO = new RegionVO();
			regionVO.setRegion(region);
			chatRoom.add(regionVO);
		}
		
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		// 입장 알림 메일
		ChatVO data = new ChatVO();
		data.setSender("server");
		data.setMessage("홍길동님이 입장하셨습니다.");
		
		// TextMessage 세팅 위해 byte 배열로 받기
		mapper = new ObjectMapper();
		byte[] dataByte = mapper.writeValueAsBytes(data);
		
		// TextMessage 세팅
		TextMessage message = new TextMessage(dataByte);
		// 메세지 보내는 메소드 호출
		handleTextMessage(session,message);
		
		// 세션에 저장된 지역 가져오기 위해
		Map<String, Object> sessionMap = session.getAttributes();
		
		// 들어온 사람의 지역과 같은 지역 chatRoom에 입장메세지 저장
		for(RegionVO regionVO : chatRoom) {
			String chatRoomRegion = regionVO.getRegion();
			String userRegion = String.valueOf(sessionMap.get("region"));
			if(chatRoomRegion.equals(userRegion)) {
				regionVO.getMessageQueue().add(data);
			}
		}
	}
	
	
	// 클라이언트 소켓과 통신
	@Override // 클라이언트가 서버에 보냈을 때 실행
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// 메세지 보낸사람의 지역 가져오기
		Map<String, Object> sessionMap = session.getAttributes();
		String userRegion = String.valueOf(sessionMap.get("region"));
		
		mapper = new ObjectMapper();
		ChatVO data = mapper.readValue(message.getPayload(), ChatVO.class);
		String jsonStr = mapper.writeValueAsString(data);
		
		for(RegionVO regionVO : chatRoom) {
			/* 그 지역의 참여자들에게 메세지 보내기 */
			// 채팅방의 지역 가져오기
			String chatRoomRegion =regionVO.getRegion();
			// 지역 채팅방 안의 참여자 리스트에서 한명한명의 참여자 세션 가져오기
			for(WebSocketSession webSocketSession : regionVO.getMemberList()) {
				if(!webSocketSession.isOpen()) continue;
				
				// 한명의 참여자의 지역과 보낸사람의 지역이 같다면
				if(userRegion.equals(chatRoomRegion)) {
					// 메세지를 보낸게 서버고, 보낸사람이 아니라면
					if(data.getSender().equals("server") && webSocketSession != session) {
						webSocketSession.sendMessage(new TextMessage(jsonStr));
					// 메세지를 서버가 보낸게 아니라면 모든 사용자에게
					}else if(!data.getSender().equals("server")){
						webSocketSession.sendMessage(new TextMessage(jsonStr));
					}
				}
			}
			
			/* 메세지를 그 지역의 regionVO의 messageQueue에 저장하기 */
			if(chatRoomRegion.equals(userRegion)) {
				regionVO.getMessageQueue().add(data);
			}
			
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		// 세션에 저장된 지역 가져오기 위해
		Map<String, Object> sessionMap = session.getAttributes();
				
		// 나간 사람의 지역과 같은 지역 chatRoom에서 사용자 지우기
		for(RegionVO regionVO : chatRoom) {
			String chatRoomRegion = regionVO.getRegion();
			String userRegion = String.valueOf(sessionMap.get("region"));
			if(chatRoomRegion.equals(userRegion)) {
				regionVO.getMemberList().remove(session);
			}
		}
		
		// 퇴장메세지 세팅
		ChatVO data = new ChatVO();
		data.setSender("server");
		data.setMessage("홍길동님이 퇴장하셨습니다.");

		mapper = new ObjectMapper();
		byte[] dataByte = mapper.writeValueAsBytes(data);
		
		TextMessage message = new TextMessage(dataByte);

		// 메세지 보내는 메소드 호출
		handleTextMessage(session,message);
		
		// 들어온 사람의 지역과 같은 지역 chatRoom에 퇴장메세지 저장
		for(RegionVO regionVO : chatRoom) {
			String chatRoomRegion = regionVO.getRegion();
			String userRegion = String.valueOf(sessionMap.get("region"));
			if(chatRoomRegion.equals(userRegion)) {
				regionVO.getMessageQueue().add(data);
			}
		}
	}
}
