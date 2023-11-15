package kr.or.ddit.company.service;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.or.ddit.company.dao.RecruitProcedureDAO;

@Service
public class RecruitProcedureServiceImpl implements RecruitProcedureService{

	@Inject
	private RecruitProcedureDAO dao;
	
	@Override
	public List<Map<String,Object>> retrieveRecruitList() {
		dao.selectRecruitList();
		
		return dao.selectRecruitList();
	}

}
