package kr.or.ddit.company.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.or.ddit.company.vo.RProcedureVO;
import kr.or.ddit.paging.vo.PaginationInfo;

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
	
}
