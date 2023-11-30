<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="security"%>
<nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap w-100 p-0">
	<header id="sri_header" class="main bubble">
		<div class="wrap_header">
			<!--  헤더 로고 -->
			<h1>
				<a href="<%=request.getContextPath()%>/" class="bi" aria-label="내일을잡자" data-nav-track="ga_lead|main-gnb|global_menu|ci"> 
					<span class="frame"> 
						<img class="mainLogo" src="<%=request.getContextPath() %>/resources/images/mainLogo.png" alt="Logo">
					</span>
				</a>
			</h1>
			<div class="search"></div>
			<div class="utility">
				<c:set value="<%= session.getAttribute(\"authId\")%>" var="user"/>
				<c:choose>
					<c:when test="${not empty user}">
						<!-- 로그인 했을 때 시작 -->
						<div class="loginType">
							<!-- 알림 -->
							<div class="wrap_member" >
								<button class="btn_bell expanded" type="button" aria-label="개인화 메뉴" aria-haspopup="true" aria-expanded="true">
									<span class="user_name">
										<i class="fa-regular fa-bell"></i>
									</span>
								</button>
								<div class="layer_member" style="padding:0; border:none;">
									<div class="top_layer_assist alarm_layer_content">
			                			<strong class="title">알림</strong>
			                			<div class="save_list_area alarm_area ScrollBar">
			                      			<div class="empty_list alarm_area" id="empty_today_list_content"></div>
					                        <div class="my_activity" id="my-activity"> 
					                        	<div class="alarm_list">          
										            <div class="save_list">
										                <span class="date">10/30(월) 00:00</span>
										                <ul>
										                    <li class="activity">
										                        <button type="button" class="activity_name off"> </button>
										                        
										                    </li>
										                </ul>
										            </div>
										            <div class="save_list">
										                <span class="date">10/23(월) 00:00</span>
										                <ul>
										                    <li class="activity">
										                        <button type="button" class="activity_name off"></button>
										                        
										                    </li>
										                </ul>
										            </div>
					
												</div>
											</div>
			                   			 </div>
			                        </div>
								</div>
							</div>
							<!-- 개인정보 -->
	                        <div class="wrap_member nav-item dropdown no-arrow">
	                            <a class="btn_member nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
	                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

									<span class="user_photo"><i class="fa-regular fa-user"></i></span>
	                                <span class="user_name">
										김기업 님
									</span>
	                            </a>
	                             <!-- Dropdown - User Information -->
	                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
	                                aria-labelledby="userDropdown">
	                                
	                               <div class="">
										<ul class="links">
											<li>
												<a href="<%=request.getContextPath() %>/companyMemInfo"><i class="fa-solid fa-house-user fa-sm fa-fw mr-2 text-gray-400"></i> MY 홈 &nbsp;  &nbsp;</a>
											</li>
										
										</ul>	
									</div>
									<div class="dropdown-divider"></div>
	                                <a class="dropdown-item textAlignCenter"  onclick="submitForm();" href="javascript:" data-toggle="modal" data-target="#logoutModal">
	                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
	                                    로그아웃
	                                </a>
	                            </div>
	                        </div>
						</div>					
						<!-- 로그인 했을 때 끝 -->
				 	</c:when>
					<c:otherwise>
					<!-- 로그인 안했을 때 시작 -->
						<div class="sign notLoginType">
							<a href="<%=request.getContextPath()%>/login.do" data-nav-track="ga_lead|main-gnb|layer_sign|signin" class="btn_sign signin">로그인</a>
							<hr>
							<a href="/zf_user/member/registration/join" data-nav-track="ga_lead|main-gnb|layer_sign|join" class="btn_sign signup">회원가입</a>
						</div>
					<!-- 로그인 안했을 때 끝 -->
					</c:otherwise>			
				</c:choose>

			<!-- 네비게이션 -->
			</div>
			<div class="navigation">
				<div class="wrap_gnb">
					<div class="major recruit">
						<a class="depth1" href="<%=request.getContextPath()%>/indexCompany.do"
							data-nav-track="ga_lead|main-gnb|recruit|recruit"> 
							<span class="txt">HOME</span>
						</a>
					</div>
<!-- 					<div class="major"> -->
<!-- 						<a class="depth1" href="/zf_user/jobs/public/home" data-nav-track="ga_lead|main-gnb|recruit|public">  -->
<!-- 							<span class="txt">공고등록</span> -->
<!-- 						</a> -->
<!-- 					</div> -->
					<div class="major">
						<a class="depth1" href="javascript:;" data-nav-track="ga_lead|main-gnb|contents|contents"> 
							<span class="txt">채용관리</span>
						</a>
						<ul class="depth2">
							<li>
								<a href="<%=request.getContextPath()%>/recruit/form" data-nav-track="ga_lead|main-gnb|contents|home"> 
									<span class="txt">공고등록</span>
								</a>
							</li>
							<li>
								<a href="${pageContext.request.contextPath }/company/recruitListUI" target="_blank" data-nav-track="ga_lead|main-gnb|contents|mentoring"> 
									<span class="txt">채용관리</span>
								</a>
							</li>
							<li>
								<a href="${pageContext.request.contextPath }/company/testListUI" target="_blank" data-nav-track="ga_lead|main-gnb|contents|mentoring"> 
									<span class="txt">시험지관리</span>
								</a>
							</li>
						</ul>
					</div>
		
					<div class="major">
						<a class="depth1" href="/zf_user/company-review" data-nav-track="ga_lead|main-gnb|company_info|company_info">
							<span class="txt">지원관리</span>
						</a>
					</div>
					<div class="major">
						<a class="depth1" href="<%=request.getContextPath()%>/imageAdvrtView" data-nav-track="ga_lead|main-gnb|contents|contents"> 
							<span class="txt">프로모션</span>
						</a>
						<ul class="depth2">
							<li>
								<a href="<%=request.getContextPath()%>/imageAdvrtView" data-nav-track="ga_lead|main-gnb|contents|home"> 
									<span class="txt">이미지광고</span>
								</a>
							</li>
							<li>
								<a href="<%=request.getContextPath()%>/cmpAdvrtView" target="_blank" data-nav-track="ga_lead|main-gnb|contents|mentoring"> 
									<span class="txt">기업광고</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</header>
</nav>

