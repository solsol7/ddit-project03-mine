package kr.or.ddit.company.vo;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode(of="aplNo")
public class ApplyVO implements Serializable{
	private String aplNo;
	private String resattNo;
	private String rcrtNo;
	private String usersId;
	private String aplCdate;
	private String aplCancel;
}
