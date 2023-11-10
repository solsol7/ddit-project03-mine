package kr.or.ddit.company.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.or.ddit.company.dao.TestDAO;
import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.vo.PaginationInfo;

@Service
public class TestServiceImpl implements TestService{

	@Inject
	private TestDAO testDAO;

	@Override
	public void retrieveTestList(PaginationInfo<TestVO> paging) {
		String testType = paging.getDetailCondition().getTestType();
		int totalRecord = testDAO.selectTotalRecord(testType);
		paging.setTotalRecord(totalRecord);
		
		List<TestVO> dataList = testDAO.selectTestList(paging);
		
		paging.setDataList(dataList);
	}

	@Override
	public TestVO retrieveTestDetail(String testNo) {
		return testDAO.selectTestDetail(testNo);
	}

}
