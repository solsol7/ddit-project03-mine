package kr.or.ddit.company.service;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.or.ddit.company.dao.RecruitProcedureDAO;
import kr.or.ddit.company.vo.RProcedureVO;
import kr.or.ddit.paging.vo.PaginationInfo;

@Service
public class RecruitProcedureServiceImpl implements RecruitProcedureService{

	@Inject
	private RecruitProcedureDAO dao;
	
	@Override
	public void retrieveRecruitList(PaginationInfo<Map<String, Object>> paging) {
		
		int totalRecord = dao.selectTotalRecord(paging);
		paging.setTotalRecord(totalRecord);
		
		List<Map<String, Object>> dataList = dao.selectRecruitList(paging);
		
		paging.setDataList(dataList);
	}

	@Override
	public List<RProcedureVO> retrieveRecruitProcedure(String rcrtNo) {
		return dao.selectRecruitProcedure(rcrtNo);
	}
	
	@Override
	public RProcedureVO retrieveCurrentProcedureInfo(Map<String, Object> paramMap) {
		return dao.selectCurrentProcedureInfo(paramMap);
	}

}
