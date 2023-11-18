package kr.or.ddit.company.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.junit.jupiter.api.Test;

import kr.or.ddit.AbstractRootContextTest;
import kr.or.ddit.company.vo.AProcedureVO;
import kr.or.ddit.paging.vo.PaginationInfo;
import lombok.extern.slf4j.Slf4j;

@Slf4j
class RecruitProcedureServiceImplTest extends AbstractRootContextTest{
	
	@Inject
	private RecruitProcedureService service;
	
	@Test
	void testSelectRecruitList() {
		PaginationInfo<Map<String, Object>> paging = new PaginationInfo<>();
		Map<String, Object> variousCondition = new HashMap<>();
		variousCondition.put("companyId", "lg001");
		variousCondition.put("rcrtTitle", "채용");
		variousCondition.put("sortCategory", "eDate");
		paging.setCurrentPage(2);
		paging.setVariousCondition(variousCondition);
		service.retrieveRecruitList(paging);
		log.info(paging.getDataList().toString());
	}

	/*
	@Test
	void testRetrieveResumeApplicantList() {
		AProcedureVO aProcVO = new AProcedureVO();
		aProcVO.setRcrtNo("r000001");
		aProcVO.setRprocOrder(1);
		aProcVO.setAprocPass("pass");
		service.retrieveResumeApplicantList(aProcVO);
	}
	*/
	
	/*
	@Test
	void testRetrieveResumeApplicantList() {
		PaginationInfo<AProcedureVO> paging = new PaginationInfo<>();
		
		AProcedureVO aprocVO = new AProcedureVO();
		aprocVO.setRcrtNo("RCRT_00047");
		aprocVO.setRprocOrder(1);
		aprocVO.setAprocPass("pass");
		
		paging.setVariousCondition(new HashMap<String, Object>());
		paging.setDetailCondition(aprocVO);
		
		service.retrieveResumeApplicantList(paging);
	}
	
	@Test
	void testRetrieveTestApplicantList() {
		PaginationInfo<AProcedureVO> paging = new PaginationInfo<>();
		
		AProcedureVO aprocVO = new AProcedureVO();
		aprocVO.setRcrtNo("RCRT_00047");
		aprocVO.setRprocOrder(2);
		aprocVO.setAprocPass("pass");
		
		paging.setVariousCondition(new HashMap<String, Object>());
		paging.setDetailCondition(aprocVO);
		
		service.retrieveTestApplicantList(paging);
	}
	
	@Test
	void testRetrieveInterviewApplicantList() {
		PaginationInfo<AProcedureVO> paging = new PaginationInfo<>();
		
		AProcedureVO aprocVO = new AProcedureVO();
		aprocVO.setRcrtNo("RCRT_00047");
		aprocVO.setRprocOrder(4);
		aprocVO.setAprocPass("pass");
		
		paging.setVariousCondition(new HashMap<String, Object>());
		paging.setDetailCondition(aprocVO);
		
		service.retrieveInterviewApplicantList(paging);
		
	}
	*/
}
