package kr.or.ddit.company.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.or.ddit.common.enumpkg.ServiceResult;
import kr.or.ddit.company.service.RecruitProcedureService;
import kr.or.ddit.company.vo.AProcedureOuterVO;
import kr.or.ddit.company.vo.AProcedureVO;
import kr.or.ddit.company.vo.InterviewSchdVO;
import kr.or.ddit.company.vo.RProcedureVO;
import kr.or.ddit.company.vo.ResumeFormVO;
import kr.or.ddit.company.vo.ResumeScoreVO;
import kr.or.ddit.company.vo.TestResultVO;
import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.BootstrapPaginationRenderer;
import kr.or.ddit.paging.vo.PaginationInfo;
import kr.or.ddit.users.vo.ResumeAttatchVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/company")
public class RecruitProcedureController {
	
	@Inject
	private RecruitProcedureService service;
	
	/* 채용공고 목록 조회 */
	@GetMapping("recruitListUI")
	public String recruitListUI() {
		return "company/recruit/recruitList";
	}
	
	@ResponseBody
	@GetMapping("recruit")
	public PaginationInfo<Map<String, Object>> recruitListRetrieve(
			@RequestParam Map<String, Object> variousCondition
			,@RequestParam(value = "page", defaultValue = "1", required = false) int currentPage
	) {
		PaginationInfo<Map<String, Object>> paging = new PaginationInfo<>(3,5);
		paging.setVariousCondition(variousCondition);
		paging.setCurrentPage(currentPage);
		
		paging.setRenderer(new BootstrapPaginationRenderer());
		
		service.retrieveRecruitList(paging);
		return paging;
	}
	
	/* 채용공고 상세 조회 */
	@GetMapping("recruit/{rcrtNo}/{rprocOrder}")
	public String recruitViewRetrieve(
			@PathVariable String rcrtNo
			, @PathVariable int rprocOrder
			, Model model
	) {
		// rcrtNo 의 채용절차 정보 가져오기 -> forEach문 돌려서 채용절차정보만큼 탭 만들기, rprocOrder에 해당하는 탭에 select 주기
		List<RProcedureVO> dataList = service.retrieveRecruitProcedure(rcrtNo);
		
		// 한 채용절차의 상세정보
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("rcrtNo", rcrtNo);
		paramMap.put("rprocOrder", rprocOrder);
		RProcedureVO currProcedureInfo = service.retrieveCurrentProcedureInfo(paramMap);
		
		// 채점표 존재유무 판단
		int resumeScoreFormCount = service.retrieveResumeScoreFormCount(paramMap);
		
		model.addAttribute("dataList",dataList);
		model.addAttribute("currProcedureInfo",currProcedureInfo);
		model.addAttribute("resumeScoreFormCount",resumeScoreFormCount);
		
		return "company/recruit/recruitView";
	}
	
	@ResponseBody
	@GetMapping("recruit/ajax/{rcrtNo}/{rprocOrder}")
	public PaginationInfo<AProcedureVO> recruitViewData(
			@PathVariable String rcrtNo
			, @PathVariable int rprocOrder
			, @RequestParam(value="page", defaultValue = "1", required = false) int currentPage
			, @RequestParam Map<String, Object> variousCondition
	) {
		// 채용절차유형에 따라 service에서 실행할 메소드 달라짐
		
		PaginationInfo<AProcedureVO> paging = new PaginationInfo<>();
		paging.setCurrentPage(currentPage);
		variousCondition.put("rcrtNo", rcrtNo);
		variousCondition.put("rprocOrder", rprocOrder);
		paging.setVariousCondition(variousCondition);
		paging.setRenderer(new BootstrapPaginationRenderer());
		
		service.retrieveApplicantList(paging);
		
		return paging;
		
	}
	
	/* 합불여부 수정 */
	@PutMapping("recruit/passStatus")
	@ResponseBody
	public String passStatusUpdate(
			@ModelAttribute AProcedureOuterVO outerVO
			, RedirectAttributes redirectAttribute
	) {
		ServiceResult result = service.modifyPassStatus(outerVO);
		
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
	
	/* 마감여부 수정 */
	@PutMapping("recruit/closeStatus")
	public String closeStateUpdate(
			@ModelAttribute AProcedureOuterVO outerVO
			, @RequestParam Map<String, Object> paramMap
			, RedirectAttributes redirectAttribute
	) {
		ServiceResult result = service.modifyCloseStatus(outerVO, paramMap);
		
		switch (result) {
		case OK:
			redirectAttribute.addFlashAttribute("message","채용절차 마감 성공");
			break;
		default:
			redirectAttribute.addFlashAttribute("message","채용절차 마감 실패");
			break;
		}
		
		String rcrtNo = String.valueOf(paramMap.get("rcrtNo"));
		int rprocOrder = Integer.parseInt(String.valueOf(paramMap.get("rprocOrder")));
		
		return String.format("redirect:/company/recruit/%s/%d", rcrtNo, rprocOrder);
	}
	
	
	/* 이력서 채점표 생성 */
	@PostMapping("recruit/resume/scoreForm")
	@ResponseBody
	public String resumeScoreFormCreate(
			@ModelAttribute ResumeFormVO resumeFormVO
	) {
		log.info("{}",resumeFormVO);
		
		ServiceResult result =service.createResumeScoreForm(resumeFormVO);
		
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
	
	/* 이력서 상세조회 */
	@GetMapping("recruit/resume")
	@ResponseBody
	public Map<String, Object> retrieveResumeDetail(
			@RequestParam String resattNo
			, @ModelAttribute RProcedureVO rprocVO 
	) throws IOException {
		
		ResumeAttatchVO resumeAttatchVO = service.retrieveResumeAttatch(resattNo);
		ResumeFormVO resumeForm = service.retrieveResumeForm(rprocVO);
		
		String fileName = resumeAttatchVO.getResattSavename();
		
		String resumeImageUrl = String.format("recruit/resume/%s", fileName);
		
		Map<String, Object> result = new HashMap<>();
		result.put("resumeImageUrl", resumeImageUrl);
		result.put("resumeForm", resumeForm);
		
		return result;
	}
	
	/* 이력서 점수 update */
	@PutMapping("recruit/resumeScore")
	@ResponseBody
	public String resumeScoreUpdate(
			@ModelAttribute ResumeScoreVO resumeScoreVO
	) {
		
		ServiceResult result = service.createResumeScore(resumeScoreVO);
	
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
	
	/* 시험결과 조회 */
	@GetMapping("recruit/test/{rcrtNo}/{rprocOrder}/{aplNo}")
	@ResponseBody
	public List<TestVO> retrieveTestResult(
			@PathVariable String aplNo
			, @PathVariable String rcrtNo
			, @PathVariable int rprocOrder
			, @RequestParam String testNo
	) {
		TestResultVO testResultVO = new TestResultVO();
		testResultVO.setTestNo(testNo);
		testResultVO.setAplNo(aplNo);
		testResultVO.setRcrtNo(rcrtNo);
		testResultVO.setRprocOrder(rprocOrder);
		List<TestVO> dataList = service.retrieveTestResult(testResultVO);
		
		return dataList;
	}
	
	/* 기술시험 점수 update */
	@PutMapping("recruit/techScore")
	@ResponseBody
	public String techScoreUpdate(
			@RequestParam int[] techScore
			, @ModelAttribute AProcedureVO aprocVO
	) {
		
		int totalScore = 0;
		for(int score : techScore) {
			totalScore += score;
		}
		
		aprocVO.setAprocScr(totalScore);
		
		ServiceResult result = service.modifyTechScore(aprocVO);
	
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
