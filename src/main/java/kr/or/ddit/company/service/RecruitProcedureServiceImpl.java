package kr.or.ddit.company.service;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.or.ddit.company.dao.RecruitProcedureDAO;
import kr.or.ddit.company.vo.AProcedureVO;
import kr.or.ddit.company.vo.RProcedureVO;
import kr.or.ddit.paging.vo.PaginationInfo;

@Service
public class RecruitProcedureServiceImpl implements RecruitProcedureService{

	@Inject
	private RecruitProcedureDAO dao;
	
	/* 채용공고 목록 조회 */
	@Override
	public void retrieveRecruitList(PaginationInfo<Map<String, Object>> paging) {
		
		int totalRecord = dao.selectTotalRecord(paging);
		paging.setTotalRecord(totalRecord);
		
		List<Map<String, Object>> dataList = dao.selectRecruitList(paging);
		
		paging.setDataList(dataList);
	}
	
	/* 채용절차 조회 */
	@Override
	public List<RProcedureVO> retrieveRecruitProcedure(String rcrtNo) {
		return dao.selectRecruitProcedure(rcrtNo);
	}
	
	/* 현재 채용절차 정보 조회 */
	@Override
	public RProcedureVO retrieveCurrentProcedureInfo(Map<String, Object> paramMap) {
		return dao.selectCurrentProcedureInfo(paramMap);
	}
	
	/* 서류전형의 지원자 목록 조회 */
	@Override
	public List<AProcedureVO> retrieveResumeApplicantList(AProcedureVO aProcVO) {
		return dao.selectResumeApplicantList(aProcVO);
	}

}
