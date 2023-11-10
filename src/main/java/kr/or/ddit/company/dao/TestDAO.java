package kr.or.ddit.company.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.vo.PaginationInfo;

@Mapper
public interface TestDAO {
	public int selectTotalRecord(String testType);
	
	public List<TestVO> selectTestList(PaginationInfo<TestVO> paging);

	public TestVO selectTestDetail(String testNo);
	
}