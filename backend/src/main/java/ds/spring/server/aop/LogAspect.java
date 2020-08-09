package ds.spring.server.aop;

import lombok.val;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


@Aspect
@Component
public class LogAspect {
    // Log Component: Logging 작업
    private Logger logger = LoggerFactory.getLogger(LogAspect.class);

    @Around("execution(* ds.spring.server.*.*(..))") // 로그 범위 설정: 현재 로그 범위는 패키지 전범위로 설정
    public Object logging(ProceedingJoinPoint pjp) throws Throwable{
        logger.info("Accessing in : " + pjp.getSignature().getDeclaringTypeName() + "->" + pjp.getSignature().getName());
        Object result = pjp.proceed(); // 함수 실행
        logger.info("Accessing out : " + pjp.getSignature().getDeclaringTypeName() + "->" + pjp.getSignature().getName());
        return result;
    }
}
