package kr.or.ddit.company.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.or.ddit.common.enumpkg.ServiceResult;
import kr.or.ddit.company.service.RecruitProcedureService;
import kr.or.ddit.company.vo.AProcedureOuterVO;
import kr.or.ddit.company.vo.AProcedureVO;
import kr.or.ddit.company.vo.CompanyVO;
import kr.or.ddit.company.vo.RProcedureVO;
import kr.or.ddit.company.vo.RecruitVO;
import kr.or.ddit.paging.BootstrapPaginationRenderer;
import kr.or.ddit.paging.vo.PaginationInfo;
import kr.or.ddit.utils.MailUtil;
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
		
		String companyId = "lg001";
		variousCondition.put("companyId", companyId);
		
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
	

	/* 마감 알림 메일 컨트롤러 */
	@GetMapping(value ="/recruit/mail/{rcrtNo}/{rprocOrder}",produces = "application/json;charset=utf-8")
	@ResponseBody
	public void sendCloseMail(
//			String toMail,
			HttpServletRequest request
			, @PathVariable String rcrtNo
			, @PathVariable int rprocOrder
//			, @SessionAttribute("authId") String companyId
			) throws Exception {
		/*
		// 방법1
		ServletContext context = request.getSession().getServletContext();		
		Properties prop = new Properties();
		prop.load(context.getResourceAsStream("WEB-INF/properties/sample2.properties"));
		*/
		
		/* 방법2
		Reader	reader= Resources.getResourceAsReader("/properties/sample.properties");
		Properties prop = new Properties();
		prop.load(reader);
		*/
		
		
		String companyId = "lg001";
		CompanyVO companyVO = service.retrieveCompanyInfo(companyId);
		String fromName = companyVO.getCompanyNm();
		String url = "https://enjoyed-ultimate-finch.ngrok-free.app/FinalProject/";

		RecruitVO recruitVO = service.retrieveRecruitInfo(rcrtNo);
		String rcrtTitle = recruitVO.getRcrtTitle();
		
		AProcedureVO aprocVO = new AProcedureVO();
		aprocVO.setRcrtNo(rcrtNo);
		aprocVO.setRprocOrder(rprocOrder);
		List<String> emailList = service.retrieveApplicantEmailList(aprocVO);
		
		String contents =  String.format("[%s]<br>채용절차가 마감되었습니다. 결과를 확인하세요.<br><a href='%s'>결과 확인하기</a>", rcrtTitle, url);
		Map<String, String> mailDTO = new HashMap<String, String>();
		mailDTO.put("fromMail", "ddit2305@naver.com");
		mailDTO.put("password", "roqkfdnjs2305!!");
		mailDTO.put("title", "채용절차 마감 안내");
		mailDTO.put("fromName",fromName);
		mailDTO.put("contents",contents);
		
		for(String email : emailList) {
			mailDTO.put("toMail", email);
			MailUtil.sendMail(mailDTO);
		}
		
	}
	
	
	/* 면접일정 메일 전송 컨트롤러 */
	@GetMapping(value ="/recruit/interview/mail",produces = "application/json;charset=utf-8")
	@ResponseBody
	public void sendIntrSchdMail(
			//String toMail,HttpServletRequest request
			@RequestParam Map<String, String> mailDTO
//			, @SessionAttribute("authId") String companyId
			
	) throws Exception {

		// 방법1
		/*
		ServletContext context = request.getSession().getServletContext();		
		Properties prop = new Properties();
		prop.load(context.getResourceAsStream("WEB-INF/properties/sample2.properties"));
		*/
		
		/* 방법2
		Reader	reader= Resources.getResourceAsReader("/properties/sample.properties");
		Properties prop = new Properties();
		prop.load(reader);
		*/
		
		String companyId = "lg001";
		CompanyVO companyVO = service.retrieveCompanyInfo(companyId);
		
		String fromName = companyVO.getCompanyNm();
		
		mailDTO.put("fromMail", "ddit2305@naver.com");
		mailDTO.put("password", "roqkfdnjs2305!!");
		mailDTO.put("fromName",fromName);
		
		log.info("체킁{}",mailDTO);
		
		MailUtil.sendMail(mailDTO);

	}
	
	
	
}
