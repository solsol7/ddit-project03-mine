package kr.or.ddit.company.service;

import java.util.List;

import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.vo.PaginationInfo;

public interface TestService {
	public void retrieveTestList(PaginationInfo<TestVO> paging);
	
	public TestVO retrieveTestDetail(String testNo);
}
