package kr.or.ddit.company.controller;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.transaction.Transactional;

import org.apache.ibatis.annotations.Delete;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.or.ddit.common.enumpkg.ServiceResult;
import kr.or.ddit.common.service.AuthenticateService;
import kr.or.ddit.common.vo.MemberVO;
import kr.or.ddit.company.service.TestService;
import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.BootstrapPaginationRenderer;
import kr.or.ddit.paging.vo.PaginationInfo;
import kr.or.ddit.validate.grouphint.InsertGroup;

@Controller
@RequestMapping("/company")
//@SessionAttributes(names = "testVO")
public class TestController {
	@Inject
	private TestService service;
	
	@Inject
	private AuthenticateService authService;
	
	@ModelAttribute("testVO")
	public TestVO testVO(){
		return new TestVO();
	}
	
	/* 시험지 조회 */
	@GetMapping("testListUI")
	public String testListUI() {
		return "company/test/testList";
	}
	
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
	
	
	
	/* 새 시험지 생성 */
	@GetMapping("test/new/{testType}")
	public String testForm(@PathVariable String testType) {
		if(testType.equals("T01")) {			
			return "company/test/aptitudeTestForm";
		}else{
			return "company/test/technicalTestForm";
		}
	}
	
	@PostMapping("test/new")
	public String testInsert(
			//@SessionAttribute("authId") String companyId
			@Validated(InsertGroup.class) @ModelAttribute TestVO testVO
			, BindingResult errors
			, RedirectAttributes redirectAttributes
			, SessionStatus sessionStatus
	) {
		boolean valid = !errors.hasErrors();
		
		String viewName = null;
		if(valid) {
			testVO.setCompanyId("lg001");		//////////////////////// 하드코딩
			ServiceResult result = service.createTest(testVO);
			switch (result) {
			case OK:
				sessionStatus.setComplete();
				viewName = String.format("redirect:/company/test/%s/%s", testVO.getTestType(), testVO.getTestNo());				
				break;
			default:
				String attrName = BindingResult.MODEL_KEY_PREFIX+"testVO";
				redirectAttributes.addFlashAttribute(attrName, errors);
				redirectAttributes.addFlashAttribute("testVO", testVO);
//				 클래스 이름 위에 @SessionAttributes 어노테이션 없으면 이거라도 있어야함 -- session 통해 모델이 공유되도록
				redirectAttributes.addFlashAttribute("message","등록 실패");
				viewName = "redirect:/company/test/new/"+testVO.getTestType();
				break;
			}
		}else {
			String attrName = BindingResult.MODEL_KEY_PREFIX+"testVO";
			redirectAttributes.addFlashAttribute(attrName, errors);
			redirectAttributes.addFlashAttribute("testVO", testVO);
//			 클래스 이름 위에 @SessionAttributes 어노테이션 없으면 이거라도 있어야함 -- session 통해 모델이 공유되도록
			viewName = "redirect:/company/test/new/"+testVO.getTestType();
		}
		return viewName;
	}
	
	
	/* 시험지 수정 */
	@GetMapping("test/edit/{testNo}")
	public String editForm() {
		
		return null;
	}
	
	
	
	/* 시험지 삭제 */
	@DeleteMapping("test/{testNo}")
	public String testDelete(
			//@SessionAttribute("authId") String companyId
			@PathVariable String testNo
			, @RequestParam String testType
			, @ModelAttribute MemberVO inputData
			, RedirectAttributes redirectAttributes
	) {
		inputData.setMemId("lg001");		///////////////////////////하드코딩
		ServiceResult authResult = authService.authenticate(inputData);
		
		String viewName = null;
		if(authResult==ServiceResult.OK) {
			ServiceResult result = service.removeTest(testNo);
			switch (result) {
			case OK:
				redirectAttributes.addFlashAttribute("message", "삭제 성공");
				viewName = "redirect:/company/testListUI";
				break;
			default:
				redirectAttributes.addFlashAttribute("message", "삭제 실패");
				viewName = String.format("redirect:/company/test/%s/{testNo}", testType);
				break;
			}
		}else {
			redirectAttributes.addFlashAttribute("message", "비밀번호 오류");
			viewName = String.format("redirect:/company/test/%s/{testNo}", testType);
		}
		
		
		
		return viewName;
	}
}
