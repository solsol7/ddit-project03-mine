package kr.or.ddit.company.dao;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import javax.inject.Inject;

import org.junit.jupiter.api.Test;

import kr.or.ddit.AbstractRootContextTest;
import kr.or.ddit.company.vo.TestVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
class TestDAOTest extends AbstractRootContextTest{

	@Inject
	private TestDAO testDAO;

	@Test
	void testSelectTestDetail() {
		testDAO.selectTestDetail("T000001");
	}

}
