package kr.or.ddit.company.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RecruitProcedureDAO {
	public List<Map<String, Object>> selectRecruitList();
}
