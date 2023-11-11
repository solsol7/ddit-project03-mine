<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags"
	prefix="security"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<div class="test_content">
	<form action="${pageContext.request.contextPath}/company/test/new" method="post">
<%-- 	<form:form modelAttribute="testVO" action="${pageContext.request.contextPath}/company/test/new"> --%>
	<input type="hidden" path="testType" value="T01"/>
	<div class="title_wrap">
		<div class="test_type">
			적성검사
		</div>
		
		<div class="test_title">
			<div class="title_text" style="display:inline-block">제목 :</div>
			<input type="text" name="testTitle" class="inpTypo title_input" />
		</div>
	</div>

	<div class="testForm">
		<div id="tablewrap">
			<table class="table table-bordered question center">
				<c:forEach var="i" begin="0" end="9">
					<table class="table table-bordered question center">
						<tr>
							<td>
								문제 ${i+1}
								<input type="hidden" name="qstnList[${i }].qstnNo" value="${i }"/>
							</td>
							
							<td colspan="2">
								<textarea name="qstnCont" class="inpTypo ques_area"></textarea>
<%-- 								<form:textarea path="qstnList[${i }].qstnCont" class="inpTypo ques_area"/> --%>
							</td>
						</tr>
						<tr class="align_center">
							<td class="test_item">문항</td>
							<td>내용</td>
							<td class="is_answer">정답여부</td>
						</tr>
						<c:forEach var="j" begin="0" end="4" >
							<tr>
								<td>
									${j+1}
									<input type="hidden" name="qstnList[${i }].itemList[${j }].itemNo" value="${j }"/>
								</td>
								
								<td>
									<textarea name="itemCont" class="inpTypo item_area"></textarea>
								</td>
								<td>
									<input type="radio" class="input_radio" name="qstnAnswer" value="${j }"/>
								</td>
							</tr>
						</c:forEach>
					</table>
				</c:forEach>
			</table>
		</div>
	</div>
	<div class="box_lookup">
        <div class="box_right">
			<input class="btnSizeM colorBlue" type="submit" value="제출" />
		</div>
	</div>
	</form:form>
</div>

<script>

$(function(){
	
	
	$("#btnModify").click(function(){
		
		var frm = $("#frm");
		
		alert(frm.serialize());
		
		frm.submit();
		
	});
	
	
	
	
});


</script>

<!-- 
<div class="test_content">
	<form:form modelAttribute="testVO" >
		<form:hidden path="testType" value="T01"/>
		<div class="title_wrap">
			<div class="test_type">
				적성검사
				<button type="button" class="btnSizeS colorBlue saveBtn">삭제</button>
				<button type="button" class="btnSizeS colorBlue saveBtn">수정</button>
				<button type="button" class="btnSizeS colorBlue saveBtn">목록</button>
			</div>
			
			<div class="test_title">
				<div class="title_text" style="display:inline-block">제목 :</div>
				<form:input path="testTitle" class="inpTypo title_input" />
			</div>
		</div>

		<div class="testForm">
			<div id="tablewrap">
				<table class="table table-bordered question center">
					<c:forEach var="i" begin="1" end="10">
						<table class="table table-bordered question center">
						<tr>
							<td>문제 ${i}</td>
							<td colspan="2">
								<form:hidden path="qstnList.qstnNo" value="${i }"/>
								<form:textarea path="qstnList.qstnCont" class="inpTypo ques_area"/>
							</td>
						</tr>
						<tr class="align_center">
							<td class="test_item">문항</td>
							<td>내용</td>
							<td class="is_answer">정답여부</td>
						</tr>
						<c:forEach var="j" begin="1" end="5" >
							<tr>
								<td>${j}</td>
								<td>
									<textarea class="inpTypo item_area"></textarea>
								</td>
								<td>
									<form:radiobutton path="itemList.itemNo" value="${j }"/><input type="radio" class="input_radio" value="${j }" name="${i }"/>
								</td>
							</tr>
						</c:forEach>
						</table>
					</c:forEach>
				</table>
				
			</div>
		</div>
	</form:form>
</div>

 -->
