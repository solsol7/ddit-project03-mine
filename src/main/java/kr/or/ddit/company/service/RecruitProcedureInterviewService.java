package kr.or.ddit.company.service;

import kr.or.ddit.common.enumpkg.ServiceResult;
import kr.or.ddit.company.vo.InterviewSchdVO;

public interface RecruitProcedureInterviewService {

	/**
	 * 면접일정 등록
	 */
	public ServiceResult createInterviewSchd(InterviewSchdVO interviewSchdVO);
	
	/**
	 * 면접일정 조회
	 */
	public InterviewSchdVO retrieveInterviewSchd(InterviewSchdVO interviewSchdVO);
	
	/**
	 * 면접일정 수정
	 */
	public ServiceResult modifyInterviewSchd(InterviewSchdVO interviewSchdVO);

}
