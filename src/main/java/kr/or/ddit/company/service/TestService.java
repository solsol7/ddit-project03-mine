package kr.or.ddit.company.service;

import java.util.List;

import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.vo.PaginationInfo;

public interface TestService {
	public void retrieveAptTestList(PaginationInfo<TestVO> paging);
	
	public void retrieveTechTestList(PaginationInfo<TestVO> paging);
	
	public List<TestVO> retrieveTestDetail(String testNo);
}
