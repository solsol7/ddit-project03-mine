/**
 * 
 */

$(function(){
	
	let cPath = this.body.dataset.contextPath;

	let rcrtNo = $('.recruit-content').data("rcrtNo");
	let rprocOrder = $('.recruit-content').data("rprocOrder");
	let rprocEnd = $('.recruit-content').data("rprocEnd");
	
	
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
})