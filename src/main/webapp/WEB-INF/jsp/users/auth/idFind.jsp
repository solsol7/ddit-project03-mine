<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags"
	prefix="security"%>

<div id="sri_section" class="  ">
        <div id="sri_wrap">
            <div id="content">
                
<div class="wrap_content" role="main">
    <h1 class="blind">아이디찾기페이지입니다.</h1>
    <div class="login_page_wrap">
                    <form id="login_frm" name="login_frm" class="login_frm" method="post" action="https://www.saramin.co.kr/zf_user/auth/login" onsubmit="try {return check(this);} catch (e) {};">
                <input type="hidden" name="m_code" value="0">
                <input type="hidden" name="page_url" value="">
                <input type="hidden" name="url" value="">
                <input type="hidden" name="FrameKey" value="">
                <input type="hidden" name="login_tab" value="p" id="login_tab">	            <div class="login_input_wrap">
		            <!-- text 알림 -->
		            <ul class="tab_member_type" role="tablist">
			            <li role="none"><button type="button" class="btn_tab t_per active" role="tab" tabindex="0" aria-selected="true">개인회원</button></li>
			            <li role="none"><button type="button" class="btn_tab t_com" role="tab" tabindex="-1" aria-selected="false">기업회원</button></li>
		            </ul>
		            <div class="tab_panel" role="tabpanel" aria-label="개인회원">
			            <div class="setting">
                                
				            
				            
			            </div>
			            <div class="login-form">
				            <div class="id-input-box">
					            <input type="text" id="id" name="id" class="txt_tool" value="" required="">
					            <label id="id-label" class="id-label" for="id">이름</label>
				            </div>
				            <div class="pw-input-box">
					            <input type="password" id="password" name="password" class="txt_tool" value="" maxlength="32" required="">
					            <label id="password-label" for="password">이메일</label>
				            </div>
                            				            <button type="submit" class="btn-login BtnType SizeML">아이디찾기</button>
			            </div>
			            <div class="signup-forgotten">
				            <a id="a_join" href="/zf_user/member/registration/join" class="sign_up" onmousedown="try{n_trackEvent('login', 'pc_login_page' , 'join', '');}catch(e){}">회원가입</a>
				            <a href="/zf_user/helpdesk/idpw-find" class="forgotten" onmousedown="try{n_trackEvent('login', 'pc_login_page' , 'find', '');}catch(e){}">아이디/비밀번호 찾기</a>
				            <a href="/zf_user/applicant/rater/login-form" target="_blank" class="link_rater" style="display: none;">협업자 로그인</a>
			            </div>
			            
                        		            </div>
	            </div>

                            </form>
            
            <div class="login_banner_wrap company" style="display: none;">
                <div id="login_bottom_company" class="promotion-banner-box promotion-login" style=""><a href="https://www.saramin.co.kr/zf_user/help/live/view?idx=109184&amp;list_idx=9&amp;listType=notice&amp;keyword=&amp;menu=1&amp;page=1" target="_blank"><img src="https://www.saraminbanner.co.kr/new/sub/2023/10/s30txt_9oja-2so1qt_.png" alt="지금 바로, 첫 공고 등록하고 유료 광고 혜택 받으세요!" width="" height=""></a></div>            </div>
            </div>
    
</div>
<script type="text/javascript">
//<!--
//-->
</script>
                                </div>
        </div>
                    

                        
    </div>