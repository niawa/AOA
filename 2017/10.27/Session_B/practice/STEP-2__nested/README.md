###### [Session B] ‣ WAI-ARIA를 반영하여 접근성을 향상시킨 UI 컴포넌트 제작

# 진행 목차

1. [아코디언 컴포넌트 구성](../STEP-1__basic/README.md)
1. 중첩된 아코디언 컴포넌트
1. [아코디언 컴포넌트에 WAI-ARIA 적용](../STEP-3__wai-aria/README.md)
1. [아코디언 컴포넌트에 키보드 인터랙션 적용](../STEP-4__keyboard/README.md)
1. [아코디언 컴포넌트 jQuery 플러그인화](../STEP-5__jquery-plugin/README.md)

## **아코디언(Accordion) 컴포넌트** 제작 편 **STEP-02**

아코디언 컴포넌트에 다음과 같은 기능을 추가한다.
- 중첩(Nested) 아코디언
- 중첩된 아코디언을 식별하기 위한 레벨(Level) 클래스 자동 설정
- 아코디언 클래스 자동 설정

### 1. 아코디언 HTML 마크업

아코디언 클래스를 자동 설정하게 만들어 마크업 구조를 간결하게 변경할 수 있다.

#### 구현

`div`를 남용하지 않고, 목록을 사용하여 구조화한다면 아래와 같이 간단하고 직관적인 마크업을 사용할 수 있다. (`div`, `ul`, `ol` 모두 사용 가능)

```html
<ul>
  <li>
    <h3>
      <button type="button"></button>
    </h3>
    <div>

    </div>
  </li>
</ul>
```

중첩된 아코디언을 구현하려면 아래 마크업과 같이 구성한다. 사용방법은 Level 1 패널(`ul` 변경 사용가능)에 `is-nested` 클래스 속성을 추가한 후, 내부에 아코디언 마크업을 추가하면 Level 2 아코디언이 구성된다.

```html
<ul>
  <li>
    <h3>
      <button type="button"></button>
    </h3>
    <!-- 중첩된 아코디언 사용을 위해 필요한 클래스 속성 추가 -->
    <ul class="is-nested">
      <!-- 중첩된 아코디언 -->
      <li>
        <h3>
          <button type="button"></button>
        </h3>
        <div>

        </div>
      </li>
    </ul>
    <!--// 중첩된 아코디언 -->
  </li>
</ul>
```

아코디언 HTML 마크업 전체 코드 확인은 아래 `▶︎` 영역을 눌러 확장

<details>
  <summary>아코디언 HTML 마크업</summary>

  ```html
  <ul class="demo-component">
    <li>
      <h3>
        <button type="button">
          <span class="y9-icon__news"></span> 뉴스 <span class="y9-icon__arrow is-right"></span>
        </button>
      </h3>
      <div>
        <ul class="list contents">
          <li><a href="">부채대책 엇갈린 평가…'갭투자는 불가' VS '강남불패 고착화'</a></li>
          <li><a href="">'靑문건 유출' 정호성 징역 2년6개월 구형…내달 15일 선고</a></li>
          <li><a href="">6·19대책+8·2대책+신DTI 누적효과는…주택대출액 32.4%↓</a></li>
          <li><a href="">'금감원 인사청탁 의혹' 농협금융회장 자택 등 압수수색</a></li>
        </ul>
      </div>
    </li>
    <li>
      <h3>
        <button type="button">
          <span class="y9-icon__sports"></span> 스포츠 <span class="y9-icon__arrow is-right"></span>
        </button>
      </h3>

      <ul class="is-nested">
        <li>
          <h4>
            <button type="button">
              <span class="y9-icon__soccer"></span> 축구 <span class="y9-icon__arrow is-right"></span>
            </button>
          </h4>
          <div>
            <ul class="list contents">
              <li><a href="">3293억 원?… ‘설’에 불과하지만 놀라운 케인의 가격표</a></li>
              <li><a href="">[아스널-노리치] 모두가 놀란 18세 은케티아의 충격적인 등장</a></li>
              <li><a href="">'거미손' 부폰, "올 시즌 후 은퇴하겠다"</a></li>
            </ul>
          </div>
        </li>
        <li>
          <h4>
            <button type="button">
              <span class="y9-icon__basketball"></span> 농구 <span class="y9-icon__arrow is-right"></span>
            </button>
          </h4>
          <div>
            <ul class="list contents">
              <li><a href="">[댓글이벤트] KBL 역대 드래프트 순위별 최고의 선수</a></li>
              <li><a href="">'3점슛 8방' 정호상, 고려대를 무너뜨리다</a></li>
            </ul>
          </div>
        </li>
      </ul>

    </li>

    <li>
      <h3>
        <button type="button">
          <span class="y9-icon__webtoon"></span> 웹툰<span class="y9-icon__arrow is-right"></span>
        </button>
      </h3>
      <div>
        <ul class="list contents">
          <li><a href="">복학왕, 기안84</a></li>
          <li><a href="">고수, 류기운/문정후</a></li>
          <li><a href="">연놈, 상하</a></li>
          <li><a href="">격기 3반, 이학</a></li>
          <li><a href="">목욕의 신(재), 하일권</a></li>
        </ul>
      </div>
    </li>
  </ul>
  ```
</details>


### 2. 아코디언 스크립팅

2-1. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-2__nested/component/y9.Accordion%400.0.2.js#L17-L51" target="_blank">컴포넌트 기본 옵션에 `nested_class`, `level_class`, `structure` 설정을 추가한다.</a>

2-2. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-2__nested/component/y9.Accordion@0.0.2.js#L60-L89" target="_blank">Accordion 생성자 함수에 레벨 속성 및 매개변수 설정, 이전/현재 인덱스 속성을 추가한다.</a>

2-3. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-2__nested/component/y9.Accordion@0.0.2.js#L131-L137" target="_blank">중첩된 아코디언은 제외되도록 설정하고, `index` 설정 유무에 따라 `.active()` 메서드를 실행하도록 코드를 수정한다.</a>

2-4. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-2__nested/component/y9.Accordion@0.0.2.js#L150-L166" target="_blank">레벨 및 구조 클래스 속성을 자동으로 처리하는 코드를 추가한다.</a>

2-5. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-2__nested/component/y9.Accordion@0.0.2.js#L331-L336" target="_blank">AccordionItem 구조 클래스 속성을 자동으로 처리하는 코드를 추가한다.</a>

2-6. <a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-2__nested/component/y9.Accordion@0.0.2.js#L352-L361" target="_blank">중첩된 아코디언 컴포넌트를 처리하는 `__nested()` 코드를 추가한다.</a>