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
	public void retrieveAptTestList(PaginationInfo<TestVO> paging) {
		int totalRecord = testDAO.selectTotalRecordApt();
		paging.setTotalRecord(totalRecord);
		
		List<TestVO> dataList = testDAO.selectAptTestList(paging);
		
		paging.setDataList(dataList);
	}

	@Override
	public void retrieveTechTestList(PaginationInfo<TestVO> paging) {
		int totalRecord = testDAO.selectTotalRecordTech();
		paging.setTotalRecord(totalRecord);
		
		List<TestVO> dataList = testDAO.selectTechTestList(paging);
		
		paging.setDataList(dataList);
	}

	@Override
	public List<TestVO> retrieveTestDetail(String testNo) {
		return testDAO.selectTestDetail(testNo);
	}

}
