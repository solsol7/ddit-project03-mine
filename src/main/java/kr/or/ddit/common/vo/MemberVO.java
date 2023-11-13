package kr.or.ddit.common.vo;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import kr.or.ddit.validate.grouphint.InsertGroup;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of = "memId")
public class MemberVO implements Serializable{
	
	@Pattern(regexp = "^[a-z0-9]{5,15}$")
	@Size(min = 5, max = 15)
	@NotBlank (groups = InsertGroup.class )
	private String memId;
	
	@Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d!@#$%^&*]{8,20}$")
	@Size(min = 8, max = 20)
	@NotBlank (groups = InsertGroup.class)
	private String memPass;
	
	@Pattern(regexp = "\\d{3}-\\d{3,4}-\\d{4}")
	@NotBlank (groups = InsertGroup.class)
	private String memTel;
	
	@NotBlank (groups = InsertGroup.class)
	private String memMail;
	
	@NotBlank (groups = InsertGroup.class)
	private int memZip;
	
	@NotBlank (groups = InsertGroup.class)
	private String memAddr1;
	
	@NotBlank (groups = InsertGroup.class)
	private String memAddr2;
	
	@NotBlank (groups = InsertGroup.class)
	private String memDivision;
	
	
	
	

}
