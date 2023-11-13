/**
 * 
 */
$(function(){
	
	const cPath = this.body.dataset.contextPath;
	
	$('#testListBtn').on("click",function(){
		location.href = `${cPath}/company/testListUI`;
	})
	
	$('#testModBtn').on("click",function(){
		
	})
	
	$('#testDelBtn').on("click",function(){
		let password = prompt("비밀번호 입력 : ");
		deleteForm.memPass.value = password;
		deleteForm.requestSubmit();
	})
})