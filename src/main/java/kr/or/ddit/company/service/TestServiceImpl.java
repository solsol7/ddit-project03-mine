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
	
	/**
	 * 시험지 목록 조회
	 */
	@Override
	public void retrieveTestList(PaginationInfo<TestVO> paging) {
		String testType = paging.getDetailCondition().getTestType();
		int totalRecord = testDAO.selectTotalRecord(testType);
		paging.setTotalRecord(totalRecord);
		
		List<TestVO> dataList = testDAO.selectTestList(paging);
		
		paging.setDataList(dataList);
	}
	
	/**
	 * 시험지 상세 조회
	 */
	@Override
	public TestVO retrieveTestDetail(String testNo) {
		return testDAO.selectTestDetail(testNo);
	}

	/**
	 *  새 시험지 생성
	 */
	@Override
	public ServiceResult createTest(TestVO testVO) {
		boolean successFlag = true;
		// 시험지 insert
		int testInsertCnt = testDAO.insertTest(testVO);
		if(testInsertCnt>0) {
			// for문 - 시험문제 insert
			for(TestQstnVO q : testVO.getQstnList()) {
				// testVO에서 값 가져와서 testNo 셋팅
				q.setTestNo(testVO.getTestNo());
				int qstnInsertCnt = testDAO.insertTestQstn(q);
				
				if(qstnInsertCnt > 0 && testVO.getTestType().equals("T01")) {
					// for문(testNo, qstnNo, itemNo, itemCont) - 시험문항 insert
					for(TestItemVO i : q.getItemList()) {
						// testVO에서 값 가져와서 testNo 셋팅
						i.setTestNo(q.getTestNo());
						// test item insert
						int itemInsertCnt = testDAO.insertTestItem(i);
						if(itemInsertCnt > 0) {
							successFlag &= true;
						}else {
							successFlag &= false;
						}
					}
				}else if(qstnInsertCnt > 0 && testVO.getTestType().equals("T02")){
					successFlag &= true;
				}else {
					successFlag &= false;
				}
			}
		}else {
			successFlag &= false;
		}
		
		ServiceResult result = null;
		if(successFlag) {
			result = ServiceResult.OK;
		}else {
			result = ServiceResult.FAIL;
		}
		
		return result;
	}

	/**
	 * 시험지 삭제
	 */
	@Override
	public ServiceResult removeTest(String testNo) {
		
		boolean successFlag = true;
		
		int itemDeleteCnt = testDAO.deleteTestItem(testNo);
		
		if(itemDeleteCnt > 0) {
			int qstnDeleteCnt = testDAO.deleteTestQstn(testNo);
			if(qstnDeleteCnt > 0) {
				int testDeleteCnt = testDAO.deleteTest(testNo);
				if(testDeleteCnt > 0) {
					successFlag &= true;
				}else {
					successFlag &= false;									
				}
			}else {
				successFlag &= false;				
			}
		}else {
			successFlag &= false;
		}
		
		ServiceResult result = null;
		if(successFlag) {
			result = ServiceResult.OK;
		}else {
			result = ServiceResult.FAIL;
		}
		
		return result;
	}

}
