package kr.or.ddit.users.chat;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
@RequestMapping("/chat")
public class ChatController {
	
	@GetMapping("/chatRegion")
	public String chatRegionUI() {
		return "users/chat/region";
	}
	
	@GetMapping("/chatRoom/{region}")
	public String chatRoomUI(
			@PathVariable String region
			, HttpSession session
			, Model model
	) {
		session.setAttribute("region", region);
		model.addAttribute("messageList",ChatHandler.chatRoom);
		return "users/chat/chatRoom";
	}
}
