###### [Session B] ‣ WAI-ARIA를 반영하여 접근성을 향상시킨 UI 컴포넌트 제작

# 진행 목차

1. [아코디언 컴포넌트 구성](../STEP-1__basic/)
1. [중첩된 아코디언 컴포넌트](../STEP-2__nested/)
1. [아코디언 컴포넌트에 WAI-ARIA 적용](../STEP-3__wai-aria/)
1. 아코디언 컴포넌트에 키보드 인터랙션 적용
1. [아코디언 컴포넌트 jQuery 플러그인화](../STEP-5__jquery-plugin/)

## **아코디언(Accordion) 컴포넌트** 제작 편 **STEP-04**

아코디언 컴포넌트에 다음과 같은 기능을 추가한다.

- WAI-ARIA 키보드 인터랙션

### 아코디언 스크립팅

1. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-4__keyboard/component/y9.Accordion%400.0.4.js#L43-L44" target="_blank">키보드 사용 유무 설정을 추가한다.</a>

2. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-4__keyboard/component/y9.Accordion%400.0.4.js#L529-L532" target="_blank">컴포넌트 이벤트 바인딩 부분에 단축키 설정 유무에 따라 처리되는 이벤트 코드를 추가한다.</a>

3. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-4__keyboard/component/y9.Accordion%400.0.4.js#L551-L588" target="_blank">키보드 이벤트에 따라 호출되는 `_keyInteraction` 메서드 코드를 추가한다.</a>