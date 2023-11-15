package kr.or.ddit.company.service;

import static org.junit.jupiter.api.Assertions.*;

import javax.inject.Inject;

import org.junit.jupiter.api.Test;

import kr.or.ddit.AbstractRootContextTest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
class RecruitProcedureServiceImplTest extends AbstractRootContextTest{
	
	@Inject
	private RecruitProcedureService service;
	
	@Test
	void testSelectRecruitList() {
		log.info(service.retrieveRecruitList().toString());
	}

}
