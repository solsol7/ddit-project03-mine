/**
 * 
 */

$(function(){
	
	const cPath = this.body.dataset.contextPath;
	
	/*datepicker - 날짜선택 api*/
	$("#datepicker").datepicker();	
	$("#datepicker").datepicker({
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

	$('#datepicker').datepicker('setDate', 'today');
	

	$('.testClass').on("click",function(){
		$('.tabList').children('.select').removeClass('select')
		$(this).addClass("select")
		
		let order = $(this).data("tabOrder");
		$('.test-tbody').attr('style','display:none');
		$(`.test-tbody[data-list-order=${order}]`).attr('style','display:block');
		
	})
	
	/*리스트 출력*/
	
	$.testList = function(){
		$.ajax({
			url:`${cPath}/company/test`,
			type : "get",
			dataType :"json",
			success : function(resp){
				console.log("체킁:",resp);

				let  apt= resp.apt;
				let  tech = resp.tech;

				console.log("apt:", apt)
				console.log("tech:",tech)
				/*
				let   aaa= resp[0];
				let   bbb = resp[1];
				*/
				result = ``;
				if(resp.dataList){
					result += `
								<tr>
									<td>${resp.dataList.testTitle}</td>
									<td></td>
									<td></td>
								</tr>
							`;
				}else{
					result += `
							<tr>
		                        <td colspan="3" style="padding: 20">
		                        	검색 결과가 없습니다.
		                        </td>
		                     </tr>
							`;
				}
				
				$('#test-tbody').html(result);
			},
			error : function(xhr){
				alert("상태 : " + xhr.status)
			}
			
		});
	}
	
})
