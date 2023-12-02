package kr.or.ddit.company.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.ddit.company.vo.RecruitVO;

@Mapper
public interface CompanyMainDAO {
	/**
	 * 진행중 채용공고 개수 조회
	 */
	public int selectClosedRecruitProcedureCount(String authId);
	
	/**
	 * 마감된 채용공고 개수 조회
	 */
	public int selectUnclosedRecruitProcedureCount(String authId);

	/**
	 * 진행중 채용공고 제목 조회
	 */
	public List<RecruitVO> selectClosedRecruitProcedureList(String authId);

	/**
	 * 마감된 채용공고 제목 조회
	 */
	public List<RecruitVO> selectUnclosedRecruitProcedureList(String authId);
}
