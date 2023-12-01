package kr.or.ddit.users.vo;

import java.util.List;
import java.util.Queue;
import org.springframework.web.socket.WebSocketSession;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class RegionVO {
	private List<WebSocketSession> memberList;
	private String region;
	private Queue<ChatVO> messageQueue;
}
