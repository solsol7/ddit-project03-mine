<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags"
	prefix="security"%>

<div class="test_content">
	<form>
		<div class="title_wrap">
			<div class="test_type">적성검사</div>
			<div class="test_title">
				<div class="title_text">제목 :</div>
				<input type="text" class="inpTypo title_input" />
			</div>
		</div>

		<div class="testForm">
			<div id="tablewrap">
				<table class="table table-bordered question center">
					<tr>
						<td>문제 1</td>
						<td colspan="2">
							<textarea class="inpTypo ques_area"></textarea>
						</td>
					</tr>
					<tr class="align_center">
						<td class="test_item">문항</td>
						<td>내용</td>
						<td class="is_answer">정답여부</td>
					</tr>
					<tr>
						<td>1</td>
						<td>
							<textarea class="inpTypo item_area"></textarea>
						</td>
						<td>
							<input class="input_radio" type="radio" value="1" name="1" />
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>
							<textarea class="inpTypo item_area"></textarea>
						</td>
						<td>
							<input type="radio" class="input_radio" value="2" name="1"/>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>
							<textarea class="inpTypo item_area"></textarea>
						</td>
						<td>
							<input type="radio" class="input_radio" value="3"  name="1"/>
						</td>
					</tr>
					<tr>
						<td>4</td>
						<td>
							<textarea class="inpTypo item_area"></textarea>
						</td>
						<td>
							<input type="radio" class="input_radio" value="4"  name="1"/>
						</td>
					</tr>
					<tr>
						<td>5</td>
						<td>
							<textarea class="inpTypo item_area"></textarea>
						</td>
						<td>
							<input type="radio" class="input_radio" value="5"  name="1"/>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<button type="button" class="btnSizeS colorBlue saveBtn">저장</button>
	</form>
</div>