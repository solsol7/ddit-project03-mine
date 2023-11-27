package kr.or.ddit.company.controller;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.ddit.common.enumpkg.ServiceResult;
import kr.or.ddit.company.service.RecruitProcedureInterviewService;
import kr.or.ddit.company.service.RecruitProcedureService;
import kr.or.ddit.company.vo.InterviewSchdVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/company")
public class RecruitProcedureInterviewController {

	@Inject
	private RecruitProcedureInterviewService service;

	/* 면접일정 등록 */
	@PostMapping("recruit/interviewSchd")
	@ResponseBody
	public String interviewSchdCreate(
			@ModelAttribute InterviewSchdVO interviewSchdVO
	) {
		ServiceResult result =service.createInterviewSchd(interviewSchdVO);
		
		String message = null;
		switch (result) {
		case OK:
			message = "OK";
			break;
		default:
			message = "FAIL";
			break;
		}
		
		return message;
	}
	
	
	/* 면접일정 조회(모달 초기값) */
	@GetMapping("recruit/interviewSchd")
	@ResponseBody
	public InterviewSchdVO interviewSchdView(
			@ModelAttribute InterviewSchdVO interviewSchdVO
	) {
		InterviewSchdVO data =service.retrieveInterviewSchd(interviewSchdVO);
		
		return data;
	}
	
	/* 면접일정 수정 */
	@PutMapping("recruit/interviewSchd")
	@ResponseBody
	public String interviewSchdUpdate(
			@ModelAttribute InterviewSchdVO interviewSchdVO
	) {
		log.info("{}",interviewSchdVO);
		ServiceResult result =service.modifyInterviewSchd(interviewSchdVO);
		
		String message = null;
		switch (result) {
		case OK:
			message = "OK";
			break;
		default:
			message = "FAIL";
			break;
		}
		
		return message;
	}
	
}
