package kr.or.ddit.company.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import kr.or.ddit.common.enumpkg.ServiceResult;
import kr.or.ddit.company.dao.RecruitProcedureDAO;
import kr.or.ddit.company.vo.AProcedureOuterVO;
import kr.or.ddit.company.vo.AProcedureVO;
import kr.or.ddit.company.vo.RProcedureVO;
import kr.or.ddit.company.vo.TestVO;
import kr.or.ddit.paging.vo.PaginationInfo;

@Service
public class RecruitProcedureServiceImpl implements RecruitProcedureService{

	@Inject
	private RecruitProcedureDAO dao;
	
	/* 채용공고 목록 조회 */
	@Override
	public void retrieveRecruitList(PaginationInfo<Map<String, Object>> paging) {
		
		int totalRecord = dao.selectTotalRecord(paging);
		paging.setTotalRecord(totalRecord);
		
		List<Map<String, Object>> dataList = dao.selectRecruitList(paging);
		
		paging.setDataList(dataList);
	}
	
	/* 채용절자 조회  */
	@Override
	public List<RProcedureVO> retrieveRecruitProcedure(String rcrtNo) {
		return dao.selectRecruitProcedure(rcrtNo);
	}
	
	/* 현재 채용절차 정보 조회 */
	@Override
	public RProcedureVO retrieveCurrentProcedureInfo(Map<String, Object> paramMap) {
		return dao.selectCurrentProcedureInfo(paramMap);

	}

	/* 서류전형의 지원자 목록 조회 */
	@Override
	public void retrieveApplicantList(PaginationInfo<AProcedureVO> paging) {
		int totalRecord = dao.selectApplicantTotalRecord(paging);
		paging.setTotalRecord(totalRecord);
		
		Map<String, Object> paramMap = paging.getVariousCondition();
		
		RProcedureVO currProcedureInfo = retrieveCurrentProcedureInfo(paramMap);
		
		String comCodeNm = currProcedureInfo.getRprocTypeno();
		
		List<AProcedureVO> dataList = null;
		// 어떤 데이터? ->// 지원-사용자아이디로 users 조인 -> 인적사항 조회
		// 지원절차 - 제출일, 점수 조회
		switch (comCodeNm) {
		case "RE01":
			// 서류 - 이름, 생년월일, 성별, 이력서제목, 제출일, 점수
			// 이력서제목 - 지원테이블 - 이력서 첨부파일번호 - 이력서첨부파일 테이블 조인 - 이력서 제목 가져오기
			dataList = dao.selectResumeApplicantList(paging);
			break;
		case "RE02": case "RE03":
			// 적성검사 - 이름, 생년월일, 성별, 검사결과지, 제출일, 점수
			// 검사결과지 -> 시험결과 테이블에서 지원번호, 채용공고번호, 채용공고순서로 셀렉트
			dataList = dao.selectTestApplicantList(paging);
			break;
		default:
			// 면접
			// 지원자목록 - 이름, 생년월일, 성별, 면접일정 등록여부
			// 면접일정 등록여부 -> 그 지원번호와 채용공고번호와 채용공고순서에 해당하는 레코드가 있으면 등록된것
			// 면접일정목록 - 이름, 생년월일, 성별, 면접일시, 메일, 알림 건수
			// 알림건수 -> 면접알림 테이블에 지원번호와 채용공고번호와 채용공고순서에 해당하는 레코드가 있으면 보낸것
			dataList = dao.selectInterviewApplicantList(paging);
			break;
		}
		
		paging.setDataList(dataList);
	}

	@Override
	public ServiceResult modifyPassStatus(AProcedureOuterVO outerVO) {
		
		boolean successFlag = true;
		
		for(AProcedureVO aprocVO : outerVO.getAprocVO()) {
			int rowcnt = dao.updatePassStatus(aprocVO);
			if(rowcnt > 0) {
				successFlag &= true;
			}else {
				successFlag &= false;
			}
		}
		
		ServiceResult result = null;
		if(successFlag) {
			result = ServiceResult.OK;
		}else {
			result = ServiceResult.FAIL;
		}
		
		return result;
	}

	@Override
	public ServiceResult modifyCloseStatus(AProcedureOuterVO outerVO) {

		boolean successFlag = true;
		
		for(AProcedureVO aprocVO : outerVO.getAprocVO()) {
			int rowcnt = dao.updatePassStatus(aprocVO);
			if(rowcnt > 0) {
				successFlag &= true;
			}else {
				successFlag &= false;
			}
		}
		
		if(successFlag) {
			Map<String, Object> paramMap = new HashMap<>();
			paramMap.put("rcrtNo", outerVO.getAprocVO().get(0).getRcrtNo());
			paramMap.put("rprocOrder", outerVO.getAprocVO().get(0).getRprocOrder());
			
			int rowcnt = dao.updateCloseStatus(paramMap);
			if(rowcnt > 0) {
				successFlag &= true;
			}else {
				successFlag &= false;
			}
		}
		
		ServiceResult result = null;
		if(successFlag) {
			result = ServiceResult.OK;
		}else {
			result = ServiceResult.FAIL;
		}
		
		return result;
	}
	
}
