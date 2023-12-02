package kr.or.ddit.company.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.or.ddit.company.dao.CompanyMainDAO;
import kr.or.ddit.company.vo.RecruitVO;

@Service
public class CompanyMainServiceImpl implements CompanyMainService{
	@Inject
	private CompanyMainDAO dao;
	
	/* 진행중 채용공고 개수 조회*/
	@Override
	public int retrieveClosedRecruitProcedureCount(String authId) {
		return dao.selectClosedRecruitProcedureCount(authId);
	}
	/* 마감된 채용공고 개수 조회*/
	@Override
	public int retrieveUnclosedRecruitProcedureCount(String authId) {
		return dao.selectUnclosedRecruitProcedureCount(authId);
	}
	 /* 진행중 채용공고 제목 조회*/
	@Override
	public List<RecruitVO> retrieveClosedRecruitProcedureList(String authId) {
		return dao.selectClosedRecruitProcedureList(authId);
	}
	/* 마감된 채용공고 제목 조회*/
	@Override
	public List<RecruitVO> retrieveUnclosedRecruitProcedureList(String authId) {
		return dao.selectUnclosedRecruitProcedureList(authId);
	}

	
}
