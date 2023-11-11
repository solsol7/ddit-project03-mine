package kr.or.ddit.company.service;

import java.util.List;

import kr.or.ddit.common.enumpkg.ServiceResult;
import kr.or.ddit.company.vo.TestItemVO;
import kr.or.ddit.company.vo.TestQstnVO;
import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.vo.PaginationInfo;

public interface TestService {
	public void retrieveTestList(PaginationInfo<TestVO> paging);
	
	public TestVO retrieveTestDetail(String testNo);
	
	public ServiceResult createTest(TestVO testVO);

	public ServiceResult createTestQstn(TestQstnVO qstnVO);
	
	public ServiceResult createTestItem(TestItemVO itemVO);
}
