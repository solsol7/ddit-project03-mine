/**
 * 
 */




$(function(){

let cPath = this.body.dataset.contextPath;

/* 탭 클릭 시 호출되는 function */	
	selectTab = (rcrtNo,rprocOrder) => {
		location.href = `${cPath}/company/recruit/${rcrtNo}/${rprocOrder }`;
	}
})
