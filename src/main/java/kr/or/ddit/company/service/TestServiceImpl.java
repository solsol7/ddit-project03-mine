package kr.or.ddit.company.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.or.ddit.common.enumpkg.ServiceResult;
import kr.or.ddit.company.dao.TestDAO;
import kr.or.ddit.company.vo.TestItemVO;
import kr.or.ddit.company.vo.TestQstnVO;
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

	@Override
	public ServiceResult createTest(TestVO testVO) {
		int rowcnt = testDAO.insertTest(testVO);
		ServiceResult result = null;
		if(rowcnt>0) {
			result = ServiceResult.OK;
		}else {
			result = ServiceResult.FAIL;
		}
		return result;
	}

	@Override
	public ServiceResult createTestQstn(TestQstnVO qstnVO) {
		int rowcnt = testDAO.insertTestQstn(qstnVO);
		ServiceResult result = null;
		if(rowcnt>0) {
			result = ServiceResult.OK;
		}else {
			result = ServiceResult.FAIL;
		}
		return result;
	}

	@Override
	public ServiceResult createTestItem(TestItemVO itemVO) {
		int rowcnt = testDAO.insertTestItem(itemVO);
		ServiceResult result = null;
		if(rowcnt>0) {
			result = ServiceResult.OK;
		}else {
			result = ServiceResult.FAIL;
		}
		return result;
	}

}
