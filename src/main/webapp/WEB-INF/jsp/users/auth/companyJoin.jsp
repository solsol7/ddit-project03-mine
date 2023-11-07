<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags"
	prefix="security"%>

<fieldset>
	<h3 class="tit_join_member">사람인에서 채용을 시작하세요!</h3>

	<div class="write_base">
		<!-- 사업자등록번호 -->
		<div class="item">
			<label for="corp_code" class=""><strong>사업자등록번호</strong></label>
			<div class="TypoBox">
				<input name="corp_code" id="corp_code" type="text"
					class="Typo SizeL defalt" maxlength="20" autocapitalize="off"
					autocomplete="off" placeholder="사업자 등록번호 직접 입력 (10자리)">
			</div>
			<p class="alert_column good_txt" id="msg_corp_code"></p>
			<button type="button" id="notice_message_law_btn"
				class="btn_business_number" aria-label="사업자등록번호 없을시 안내 팝업"
				aria-haspopup="true" aria-expanded="false">사업자번호가 없어요</button>
		</div>
	</div>
<!--
	<!-- 기업인증 - 파일선택 (기본) -->
	<div class="cont_division">
		<strong class="cont_tit">기업 인증</strong>
		<div class="area_corp_certification">
			<!-- 일반 사번 -->
			<div id="normal_corp_code_certification_notice">
				<p class="corp_certification_tit">
					<strong>사업자등록증명원</strong>을 첨부해주세요
				</p>
				<div class="corp_certification_exam">
					<div class="box_exam exam_certification">
						<strong class="exam_tit">사업자등록<span class="txt_blue">증명원</span></strong>
						<span class="blind">은 올바른 파일 입니다.</span>
					</div>
					<div class="box_exam exam_license">
						<strong class="exam_tit">사업자등록증</strong> <span class="blind">은
							올바른 파일이 아닙니다.</span>
					</div>
				</div>
			</div>
			<!-- 임시 사번 -->
			<div id="temporary_corp_code_certification_notice"
				style="display: none;">
				<p class="corp_certification_tit">
					<strong>인증 서류</strong>를 첨부해주세요
				</p>
			</div>
			<div class="box_file_upload" id="box_file_upload"
				style="display: none;">
				<input type="file" id="confirm_document_file"
					name="confirm_document_file" class="file_input"> <label
					for="confirm_document_file" class="file_label"
					id="confirm_document_file_label"> <span class="blind">파일찾기</span>
				</label>
				<div class="file_view">
					<p class="file_upload_name" id="confirm_document_file_nm"></p>
					<p class="file_txt_guide">클릭시 다른 파일로 변경할 수 있습니다</p>
				</div>
			</div>
			<div class="box_btn" id="request_certification_wrap"
				style="display: none;">
				<button type="button"
					class="BtnType BtnTypeRd SizeM btn_certify_file"
					id="btn_request_ocr">파일 검토받기</button>
			</div>
			<div class="box_btn" id="select_certification_file_wrap">
				<button type="button"
					class="BtnType BtnTypeRd SizeM btn_certify_file"
					id="select_certification_file">파일 선택</button>
			</div>

			<!-- 판독 성공 -->
			<div class="file_upload_completed"
				id="request_certification_complete" style="display: none;">
				<p class="file_upload_name"></p>
				<div class="box_notice">
					<p class="txt_notice txt_blue">검토완료 되었습니다.</p>
				</div>
				<p class="file_txt_guide2">
					기업인증이 가능 한 서류 입니다.<br> <strong>회원 가입을 진행 해주세요.</strong>
				</p>
			</div>

			<!-- 판독 실패 -->
			<div class="file_upload_invalid" id="request_certification_fail"
				style="display: none;">
				<p class="file_upload_name"></p>
				<div class="box_notice">
					<p class="txt_notice txt_red" id="certification_fail_msg"></p>
				</div>
				<p class="file_txt_guide2">
					첨부 서류를 다시 한번 확인해 주세요<br> <strong>가입 후 해당 서류는 미인증</strong> 될 수
					있습니다.
				</p>
				<div class="box_btn">
					<button type="button" class="BtnType SizeM btn_change_file"
						id="change_confirm_document_file">파일 변경하기</button>
				</div>
			</div>

			<!-- 다음에 인증할게요 -->
			<div class="InpBox chkbox_next_certi"
				id="next_certification_check_wrap">
				<span class="Chk"> <input type="checkbox"
					id="next_certification_check" name="next_certification_check">
					<label class="Lbl" for="next_certification_check">다음에 인증할게요</label>
				</span>
			</div>
			<div class="file_upload_next" id="next_certification_msg"
				style="display: none;">
				<p class="file_txt_guide3">
					가입 후 서비스 이용에 제한이 있을 수 있으니<br> <strong>이용 전 반드시 기업 인증을
						신청해 주세요.</strong>
				</p>
			</div>
			<button type="button" class="btn_close" id="btn_reset_certification"
				style="display: none;">
				<span class="blind">닫기</span>
			</button>
			<div class="loading" id="loading" style="display: none;">
				<div class="loading_inner">
					<img
						src="https://www.saraminimage.co.kr/sri/bx/img_loading_transparent.gif"
						alt="로딩중.."> <span class="loading_percent"
						id="loading_percent">0</span> <span class="loading_percent">%</span>
				</div>
			</div>
		</div>
	</div>

	<!-- 기업정보 입력 영역 -->
	<div id="area_input_company" style="display: none;">
		<div class="write_base">
			<!-- 기업명 -->
			<div class="item">
				<label for="company_nm" class=""><strong>기업명</strong></label>
				<div class="TypoBox">
					<input name="company_nm" id="company_nm" type="text"
						class="Typo SizeL defalt" maxlength="25"
						onmousedown="pushDataLayer('ga_lead', 'company_join', 'company_nm_input', 'click_company_nm');"
						autocapitalize="off" autocomplete="off"
						placeholder="기업명 입력 (사업자등록증명원 기업명)">
				</div>
				<em class="msgInvalid" id="msg_company_nm" style="display: none;">필수
					정보입니다.</em>
			</div>

			<!-- 대표자 -->
			<div class="item">
				<label for="ceo_nm" class=""><strong>대표자</strong></label>
				<div class="TypoBox">
					<input name="ceo_nm" id="ceo_nm" type="text"
						class="Typo SizeL defalt" maxlength="50"
						onmousedown="pushDataLayer('ga_lead', 'company_join', 'ceo_nm_input', 'click_ceo_nm')"
						autocapitalize="off" autocomplete="off"
						placeholder="예시) 김라민 외 1명 (사업자등록증명원 대표자명)">
				</div>
				<em class="msgInvalid" id="msg_ceo_nm" style="display: none;">필수
					정보입니다.</em>
			</div>

			<!-- 회사 주소 -->
			<div class="item adress_column" id="address_area">
				<label for="address_main" class=""><strong>회사 주소</strong></label>
				<div class="InpBox chkbox_global">
					<span class="Chk"> <input type="checkbox" name="global"
						id="check_global"> <label class="Lbl" for="check_global">해외</label>
					</span>
				</div>
				<div class="TypoBox input_address adress_global"
					style="display: none;">
					<input name="adress_global" id="adress_global" type="text"
						class="Typo SizeL defalt from_address" maxlength=""
						autocapitalize="off" autocomplete="off" placeholder="국가선택"
						readonly="">
				</div>
				<div class="TypoBox input_address adress_domestic">
					<input name="address_main" id="address_main" type="text"
						class="Typo SizeL defalt from_address _searchArea" maxlength=""
						autocapitalize="off" autocomplete="off" placeholder="주소찾기">
				</div>
				<div class="TypoBox input_sebu_address">
					<input name="address_sebu" id="address_sebu" type="text"
						class="Typo SizeL defalt" maxlength="" autocapitalize="off"
						autocomplete="off" placeholder="상세주소">
				</div>
				<em class="msgInvalid" id="msg_address_main" style="display: none;">회사주소를
					입력해 주세요.</em>
			</div>

			
			<!-- 개업일 -->
			<div class="item" id="open_date_wrap" style="display: none;">
				<label for="open_date" class=""><strong>개업일</strong></label>
				<div class="TypoBox">
					<input name="open_date" id="open_date" type="text"
						class="Typo SizeL defalt" maxlength="8"
						onmousedown="pushDataLayer('ga_lead', 'company_join', 'establish_year_input', 'click_establish_year');"
						autocapitalize="off" autocomplete="off"
						placeholder="개업일 입력 (YYYYMMDD)">
				</div>
				<em class="msgInvalid" id="msg_open_date" style="display: none;">올바른
					날짜입력 형식이 아닙니다.</em>
			</div>
		</div>
		<!-- 담당자 본인 인증 -->
		<div class="cont_division identify_company" id="company_identify_area">
			<strong class="cont_tit">담당자 본인 인증</strong>
			<button type="button" class="BtnType SizeL btn_identify_phone"
				id="identify_phone"
				onmousedown="pushDataLayer('ga_lead', 'company_join', 'confirm_end', 'confirm_phone');">
				휴대폰 본인 인증</button>
			<em class="msgInvalid" id="msg_identify_phone" style="display: none;">휴대폰
				본인인증을 진행해 주세요</em>
			<div class="identify_phone" style="display: none;">
				<div class="box_form">
					<label for="sms_corp_charge" class="blind">담당자명</label>
					<div class="TypoBox input_certify">
						<input name="tmp_manager_nm" id="sms_corp_charge" type="text"
							class="Typo SizeL defalt" maxlength="" autocapitalize="off"
							autocomplete="off" value="">
					</div>
				</div>
				<div class="box_form">
					<label for="sms_cellnum" class="blind">연락처</label>
					<div class="TypoBox input_certify">
						<input name="tmp_cellnum" id="sms_cellnum" type="text"
							class="Typo SizeL defalt" maxlength="" autocapitalize="off"
							autocomplete="off" value="">
					</div>
				</div>
			</div>
			<input type="hidden" name="email_id" id="email_id"> <input
				type="hidden" name="cellnum" id="cellnum"> <input
				type="hidden" name="manager_nm" id="manager_nm">
		</div>
		<div class="write_base">
			<!-- 이메일 -->
			<div class="item identify_phone email_column" style="display: none;">
				<label for="email" class=""><strong>이메일</strong></label>
				<div class="TypoBox">
					<input name="tmp_email_id" id="sms_email_id" type="text"
						class="Typo SizeL defalt" maxlength="" autocapitalize="off"
						autocomplete="off" placeholder="email@saramin.co.kr">
				</div>
				<!-- 자동리스트 영역 -->
				<ul class="auto_list_area email_list" style="display: none;">
					<li class="auto_list"><a href="javascript:;"
						onclick="return false;" class="email_domain"><strong
							class="txt_input"></strong>@naver.com</a></li>
					<li class="auto_list"><a href="javascript:;"
						onclick="return false;" class="email_domain"><strong
							class="txt_input"></strong>@gmail.com</a></li>
					<li class="auto_list"><a href="javascript:;"
						onclick="return false;" class="email_domain"><strong
							class="txt_input"></strong>@daum.net</a></li>
					<li class="auto_list"><a href="javascript:;"
						onclick="return false;" class="email_domain"><strong
							class="txt_input"></strong>@nate.com</a></li>
					<li class="auto_list"><a href="javascript:;"
						onclick="return false;" class="email_domain"><strong
							class="txt_input"></strong>@outlook.com</a></li>
				</ul>
				<em class="msgInvalid" id="sms_msg_email1" style="display: none;">필수정보
					입니다.</em>
			</div>

			<!-- 아이디 -->
			<div class="item">
				<label for="userId" class=""><strong>아이디</strong></label>
				<div class="TypoBox">
					<input name="id" id="id" type="text" class="Typo SizeL defalt"
						maxlength="20" autocapitalize="off" autocomplete="off"
						placeholder="4~20자리 / 영문, 숫자, 특수문자'_' 사용 가능">
				</div>
				<p class="alert_column focus_txt" id="idFocusMsg"
					style="display: none">4 ~ 20자의 영문, 숫자와 특수문자 '_'만 사용 가능</p>
				<p class="msgInvalid" id="idCheckMsg1" style="display: none;">4
					~ 20자의 영문, 숫자와 특수문자 '_'만 사용해 주세요.</p>
				<p class="alert_column good_txt" id="idCheckMsg2"
					style="display: none;">사용가능한 ID입니다.</p>
			</div>

			<!-- 패스워드 -->
			<div class="item">
				<label for="password1" class="on"><strong>패스워드</strong></label>
				<div class="TypoBox pass_box">
					<input autocapitalize="off" name="password1"
						class="Typo SizeL defalt" id="password1" type="password"
						maxlength="16" autocomplete="off"
						placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합">
					<button type="button" toggle="#password1" id="masking_password"
						class="toggle_password field_eye on" style="display: none;"></button>
				</div>
				<p class="alert_column focus_txt" id="password1FocusMsg"
					style="display: none">8~16자리 영문 대소문자, 숫자, 특수문자 중 3가지 이상 조합으로
					만들어주세요.</p>
				<!-- focus 시 텍스트 -->
				<em class="msgInvalid" id="password1_warning_txt"
					style="display: none"><span>8~16자리 영문 대소문자, 숫자, 특수문자 중
						3가지 이상 조합으로 만들어주세요.</span></em>
				<p class="alert_column good_txt" id="password1_good_txt"
					style="display: none"></p>
				<p class="pass_safety" id="pw_strnegth_level" style="display: none"></p>

			</div>
		</div>
	</div>
</fieldset>