<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags"
	prefix="security"%>
	
<div id="sri_section">
	<div id="content" class="basic_wide vix_main">
		<div class="main_content">
    		<div class="section_concierge">
           		<ul class="concierge_dashboard">
                	<li class="item">
                   		<div class="concierge_header">
                        	<strong class="title"><span class="ico ico_prod"></span>공지사항</strong>
                        </div>
                    	<div class="concierge_cont">
	                        <p class="txt">공지사항이 없습니다.</p>                     
	                        <a href="#" class="link link_emph" target="_blank">공지사항 더보기</a>                    
                        </div>
                   </li>
                   <li class="item">
	                   <div class="concierge_header">
	                        <strong class="title"><span class="ico ico_recruit"></span>기업정보</strong>                                 
	                   </div>
	                   <div class="concierge_cont">
	                        <p class="txt">미동록</p>               
	                        <a href="javascript:void(0)" class="link link_emph ga_data_layer _free_register" data-ga_data_layer="ga_lead|section_concierge|btn_register">기업정보 더보기</a>                    
	                   </div>
                   </li>
                </ul>
    		</div>
			<script>
			    window.freeRecruitinExpireDay = 0;
			    window.userDomainUrl = "null";
			    window.billingUiHost = "https://billing.saramin.co.kr"
			</script>        
<div class="section_status">
	<div class="recruit">
    	<div class="box">
        	<h2 class="section_title">공고 현황</h2>
            	<div class="progress">
				    <div class="title">
				        <strong>
				            <span class="type">진행중 공고</span>
				            <a href="/zf_user/company/recruit-manage?mode=ing" class="more"><span class="count">0</span>
				            <span class="unit">건</span>전체보기</a>
				        </strong>
				    </div>
				    <div class="box_btn_insert">
				        <div class="list_paragraph">
				            <p><a href="//www.saramin.co.kr/zf_user/help/help-word/view?idx=327">채용공고는 어떻게 등록하나요?</a></p>
				        </div>
				        <a href="/zf_user/memcom/recruit/select-recruit-type" class="btnSizeL colorWhite">공고 등록하기</a>
				        <a href="/zf_user/memcom/recruit/select-recruit-type" class="btnSizeL colorWhite">시험지확인하기</a>
				    </div>
				</div>                            
				<div class="progress">
				    <div class="title">
				        <strong>
				            <span class="type">마감된 공고</span>
				            <a href="/zf_user/company/recruit-manage?mode=end" class="more"><span class="count">16</span>
				            <span class="unit">건</span>전체보기</a><!-- WMG-32391 수정/추가 타이틀 전체보기 link 안으로 옮김 -->
				        </strong>
				    </div>
   					<p class="sub_title">마감된 공고를 복사해보세요</p>
<ul class="txt addition">
	<li>
		<a href="javascript:;" class="copy_recruit_btn" data-rec_idx="46631032" data-ai_head_hunting="n">[정부지원사업 관리 및 경영지원 업무]<span class="add">복사하기</span></a>
	</li>
	<li>
		<a href="javascript:;" class="copy_recruit_btn" data-rec_idx="46517748" data-ai_head_hunting="n">총무팀 사무보조 사원 모집<span class="add">복사하기</span></a>
	</li>
</ul>
				</div>
<script>
    function noticeVixRecruit(recTypeCd) {
        var recType = recTypeCd === 'rtc002' ? '자사양식' : '블라인드';
        alert(`${recType} 공고 서비스가 종료되어 등록이 불가합니다.\n다른 공고 양식으로 공고를 등록해주세요.`);
    }
    (function ($) {
        function askCountAbout(action, options, callback) {
            var data = {};

            options = options || {};

            if (options.rec_idx) {
                data.rec_idx = options.rec_idx;
            }

            return $.ajax({
                data: data,
                dataType: "json",
                async: false,
                url: "/zf_user/memcom/recruit-count/" + action
            }).done(callback);
        }

        function recruitAction(mode, idx, speedMatching) {
            speedMatching = speedMatching || 'n';

            askCountAbout('can-add-recruit', {}, function (data) {
                var msg = '';
                if (!data) {
                    alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                } else {
                    if (data && data.canAddRecruit === false) {
                        msg += '더 이상 공고를 등록하실 수 없습니다.\n';
                        msg += '추가 등록을 원하실 경우 대기 공고를 정리해주세요.';
                        alert(msg);
                    } else if (data && data.fail_reason) {
                        if (data.fail_reason === 'need_login') {
                            alert('로그인이 필요합니다.');
                        } else {
                            alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                        }
                    } else {
                        location.href = '/zf_user/memcom/recruit/copy?rec_idx=' + idx + (speedMatching === 'y' ? '&ai_recruit=y' : '');
                    }
                }
            });
        }

        $('.copy_recruit_btn').on('click', function (e) {
            var recIdx = $(e.currentTarget).data('rec_idx');
            var speedMatching = $(e.currentTarget).data('ai_head_hunting');
            if (!recIdx) {
                return false;
            }
            pushDataLayer('ga_lead', 'section_recruit_progress', 'btn_recruit_copy');
            recruitAction('recruit-copy', recIdx, speedMatching);

        });
    })(jQuery);

</script>

                        </div>
