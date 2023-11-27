package kr.or.ddit.company.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.or.ddit.company.vo.AProcedureVO;
import kr.or.ddit.company.vo.InterviewSchdVO;
import kr.or.ddit.company.vo.RProcedureVO;
import kr.or.ddit.company.vo.ResumeFormVO;
import kr.or.ddit.company.vo.ResumeScoreVO;
import kr.or.ddit.company.vo.TestResultVO;
import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.vo.PaginationInfo;
import kr.or.ddit.users.vo.ResumeAttatchVO;

@Mapper
public interface RecruitProcedureDAO {
	/**
	 * 검색된 채용공고 목록 갯수 조회
	 */
	public int selectTotalRecord(PaginationInfo<Map<String, Object>> paging);
	
	/**
	 * 채용공고 목록 조회
	 */
	public List<Map<String, Object>> selectRecruitList(PaginationInfo<Map<String, Object>> paging);

	/**
	 * 채용절차 조회
	 */
	public List<RProcedureVO> selectRecruitProcedure(String rcrtNo);
	
	/**
	 * 현재 채용절차 정보 조회
	 */
	public RProcedureVO selectCurrentProcedureInfo(Map<String, Object> paramMap);
	
	/**
	 * 지원자 레코드 수 조회 (면접 제외)
	 */
	public int selectApplicantTotalRecord(PaginationInfo<AProcedureVO> paging);
	
	/**
	 * 지원자 레코드 수 조회 (면접 전형)
	 */
	public int selectIntrApplicantTotalRecord(PaginationInfo<AProcedureVO> paging);
	
	/**
	 * 서류전형의 지원자 목록 조회
	 */
	public List<AProcedureVO> selectResumeApplicantList(PaginationInfo<AProcedureVO> paging);
	
	/**
	 * 적성검사, 기술시험 지원자 목록 조회
	 */
	public List<AProcedureVO> selectTestApplicantList(PaginationInfo<AProcedureVO> paging);

	/**
	 * 면접 지원자 목록 조회
	 */
	public List<AProcedureVO> selectInterviewApplicantList(PaginationInfo<AProcedureVO> paging);
	
	/**
	 * 합불 여부 저장
	 */
	public int updatePassStatus(AProcedureVO aprocVO);
	
	/**
	 * 마감 여부 저장
	 */
	public int updateCloseStatus(Map<String, Object> paramMap);
	
	/**
	 * 채점표 갯수 조회
	 */
	public int selectResumeScoreFormCount(Map<String, Object> paramMap);
	
	/**
	 * 채점표 생성
	 */
	public int insertResumeScoreForm(ResumeFormVO resumeFormVO);
	
	/**
	 * 면접일정 등록
	 */
	public int insertInterviewSchd(InterviewSchdVO interviewSchdVO);
	
	/**
	 * 면접일정 조회
	 */
	public InterviewSchdVO selectInterviewSchd(InterviewSchdVO interviewSchdVO);
	
	/**
	 * 면접일정 수정
	 */
	public int updateInterviewSchd(InterviewSchdVO interviewSchdVO);
	
	/**
	 * 이력서 첨부파일 조회
	 */
	public ResumeAttatchVO selectResumeAttatch(String resattNo);
	
	/**
	 * 이력서 채점표 양식 조회
	 */
	public ResumeFormVO selectResumeForm(RProcedureVO rprocVO);
	
	/**
	 * 이력서 점수정보 조회
	 */
	public ResumeScoreVO selectResumeScore(AProcedureVO aprocVO);
	
	/**
	 * 이력서점수 등록
	 */
	public int insertResumeScore(ResumeScoreVO resumeScoreVO);
	
	/**
	 * 시험결과 조회
	 */
	public List<TestVO> selectTestResult(TestResultVO testResultVO);
	
	/**
	 * 기술시험점수 등록
	 */
	public int updateTechScore(AProcedureVO aprocVO);
}
