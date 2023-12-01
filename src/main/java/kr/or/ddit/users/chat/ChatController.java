package kr.or.ddit.users.chat;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
@RequestMapping("/chat")
public class ChatController {
	
	@GetMapping("/chatRegion")
	public String chatRegion() {
		return "users/chat/region";
	}
	
	@GetMapping("/chatRoom")
	public String chatRoom(
			HttpSession session
			, @RequestParam String region
	) {
		session.setAttribute("region", region);
		return "users/chat/chatRoom";
	}
}
