package kr.or.ddit.company.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.ddit.company.service.RecruitProcedureService;
import kr.or.ddit.company.vo.RProcedureVO;
import kr.or.ddit.paging.BootstrapPaginationRenderer;
import kr.or.ddit.paging.vo.PaginationInfo;

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
		
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("rcrtNo", rcrtNo);
		paramMap.put("rprocOrder", rprocOrder);
		RProcedureVO currProcedureInfo = service.retrieveCurrentProcedureInfo(paramMap);
		
		model.addAttribute("dataList",dataList);
		model.addAttribute("currProcedureInfo",currProcedureInfo);
		
		return "company/recruit/recruitView";
	}
	
	@ResponseBody
	@GetMapping("recruit/{rcrtNo}/{rprocOrder}/{확인.....미확인...여부..?}")
	public void recruitViewData() {
		// 채용절차유형에 따라 service에서 실행할 메소드 달라짐
				// 어떤 데이터? ->// 지원-사용자아이디로 users 조인 -> 인적사항 조회
								// 지원절차 - 제출일, 점수 조회
					// 서류 - 이름, 생년월일, 성별, 이력서제목, 제출일, 점수
								// 이력서제목 - 지원테이블 - 이력서 첨부파일번호 - 이력서첨부파일 테이블 조인 - 이력서 제목 가져오기
					// 적성검사 - 이름, 생년월일, 성별, 검사결과지, 제출일, 점수
								// 검사결과지 -> 시험결과 테이블에서 지원번호, 채용공고번호, 채용공고순서로 셀렉트
					// 기술시험 - 이름, 생년월일, 성별, 검사결과지, 제출일, 점수
					// 면접
						// 지원자목록 - 이름, 생년월일, 성별, 면접일정 등록여부
								// 면접일정 등록여부 -> 그 지원번호와 채용공고번호와 채용공고순서에 해당하는 레코드가 있으면 등록된것
						// 면접일정목록 - 이름, 생년월일, 성별, 면접일시, 메일, 알림 건수
								// 알림건수 -> 면접알림 테이블에 지원번호와 채용공고번호와 채용공고순서에 해당하는 레코드가 있으면 보낸것
				
				// 미확인, 합격, 불합격 데이터 나누기
	}
}
