<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="security"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script src="<%=request.getContextPath()%>/resources/js/app/company/recruit/recruitView.js"></script>

<div id="content" class="basic_wide vix_main">
	<div class="wrap_content">
		<%-- 채용 절차 탭 --%>
		<div class="area_payment">
			<div class="area_tab">
				<ul class="tabList" role="tablist">
					<c:forEach items="${dataList }" var="data">
						<c:choose>
							<c:when test="${data.rprocOrder eq rprocOrder}">
<!-- 							컨트롤러에서 PathVariable로 받은 변수명 그대로 el로 사용할 수 있음 -->
								<li class="inner select" role="tab">
									<a href="javascript:;" onclick="selectTab('${data.rcrtNo}','${data.rprocOrder }');" class="inTab"><span>${data.comCodeNm }</span></a>
								</li>
							</c:when>
							<c:otherwise>
								<li class="inner" role="tab">
									<a href="javascript:;" onclick="selectTab('${data.rcrtNo}','${data.rprocOrder }');" class="inTab"><span>${data.comCodeNm }</span></a>
								</li>
							</c:otherwise>
						</c:choose>
					</c:forEach>
				</ul>
			</div>

			<%-- --------------------------------------------------서류전형 폼-------------------------------------------------- --%>
			<c:choose>
				<c:when test="${currProcedureInfo.rprocTypeno eq 'RE01' }">
					<div class="tab_part">
						<div class="box_lookup">
							<div class="box_right">
								<button type="button" class="btnSizeL colorWhtie"
									onclick="checkForm()">채점표 생성</button>
							</div>
						</div>

						<%-- 리스트 출력 영역 --%>
						<div id="list_position">
							<div class="area_list_top">
								<div class="box_center">
									<div class="search_right">
										<span class="inpSel"> <select name="stype"
											class="stype">
												<option value="">전체</option>
										</select>
										</span>
										<div class="searchTypoBox">
											<input type="text" name="company_nm" class="inpTypo sword">
											<button type="submit" class="btnSizeS colorBlue">검색</button>
										</div>
									</div>
								</div>
							</div>
							<div class="tblWrap resumeTbl">
								<div class="btnTxt resumeTxt">
									<button type="button" class="btnSizeM colorBlue">미확인</button>
