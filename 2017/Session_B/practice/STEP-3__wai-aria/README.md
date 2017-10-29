###### [Session B] ‣ WAI-ARIA를 반영하여 접근성을 향상시킨 UI 컴포넌트 제작

# 진행 목차

1. [아코디언 컴포넌트 구성](../STEP-1__basic/README.md)
1. [중첩된 아코디언 컴포넌트](../STEP-2__nested/README.md)
1. 아코디언 컴포넌트에 WAI-ARIA 적용
1. [아코디언 컴포넌트에 키보드 인터랙션 적용](../STEP-4__keyboard/README.md)
1. [아코디언 컴포넌트 jQuery 플러그인화](../STEP-5__jquery-plugin/README.md)

## **아코디언(Accordion) 컴포넌트** 제작 편 **STEP-03**

아코디언 컴포넌트에 다음과 같은 기능을 추가한다.

- 아코디언 컴포넌트 생성 ID 추가
- WAI-ARIA 역할(role), 속성/상태(aria-*) 설정/업데이트

### 아코디언 스크립팅

1. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-3__wai-aria/component/y9.Accordion%400.0.3.js#L41" target="_blank">WAI-ARIA 사용 유무를 설정하는 속성을 추가한다.</a>

2. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-3__wai-aria/component/y9.Accordion%400.0.3.js#L182-L187" target="_blank">Accordion 컴포넌트 셋업 부분에 WAI-ARIA 설정 코드를 추가한다.</a>

3. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-3__wai-aria/component/y9.Accordion%400.0.3.js#L413-L462" target="_blank">AccordionItem 컴포넌트 셋업 부분에 WAI-ARIA 설정 코드를 추가한다.</a>

4. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-3__wai-aria/component/y9.Accordion%400.0.3.js#L516-L522" target="_blank">AccordionItem 컴포넌트의 `.extend()` 메서드에 WAI-ARIA 조건 처리 코드를 추가한다.</a>

5. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-3__wai-aria/component/y9.Accordion%400.0.3.js#L552-L557" target="_blank">AccordionItem 컴포넌트의 `.collapse()` 메서드에 WAI-ARIA 조건 처리 코드를 추가한다.</a>