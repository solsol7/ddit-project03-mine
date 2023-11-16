package kr.or.ddit.company.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.junit.jupiter.api.Test;

import kr.or.ddit.AbstractRootContextTest;
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

}
