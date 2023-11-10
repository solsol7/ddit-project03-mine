<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags"
	prefix="security"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="test_content">
		<div class="title_wrap">
			<div class="test_type">
				기술시험
				<button type="button" class="btnSizeS colorBlue saveBtn">삭제</button>
				<button type="button" class="btnSizeS colorBlue saveBtn">수정</button>
				<button type="button" class="btnSizeS colorBlue saveBtn">목록</button>
			</div>
			
			<div class="test_title">
				<div class="title_text" style="display:inline-block">제목 : ${testVO.testTitle }</div>
			</div>
			
		</div>

		<div class="testForm">
			<div id="tablewrap">
				<table class="table table-bordered question center">
					<c:forEach items="${testVO.qstnList}" var="qstn" varStatus="status">
						<table class="table table-bordered question center">
						<tr>
							<td>문제 ${qstn.qstnNo }</td>
							<td colspan="2">
								<div class="divTypo ques_area">${qstn.qstnCont }</div>
							</td>
						</tr>
						<tr class="align_center">
							<td class="test_item">모범답안</td>
							<td>
								<div class="divTypo ques_area">${qstn.qstnAnswer }</div>
							</td>
						</tr>
						
						</table>
					</c:forEach>
				</table>
				
			</div>
		</div>

</div>