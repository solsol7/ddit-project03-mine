package kr.or.ddit.company.vo;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(of = "qstnNo")
@ToString
public class TestQstnVO implements Serializable{
	private String testNo;
	private String qstnNo;
	private String qstnCont;
	private String qstnAnswer;
}