</div>
        <div class="position">
    <div class="box">
        <h2 class="section_title">내 프로모션</h2>
                    <div class="no_data">
            <p class="title"><b>주식회사 투비유니콘님</b><br>인재풀 특별할인 혜택이 있으니 놓치지 마세요</p>
        <div class="box_btn_insert">
            <div class="list_paragraph">
                <p><a href="/zf_user/help/help-word/view?idx=791">인재풀 포지션은 어떻게 등록하나요?</a></p>
                <p><a href="/zf_user/help/live/view?idx=108886&amp;list_idx=1&amp;listType=notice&amp;keyword=&amp;menu=1&amp;page=1">인재풀은 무엇인가요?</a></p>
            </div>
            <a href="https://billing.saramin.co.kr/products/details/job_offer_100?saleProductChannel=pc&amp;saleProductType=normal" class="btnSizeL btnsale_type">할인혜택 바로받기</a>
            <a href="/zf_user/memcom/talent-pool/main/search" class="btnSizeL colorWhite" onclick="pushDataLayer('ga_lead','must','talent-pool','click_talentpool');">인재검색 하기</a>
        </div>
    </div>
            </div>
</div>
</div>
    

<script>
    var target = '.wrap_tab .btn_tab';

    jQuery(document).on('click', target, function (e) {
        var $this = jQuery(this);
        var $layer = $this.parents('.wrap_tab').children('.tab_container');
        var idx = $this.parents('li').index();

        if ($this.parents('.tab_list').children('li').length > 1) { //탭메뉴 2개 이상일 경우 실행
            $this.addClass('active').parents('li').siblings().children('.btn_tab').removeClass('active');
            $layer.find('.tab_content').eq(idx).show().siblings().hide();
        }

        e.preventDefault();
    });
</script></div>

            <!-- snb 영역 -->
            <!-- 메인 snb -->

<script>
document.addEventListener('DOMContentLoaded', function () {
    UI.Accordion('.snb_menu', {
        targetClass : 'btn',
        itemClass : 'item',
        activeClass : 'open',
        disableAccordion : false,
        pageScroll : false,
        pageScrollSpace : 0,
    });
});


jQuery(document).ready(function ($) {

    getSnbDisplayData();

    function getSnbDisplayData() {

        $.ajax({
            dataType: "json",
            url: "/zf_user/memcom/index/get-snb-display-data"
        }).done(function (res) {
            if (res.result !== 'success') {
                return;
            }
            setSnbWidgetCount(res.data);
            setSnbManagerInfo(res.data);
            setSnbCompanyInfo(res.data);
        });
    }

    function setSnbWidgetCount(data) {
        var OVER_COUNT = 99,
            cartCount = data.cartCount > OVER_COUNT ? OVER_COUNT+'+' : data.cartCount
        ;
        var $sriSnb = $('#sri_snb');
        $sriSnb.find('#snb_recently_product strong').html(cartCount);  //장바구니 수량
        $sriSnb.find('.data_count').show();
    }

    function setSnbManagerInfo(data) {
        var consultant = data.consultant || '',
            jobGrade = data.job_grade || '',
            cs_name = '유료채용 광고 문의',
            tel = data.tel || '4733',
            mail = data.email || 'help@saramin.co.kr'
        ;

        if (!!consultant) {
            cs_name = 'VIP 매니저<br>기업영업팀 ' + data.consultant + ' ' + jobGrade;
        }
        var $wrapperDiv = $('#wrap_vip_manager');
        $wrapperDiv.find('.cs_name').html(cs_name);
        $wrapperDiv.find('.cs_tel').html('02-2025-' + tel);
        $wrapperDiv.find('.cs_mail').html('<a href="mailto:' + mail + '" target="_blank" title="사람인 고객센터 메일보내기(새창열기)">' + mail + '</a>');
    }

    function setSnbCompanyInfo(data) {
        //기업 이름 셋
        var companyName = document.querySelector('#sri_snb .company_info .name a');
        if(companyName != null) {
            companyName.textContent = data.name;
        }
        //로고
        var logoButton = document.querySelector('#sri_snb .company_info .logo');
        if(logoButton != null) {
            logoButton.addEventListener('click', function () {
                pushDataLayer('ga_lead', 'company_snb', 'company-info', 'company-logo');
                window.open('/zf_user/company-photo/logo-insert-pop?mcom_idx=' + data.mcom_idx, 'upload_logo', 'top=20,left=20,width=502,height=328,scrollbars=yes,resizable=no')
            });
        }
        //기업로고 있는 경우
        if(data.logo.logo_src !== '' && logoButton != null) {
            //기존 span 제거
            var span = logoButton.querySelector('span');
            span.parentNode.removeChild(span);
            //삽입
            var imgHtml = document.createElement('span');
            imgHtml.innerHTML="<img src='" + data.logo.logo_src + "' alt=''>";
            imgHtml.className = 'thumb';
            logoButton.appendChild(imgHtml);
        }
    }
});


</script>
        </div>
        <!-- 공통 floating button -->
        <div class="wrap_floating" id="layout_wrap_floating">
            
            <a href="javascript:;" class="btn btn_list" title="지원자 리스트로 이동" style="display:none" id="applicant_manage_btn_list"><span class="blind">리스트</span></a>

                        <a href="javascript:void(0)" class="btn btn_top" title="페이지 최상단으로 이동"><span class="blind">TOP</span></a>
                    </div>

    </div>