package kr.or.ddit.company.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import kr.or.ddit.company.service.CompanyMainService;
import kr.or.ddit.company.vo.RecruitVO;

@Controller
public class CompanyMainController {
	
	@Inject
	private CompanyMainService service;
	
	@GetMapping("/indexCompany")
	public String companyMainUI(
		@SessionAttribute(value = "authId", required = false) String authId
		, Model model
	) {
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("authId", authId);
		
		/* 채용공고 조회 관련 데이터 */
		int closedRecruitProcedureCount = service.retrieveClosedRecruitProcedureCount(authId);
		int unClosedRecruitProcedureCount = service.retrieveUnclosedRecruitProcedureCount(authId);
		List<RecruitVO> closedRecruitProcedureList = service.retrieveClosedRecruitProcedureList(authId);
		List<RecruitVO> unclosedRecruitProcedureList = service.retrieveUnclosedRecruitProcedureList(authId);
		
		resultMap.put("closedRecruitProcedureCount", closedRecruitProcedureCount);
		resultMap.put("unClosedRecruitProcedureCount", unClosedRecruitProcedureCount);
		resultMap.put("closedRecruitProcedureList", closedRecruitProcedureList);
		resultMap.put("unclosedRecruitProcedureList", unclosedRecruitProcedureList);
		
		model.addAttribute("resultMap", resultMap);
		
		return "index/indexCompany";
	}
	
}
