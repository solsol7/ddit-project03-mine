package kr.or.ddit.company.vo;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import kr.or.ddit.validate.grouphint.UpdateGroup;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(of = "itemNo")
@ToString
public class TestItemVO implements Serializable{
	@NotBlank(groups = UpdateGroup.class)
	private String testNo;
	@NotBlank
	private Integer qstnNo;
	@NotBlank
	private Integer itemNo;
	private String itemCont;
}
