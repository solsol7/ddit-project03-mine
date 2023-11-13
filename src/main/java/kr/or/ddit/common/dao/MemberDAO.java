package kr.or.ddit.common.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.ddit.common.vo.MemberVO;

/**
 * @author 김소원
 * @since 2023. 11. 9.
 * @version 1.0
 * @see javax.servlet.http.HttpServlet
 * <pre> 
 * [[ 개정이력 (Modification Information) ]]
 * 수정일        수정자          수정내용 
 * --------   ----------    -------------
 * 2023. 11. 9.     김소원       최초작성
 * 
 * Copyright (c)  2023  by DDIT ALL right reserved
 * </pre>
 * 
 * 
 */
@Mapper
public interface MemberDAO { 
	
	/**
	 * 아이디 패스워드를 기반으로 사용자 조회
	 * @param inputData 
	 * @return
	 */
	public MemberVO selectUsersForAuth (MemberVO inputData);
}
