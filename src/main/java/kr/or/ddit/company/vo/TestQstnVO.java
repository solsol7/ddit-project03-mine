package kr.or.ddit.company.vo;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotBlank;

import kr.or.ddit.validate.grouphint.UpdateGroup;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(of = "qstnNo")
@ToString
public class TestQstnVO implements Serializable{
	@NotBlank(groups = UpdateGroup.class)
	private String testNo;
	@NotBlank
	private Integer qstnNo;
	@NotBlank
	private String qstnCont;
	@NotBlank
	private String qstnAnswer;
	
	private List<TestItemVO> itemList;
}
