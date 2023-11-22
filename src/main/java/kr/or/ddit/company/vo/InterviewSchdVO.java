package kr.or.ddit.company.vo;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode(of = "intrNo")
public class InterviewSchdVO implements Serializable {
	private int rnum;
	
	private String intrNo;
	private String aplNo;
	private Integer rprocOrder;
	private String rcrtNo;
	private String intrIntdate;
	private String intrPlace;
	private String intrDate;
	
	private String intrTypeNm;

	private RecruitVO recruit;
	private ApplyVO apply;
}