<%-- 											pass/fail/unconfirmed --%>
									<button type="button" class="btnSizeM colorBlack">합격</button>
									<button type="button" class="btnSizeM colorBlack">불합격</button>
								</div>
								<table class="sms-breakdown">

									<thead>
										<tr>
											<th scope="col">이름</th>
											<th scope="col">생년월일</th>
											<th scope="col">성별</th>
											<th scope="col">이력서제목</th>
											<th scope="col">제출일</th>
											<th scope="col">점수</th>
											<th scope="col"><select name="">
													<option value="">점수순</option>
											</select></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td colspan="7" style="padding: 20">검색 결과가 없습니다.<br>

											</td>
										</tr>
									</tbody>
								</table>
								<div class="tblBtn">
									<button type="button" class="btnSizeM colorGreen">확정</button>
									<button type="button" class="btnSizeM colorBlue">저장</button>

								</div>
							</div>
							<%-- 페이징 시작 --%>

							<%-- 페이징 끝 --%>

						</div>
						<div class="resumeBtn">
							<button type="button" class="btnSizeM colorWhite">
								<i class="fa-regular fa-bell"></i> 알림전송
							</button>
							<button type="button" class="btnSizeM colorGray">
								<i class="fa-regular fa-floppy-disk"></i> 지원자 목록 다운로드
							</button>
						</div>

						<button type="button" class="btnSizeM colorGray rightBtn">
							<i class="fa-regular fa-floppy-disk"></i> 전체 지원자 목록 다운로드
						</button>
					</div>
				</c:when>




				<%-- --------------------------------------------------적성검사전형 폼-------------------------------------------------- --%>
				<c:when test="${currProcedureInfo.rprocTypeno eq 'RE02' }">
					<div class="tab_part">
						<div class="box_lookup"></div>

						<%-- 리스트 출력 영역 --%>
						<div id="list_position">
							<div class="area_list_top">
								<div class="box_center">
									<div class="search_right">
										<span class="inpSel"> <select name="stype"
											class="stype">
												<option value="">전체</option>
										</select>
										</span>
										<div class="searchTypoBox">
											<input type="text" name="company_nm" class="inpTypo sword">
											<button type="submit" class="btnSizeS colorBlue">검색</button>
										</div>
									</div>
								</div>
							</div>
							<div class="tblWrap resumeTbl">
								<div class="btnTxt resumeTxt">
									<button type="button" class="btnSizeM colorBlue">미확인</button>
									<button type="button" class="btnSizeM colorBlack">합격</button>
									<button type="button" class="btnSizeM colorBlack">불합격</button>
								</div>
								<table class="sms-breakdown">

									<thead>
										<tr>
											<th scope="col">이름</th>
											<th scope="col">생년월일</th>
											<th scope="col">성별</th>
											<th scope="col">검사결과지</th>
											<th scope="col">제출일</th>
											<th scope="col">점수</th>
											<th scope="col"><select name="">
													<option value="">점수순</option>
											</select></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td colspan="7" style="padding: 20">검색 결과가 없습니다.<br>

											</td>
										</tr>
									</tbody>
								</table>
								<div class="tblBtn">
									<button type="button" class="btnSizeM colorGreen">확정</button>
									<button type="button" class="btnSizeM colorBlue">저장</button>

								</div>
							</div>
							<%-- 페이징 시작 --%>

							<%-- 페이징 끝 --%>

						</div>
						<div class="resumeBtn">
							<button type="button" class="btnSizeM colorWhite">
								<i class="fa-regular fa-bell"></i> 알림전송
							</button>
							<button type="button" class="btnSizeM colorGray">
								<i class="fa-regular fa-floppy-disk"></i> 지원자 목록 다운로드
							</button>
						</div>

						<button type="button" class="btnSizeM colorGray rightBtn">
							<i class="fa-regular fa-floppy-disk"></i> 전체 지원자 목록 다운로드
						</button>
					</div>

				</c:when>



				<%-- --------------------------------------------------기술시험전형 폼-------------------------------------------------- --%>
				<c:when test="${currProcedureInfo.rprocTypeno eq 'RE03' }">
					<div class="tab_part">
						<div class="box_lookup"></div>

						<%-- 리스트 출력 영역 --%>
						<div id="list_position">
							<div class="area_list_top">
								<div class="box_center">
									<div class="search_right">
										<span class="inpSel"> <select name="stype"
											class="stype">
												<option value="">전체</option>
										</select>
										</span>
										<div class="searchTypoBox">
											<input type="text" name="company_nm" class="inpTypo sword">
											<button type="submit" class="btnSizeS colorBlue">검색</button>
										</div>
									</div>
								</div>
							</div>
							<div class="tblWrap resumeTbl">
								<div class="btnTxt resumeTxt">
									<button type="button" class="btnSizeM colorBlue">미확인</button>
									<button type="button" class="btnSizeM colorBlack">합격</button>
									<button type="button" class="btnSizeM colorBlack">불합격</button>
								</div>
								<table class="sms-breakdown">

									<thead>
										<tr>
											<th scope="col">이름</th>
											<th scope="col">생년월일</th>
											<th scope="col">성별</th>
											<th scope="col">검사결과지</th>
											<th scope="col">제출일</th>
											<th scope="col">점수</th>
											<th scope="col"><select name="">
													<option value="">점수순</option>
											</select></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td colspan="7" style="padding: 20">검색 결과가 없습니다.<br>

											</td>
										</tr>
									</tbody>
								</table>
								<div class="tblBtn">
									<button type="button" class="btnSizeM colorGreen">확정</button>
									<button type="button" class="btnSizeM colorBlue">저장</button>

								</div>
							</div>
							<%-- 페이징 시작 --%>

							<%-- 페이징 끝 --%>

						</div>
						<div class="resumeBtn">
							<button type="button" class="btnSizeM colorWhite">
								<i class="fa-regular fa-bell"></i> 알림전송
							</button>
							<button type="button" class="btnSizeM colorGray">
								<i class="fa-regular fa-floppy-disk"></i> 지원자 목록 다운로드
							</button>
						</div>

						<button type="button" class="btnSizeM colorGray rightBtn">
							<i class="fa-regular fa-floppy-disk"></i> 전체 지원자 목록 다운로드
						</button>
					</div>
				</c:when>



				<%-- --------------------------------------------------면접전형 폼-------------------------------------------------- --%>
				<c:when test="${currProcedureInfo.rprocTypeno eq 'RE04' }">
					<div class="tab_part">
						<div class="box_lookup"></div>

						<%-- 리스트 출력 영역 --%>
						<div id="list_position">
							<div class="area_list_top">
								<div class="box_center">
									<div class="search_right">
										<span class="inpSel"> <select name="stype"
											class="stype">
												<option value="">전체</option>
										</select>
										</span>
										<div class="searchTypoBox">
											<input type="text" name="company_nm" class="inpTypo sword">
											<button type="submit" class="btnSizeS colorBlue">검색</button>
										</div>
									</div>
								</div>
							</div>
							<div class="tblWrap resumeTbl">
								<div class="btnTxt resumeTxt">
									<button type="button" class="btnSizeM colorBlue">미확인</button>
									<button type="button" class="btnSizeM colorBlack">합격</button>
									<button type="button" class="btnSizeM colorBlack">불합격</button>
								</div>
								<table class="sms-breakdown">

									<thead>
										<tr>
											<th scope="col">이름</th>
											<th scope="col">생년월일</th>
											<th scope="col">성별</th>
											<th scope="col">이력서제목</th>
											<th scope="col">제출일</th>
											<th scope="col">점수</th>
											<th scope="col"><select name="">
													<option value="">점수순</option>
											</select></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td colspan="7" style="padding: 20">검색 결과가 없습니다.<br>

											</td>
										</tr>
									</tbody>
								</table>
								<div class="tblBtn">
									<button type="button" class="btnSizeM colorGreen">확정</button>
									<button type="button" class="btnSizeM colorBlue">저장</button>

								</div>
							</div>
							<%-- 페이징 시작 --%>

							<%-- 페이징 끝 --%>

						</div>
						<div class="resumeBtn">
							<button type="button" class="btnSizeM colorWhite">
								<i class="fa-regular fa-bell"></i> 알림전송
							</button>
							<button type="button" class="btnSizeM colorGray">
								<i class="fa-regular fa-floppy-disk"></i> 지원자 목록 다운로드
							</button>
						</div>

						<button type="button" class="btnSizeM colorGray rightBtn">
							<i class="fa-regular fa-floppy-disk"></i> 전체 지원자 목록 다운로드
						</button>
					</div>
				</c:when>
			</c:choose>
		</div>
	</div>
</div>


