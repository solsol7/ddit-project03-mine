package kr.or.ddit.company.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import javax.inject.Inject;

import org.junit.jupiter.api.Test;

import kr.or.ddit.AbstractRootContextTest;
import kr.or.ddit.company.vo.TestVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
class TestServiceImplTest extends AbstractRootContextTest{

	@Inject
	private TestService service;
	
	@Test
	void test() {
		List<TestVO> testDetailList = service.retrieveTestDetail("T000001");
		for(TestVO t : testDetailList) {
			log.info(t.getTestNo());
		}
	}

}
