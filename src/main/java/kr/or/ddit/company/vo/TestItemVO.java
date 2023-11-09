package kr.or.ddit.company.vo;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(of = "itemNo")
@ToString
public class TestItemVO implements Serializable{
	private String testNo;
	private String qstnNo;
	private Integer itemNo;
	private String itemCont;
}
