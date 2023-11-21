<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags"
	prefix="security"%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Admin Dashboard</title> 
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/resources/css/sb-admin-2.min.css" rel="stylesheet">
</head>

<body id="page-top">
    <div id="wrapper">
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
         
                <div class="container-fluid">
              
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                    </div>
            
                 
                    <div class="row">
                    	<!-- 차트js -->

<div style="width:1000px;">
  <canvas id="myChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  const ctx = document.getElementById('myChart');

  //chart.js가 잘 만들어진 이유, return값으로 제어가 직관적
  //line과 bar는 한 차트에서 같이 쓸 수 있다 (mixed 차트)
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
    	//값 표시 갯수는 라벨 수에 의존
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
   		{
   			type:"line",
	        label: '# 2022 year',
	        data: [12, 19, 3, 5, 2, 3],
	        borderWidth: 1,
	        backgroundColor: "pink"
      	}
   	  ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // 옵션 구조를 파악하는 순간 사용법의 대부분을 이해할 수 있음
//   console.log("라벨 : ", myChart.data.datasets[0].label);
//   console.log("데이터 : ", myChart.data.datasets[0].data); // 읽기 가능
//   myChart.data.datasets[0].data = [120, 190, 30, 50, 20, 30]; //쓰기
//   console.log("데이터2 : ", myChart.data.datasets[0].data); // 쓰기 확인
  
  // 7개의 랜덤 데이터를 가진 배열 리턴
  function fRanData(){
	  let data=[];
	  for(let i=0; i<=7; i++){
		  data.push( Math.round(Math.random()*50) + 50); // 50~100;
	  }
	  return data;
  }
  
  function fRender(){
	  let types = ["line", "bar"];
	  let colors = ["skyblue", "pink"];
	  for(let i=0; i<2; i++){
		  let ranData ={
	  		  type:types[i],
		      label: '202${i+2} year',
		      data: fRanData(),
		      borderWidth: 1
			};
		  myChart.data.datasets[i] = ranData;
	  }  
	// 제일 중요한 메소드 update
	  myChart.update(); // 다시 그려짐 rendering
	  
	  setTimeout(fRender,2500);
  }
  fRender();
  
 
  
</script>


 
                       
                    </div>
                    

                </div>
             
            </div>

        </div>
  
    </div>



    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>


    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>


    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <script src="<%=request.getContextPath()%>/resources/js/sb-admin-2.min.js"></script>

    <script src="vendor/chart.js/Chart.min.js"></script>

    <script src="js/demo/chart-area-demo.js"></script>
    <script src="js/demo/chart-pie-demo.js"></script>

</body>

</html>