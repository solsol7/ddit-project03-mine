<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>
<!-- 날짜 선택 api -->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<script src="<%=request.getContextPath()%>/resources/js/app/company/test/testList.js"></script>
 
<script>
$(function(){
	$.testList();
})
</script>

<div id="content" class="basic_wide vix_main">
   <div class="wrap_content">
	<!-- 채용 절차 탭 -->
    <div class="area_payment">
        <div class="area_tab">
            <ul class="tabList testList" role="tablist">
                <li class="inner inTab testClass select" role="tab" data-tab-order="1"><p class="inTab"><span>적성검사</span></p></li>
                <li class="inner inTab testClass" role="tab" data-tab-order="2"><p class="inTab"><span>기술시험</span></p></li>
            </ul>
        </div>

        <div class="tab_part">
        	<div class="box_lookup">
                   <div class="box_right">
                          <button type="button" class="btnSizeL colorWhtie" onclick="checkForm()">시험지 생성</button>
                   </div>
            </div>
            <!-- 리스트 출력 영역 -->
            <div id="list_position">
            
                <div class="area_list_top">
                    <div class="box_center">
                       <div class="search_right">
                          <span class="inpSel">
                              <input type="text" id="datepicker">
                          </span>
                          <div class="searchTypoBox">
                              <input type="text" name="company_nm" class="inpTypo sword">
                              <button type="submit" class="btnSizeS colorBlue">검색</button>
                          </div>
                      </div>
                    </div>
                </div>
                <div class="tblWrap">
                    <table class="sms-breakdown">
                       
                        <thead>
	                        <tr>
	                            <th scope="col">시험제목</th>
	                            <th scope="col">등록일</th>
	                            <th scope="col">
									<select name="">
	                                 	 <option value="">점수순</option>
	                             	 </select>
								</th>
	                        </tr>
                        </thead>
                        <tbody class="test-tbody" data-list-order="1">
		                     <tr>
		                        <td colspan="3" style="padding: 20">
		                        	검색 결과가 없습니다1111.
		                        </td>
		                     </tr>
                        </tbody>
                        <tbody class="test-tbody" data-list-order="2" style="display:none">
		                     <tr>
		                        <td colspan="3" style="padding: 20">
		                        	검색 결과가 없습니다2222.
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
               <div>
                    <a href='javascript:;' onclick='fn_paging(%d);'>이전</a>
           			<a href='javascript:;' onclick='fn_paging(%d);'>1</a>
           			<a href='javascript:;' onclick='fn_paging(%d);'>2</a>
           			<a href='javascript:;' onclick='fn_paging(%d);'>3</a>
           			<a href='javascript:;' onclick='fn_paging(%d);'>이후</a>
		       </div>
		       <!-- 페이징 끝 -->		
		       
            </div>
        </div>
    </div>
</div>
</div>


