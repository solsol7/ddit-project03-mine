/**
 * 
 */




$(function() {

	let cPath = this.body.dataset.contextPath;

	/* 탭 클릭 시 호출되는 function */
	selectTab = (rcrtNo, rprocOrder) => {
		location.href = `${cPath}/company/recruit/${rcrtNo}/${rprocOrder}`;
	}

	// rprocTypeno 셋팅
	let rprocTypeno = $('.recruit-content').data("rprocTypeno");
	$('#searchForm').find('input[name=rprocTypeno]').val(rprocTypeno);

	// 정렬조건 초기값 셋팅
	let sortCategory = $("select[name=sortCategory]").val();
	$('#searchForm').find('input[name=sortCategory]').val(sortCategory);

	let rcrtNo = $('.recruit-content').data("rcrtNo");
	let rprocOrder = $('.recruit-content').data("rprocOrder");
	let rprocEnd = $('.recruit-content').data("rprocEnd");

	
	/* ================================================== settings ================================================== */

	/* 서류전형 settings */
	let resumeSettings = {
		url: `${cPath}/company/recruit/ajax/${rcrtNo}/${rprocOrder}`,
		dataType: "json",
		success: function(resp) {
			console.log(resp)
			result = '';
			if (resp.dataList.length > 0) {
				$.each(resp.dataList, function(i, v) {
					result += `
								<tr>
									<td>${v.users.usersNm}</td>
									<td>${v.users.usersBir}</td>
									<td>${v.users.usersGen == 'F' ? "여" : "남"}</td>
									<td class="ellipsis"><a href="javascript:;" onclick="resumeView(${v.resattNo})">${v.resumeTitle}</a></td>
									<td>${v.aprocDate}</td>
									<td>${v.aprocScr}</td>
								`;

					// 마감일 시 초기화면 합불여부 관리 disabled 처리
					if (rprocEnd == 'Y') {
						result += `
										<td>
											<select class="aprocPass" name="aprocVO[${i}].aprocPass" disabled>
												<option value="unconfirmed">미확인</option>
												<option value="pass">합격</option>
												<option value="fail">불합격</option>
											</select>
										</td>
									</tr>
								`;
					} else {
						result += `
									<td>
										<input type="hidden" name="aprocVO[${i}].aplNo" value="${v.aplNo}"/>
										<input type="hidden" name="aprocVO[${i}].rcrtNo" value="${v.rcrtNo}"/>
										<input type="hidden" name="aprocVO[${i}].rprocOrder" value="${v.rprocOrder}"/>
										<select class="aprocPass" name="aprocVO[${i}].aprocPass">
											<option value="unconfirmed">미확인</option>
											<option value="pass">합격</option>
											<option value="fail">불합격</option>
										</select>
									</td>
								</tr>
							`;
					}
				}); // $.each 끝
			} else {
				result += `
						<tr>
							<td colspan="7" style="padding: 20">검색 결과가 없습니다.<br>
		
							</td>
						</tr>
					`;
			}
			$('.resume-tbody').html(result);
			$("#paging").html(resp.pagingHTML);

			// 합격상태 초기값 셋팅
			$('.resume-tbody').find(`option[value=${this.confirmStatus}]`).attr("selected", true);
		},
		error: function(xhr) {
			console.log("상태 : " + xhr.status);
		}


	};

	/* 적성검사 전형 settings */
	let aptSettings = {
		url: `${cPath}/company/recruit/ajax/${rcrtNo}/${rprocOrder}`,
		dataType: "json",
		success: function(resp) {
			console.log(resp)
			result = '';
			if (resp.dataList.length > 0) {
				$.each(resp.dataList, function(i, v) {
					result += `
							<tr>
								<td><a href="javascript:;">${v.users.usersNm}</a></td>
								<td>${v.users.usersBir}</td>
								<td>${v.users.usersGen == 'F' ? "여" : "남"}</td>
								<td><a href="javascript:;" onclick="rsltLink('${v.rsltNo}')">결과지확인</a></td>
								<td>${v.aprocDate}</td>
								<td>${v.aprocScr}</td>
						`;

					// 마감일 시 초기화면 합불여부 관리 disabled 처리
					if (rprocEnd == 'Y') {
						result += `
									<td>
										<select class="aprocPass" name="aprocVO[${i}].aprocPass" disabled>
											<option value="unconfirmed">미확인</option>
											<option value="pass">합격</option>
											<option value="fail">불합격</option>
										</select>
									</td>
								</tr>
							`;
					} else {
						result += `
									<td>
										<input type="hidden" name="aprocVO[${i}].aplNo" value="${v.aplNo}"/>
										<input type="hidden" name="aprocVO[${i}].rcrtNo" value="${v.rcrtNo}"/>
										<input type="hidden" name="aprocVO[${i}].rprocOrder" value="${v.rprocOrder}"/>
										<select class="aprocPass" name="aprocVO[${i}].aprocPass">
											<option value="unconfirmed">미확인</option>
											<option value="pass">합격</option>
											<option value="fail">불합격</option>
										</select>
									</td>
								</tr>
							`;
					}

				}); // $.each 끝
			} else {
				result += `
					<tr>
						<td colspan="7" style="padding: 20">검색 결과가 없습니다.<br>
	
						</td>
					</tr>
				`;
			}
			$('.apt-tbody').html(result);
			$("#paging").html(resp.pagingHTML);

			// 합격상태 초기값 셋팅
			$('.apt-tbody').find(`option[value=${this.confirmStatus}]`).attr("selected", true);
		},
		error: function(xhr) {
			console.log("상태 : " + xhr.status);
		}


	};

	/* 기술시험 전형 settings */
	let techSettings = {
		url: `${cPath}/company/recruit/ajax/${rcrtNo}/${rprocOrder}`,
		dataType: "json",
		success: function(resp) {
			console.log(resp)
			result = '';
			if (resp.dataList.length > 0) {
				$.each(resp.dataList, function(i, v) {
					result += `
							<tr>
								<td><a href="javascript:;">${v.users.usersNm}</a></td>
								<td>${v.users.usersBir}</td>
								<td>${v.users.usersGen == 'F' ? "여" : "남"}</td>
								<td><a href="javascript:;" onclick="rsltLink('${v.rsltNo}')">결과지확인</a></td>
								<td>${v.aprocDate}</td>
								<td>${v.aprocScr}</td>
						`;

					// 마감일 시 초기화면 합불여부 관리 disabled 처리
					if (rprocEnd == 'Y') {
						result += `
									<td>
										<select class="aprocPass" name="aprocVO[${i}].aprocPass" disabled>
											<option value="unconfirmed">미확인</option>
											<option value="pass">합격</option>
											<option value="fail">불합격</option>
										</select>
									</td>
								</tr>
							`;
					} else {
						result += `
									<td>
										<input type="hidden" name="aprocVO[${i}].aplNo" value="${v.aplNo}"/>
										<input type="hidden" name="aprocVO[${i}].rcrtNo" value="${v.rcrtNo}"/>
										<input type="hidden" name="aprocVO[${i}].rprocOrder" value="${v.rprocOrder}"/>
										<select class="aprocPass" name="aprocVO[${i}].aprocPass">
											<option value="unconfirmed">미확인</option>
											<option value="pass">합격</option>
											<option value="fail">불합격</option>
										</select>
									</td>
								</tr>
							`;
					}
				}); // $.each 끝
			} else {
				result += `
					<tr>
						<td colspan="7" style="padding: 20">검색 결과가 없습니다.<br>
	
						</td>
					</tr>
				`;
			}
			$('.tech-tbody').html(result);
			$("#paging").html(resp.pagingHTML);

			// 합격상태 초기값 셋팅
			$('.tech-tbody').find(`option[value=${this.confirmStatus}]`).attr("selected", true);
		},
		error: function(xhr) {
			console.log("상태 : " + xhr.status);
		}
	};

	/* 면접 전형 settings */
	let intrSettings = {
		url: `${cPath}/company/recruit/ajax/${rcrtNo}/${rprocOrder}`,
		dataType: "json",
		success: function(resp) {
			console.log(resp)
			applResult = ``;
			schdResult = ``;
			if (resp.dataList.length > 0) {
				$.each(resp.dataList, function(i, v) {
					applResult += `
							<tr>
								<td><a href="javascript:;">${v.users.usersNm}</a></td>
								<td>${v.users.usersBir}</td>
								<td>${v.users.usersGen == 'F' ? "여" : "남"}</td>
								<td>${v.interviewVO.intrDate ? "등록" : "미등록"}</td>
								<td>
									${v.interviewVO.intrDate ? "" : `<button type="button" id="createIntrSchdBtn" class="btnSizeS colorBlue"
									data-bs-toggle="modal" data-bs-target="#intrSchdModal"
									data-apl-no="${v.aplNo}" data-users-nm="${v.users.usersNm}"
									data-mem-mail="${v.memMail}">면접일정등록</button>`}
								</td>
							</tr>
						`;
					schdResult += `
							<tr>
								<td>
									<a href="javascript:;">${v.users.usersNm}</a><br>
									<buttton type="text" class="btnSizeS">${v.interviewVO.intrTypeNm}</buttton>
								</td>
								<td>${v.users.usersBir}</td>
								<td>${v.users.usersGen == 'F' ? "여" : "남"}</td>
								<td>
									${v.interviewVO.intrIntdate}<br/>
									${v.interviewVO.intrPlace}
								</td>
								<td>${v.mailCount}</td>
								<td>${v.alarmCount}</td>
						`;

					// 마감일 시 초기화면 합불여부 관리 disabled 처리
					if (rprocEnd == 'Y') {
						schdResult += `
									<td>
										<select class="aprocPass" name="aprocVO[${i}].aprocPass" disabled>
											<option value="unconfirmed">미확인</option>
											<option value="pass">합격</option>
											<option value="fail">불합격</option>
										</select>
									</td>
								</tr>
							`;
					} else {
						schdResult += `
									<td>
										<buttton type="button" class="btnSizeS colorBlue">안내발송</buttton><br>
										<input type="hidden" name="aprocVO[${i}].aplNo" value="${v.aplNo}"/>
										<input type="hidden" name="aprocVO[${i}].rcrtNo" value="${v.rcrtNo}"/>
										<input type="hidden" name="aprocVO[${i}].rprocOrder" value="${v.rprocOrder}"/>
										<select class="aprocPass" name="aprocVO[${i}].aprocPass">
											<option value="unconfirmed">미확인</option>
											<option value="pass">합격</option>
											<option value="fail">불합격</option>
										</select>
									</td>
									<td>
										<buttton type="button" class="btnSizeS colorBlue">수정</buttton><br>
										<buttton type="button" class="btnSizeS colorBlue">삭제</buttton>
									</td>
								</tr>
							`;
					}
				}); // $.each 끝
			} else {
				applResult += `
					<tr>
						<td colspan="5" style="padding: 20">검색 결과가 없습니다.<br>
	
						</td>
					</tr>
				`;
				schdResult += `
					<tr>
						<td colspan="7" style="padding: 20">검색 결과가 없습니다.<br>
	
						</td>
					</tr>
				`;
			}

			$('.intrAppl-tbody').html(applResult);
			$('.intrSchd-tbody').html(schdResult);
			$("#paging").html(resp.pagingHTML);

			// 합격상태 초기값 셋팅
			$('.intrSchd-tbody').find(`option[value=${this.confirmStatus}]`).attr("selected", true);
		},
		error: function(xhr) {
			console.log("상태 : " + xhr.status);
		}
	};


	/* ================================================== 미확인/합격/불합격 버튼 ================================================== */
	
	/* 서류전형 - 미확인/합격/불합격 버튼 클릭 */
	$(".resumeStatus").on("click", function() {
		// aprocPass 셋팅하기
		let confirmStatus = $(this).data("confirmStatus");
		$(searchForm).find(":input[name=aprocPass]").val(confirmStatus)

		// 검색조건 초기화
		$(searchForm).find(":input[name=usersGen]").val("");
		$(searchForm).find(":input[name=usersNm]").val("");
		$(".searchUI").find(":input[name=usersGen]").val("");
		$(".searchUI").find(":input[name=usersNm]").val("");

		// UI 바꾸기
		$(".resumeStatus").removeClass("colorBlue");
		$(this).addClass("colorBlue");

		$(searchForm).submit();
	})


	/* 적성검사 전형 - 미확인/합격/불합격 버튼 클릭 */
	$(".aptStatus").on("click", function() {
		// aprocPass 셋팅하기
		let confirmStatus = $(this).data("confirmStatus");
		$(searchForm).find(":input[name=aprocPass]").val(confirmStatus)

		// 검색조건 초기화
		$(searchForm).find(":input[name=usersGen]").val("");
		$(searchForm).find(":input[name=usersNm]").val("");
		$(".searchUI").find(":input[name=usersGen]").val("");
		$(".searchUI").find(":input[name=usersNm]").val("");

		// UI 바꾸기
		$(".aptStatus").removeClass("colorBlue");
		$(this).addClass("colorBlue");

		$(searchForm).submit();
	})

	/* 기술시험 전형 - 미확인/합격/불합격 버튼 클릭 */
	$(".techStatus").on("click", function() {
		// aprocPass 셋팅하기
		let confirmStatus = $(this).data("confirmStatus");
		$(searchForm).find(":input[name=aprocPass]").val(confirmStatus)

		// 검색조건 초기화
		$(searchForm).find(":input[name=usersGen]").val("");
		$(searchForm).find(":input[name=usersNm]").val("");
		$(".searchUI").find(":input[name=usersGen]").val("");
		$(".searchUI").find(":input[name=usersNm]").val("");

		// UI 바꾸기
		$(".techStatus").removeClass("colorBlue");
		$(this).addClass("colorBlue");

		$(searchForm).submit();
	})




	/* 면접 전형 - 지원자목록, 면접일정관리 버튼 클릭 */
	$(".intrInfoBtn").on("click", function() {
		// 탭 UI 바꾸기
		$(".intrInfoBtn").removeClass("inSelect");
		$(this).addClass("inSelect");

		let idx = $(this).data("intrTabIdx");

		// 지원자목록, 면접일정관리 내용 보이게 하기
		$(".intrTbl").attr("style", "display: none");
		$(`.intrTbl[data-intr-list-idx=${idx}]`).attr("style", "display: block");

	})


	/* 면접 전형 중 지원자목록 - 미확인/합격/불합격 버튼 클릭 */
	$(".intrApplStatus").on("click", function() {
		// aprocPass 셋팅하기
		let confirmStatus = $(this).data("confirmStatus");
		$(searchForm).find(":input[name=aprocPass]").val(confirmStatus)

		// 검색조건 초기화
		$(searchForm).find(":input[name=usersGen]").val("");
		$(searchForm).find(":input[name=usersNm]").val("");
		$(".searchUI").find(":input[name=usersGen]").val("");
		$(".searchUI").find(":input[name=usersNm]").val("");

		// UI 바꾸기
		$(".intrApplStatus").removeClass("colorBlue");
		$(this).addClass("colorBlue");

		$(searchForm).submit();
	})

	/* 면접 전형 중 면접일정관리 - 미확인/합격/불합격 버튼 클릭 */
	$(".intrSchdStatus").on("click", function() {
		// aprocPass 셋팅하기
		let confirmStatus = $(this).data("confirmStatus");
		$(searchForm).find(":input[name=aprocPass]").val(confirmStatus)

		// 검색조건 초기화
		$(searchForm).find(":input[name=usersGen]").val("");
		$(searchForm).find(":input[name=usersNm]").val("");
		$(".searchUI").find(":input[name=usersGen]").val("");
		$(".searchUI").find(":input[name=usersNm]").val("");

		// UI 바꾸기
		$(".intrSchdStatus").removeClass("colorBlue");
		$(this).addClass("colorBlue");

		$(searchForm).submit();
	})

	/* ==================================================== 모달 ==================================================== */

	/* 이력서 채점표 만들기 */
	$('#createResumeScoreFormBtn').on("click", function() {
		let formTag = `
			<div class="resumeScoreModalCont">
				<form id="resumeScoreForm">
					<div class="resumeScoreItem divTypo">학력</div>
					<input type="checkbox" name="scrEdu" class="resumeScoreCheckbox" />
					<div class="resumeScoreItem divTypo">어학</div>
					<input type="checkbox" name="scrLang" class="resumeScoreCheckbox" />
					<div class="resumeScoreItem divTypo">경력</div>
					<input type="checkbox" name="scrCer" class="resumeScoreCheckbox" />
					<div class="resumeScoreItem divTypo">자격증</div>
					<input type="checkbox" name="scrCareer" class="resumeScoreCheckbox" />
					<div class="resumeScoreItem divTypo">대외활동</div>
					<input type="checkbox" name="scrIa" class="resumeScoreCheckbox" />
					<div class="resumeScoreItem divTypo">해외연수</div>
					<input type="checkbox" name="scrOs" class="resumeScoreCheckbox" />
					<div class="resumeScoreItem divTypo">기타</div>
					<input type="checkbox" name="scrEtc" class="resumeScoreCheckbox" />
				</form>
			</div>
		`;

		$('#resumeScore-modal-body').html(formTag);
	})

	/* 이력서 채점표 만들기 - 확인버튼 클릭 */
	$('#resumeScoreFormBtn').on("click", function() {
		let confirmStatus = confirm("채점표 양식을 저장하시겠습니까?");
		if (confirmStatus) {

			let checkbox = $('.resumeScoreCheckbox');
			let data = {};
			$.each(checkbox, function(i, v) {
				let name = v.name;
				data[name] = $(v).is(":checked") ? "Y" : "N"
			}); // each 끝

			console.log(data);

			data["rcrtNo"] = rcrtNo;
			data["rprocOrder"] = rprocOrder;

			$.ajax({
				url: `${cPath}/company/recruit/resume/scoreForm`,
				data: data,
				type: "post",
				success: function(resp) {
					if (resp == "OK") {
						alert("수정 성공")
					} else {
						alert("수정 실패")
					}

					$('.closeModal').trigger("click");
					location.reload();
				},
				error: function(xhr) {
					console.log(xhr.status);
				}

			})

		}
	})
	
	
	/*datepicker - 면접일정 생성-날짜선택 api*/
	$("#intrIntdate").datepicker({
           dateFormat: 'yy-mm-dd' //달력 날짜 형태
           ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
           ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
           ,changeYear: true //option값 년 선택 가능
           ,changeMonth: true //option값  월 선택 가능                
           ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
           ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
           ,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
           ,buttonText: "선택" //버튼 호버 텍스트              
           ,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
           ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
           ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
           ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
           ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
           ,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
           ,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
       });


	/* 면접일정 생성 */
	$(document).on("click","#createIntrSchdBtn",function(){
		
		let usersNm = $(this).data("usersNm");
		let aplNo = $(this).data("aplNo");
		let memMail = $(this).data("memMail");
		
		let schdTag = `
			<div class="resumeScoreModalCont">
				<form id="intrSchdForm">
					<div class="intrItemTitle">면접대상자</div>
					<input type="text" value="${usersNm}" class="intrSchdItem" disabled /> <br />
					<input type="hidden" name="aplNo" value="${aplNo}" />
					<input type="hidden" name="rcrtNo" value="${rcrtNo}" />
					<input type="hidden" name="rprocOrder" value="${rprocOrder}" />
					<input type="hidden" name="memMail" value="${memMail}" />
					<div class="intrItemTitle">면접유형</div>
					<select name="intrType" id="intrType" class="intrSchdItem">
						<option value="I01">대면면접</option>
						<option value="I02">화상면접</option>
						<option value="I03">전화면접</option>
					</select><br/>
					<div class="intrItemTitle">면접일시</div>
					<input type="text" name="intrIntdate" id="intrIntdate" class="intrSchdItem"/><br />
					<div class="intrItemTitle intrPlace">면접장소</div>
					<input type="text" name="intrPlace" class="intrSchdItem intrPlace"/><br />
					<div class="intrItemTitle">안내발송</div>
					<div class="alarmArea">
						<input type="radio" name="alarm" value="Y"/> 발송<br/>
						<input type="radio" name="alarm" value="N"/> 발송안함<br/>
					</div>
					<div class="alarmArea alarmSecond">
						<input type="checkbox" name="alarmType" value="" class="resumeScoreCheckbox" /> 메일
						<input type="checkbox" name="alarmType" value="" class="resumeScoreCheckbox" /> 알림
					</div>
					<textarea class="txtAStyle"></textarea>
				</form>
			</div>
		`;

		$('#intrSchd-modal-body').html(schdTag);
	})
	
	$(document).on("click", "#intrIntdate", function () {
	    $(this).datepicker({
	        dateFormat: 'yy-mm-dd'
	    }).datepicker("show");
	});
	
	$(document).on("change","#intrType",function(){
		if($('select[name=intrType]').val()=="I01"){
			$('.intrPlace').attr("style", "display:");
			$('input[name=intrPlace]').val("");
		}else{
			$('.intrPlace').attr("style", "display:none");
		}
	})
	
	$("#intrSchdBtn").on("click",function(){
		let data = $(intrSchdForm).serialize();
		
		$.ajax({
			url : `${cPath}/company/recruit/interviewSchd`,
			data : data,
			type : "post",
			success : function(resp){
				if (resp == "OK") {
					alert("등록 성공")
				} else {
					alert("등록 실패")
				}
				$('.closeModal').trigger("click");
				location.reload();
			},
			error : function(xhr){
				
			}
		})
	})

	/* ================================================== 검색/페이지/정렬 ================================================== */

	/* 페이지 처리 */
	fn_paging = (currentPage) => {
		$('#searchForm').find('input[name=page]').val(currentPage);
		$('#searchForm').submit();
		$('#searchForm').find('input[name=page]').val("");
	}


	/* 검색버튼 클릭 이벤트 */
	$('.recruitViewSearchBtn').on("click", function() {
		inputs = $(this).parents(".searchUI").find(":input[name]");
		$.each(inputs, function(i, v) {
			let name = v.name;
			let value = v.value;

			$(searchForm).find(`:input[name=${name}]`).val(value);
		})
		$(searchForm).submit();
	})

	/* 정렬조건 change 이벤트 */
	$(":input[name=sortCategory]").on("change", function() {
		let value = $(this).val();
		$(searchForm).find(":input[name=sortCategory]").val(value);
		$(searchForm).submit();
	})

	/* 등록여부 change 이벤트 */
	$(":input[name=intrStatus]").on("change", function() {
		let value = $(this).val();
		$(searchForm).find(":input[name=intrStatus]").val(value);
		$(searchForm).submit();
	})

	/* 페이지 처리 또는 검색버튼 클릭 시 submit 이벤트 */
	$(searchForm).on("submit", function(event) {
		event.preventDefault();

		if (rprocTypeno == 'RE01') {
			// 서류 전형일 때
			resumeSettings.data = $("#searchForm").serialize();
			resumeSettings.confirmStatus = $(searchForm).find(":input[name=aprocPass]").val();
			$.ajax(resumeSettings)
		} else if (rprocTypeno == 'RE02') {
			// 적성검사 전형일 때
			aptSettings.data = $("#searchForm").serialize();
			aptSettings.confirmStatus = $(searchForm).find(":input[name=aprocPass]").val();
			$.ajax(aptSettings)
		} else if (rprocTypeno == 'RE03') {
			// 기술시험 전형일 때
			techSettings.data = $("#searchForm").serialize();
			techSettings.confirmStatus = $(searchForm).find(":input[name=aprocPass]").val();
			$.ajax(techSettings)
		} else {
			// 면접 전형일 때
			intrSettings.data = $("#searchForm").serialize();
			intrSettings.confirmStatus = $(searchForm).find(":input[name=aprocPass]").val();
			$.ajax(intrSettings);
		}
	})

	/* ================================================== 초기화면 트리거 ================================================== */

	// 초기화면 미확인 클릭 트리거
	$(".resumeStatus").eq(0).trigger("click");
	$(".aptStatus").eq(0).trigger("click");
	$(".techStatus").eq(0).trigger("click");
	$(".techStatus").eq(0).trigger("click");
	$(".intrApplStatus").eq(0).trigger("click");
	$(".intrSchdStatus").eq(0).trigger("click");


	/* ================================================== 합불상태 저장, 마감 ================================================== */

	/* 저장 버튼 클릭 */
	$("#passStatusSaveBtn").on("click", function() {
		let data = $(confirmStatusForm).serialize();
		console.log(data);
		$.ajax({
			url: `${cPath}/company/recruit/passStatus`,
			type: "post",
			data: data,
			success: function(resp) {
				if (resp == "OK") {
					alert("수정 성공")
				} else {
					alert("수정 실패")
				}
				let confirmStatus = $(searchForm).find(":input[name=aprocPass]").val();
				$('.confirmStatus').children(`[data-confirm-status=${confirmStatus}]`).trigger("click");

			},
			error: function(xhr) {
				console.log(xhr.status);
			}
		});
	})

	/* 마감 버튼 클릭 */
	$('#procedureCloseBtn').on("click", function() {
		let closeConfirm = confirm("마지막 상태가 저장된 후 마감됩니다. 채용절차를 마감하시겠습니까?");
		if (closeConfirm) {
			confirmStatusForm.action = `${cPath}/company/recruit/closeStatus`;
			confirmStatusForm.requestSubmit();
		}
	})

})
