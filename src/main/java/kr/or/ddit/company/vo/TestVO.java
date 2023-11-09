package kr.or.ddit.company.vo;

import java.io.Serializable;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(of = "testNo")
@ToString
public class TestVO implements Serializable{
	
	private String rnum;
	
	private String testNo;
	private String companyId;
	private String testTitle;
	private String testType;
	private String testDate;
	
	private List<TestQstnVO> qstnList;
	private List<TestItemVO> itemList;
}
