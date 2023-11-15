package kr.or.ddit.company.service;

import java.util.List;
import java.util.Map;

import kr.or.ddit.paging.vo.PaginationInfo;

public interface RecruitProcedureService {
	/**
	 * 채용공고 목록 조회
	 */
	public List<Map<String,Object>> retrieveRecruitList();
	
}
