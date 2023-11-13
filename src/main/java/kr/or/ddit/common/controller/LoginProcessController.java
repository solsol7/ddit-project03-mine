package kr.or.ddit.common.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.or.ddit.common.enumpkg.ServiceResult;
import kr.or.ddit.common.service.AuthenticateService;
import kr.or.ddit.common.vo.MemberVO;

/**
 * @author 홍길동
 * @since 2023. 11. 9.
 * @version 1.0
 * @see javax.servlet.http.HttpServlet
 * <pre> 
 * [[ 개정이력 (Modification Information) ]]
 * 수정일        수정자          수정내용 
 * --------   ----------    -------------
 * 2023. 11. 9.     김소원       최초작성
 * 
 * Copyright (c)  2023  by DDIT ALL right reserved
 * </pre>
 * 
 * 
 */

@Controller
public class LoginProcessController {
	
	@Inject
	private AuthenticateService service;
	
	@GetMapping ("/loginForm")
	public String loginForm() {
		return "users/auth/login";
		
	}
	
	
	
	
	@PostMapping (value = "/loginProcess.do")
	public String Login(
			@RequestParam("memId") String memId
			,@RequestParam("memPass") String memPass
			,HttpSession session
			) {
		
		MemberVO inputData = new MemberVO();
		inputData.setMemId(memId);
		inputData.setMemPass(memPass);
		
		String viewName = null;
		
		ServiceResult result = service.authenticate(inputData);
		
		//판단 
		switch (result) {
		case OK:
			//인증 성공 - 웰컴페이지로 이동
			viewName = "redirect:/";
			session.setAttribute("authId", inputData.getMemId()); //세션 추가
			break;

		case INVALIDPASSWORD:
			//인증 실패 - 로그인폼으로 이동
			viewName = "redirect:/loginForm";
			session.setAttribute("message", "비밀번호 오류입니다.");
			break;

		default:
			//멤버 없을 경우
			viewName = "redirect:/loginForm";
			session.setAttribute("message", "가입 안했거나 이미 탈퇴한 회원입니다.");
			break;
		}
		return viewName;
	}

}
