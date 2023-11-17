package kr.or.ddit.company.service;

import java.util.List;
import java.util.Map;

import kr.or.ddit.company.vo.AProcedureVO;
import kr.or.ddit.company.vo.RProcedureVO;
import kr.or.ddit.paging.vo.PaginationInfo;

public interface RecruitProcedureService {
	/**
	 * 채용공고 목록 조회
	 */
	public void retrieveRecruitList(PaginationInfo<Map<String, Object>> paging);
	
	/**
	 * 채용절차 조회
	 */
	public List<RProcedureVO> retrieveRecruitProcedure(String rcrtNo);
	
	/**
	 * 현재 채용절차 정보 조회
	 */
	public RProcedureVO retrieveCurrentProcedureInfo(Map<String, Object> paramMap);
	
	/**
	 * 서류전형의 지원자 목록 조회
	 */
	public List<AProcedureVO> retrieveResumeApplicantList(AProcedureVO aProcVO);
}
