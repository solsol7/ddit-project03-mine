package kr.or.ddit.company.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import kr.or.ddit.company.service.TestService;
import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.vo.PaginationInfo;

@Controller
@RequestMapping("/company")
public class TestController {
	@Inject
	private TestService service;
	
	@GetMapping("/test")
	@ResponseBody
	public Map<String, PaginationInfo<TestVO>> testListRetrieve(
			//@SessionAttribute("authId") String companyId
			) {
		PaginationInfo<TestVO> aptPaging = new PaginationInfo<>();
		aptPaging.setCurrentPage(1);
		
		TestVO aptTestVO = new TestVO();
		aptTestVO.setCompanyId("lg001");	////////////////////////////// 하드코딩
		aptTestVO.setTestType("T01");
		aptPaging.setDetailCondition(aptTestVO);
		
		service.retrieveAptTestList(aptPaging);
		
		PaginationInfo<TestVO> techPaging = new PaginationInfo<>();
		techPaging.setCurrentPage(1);
		
		TestVO techTestVO = new TestVO();
		techTestVO.setCompanyId("lg001");	////////////////////////////// 하드코딩
		techTestVO.setTestType("T02");
		techPaging.setDetailCondition(techTestVO);
		
		service.retrieveTechTestList(techPaging);
		
		
		/* 리스트로 맹글기
		List<PaginationInfo<TestVO>> silverSols = new ArrayList<PaginationInfo<TestVO>>();
		silverSols.add(aptPaging);
		silverSols.add(techPaging);
		*/
		
		Map<String, PaginationInfo<TestVO>> mapSols = new HashMap<String, PaginationInfo<TestVO>>();
		
		mapSols.put("apt", aptPaging);
		mapSols.put("tech", techPaging);
		
		
//		return aptPaging;
		//model.addAttribute("aptPaging", aptPaging);
		//model.addAttribute("techPaging", techPaging);
		
		//return silverSols;
		return mapSols;
	}
	
	
	
	@GetMapping("{testNo}")
	public void testRetrieve() {
		
	}
}
