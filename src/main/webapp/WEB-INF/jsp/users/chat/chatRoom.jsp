<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src="<%=request.getContextPath()%>/resources/js/app/users/chat/chat.js"></script>

<div class="chatRoom-content">
	<div class="menu-area">
		<button type="button" id="regionChoiceBtn" class="btnSizeXL">지역선택</button>
		<button type="button" id="chatOutBtn" class="btnSizeL colorRed disconnectionBtn">나가기</button>
	</div>
	<div class="chat-area" style="display:block;" data-tab-idx="1">
		<div class="chat-message">
		
		</div>
		<div class="myMessage">
			<input type="text" name="message" class="inpTypo" placeholder="내용을 입력해주세요."
				onkeydown="keydown();"/>
			<button class="btnSizeM colorBlue" id="sendMessage">보내기</button>
		</div>
	</div>
	
	<div class="chat-area" style="display:none;" data-tab-idx="2">
		<div class="regionDetail">
			<button type="button" class="btnSizeXL regionBtn">서울</button>
			<button type="button" class="btnSizeXL regionBtn">경기</button>
			<button type="button" class="btnSizeXL regionBtn">인천</button>
			<button type="button" class="btnSizeXL regionBtn">부산</button>
			<button type="button" class="btnSizeXL regionBtn">대구</button>
			<button type="button" class="btnSizeXL regionBtn">경주</button>
			<button type="button" class="btnSizeXL regionBtn">대전</button>
			<button type="button" class="btnSizeXL regionBtn">울산</button>
			<button type="button" class="btnSizeXL regionBtn">세종</button>
			<button type="button" class="btnSizeXL regionBtn">강원</button>
			<button type="button" class="btnSizeXL regionBtn">경남</button>
			<button type="button" class="btnSizeXL regionBtn">경북</button>
			<button type="button" class="btnSizeXL regionBtn">전남</button>
			<button type="button" class="btnSizeXL regionBtn">전북</button>
			<button type="button" class="btnSizeXL regionBtn">충남</button>
			<button type="button" class="btnSizeXL regionBtn">충북</button>
			<button type="button" class="btnSizeXL regionBtn">제주</button>
		</div>
		<div>
			<button type="button" id="chatReturnBtn" class="btnSizeL chatReturnBtn">돌아가기</button>
		</div>
	</div>
</div>

