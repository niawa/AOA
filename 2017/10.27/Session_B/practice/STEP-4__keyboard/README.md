###### [Session B] ‣ WAI-ARIA를 반영하여 접근성을 향상시킨 UI 컴포넌트 제작

# 진행 목차

1. [아코디언 컴포넌트 구성](../STEP-1__basic/README.md)
1. [중첩된 아코디언 컴포넌트](../STEP-2__nested/README.md)
1. [아코디언 컴포넌트에 WAI-ARIA 적용](../STEP-3__wai-aria/README.md)
1. 아코디언 컴포넌트에 키보드 인터랙션 적용
1. [아코디언 컴포넌트 jQuery 플러그인화](../STEP-5__jquery-plugin/README.md)

## **아코디언(Accordion) 컴포넌트** 제작 편 **STEP-04**

아코디언 컴포넌트에 다음과 같은 기능을 추가한다.

- WAI-ARIA 키보드 인터랙션

### 아코디언 스크립팅

1. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-4__keyboard/component/y9.Accordion%400.0.4.js#L42" target="_blank">키보드 사용 유무 설정을 추가한다.</a>

2. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-4__keyboard/component/y9.Accordion%400.0.4.js#L528-L530" target="_blank">컴포넌트 이벤트 바인딩 부분에 단축키 설정 유무에 따라 처리되는 이벤트 코드를 추가한다.</a>

3. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-4__keyboard/component/y9.Accordion%400.0.4.js#L549-L586" target="_blank">키보드 이벤트에 따라 호출되는 `_keyInteraction` 메서드 코드를 추가한다.</a>

---

### 컴포넌트 정리

```sh
y9 # {}
│
├── Accordion # f
│     # private
│     ├── _current
│     ├── _pre
│     ├── _item
│     # public
│     ├── defaults
│     ├── level
│     ├── g_id
│     ├── options
│     └── $el
│
├── AccordionItem # f
│     # private
│     ├── _index
│     ├── _parent
│     ├── _item
│     # public
│     ├── options
│     ├── $item
│     ├── $heading
│     └── $panel
│
├── Accordion.prototype # {}
│     # private
│     ├── _init()
│     ├── _setup()
│     ├── _bind()
│     ├── _updatePreCurrent()
│     # public
│     ├── items()
│     ├── nestedItems()
│     ├── active()
│     ├── deactive()
│     ├── isPanelOnlyOneOpened()
│     ├── openedItemsCount()
│     ├── prev()
│     ├── next()
│     ├── first()
│     └── last()
│
└── AccordionItem.prototype # {}
      # private
      ├── _init()
      ├── _setup()
      ├── _bind()
      ├── _nested()
      ├── _keyInteraction()
      # public
      ├── expand()
      ├── collapse()
      ├── toggle()
      ├── isExpanded()
      ├── rootPrev()
      └── rootNext()
```

### 컴포넌트 옵션 정리

대분류 | 소분류 | 속성 | 기본 값 | 설명
----- | ---- | ---- | --- | ---
활성화 인덱스 | 인덱스(Index) | active_index | null \| 0 | 컴포넌트 로딩시, 펼쳐질 패널 인덱스 속성
기능 | 모든 헤더 닫기 | close_all | true | 컴포넌트 패널을 모두 닫게 설정
| | 라디오 | radio | false | 라디오 버튼처럼 동작하게 설정
| | 애니메이션 | animate | false | 애니메이션 작동하도록 설정
| | 지속시간 | duration | 300 | 애니메이션 시간(밀리초) 설정
| | 이징 | easing | swing | 애니메이션 이징 설정 ([참고](http://easings.net/ko))
| | WAI-ARIA | aria | true | WAI-ARIA 활성화 설정
| | 키보드 인터랙션 | shortkut_key | true | 키보드 인터랙션 활성화
구조 클래스 | 아코디언 | structure.accordion | y9-accordion | 아코디언 컨테이너 클래스 속성
| | 아이템 | structure.item | item | 아코디언 아이템 클래스 속성
| | 헤더 | structure.header | heading | 아코디언 헤더 클래스 속성
| | 헤더 버튼 | structure.button | button | 아코디언 헤더 버튼 클래스 속성
| | 패널 | structure.panel | panel | 아코디언 패널 클래스 속성
| | 구분자 | structure.divider | __ | 아코디언 구분자
상태 클래스 | 활성화 | active_class | is-active | 패널이 활성화된 상태 클래스 속성
| | 중첩 | nested_class | is-nested | 중첩 아코디언을 사용할 때 식별하는 클래스 속성
| | 애니메이션 | animate_class | is-animate | 애니메이션을 사용할 때 식별하는 클래스 속성
| | 레벨 | level_class | lv- | 애니메이션을 사용할 때 식별하는 클래스 속성