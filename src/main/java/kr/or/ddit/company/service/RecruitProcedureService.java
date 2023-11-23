package kr.or.ddit.company.service;

import java.util.List;
import java.util.Map;

import kr.or.ddit.common.enumpkg.ServiceResult;
import kr.or.ddit.company.vo.AProcedureOuterVO;
import kr.or.ddit.company.vo.AProcedureVO;
import kr.or.ddit.company.vo.InterviewSchdVO;
import kr.or.ddit.company.vo.RProcedureVO;
import kr.or.ddit.company.vo.ResumeFormVO;
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
	public void retrieveApplicantList(PaginationInfo<AProcedureVO> paging);
	
	/**
	 * 합불여부 저장
	 */
	public ServiceResult modifyPassStatus(AProcedureOuterVO outerVO);
	
	/**
	 * 마감여부 저장
	 */
	public ServiceResult modifyCloseStatus(AProcedureOuterVO outerVO, Map<String, Object> paramMap);
	
	/**
	 * 채점표 갯수 조회
	 */
	public int retrieveResumeScoreFormCount(Map<String, Object> paramMap);
	
	/**
	 * 채점표 생성
	 */
	public ServiceResult createResumeScoreForm(ResumeFormVO resumeFormVO);
	
	/**
	 * 면접일정 등록
	 */
	public ServiceResult createInterviewSchd(InterviewSchdVO interviewSchdVO);
}
