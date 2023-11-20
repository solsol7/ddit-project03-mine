/**
 * 
 */




$(function(){
	
	let cPath = this.body.dataset.contextPath;
	
	/* 탭 클릭 시 호출되는 function */	
	selectTab = (rcrtNo,rprocOrder) => {
		location.href = `${cPath}/company/recruit/${rcrtNo}/${rprocOrder }`;
	}
	
	let rcrtNo = $('.recruit-content').data("rcrtNo");
	let rprocOrder = $('.recruit-content').data("rprocOrder");
	
	/* 서류전형 settings */
	let resumeSettings ={
		
		
		
		
			url : `${cPath}/company/recruit/ajax/${rcrtNo}/${rprocOrder}`,
			dataType : "json",
			success : function(resp){
				
				result = '';
				if(resp.dataList.length >0){
					$.each(resp.dataList, function(i,v){
						result += `
								<tr>
									<td>${v.users.usersNm}</td>
									<td>${v.users.usersBir}</td>
									<td>${v.users.usersGen}</td>
									<td>${v.resumeTitle}</td>
									<td>${v.aprocDate}</td>
									<td>${v.aprocScr}</td>
									<td></td>
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
								<td>${v.users.usersNm}</td>
								<td>${v.users.usersBir}</td>
								<td>${v.users.usersGen}</td>
								<td><a href="javascript:;" onclick="rsltLink('${v.rsltNo}')">결과지확인</a></td>
								<td>${v.aprocDate}</td>
								<td>${v.aprocScr}</td>
								<td></td>
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
								<td>${v.users.usersNm}</td>
								<td>${v.users.usersBir}</td>
								<td>${v.users.usersGen}</td>
								<td><a href="javascript:;" onclick="rsltLink('${v.rsltNo}')">결과지확인</a></td>
								<td>${v.aprocDate}</td>
								<td>${v.aprocScr}</td>
								<td></td>
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
		
		techSettings.data = $("#searchForm").serialize();
		console.log(techSettings.data);
		$.ajax(techSettings);		// ajax 끝
	})


	// 초기화면 미확인 클릭 트리거
	$(".resumeStatus").eq(0).trigger("click");
	$(".aptStatus").eq(0).trigger("click");
	$(".techStatus").eq(0).trigger("click");
	

})
