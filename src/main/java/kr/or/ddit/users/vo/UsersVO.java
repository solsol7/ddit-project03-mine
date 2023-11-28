package kr.or.ddit.users.vo;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import kr.or.ddit.validate.grouphint.InsertGroup;
import lombok.Data;

@Data
public class UsersVO implements Serializable {

	@Pattern(regexp = "^[a-z0-9]{5,15}$")
	@Size(min = 5, max = 15)
	@NotBlank (groups = InsertGroup.class )
	private String usersId;
	
	@Size(min = 2)
	@NotBlank (groups = InsertGroup.class )
	private String usersNm;
	
	@NotBlank (groups = InsertGroup.class )
	private String usersBir;
	
	@NotBlank (groups = InsertGroup.class )
	private String usersGen;
	
	private String usersImg;
	
	@NotBlank (groups = InsertGroup.class )
	private String usersDelete;
	
	private int usersVticket;
	
	private int usersVpoint;
	
	
}
