package kr.or.ddit.company.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.vo.PaginationInfo;

@Mapper
public interface TestDAO {
	public int selectTotalRecordApt();
	
	public int selectTotalRecordTech();
	
	public List<TestVO> selectAptTestList(PaginationInfo<TestVO> paging);
	
	public List<TestVO> selectTechTestList(PaginationInfo<TestVO> paging);

	public List<TestVO> selectTestDetail(String testNo);
	
}