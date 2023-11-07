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
				<a href="/" class="bi" aria-label="사람인" data-nav-track="ga_lead|main-gnb|global_menu|ci"> 
					<span class="frame"> 
						<img class="mainLogo" src="<%=request.getContextPath() %>/resources/images/mainLogo.png" alt="Logo">
					</span>
				</a>
			</h1>
			<div class="search"></div>
			<div class="utility">
				<!-- 로그인 안했을 때 -->
<!-- 				<div class="sign"> -->
<!-- 					<a href="/zf_user/auth" -->
<!-- 						data-nav-track="ga_lead|main-gnb|layer_sign|signin" -->
<!-- 						class="btn_sign signin">로그인</a> -->
<!-- 					<hr> -->
<!-- 					<a href="/zf_user/member/registration/join" -->
<!-- 						data-nav-track="ga_lead|main-gnb|layer_sign|join" -->
<!-- 						class="btn_sign signup">회원가입</a> -->
<!-- 				</div> -->

				<!-- 로그인 했을 때 -->
				
				<!-- 알림 -->
				<div class="wrap_member" id="gnb_member_person">
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
				<div class="wrap_member" id="gnb_member_person">
					<button class="btn_member expanded" type="button" aria-label="개인화 메뉴" aria-haspopup="true" aria-expanded="true">
						<span class="user_name">
							<i class="fa-regular fa-user"></i>김기업 님
						</span>
					</button>
<!-- 					<div class="layer_member person"> -->
<!-- 						<div class="stat"> -->
<!-- 							<a href="/zf_user/member/suggest/status-list" -->
<!-- 								data-nav-track="ga_lead|main-gnb|layer_person|talent-pool"> <span>공고현황</span> -->
<!-- 								<strong class="suggest_text">0</strong> -->
<!-- 							</a> <a href="/zf_user/persons/apply-status-list" -->
<!-- 								data-nav-track="ga_lead|main-gnb|layer_person|apply_list"> <span>프로모션</span> -->
<!-- 								<strong class="apply_text">0</strong> -->
<!-- 							</a> -->
<!-- 						</div> -->
<!-- 						<ul class="links"> -->
<!-- 							<li> -->
<!-- 								<a href="/zf_user/member/persons/main" data-nav-track="ga_lead|main-gnb|layer_person|mylayer_myhome">MY홈</a> -->
<!-- 							</li> -->
<!-- 							<li> -->
<!-- 								<a href="/zf_user/resume/resume-manage" data-nav-track="ga_lead|main-gnb|layer_person|resume-manage">미정</a> -->
<!-- 							</li> -->
<!-- 							<li> -->
<!-- 								<a href="/zf_user/persons/scrap-recruit" data-nav-track="ga_lead|main-gnb|layer_person|scrap">미정</a> -->
<!-- 							</li> -->
<!-- 						</ul> -->
<!-- 						<a href="/zf_user/auth/logout" class="logout" data-nav-track="ga_lead|main-gnb|layer_person|logout">로그아웃</a> -->
<!-- 					</div> -->
				</div>

			<!-- 네비게이션 -->
			</div>
			<div class="navigation">
				<div class="wrap_gnb">
					<div class="major recruit">
						<a class="depth1" href="/zf_user/jobs/list/domestic"
							data-nav-track="ga_lead|main-gnb|recruit|recruit"> 
							<span class="txt">HOME</span>
						</a>
					</div>
					<div class="major">
						<a class="depth1" href="/zf_user/jobs/public/home" data-nav-track="ga_lead|main-gnb|recruit|public"> 
							<span class="txt">공고등록</span>
						</a>
					</div>
					<div class="major">
						<a class="depth1" href="/zf_user/company-review" data-nav-track="ga_lead|main-gnb|company_info|company_info">
							<span class="txt">지원관리</span>
						</a>
					</div>
					<div class="major">
						<a class="depth1" href="/zf_user/careerplus" data-nav-track="ga_lead|main-gnb|contents|contents"> 
							<span class="txt">프로모션</span>
						</a>
						<ul class="depth2">
							<li>
								<a href="/zf_user/careerplus" data-nav-track="ga_lead|main-gnb|contents|home"> 
									<span class="txt">이미지광고</span>
								</a>
							</li>
							<li>
								<a href="https://mentor-match.saramin.co.kr/" target="_blank" data-nav-track="ga_lead|main-gnb|contents|mentoring"> 
									<span class="txt">기업광고</span>
								</a>
							</li>
							<li>
								<a href="https://mentor-match.saramin.co.kr/" target="_blank" data-nav-track="ga_lead|main-gnb|contents|mentoring"> 
									<span class="txt">리스트업</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</header>
</nav>

