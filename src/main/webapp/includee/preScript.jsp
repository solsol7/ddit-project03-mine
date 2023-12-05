<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/js/bootstrap-5.3.2-dist/css/bootstrap.min.css">

<!-- Custom fonts for this template-->
<link href="${pageContext.request.contextPath }/resources/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
<link
	href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
	rel="stylesheet">

<!-- Custom styles for this template-->
<link href="${pageContext.request.contextPath }/resources/css/sb-admin-2.min.css" rel="stylesheet">
<link href="${pageContext.request.contextPath }/resources/css/layout.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/resources/css/custom/ssy.css" rel="stylesheet">  



<!--룰렛-->
<link rel="stylesheet" type="text/css" href="https://www.jestina.co.kr/content/css/reset2.css">
<link rel="stylesheet" type="text/css" href="https://www.jestina.co.kr/content/ux/content/css/common.css">
<link rel="stylesheet" type="text/css" href="https://www.jestina.co.kr/content/css/swiper.min.css">
<!--이벤트/기획 공통-->





<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery-3.7.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/jquery.serializejson.js"></script>

<c:if test="${not empty message }">
	<script>
		alert("${message}");
	</script>
</c:if>