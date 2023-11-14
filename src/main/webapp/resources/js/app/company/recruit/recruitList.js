/**
 * 
 */
$(function(){
	
	/* 리스트 출력 ajax settings */
	let settings = {
		url:`${cPath}/company/test`,
		type : "get",
		dataType :"json",
		success : function(resp){
			console.log(resp);
			
			// 가지고 온 결과의 타입 받기
			let testType = resp.dataList[0].testType
			// 현재 탭 번호 가져오기
			let order = $('#'+testType).data("tabOrder");
		
			result = ``;
			if(resp.dataList.length>0){
				$.each(resp.dataList,function(i,v){
					result += `
								<tr>
									<td><a href="javascript:;" onclick="testDetail('${v.testType}','${v.testNo}');">${v.testTitle}</a></td>
									<td>${v.testDate}</td>
								</tr>
							`;
				})
			}else{
				result += `
						<tr>
	                        <td colspan="2" style="padding: 20">
	                        	검색 결과가 없습니다.
	                        </td>
	                     </tr>
						`;
			}
			// 탭 순서와 똑같은 tbody에 result 찍기
			$(`.test-tbody[data-list-order=${order}]`).html(result);
			
			// paging ui 찍기
			let paging = resp.pagingHTML;
			$('#paging').html(paging);
			
		},
		error : function(xhr){
			console.log("상태 : ",xhr.status);
		}
	}
	
	/* 탭 클릭 이벤트 */
	$('.recruitListClass').on("click",function(){
		// 모든 검색조건 초기화
		$('#searchForm').find('input[name]').val("");
		$('#searchUI').find('input[name]').val("");
		
		// 현재 탭 번호 가져오기		
		let order = $(this).data("tabOrder");

		//settings.data = $('#searchForm').serialize();
		//$.ajax(settings)	// ajax 끝
		
		
		// select된 탭 select속성 다 지우기
		$('.tabList').children('.select').removeClass('select')
		// tbody 전부 안보이게 하기
		$('.test-tbody').attr('style','display:none');
		
		// 클릭한 탭에 select 속성 주기
		$(this).addClass("select")
		// 탭 번호와 똑같은 tbody 보이게 하기
		$(`.test-tbody[data-list-order=${order}]`).attr('style','display:');
		
	})
	
	
	/* 페이지 로딩 직후 적성검사 클릭 이벤트 발생 */
	$('.testClass').eq(0).trigger('click');



	/* 페이지 처리 */
	fn_paging = (currentPage) => {
		$('#searchForm').find('input[name=page]').val(currentPage);
		$('#searchForm').submit();
		$('#searchForm').find('input[name=page]').val("");
	}
	
	
	
	/* 검색버튼 클릭 이벤트 */
	$('#testSearchBtn').on("click",function(){
		inputs = $(this).parents("#searchUI").find(":input[name]");
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
		/*
		// 현재 탭의 testType 가져오기
		let testType = $('#searchForm').find('input[name=testType]').val();	
		// 현재 탭 번호 가져오기			
		let order = $('#'+testType).data("tabOrder");
		*/
		
		settings.data = $('#searchForm').serialize();
		$.ajax(settings);
	})
	
})
	