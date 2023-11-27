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
									<td class="usersNm">${v.users.usersNm}</td>
									<td class="usersBir">${v.users.usersBir}</td>
									<td class="usersGen">${v.users.usersGen == 'F' ? "여" : "남"}</td>
									<td class="ellipsis resumeTitle"><a href="javascript:;" class="resumeDetail" data-apl-no="${v.aplNo}" data-resatt-no="${v.resattNo}">${v.resumeTitle}</a></td>
									<td>${v.aprocDate}</td>
									<td>${v.aprocScr??"-"}</td>
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
								<td class="usersNm"><a href="javascript:;">${v.users.usersNm}</a></td>
								<td class="usersBir">${v.users.usersBir}</td>
								<td class="usersGen">${v.users.usersGen == 'F' ? "여" : "남"}</td>
								<td><a href="javascript:;" class="aptTestDetail" data-test-no="${v.testNo}">결과지확인</a></td>
								<td>${v.aprocDate}</td>
								<td>${v.aprocScr}</td>
						`;

					// 마감일 시 초기화면 합불여부 관리 disabled 처리
					if (rprocEnd == 'Y') {
						result += `
									<td>
										<input type="hidden" name="aprocVO[${i}].aplNo" class="aplNo" value="${v.aplNo}"/>
										<input type="hidden" name="aprocVO[${i}].rcrtNo" class="rcrtNo" value="${v.rcrtNo}"/>
										<input type="hidden" name="aprocVO[${i}].rprocOrder" class="rprocOrder" value="${v.rprocOrder}"/>
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
										<input type="hidden" name="aprocVO[${i}].aplNo" class="aplNo" value="${v.aplNo}"/>
										<input type="hidden" name="aprocVO[${i}].rcrtNo" class="rcrtNo" value="${v.rcrtNo}"/>
										<input type="hidden" name="aprocVO[${i}].rprocOrder" class="rprocOrder" value="${v.rprocOrder}"/>
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
								<td class="usersNm"><a href="javascript:;">${v.users.usersNm}</a></td>
								<td class="usersBir">${v.users.usersBir}</td>
								<td class="usersGen">${v.users.usersGen == 'F' ? "여" : "남"}</td>
								<td><a href="javascript:;" class="techTestDetail" data-test-no="${v.testNo}" data-users-nm="${v.users.usersNm}">결과지확인</a></td>
								<td>${v.aprocDate}</td>
								<td>${v.aprocScr}</td>
						`;

					// 마감일 시 초기화면 합불여부 관리 disabled 처리
					if (rprocEnd == 'Y') {
						result += `
									<td>
										<input type="hidden" name="aprocVO[${i}].aplNo" class="aplNo" value="${v.aplNo}"/>
										<input type="hidden" name="aprocVO[${i}].rcrtNo" class="rcrtNo" value="${v.rcrtNo}"/>
										<input type="hidden" name="aprocVO[${i}].rprocOrder" class="rprocOrder" value="${v.rprocOrder}"/>
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
										<input type="hidden" name="aprocVO[${i}].aplNo" class="aplNo" value="${v.aplNo}"/>
										<input type="hidden" name="aprocVO[${i}].rcrtNo" class="rcrtNo" value="${v.rcrtNo}"/>
										<input type="hidden" name="aprocVO[${i}].rprocOrder" class="rprocOrder" value="${v.rprocOrder}"/>
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
								<td class="usersNm"><a href="javascript:;">${v.users.usersNm}</a></td>
								<td class="usersBir">${v.users.usersBir}</td>
								<td class="usersGen">${v.users.usersGen == 'F' ? "여" : "남"}</td>
								<td>${v.interviewVO.intrDate ? "등록" : "미등록"}</td>
								<td>
									${v.interviewVO.intrDate ? "" : `<button type="button" id="createIntrSchdBtn" class="btnSizeS colorBlue"
									data-bs-toggle="modal" data-bs-target="#intrSchdModal"
									data-apl-no="${v.aplNo}" data-users-nm="${v.users.usersNm}"
									data-mem-mail="${v.memMail}">면접일정등록</button>`}
								</td>
							</tr>
						`;
					if(v.interviewVO.intrDate){
						schdResult += `
							<tr>
								<td class="usersNm">
									<a href="javascript:;">${v.users.usersNm}</a><br>
									<buttton type="text" class="btnSizeXS">${v.interviewVO.intrTypeNm}</buttton>
								</td>
								<td class="usersBir">${v.users.usersBir}</td>
								<td class="usersGen">${v.users.usersGen == 'F' ? "여" : "남"}</td>
								<td>
									${v.interviewVO.intrIntdate}<br/>
									`;
						if(v.interviewVO.intrType=="I01"){
							schdResult += `${v.interviewVO.intrPlace}`;
						}else if(v.interviewVO.intrType=="I02"){
							schdResult += `<button type="button" class="btnSizeXS">화상면접 링크</button>`;
						}
							schdResult += `
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
											<buttton type="button" class="btnSizeXS colorBlue">안내발송</buttton><br>
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
											<buttton type="button" id="intrSchdUpdateBtn" class="btnSizeXS colorBlue"
											data-bs-toggle="modal" data-bs-target="#intrSchdUpdateModal"
											data-intr-no="${v.interviewVO.intrNo}"
											data-apl-no="${v.aplNo}" data-users-nm="${v.users.usersNm}"
											data-mem-mail="${v.memMail}">수정</buttton><br>
											<buttton type="button" class="btnSizeXS colorBlue">삭제</buttton>
										</td>
									</tr>
								`;
						}
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

		$(searchForm).find(":input[name=intrStatus]").val("");

		let idx = $(this).data("intrTabIdx");

		// 지원자목록, 면접일정관리 내용 보이게 하기
		$(".intrTbl").attr("style", "display: none");
		$(`.intrTbl[data-intr-list-idx=${idx}]`).attr("style", "display: block");
		
		if(idx==1){
			$(".intrApplStatus").eq(0).trigger("click");
		}else{
			$(".intrSchdStatus").eq(0).trigger("click");
		}
		
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
						alert("생성 성공")
					} else {
						alert("생성 실패")
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
					<select name="intrType" class="intrSchdItem intrType">
						<option value="I01">대면면접</option>
						<option value="I02">화상면접</option>
						<option value="I03">전화면접</option>
					</select><br/>
					<div class="intrItemTitle">면접일시</div>
					<input type="text" name="intrIntdate" class="intrSchdItem intrIntdate"/><br />
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
	
	$(document).on("click", ".intrIntdate", function () {
	    $(this).datepicker({
	        dateFormat: 'yy-mm-dd'
	    }).datepicker("show");
	});
	
	/* 확인 버튼 클릭 */
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
				console.log(xhr.status);
			}
		})
	})
	
	/* 면접 일정 수정 */
	$(document).on("click","#intrSchdUpdateBtn",function(){
		let intrNo = $(this).data("intrNo");
		let usersNm = $(this).data("usersNm");
		let aplNo = $(this).data("aplNo");
		let memMail = $(this).data("memMail");
		
		$.ajax({
			url : `${cPath}/company/recruit/interviewSchd`,
			data : {
				"intrNo" : intrNo
			},
			type : "get",
			success : function(resp){
				console.log(resp);
				let schdTag = `
					<div class="resumeScoreModalCont">
						<form id="intrSchdUpdateForm">
							<input type="hidden" name="_method" value="put"/>
							<div class="intrItemTitle">면접대상자</div>
							<input type="text" value="${usersNm}" class="intrSchdItem" disabled /> <br />
							<input type="hidden" name="intrNo" value="${intrNo}" />
							<input type="hidden" name="memMail" value="${memMail}" />
							<div class="intrItemTitle">면접유형</div>
							<select name="intrType" class="intrSchdItem intrType">
								<option value="I01">대면면접</option>
								<option value="I02">화상면접</option>
								<option value="I03">전화면접</option>
							</select><br/>
							<div class="intrItemTitle">면접일시</div>
							<input type="text" name="intrIntdate" value="${resp.intrIntdate}" class="intrSchdItem intrIntdate"/><br />
							<div class="intrItemTitle intrPlace">면접장소</div>
							<input type="text" name="intrPlace" class="intrSchdItem intrPlace"/><br />
						</form>
					</div>
				`;
				$('#intrSchdUpdate-modal-body').html(schdTag);
				
				$(`option[value=${resp.intrType}]`).attr("selected","selected").trigger("change");
				if(resp.intrPlace){
					$(`input[name=intrPlace]`).val(`${resp.intrPlace}`);
				}
			},
			error : function(xhr){
				console.log(xhr.status);
			}
		}); // ajax 끝
	})
	
	/* 면접일정 수정 - 확인 버튼 클릭 */
	$("#intrSchdUpdateBtn").on("click",function(){
		let data = $(intrSchdUpdateForm).serialize();
		console.log(data);
		
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
				console.log(xhr.status);
			}
		})
	})
	
	$(document).on("change",".intrType",function(){
		if($(this).val()=="I01"){
			$('.intrPlace').attr("style", "display:");
			$('input[name=intrPlace]').val("");
		}else{
			$('.intrPlace').attr("style", "display:none");
		}
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


	/* ================================================== 상세정보 클릭 ================================================== */
	
	/* 이력서 상세보기 */
	$(document).on("click",".resumeDetail", function(){
		let resattNo = $(this).data("resattNo");
		let aplNo = $(this).data("aplNo");
		
		let resumeTitle = $(this).parents("tr").find(".resumeTitle").text();
		$('.resume-title-area').html(resumeTitle);
		
		$('.resume_part').attr("style","display:none");
		$('.resume_part[data-idx=2]').attr("style","display:block");
		
		$.ajax({
			url : `${cPath}/company/recruit/resume`,
			data : {
				"resattNo":resattNo
				, "rcrtNo" : rcrtNo
				, "rprocOrder" : rprocOrder
			},
			success : function(resp){
				console.log(resp);
				
				let resumeImg = `<img src="${cPath}/${resp.resumeImageUrl}" />`;
				
				scoreTbl = `
							<input type="hidden" name="_method" value="put" />
							<input type="hidden" name="rcrtNo" value="${rcrtNo}" />
							<input type="hidden" name="rprocOrder" value="${rprocOrder}" />
							<input type="hidden" name="aplNo" value="${aplNo}" />
						`;
				
				if(resp.resumeForm){
					if(resp.resumeForm.scrEdu=="Y"){
						scoreTbl += `
							<tr>
								<td class="td-score-title">학력</td>
								<td class="td-score">
									<input type="number" name="scrEdu" class="inpTypo input-score" />
								</td>
							</tr>
						`;
					}
					if(resp.resumeForm.scrLang=="Y"){
						scoreTbl += `
							<tr>
								<td class="td-score-title">어학</td>
								<td class="td-score">
									<input type="number" name="scrLang" class="inpTypo input-score" />
								</td>
							</tr>
						`;
					}
					if(resp.resumeForm.scrCareer=="Y"){
						scoreTbl += `
							<tr>
								<td class="td-score-title">경력</td>
								<td class="td-score">
									<input type="number" name="scrCareer" class="inpTypo input-score" />
								</td>
							</tr>
						`;
					}
					if(resp.resumeForm.scrCer=="Y"){
						scoreTbl += `
							<tr>
								<td class="td-score-title">자격증</td>
								<td class="td-score">
									<input type="number" name="scrCer" class="inpTypo input-score" />
								</td>
							</tr>
						`;
					}
					if(resp.resumeForm.scrIa=="Y"){
						scoreTbl += `
							<tr>
								<td class="td-score-title">대외활동</td>
								<td class="td-score">
									<input type="number" name="scrIa" class="inpTypo input-score" />
								</td>
							</tr>
						`;
					}
					if(resp.resumeForm.scrOs=="Y"){
						scoreTbl += `
							<tr>
								<td class="td-score-title">해외연수</td>
								<td class="td-score">
									<input type="number" name="scrOs" class="inpTypo input-score" />
								</td>
							</tr>
						`;
					}
					if(resp.resumeForm.scrEtc=="Y"){
						scoreTbl += `
							<tr>
								<td class="td-score-title">기타</td>
								<td class="td-score">
									<input type="number" name="scrEtc" class="inpTypo input-score" />
								</td>
							</tr>
						`;
					}
				}
				
				$('#resumeImg').html(resumeImg);
				$('.resume-score-tbody').html(scoreTbl);
				if(rprocEnd=='Y'){
					$(resumeScoreSubmitForm).find(":input").attr("disabled","disabled");
				}
			},
			error : function(xhr){
				console.log(xhr.status);
			}
		})

	})
	
	/* 이력서 - 목록버튼 클릭 */
	$("#resumePartReturnBtn").on("click",function(){
		$('.resume_part').attr("style","display:none");
		$('.resume_part[data-idx=1]').attr("style","display:block");
	})
	
	/* 이력서 - 저장버튼 클릭 */
	$('#resumeScoreSubmitBtn').on("click",function(){
		let data = $(resumeScoreSubmitForm).serialize();
		console.log(data);
		$.ajax({
			url : `${cPath}/company/recruit/resumeScore`,
			data : data,
			type: "post",
			success : function(resp){
				console.log(resp);
			},
			error : function(xhr){
				console.log(xhr.status);
			}
		})
	})

	/* 적성검사 - 시험지 조회 */
	$(document).on("click",".aptTestDetail", function(){
		let testNo = $(this).data("testNo");
		let aplNo = $(this).parents("tr").find("input[class=aplNo]").val();
		let rcrtNo = $(this).parents("tr").find("input[class=rcrtNo]").val();
		let rprocOrder = $(this).parents("tr").find("input[class=rprocOrder]").val();
		
		$('.apt_part').attr("style","display:none");
		$('.apt_part[data-idx=2]').attr("style","display:block");
		
		
		let usersNm = $(this).parents("tr").find(".usersNm").text();
		let usersBir = $(this).parents("tr").find(".usersBir").text();
		let usersGen = $(this).parents("tr").find(".usersGen").text();
		
		$('.apt-detailName').html(`${usersNm}(${usersBir}, ${usersGen})`);
		
		
		$.ajax({
			url : `${cPath}/company/recruit/test/${rcrtNo}/${rprocOrder}/${aplNo}`,
			data : {"testNo":testNo},
			success : function(resp){
				console.log(resp);
				
				let result = ``;
				
				$.each(resp[0].qstnList,function(idx,val){
					result += `
							<div>
								<div class="qstn-area">${idx+1}.${val.qstnCont}<div>
									<div class="item-area">
						`;
						$.each(val.itemList, function(i,v){
							if(val.rsltSelect==i+1){
								result += `<div style="color:#4876ef">(${i+1}) ${v.itemCont}</div>`;
							}else{
								result += `<div>(${i+1}) ${v.itemCont}</div>`;
							}
						});	// 내부 each문 끝
					result += `
							</div>
						<div class="astnOk">정답 : <span> ${val.qstnAnswer} </span>  </div>`
					result += `</div>`;
				}) // each문 끝
				
				
				$('#apt-test-result').html(result);
				
			},
			error : function(xhr){
				console.log(xhr.status);
			}
		});
		})
		
		/* 적성검사 시험지 - 목록버튼 클릭 */
		$("#aptPartReturnBtn").on("click",function(){
			$('.apt_part').attr("style","display:none");
			$('.apt_part[data-idx=1]').attr("style","display:block");
		})
		
	/* 기술시험 - 시험지 조회 */
	$(document).on("click",".techTestDetail", function(){
		let testNo = $(this).data("testNo");
		let aplNo = $(this).parents("tr").find("input[class=aplNo]").val();
		let rcrtNo = $(this).parents("tr").find("input[class=rcrtNo]").val();
		let rprocOrder = $(this).parents("tr").find("input[class=rprocOrder]").val();
		
		$('.tech_part').attr("style","display:none");
		$('.tech_part[data-idx=2]').attr("style","display:block");
		
		let usersNm = $(this).parents("tr").find(".usersNm").text();
		let usersBir = $(this).parents("tr").find(".usersBir").text();
		let usersGen = $(this).parents("tr").find(".usersGen").text();
		
		$('.tech-detailName').html(`${usersNm}(${usersBir}, ${usersGen})`);
		
		
		$.ajax({
			url : `${cPath}/company/recruit/test/${rcrtNo}/${rprocOrder}/${aplNo}`,
			data : {"testNo":testNo},
			success : function(resp){
				console.log(resp);
				
				let result = ``;
				
				$.each(resp[0].qstnList,function(idx,val){
					result += `
							<div>
								<div class="qstn-area">${idx+1}.${val.qstnCont}<div>
								<div class="item-area">답안 : ${val.rsltSelect}</div>
						`;
					result += `
							<span class="astnOk item-area techAnswer">모범답안 : <span> ${val.qstnAnswer} </span><br/> 
						</div>`;
				}) // each문 끝
				
				$('#tech-test-result').html(result);
				
			},
			error : function(xhr){
				console.log(xhr.status);
			}
		});
		
		scoreTbl = `
				<input type="hidden" name="_method" value="put" />
				<input type="hidden" name="aplNo" value="${aplNo }" />
				<input type="hidden" name="rcrtNo" value="${rcrtNo }" />
				<input type="hidden" name="rprocOrder" value="${rprocOrder }" />
			`;
		for(let i=1; i<=10; i++){
			scoreTbl += `
				<tr>
					<td class="td-score-title">${i}</td>
					<td class="td-score">
						<input type="number" name="techScore" class="inpTypo input-score" />
					</td>
				</tr>
			`;
		}
		
		$('.tech-score-tbody').html(scoreTbl);
		if(rprocEnd=='Y'){
			$(techScoreSubmitForm).find(":input").attr("disabled","disabled");
		}
		
		})
		
		/* 기술시험 시험지 - 목록버튼 클릭 */
		$("#techPartReturnBtn").on("click",function(){
			$('.tech_part').attr("style","display:none");
			$('.tech_part[data-idx=1]').attr("style","display:block");
		})
		
		/* 기술시험 시험지 - 저장버튼 클릭 */
		$('#techScoreSubmitBtn').on("click",function(){
			let data = $(techScoreSubmitForm).serialize();
			console.log(data);
			$.ajax({
				url : `${cPath}/company/recruit/techScore`,
				data : data,
				type: "post",
				success : function(resp){
					console.log(resp);
				},
				error : function(xhr){
					console.log(xhr.status);
				}
			})
		})
})
	
	