package kr.or.ddit.company.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import kr.or.ddit.company.service.TestService;
import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.BootstrapPaginationRenderer;
import kr.or.ddit.paging.vo.PaginationInfo;

@Controller
@RequestMapping("/company")
public class TestController {
	@Inject
	private TestService service;
	
	@GetMapping("test")
	@ResponseBody
	public PaginationInfo<TestVO> testListRetrieve(
			//@SessionAttribute("authId") String companyId
			@ModelAttribute TestVO detailCondition
			, @RequestParam("sDate") String sDate
			, @RequestParam("eDate") String eDate			
			) {
		PaginationInfo<TestVO> paging = new PaginationInfo<>();
		paging.setCurrentPage(1);
		
		TestVO testVO = new TestVO();
		testVO.setCompanyId("lg001");	////////////////////////////// 하드코딩

		paging.setDetailCondition(detailCondition);
		
		Map<String, Object> variousCondition = new HashMap<>();
		variousCondition.put("sDate", sDate);
		variousCondition.put("eDate", eDate);
		
		paging.setVariousCondition(variousCondition);
		
		paging.setRenderer(new BootstrapPaginationRenderer());
		
		service.retrieveTestList(paging);
		
		return paging;
	}
	
	
	
	@GetMapping("test/{testType}/{testNo}")
	public String testRetrieve(
		@PathVariable String testNo
		, @PathVariable String testType
		, Model model
	) {
		TestVO testVO = service.retrieveTestDetail(testNo);
		model.addAttribute(testVO);
		if(testType.equals("T01")) {			
			return "company/test/aptitudeTestView";
		}else{
			return "company/test/technicalTestView";
		}
	}
	
	@GetMapping("test/new/{testType}")
	public String testForm() {
		
		return null;
	}
	
	@PostMapping("test/new/{testType}")
	public String insertTest() {
		
		return null;
	}
	
}
