package kr.or.ddit.company.service;

import java.util.List;

import kr.or.ddit.company.vo.RecruitVO;

public interface CompanyMainService {
	/**
	 * 진행중 채용공고 개수 조회
	 */
	public int retrieveClosedRecruitProcedureCount(String authId);
	
	/**
	 * 마감된 채용공고 개수 조회
	 */
	public int retrieveUnclosedRecruitProcedureCount(String authId);

	/**
	 * 진행중 채용공고 제목 조회
	 */
	public List<RecruitVO> retrieveClosedRecruitProcedureList(String authId);

	/**
	 * 마감된 채용공고 제목 조회
	 */
	public List<RecruitVO> retrieveUnclosedRecruitProcedureList(String authId);
}
