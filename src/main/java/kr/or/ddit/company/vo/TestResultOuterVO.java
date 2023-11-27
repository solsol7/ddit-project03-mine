package kr.or.ddit.company.vo;

import java.io.Serializable;
import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class TestResultOuterVO implements Serializable {
	private List<TestResultVO> testResultVO;
}