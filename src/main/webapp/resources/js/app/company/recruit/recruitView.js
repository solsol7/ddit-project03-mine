/**
 * 
 */




$(function(){
	
	let cPath = this.body.dataset.contextPath;
	
	/* 탭 클릭 시 호출되는 function */	
	selectTab = (rcrtNo,rprocOrder) => {
		location.href = `${cPath}/company/recruit/${rcrtNo}/${rprocOrder }`;
	}
	
	// rprocTypeno 셋팅
	let rprocTypeno = $('.recruit-content').data("rprocTypeno");
	$('#searchForm').find('input[name=rprocTypeno]').val(rprocTypeno);
	
	let rcrtNo = $('.recruit-content').data("rcrtNo");
	let rprocOrder = $('.recruit-content').data("rprocOrder");
	
	/* 서류전형 settings */
	let resumeSettings ={
			url : `${cPath}/company/recruit/ajax/${rcrtNo}/${rprocOrder}`,
			dataType : "json",
			success : function(resp){
				console.log(resp)
				result = '';
				if(resp.dataList.length >0){
					$.each(resp.dataList, function(i,v){
						result += `
								<tr>
									<td>${v.users.usersNm}</td>
									<td>${v.users.usersBir}</td>
									<td>${v.users.usersGen=='F'?"여":"남"}</td>
									<td><a href="javascript:;" onclick="resumeView(${v.resattNo})">${v.resumeTitle}</a></td>
									<td>${v.aprocDate}</td>
									<td>${v.aprocScr}</td>
									<td>
										<input type="hidden" name="aprocVO[i].aplNo" value="${v.aplNo}"/>
										<input type="hidden" name="aprocVO[i].rcrtNo" value="${v.rcrtNo}"/>
										<input type="hidden" name="aprocVO[i].rprocOrder" value="${v.rprocOrder}"/>
										<select class="aprocPass" name="aprocVO[i].aprocPass">
											<option value="unconfirmed">미확인</option>
											<option value="pass">합격</option>
											<option value="fail">불합격</option>
										</select>
									</td>
								</tr>
							`;
					}); // $.each 끝
				}else{
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
					$('.resume-tbody').find(`option[value=${this.confirmStatus}]`).attr("selected",true);
			},
			error : function(xhr){
				console.log("상태 : "+xhr.status);
			}
			
			
		};
	
	/* 적성검사 전형 settings */
	let aptSettings ={
		url : `${cPath}/company/recruit/ajax/${rcrtNo}/${rprocOrder}`,
		dataType : "json",
		success : function(resp){
			console.log(resp)
			result = '';
			if(resp.dataList.length >0){
				$.each(resp.dataList, function(i,v){
					result += `
							<tr>
								<td><a href="javascript:;">${v.users.usersNm}</a></td>
								<td>${v.users.usersBir}</td>
								<td>${v.users.usersGen=='F'?"여":"남"}</td>
								<td><a href="javascript:;" onclick="rsltLink('${v.rsltNo}')">결과지확인</a></td>
								<td>${v.aprocDate}</td>
								<td>${v.aprocScr}</td>
								<td>
									<input type="hidden" name="aprocVO[i].aplNo" value="${v.aplNo}"/>
									<input type="hidden" name="aprocVO[i].rcrtNo" value="${v.rcrtNo}"/>
									<input type="hidden" name="aprocVO[i].rprocOrder" value="${v.rprocOrder}"/>
									<select class="aprocPass" name="aprocVO[i].aprocPass">
										<option value="unconfirmed">미확인</option>
										<option value="pass">합격</option>
										<option value="fail">불합격</option>
									</select>
								</td>
							</tr>
						`;
				}); // $.each 끝
			}else{
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
				$('.apt-tbody').find(`option[value=${this.confirmStatus}]`).attr("selected",true);
		},
		error : function(xhr){
			console.log("상태 : "+xhr.status);
		}
		
		
	};

	/* 기술시험 전형 settings */
	let techSettings ={
		url : `${cPath}/company/recruit/ajax/${rcrtNo}/${rprocOrder}`,
		dataType : "json",
		success : function(resp){
			console.log(resp)
			result = '';
			if(resp.dataList.length >0){
				$.each(resp.dataList, function(i,v){
					result += `
							<tr>
								<td><a href="javascript:;">${v.users.usersNm}</a></td>
								<td>${v.users.usersBir}</td>
								<td>${v.users.usersGen=='F'?"여":"남"}</td>
								<td><a href="javascript:;" onclick="rsltLink('${v.rsltNo}')">결과지확인</a></td>
								<td>${v.aprocDate}</td>
								<td>${v.aprocScr}</td>
								<td>
									<input type="hidden" name="aprocVO[i].aplNo" value="${v.aplNo}"/>
									<input type="hidden" name="aprocVO[i].rcrtNo" value="${v.rcrtNo}"/>
									<input type="hidden" name="aprocVO[i].rprocOrder" value="${v.rprocOrder}"/>
									<select class="aprocPass" name="aprocVO[i].aprocPass">
										<option value="unconfirmed">미확인</option>
										<option value="pass">합격</option>
										<option value="fail">불합격</option>
									</select>
								</td>
							</tr>
						`;
				}); // $.each 끝
			}else{
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
				$('.tech-tbody').find(`option[value=${this.confirmStatus}]`).attr("selected",true);
		},
		error : function(xhr){
			console.log("상태 : "+xhr.status);
		}
	};

	/* 면접 전형 settings */
	let intrSettings ={
		url : `${cPath}/company/recruit/ajax/${rcrtNo}/${rprocOrder}`,
		dataType : "json",
		success : function(resp){
			console.log(resp)
			applResult = ``;
			schdResult = ``;
			if(resp.dataList.length >0){
				$.each(resp.dataList, function(i,v){
					applResult += `
							<tr>
								<td><a href="javascript:;">${v.users.usersNm}</a></td>
								<td>${v.users.usersBir}</td>
								<td>${v.users.usersGen=='F'?"여":"남"}</td>
								<td>${v.interviewVO.intrDate?"등록":"미등록"}</td>
								<td>
									${v.interviewVO.intrDate?"":`<button type="button" class="btnSizeS colorBlue"
									data-bs-toggle="modal" data-bs-target="#intrSchdModal">면접일정등록</button>`}
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
								<td>${v.users.usersGen=='F'?"여":"남"}</td>
								<td>
									${v.interviewVO.intrIntdate}<br/>
									${v.interviewVO.intrPlace}
								</td>
								<td>${v.mailCount}</td>
								<td>${v.alarmCount}</td>
								<td>
									<buttton type="button" class="btnSizeS colorBlue">안내발송</buttton><br>
									<input type="hidden" name="aprocVO[i].aplNo" value="${v.aplNo}"/>
									<input type="hidden" name="aprocVO[i].rcrtNo" value="${v.rcrtNo}"/>
									<input type="hidden" name="aprocVO[i].rprocOrder" value="${v.rprocOrder}"/>
									<select class="aprocPass" name="aprocVO[i].aprocPass">
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
				}); // $.each 끝
			}else{
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
				$('.intrSchd-tbody').find(`option[value=${this.confirmStatus}]`).attr("selected",true);
		},
		error : function(xhr){
			console.log("상태 : "+xhr.status);
		}
	};
	
	
	/* 서류전형 - 미확인/합격/불합격 버튼 클릭 */
	$(".resumeStatus").on("click",function(){
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
	$(".aptStatus").on("click",function(){
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
	$(".techStatus").on("click",function(){
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
	$(".intrInfoBtn").on("click",function(){
		// 탭 UI 바꾸기
		$(".intrInfoBtn").removeClass("inSelect");
		$(this).addClass("inSelect");

		let idx = $(this).data("intrTabIdx");

		// 지원자목록, 면접일정관리 내용 보이게 하기
		$(".intrTbl").attr("style", "display: none");
		$(`.intrTbl[data-intr-list-idx=${idx}]`).attr("style", "display: block");

	})
	
	
	/* 면접 전형 중 지원자목록 - 미확인/합격/불합격 버튼 클릭 */
	$(".intrApplStatus").on("click",function(){
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
	$(".intrSchdStatus").on("click",function(){
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
	
	/* 이력서 폼 만들기 */
	resumeView = (rsltNo) => {
		let resumeViewHTML = `
					<table class="table table-bordered">

					</table>
			`;
	}
	
	
	/* 페이지 처리 */
	fn_paging = (currentPage) => {
		$('#searchForm').find('input[name=page]').val(currentPage);
		$('#searchForm').submit();
		$('#searchForm').find('input[name=page]').val("");
	}
	
	
	/* 검색버튼 클릭 이벤트 */
	$('.recruitViewSearchBtn').on("click",function(){
		inputs = $(this).parents(".searchUI").find(":input[name]");
		$.each(inputs, function(i, v){
			let name = v.name;
			let value = v.value;
			
			$(searchForm).find(`:input[name=${name}]`).val(value);
		})
		$(searchForm).submit();
	})
	
	
	/* 페이지 처리 또는 검색버튼 클릭 시 submit 이벤트 */
	$(searchForm).on("submit",function(event){
		event.preventDefault();
		
		if(rprocTypeno=='RE01'){
			// 서류 전형일 때
			resumeSettings.data = $("#searchForm").serialize();
			resumeSettings.confirmStatus = $(searchForm).find(":input[name=aprocPass]").val();
			$.ajax(resumeSettings)
		}else if(rprocTypeno=='RE02'){
			// 적성검사 전형일 때
			aptSettings.data = $("#searchForm").serialize();
			aptSettings.confirmStatus = $(searchForm).find(":input[name=aprocPass]").val();
			$.ajax(aptSettings)
		}else if(rprocTypeno=='RE03'){
			// 기술시험 전형일 때
			techSettings.data = $("#searchForm").serialize();
			techSettings.confirmStatus = $(searchForm).find(":input[name=aprocPass]").val();
			$.ajax(techSettings)
		}else{
			// 면접 전형일 때
			intrSettings.data = $("#searchForm").serialize();
			intrSettings.confirmStatus = $(searchForm).find(":input[name=aprocPass]").val();
			$.ajax(intrSettings);
		}
	})


	// 초기화면 미확인 클릭 트리거
	$(".resumeStatus").eq(0).trigger("click");
	$(".aptStatus").eq(0).trigger("click");
	$(".techStatus").eq(0).trigger("click");
	$(".techStatus").eq(0).trigger("click");
	$(".intrApplStatus").eq(0).trigger("click");
	$(".intrSchdStatus").eq(0).trigger("click");
	

})
