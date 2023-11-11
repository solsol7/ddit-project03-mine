package kr.or.ddit.company.vo;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import kr.or.ddit.validate.grouphint.UpdateGroup;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(of = "testNo")
@ToString
public class TestVO implements Serializable{
	
	private String rnum;
	
	@NotBlank(groups = UpdateGroup.class)
	private String testNo;
	private String companyId;
	@NotBlank
	private String testTitle;
	@NotBlank
	private String testType;
	private String testDate;
	
	private List<TestQstnVO> qstnList;
	
}
