<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>

<div id="content" class="basic_wide vix_main">
   <div class="wrap_content">
	<!-- 채용 절차 탭 -->
    <div class="area_payment">
        <div class="area_tab">
            <ul class="tabList" role="tablist">
                <li class="inner select" role="tab"><a href="javascript:moveTabList('total')" class="inTab"><span>서류</span></a></li>
                <li class="inner" role="tab"><a href="javascript:moveTabList('complete')" class="inTab"><span>적성검사</span></a></li>
                <li class="inner" role="tab"><a href="javascript:moveTabList('pending')" class="inTab"><span>기술시험</span></a></li>
                <li class="inner" role="tab"><a href="javascript:moveTabList('cancel')" class="inTab"><span>면접</span></a></li>
            </ul>
        </div>

        <div class="tab_part">
            <div class="box_lookup">
                   <div class="box_right">
                          <button type="button" class="btnSizeL colorWhtie" onclick="checkForm()">채점표 생성</button>
                   </div>
            </div>
            
            <!-- 리스트 출력 영역 -->
            <div id="list_position">
                <div class="area_list_top">
                    <div class="box_center">
                       <div class="search_right">
                          <span class="inpSel">
                              <select name="stype" class="stype">
                                  <option value="">전체</option>
                              </select>
                          </span>
                          <div class="searchTypoBox">
                              <input type="text" name="company_nm" class="inpTypo sword">
                              <button type="submit" class="btnSizeS colorBlue">검색</button>
                          </div>
                      </div>
                    </div>
                </div>
                <div class="tblWrap resumeTbl">
                    <div class="btnTxt resumeTxt">
                    	<button type="button" class="btnSizeM colorBlue">미합격</button>
                    	<button type="button" class="btnSizeM colorBlack">합격</button>
                    	<button type="button" class="btnSizeM colorBlack">불합격</button>
                    </div>
                    <table class="sms-breakdown">
                       
                        <thead>
                        <tr>
                            <th scope="col">이름</th>
                            <th scope="col">생년월일</th>
                            <th scope="col">성별</th>
                            <th scope="col">이력서제목</th>
                            <th scope="col">제출일</th>
                            <th scope="col">점수</th>
                            <th scope="col">
								<select name="">
                                 	 <option value="">점수순</option>
                             	 </select>
							</th>
                        </tr>
                        </thead>
                        <tbody>
                     <tr>
                        <td colspan="7" style="padding: 20">검색 결과가 없습니다.<br>
                           
                        </td>
                     </tr>
                        </tbody>
                    </table>
                    <div class="tblBtn">
                              <button type="button" class="btnSizeM colorGreen">확정</button>
                              <button type="button" class="btnSizeM colorBlue">저장</button>
                              
                    </div>
                </div>
                <!-- 페이징 시작 -->
                
                <!-- 페이징 끝 -->

            </div>
            <div class="resumeBtn">
            	<button type="button" class="btnSizeM colorWhite"><i class="fa-regular fa-bell"></i> 알림전송</button>
            	<button type="button" class="btnSizeM colorGray"><i class="fa-regular fa-floppy-disk"></i> 지원자 목록 다운로드</button>
            </div>
            
            <button type="button" class="btnSizeM colorGray rightBtn"><i class="fa-regular fa-floppy-disk"></i> 전체 지원자 목록 다운로드</button>
        </div>
    </div>
</div>
</div>


