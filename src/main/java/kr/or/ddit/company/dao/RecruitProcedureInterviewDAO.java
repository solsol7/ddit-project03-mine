package kr.or.ddit.company.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.ddit.company.vo.InterviewSchdVO;

@Mapper
public interface RecruitProcedureInterviewDAO {

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
	
}
