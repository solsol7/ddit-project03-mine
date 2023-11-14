<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security"%>

<div id="content" class="basic_wide vix_main">
   <div class="wrap_content">
	<!-- 채용 절차 탭 -->
    <div class="area_payment">
        <div class="area_tab">
            <ul class="tabList twoList" role="tablist">
                <li class="inner inTab recruitListClass select" role="tab" data-tab-order="1"><p class="inTab"><span>진행중</span></p></li>
                <li class="inner inTab recruitListClass" role="tab" data-tab-order="2"><p class="inTab"><span>마감</span></p></li>
            </ul>
        </div>

        <div class="tab_part">

            <!-- 리스트 출력 영역 -->
            <div id="list_position">
            
            	<!-- 검색 UI -->
            	<div id="searchUI">
	                <div class="area_list_top">
	                    <div class="box_center">
	                       <div class="search_right">
	                          
	                          <div class="searchTypoBox">
	                              <input type="text" name="rcrtTitile" class="inpTypo sword" placeholder="제목">
	                              <button type="button" class="btnSizeS colorBlue" id="testSearchBtn">검색</button>
	                          </div>
                              <select>
                              	<option>마감일순</option>
                              	<option>등록일순</option>
                              </select>
	                      </div>
	                    </div>
	                </div>
                </div>
                
                <div class="tblWrap recruitListContWrap">
					<div class="recruitListBorder">
						<ul>
							<li class="row ">
	
								<div class="info_recruit"> 
									<a href="#" class="title"> [정부지원사업 관리 및 경영지원 업무] </a>
									<div class="date">2023.12.02</div>
									<div class="period">
										<dl>
											<dd>23.09.21 ~ 23.10.21</dd>
										</dl>
									</div>
									<div class="use_product"></div>
									<div class="area_status">
										<div class="box_status">
											<strong class="txt_status "><a href="#">공고 확인</a></strong>
										</div>
	
										<div class="status_type">
											<a href="#" class="division">
												지원자
												<strong class="data_count ">36</strong>
											</a>
											<a href="#" class="division">
												확인
												<strong class="data_count ">9</strong>
											</a>
											<a href="#" class="division">
												미확인
												<strong class="data_count ">27</strong>
											</a>
											<a href="#" class="division">
												최종합격
												<strong class="data_count point_color">0</strong>
											</a>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>

                </div>
                
                
               <div class="paging" id="paging">
                    <!-- 페이지 출력하는 곳 -->
                    <a href='javascript:;' onclick='fn_paging(1);'>이전</a>
                    <a href='javascript:;' onclick='fn_paging(1);'>1</a>
                    <a href='javascript:;' onclick='fn_paging(2);'>2</a>
                    <a href='javascript:;' onclick='fn_paging(3);'>3</a>
                    <a href='javascript:;' onclick='fn_paging(4);'>4</a>
                    <a href='javascript:;' onclick='fn_paging(4);'>다음</a>
		       </div>
		       
				<form action="<%=request.getContextPath()%>/company/test" id="searchForm">
					<input type="hidden" readonly name="testType" />
					<input type="hidden" readonly name="sDate" />
					<input type="hidden" readonly name="eDate" />
					<input type="hidden" readonly name="testTitle" />
					<input type="hidden" readonly name="page" />
				</form>
		       
            </div>
        </div>
    </div>
</div>
</div>


