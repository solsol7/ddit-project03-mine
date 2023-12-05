package kr.or.ddit.common.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.or.ddit.common.enumpkg.ServiceResult;
import kr.or.ddit.common.service.AuthenticateService;
import kr.or.ddit.common.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;


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

@Slf4j
@Controller
public class MemberController {
	
	@Inject
	private AuthenticateService service;

	//로그인 UI
	@GetMapping (value = "/loginForm")
	public String loginForm() {
		return "users/auth/login";
	}
	
	//로그인 data
		@PostMapping (value = "/loginProcess")
		public String Login(
				@RequestParam("memId") String memId
				,@RequestParam("memPass") String memPass
				,HttpSession session
				, RedirectAttributes redirectAttribute
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
				if(inputData.getMemDivision().equals("H02")) {
					viewName = "redirect:/";
					session.setAttribute("authId", inputData.getMemId()); //세션 추가
					session.setAttribute("authNm", inputData.getUsers().getUsersNm()); //세션 추가
					log.info("이름:{}",inputData.getUsers().getUsersNm());
					
				}else if(inputData.getMemDivision().equals("H03")) {
					viewName = "redirect:/indexCompany";
					session.setAttribute("authId", inputData.getMemId()); //세션 추가
					session.setAttribute("authNm", inputData.getCompany().getCompanyDnm()); //세션 추가
				}else if(inputData.getMemDivision().equals("H01")) {
					viewName = "redirect:/indexAdmin";
					session.setAttribute("authId", inputData.getMemId()); //세션 추가
				}
				break;
				
			case INVALIDPASSWORD:
				//인증 실패 - 로그인폼으로 이동
				redirectAttribute.addFlashAttribute("message", "비밀번호 오류입니다.");
				viewName = "redirect:/loginForm";
				break;

			default:
				//멤버 없을 경우
				redirectAttribute.addFlashAttribute("message", "가입 안했거나 이미 탈퇴한 회원입니다.");
				viewName = "redirect:/loginForm";
				break;
			}
			return viewName;
		}
		
	
	//로그아웃
	@PostMapping (value = "/logoutProcess")
	public String logout(HttpSession session) {
        String viewName;
        if (session != null) {
            try {
                // 세션 무효화 
                session.invalidate();
                viewName = "redirect:/";
            } catch (IllegalStateException e) {
                viewName = "redirect:/loginForm";
            }
        } else {
            viewName = "redirect:/loginForm";
        }
        return viewName;
    }

}
