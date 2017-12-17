###### [Session B] ‣ WAI-ARIA를 반영하여 접근성을 향상시킨 UI 컴포넌트 제작

# 진행 목차

1. 아코디언 컴포넌트 구성
1. [중첩된 아코디언 컴포넌트](../STEP-2__nested/README.md)
1. [아코디언 컴포넌트에 WAI-ARIA 적용](../STEP-3__wai-aria/README.md)
1. [아코디언 컴포넌트에 키보드 인터랙션 적용](../STEP-4__keyboard/README.md)
1. [아코디언 컴포넌트 jQuery 플러그인화](../STEP-5__jquery-plugin/README.md)

## **아코디언(Accordion) 컴포넌트** 제작 편 **STEP-01**

아코디언 컴포넌트 제작에 필요한 HTML/CSS/JavaScript 패턴을 살펴보고, 구현 과정을 실습한다.

### 1. 아코디언 HTML 마크업

#### 패턴

아코디언(**accordion**) 컴포넌트를 구성하는 골격은 아이템(**item**), 헤더(**header**), 패널(**panel**)이며, 헤더는 하나의 버튼(**button**)을 가져야 한다.

```sh
accordion
└── item
    ├── header
    │   └── button
    └── panel
```

#### 구현

CSS 클래스(**class**) 이름 충돌 예방을 위한 접두사(**prefix**)를 사용하여 아코디언 CSS 클래스이름을 설정한다.

```html
<!-- 아코디언 컴포넌트 -->
<div class="y9-accordion">
  <!-- 아코디언 아이템 -->
  <div class="y9-accordion__item">
    <!-- 아코디언 헤더 -->
    <div class="y9-accordion__heading">
      <!-- 아코디언 헤더 버튼 -->
      <a href class="y9-accordion__button">
    </div>
    <!-- 아코디언 패널 -->
    <div class="y9-accordion__panel"></div>
  </div>
</div>
```

아코디언 HTML 마크업 전체 코드 확인은 아래 `▶︎` 영역을 눌러 확장

<details>
  <summary>아코디언 HTML 마크업</summary>

  ```html
  <!-- 아코디언 컴포넌트 -->
  <div class="y9-accordion">

    <!-- 아코디언 아이템 -->
    <div class="y9-accordion__item">
      <!-- 아코디언 헤더 -->
      <div class="y9-accordion__heading">
        <!-- 아코디언 헤더 버튼 -->
        <a href class="y9-accordion__button">
          <span class="y9-icon__news"></span> 뉴스 <span class="y9-icon__arrow is-right"></span>
        </a>
      </div>
      <!-- 아코디언 패널 -->
      <div class="y9-accordion__panel">
        <ul class="list contents">
          <li><a href="">부채대책 엇갈린 평가…'갭투자는 불가' VS '강남불패 고착화'</a></li>
          <li><a href="">'靑문건 유출' 정호성 징역 2년6개월 구형…내달 15일 선고</a></li>
          <li><a href="">6·19대책+8·2대책+신DTI 누적효과는…주택대출액 32.4%↓</a></li>
          <li><a href="">'금감원 인사청탁 의혹' 농협금융회장 자택 등 압수수색</a></li>
        </ul>
      </div>
    </div>

    <div class="y9-accordion__item">
      <div class="y9-accordion__heading">
        <a href class="y9-accordion__button">
          <span class="y9-icon__sports"></span> 스포츠 <span class="y9-icon__arrow is-right"></span>
        </a>
      </div>
      <div class="y9-accordion__panel">
        <ul class="list contents">
          <li><a href="">[SPO 인포] ‘폭풍’ 케인+'우사인' SON…기록으로 본 토트넘 ‘투톱’</a></li>
          <li><a href="">[더 타임즈] 에버튼 언스워스 “시간을 달라”</a></li>
          <li><a href="">5파운드 지폐 주운 어린 허더즈필드 팬의 훈훈한 편지 화제</a></li>
        </ul>
      </div>
    </div>

    <div class="y9-accordion__item">
      <div class="y9-accordion__heading">
        <a href class="y9-accordion__button">
          <span class="y9-icon__webtoon"></span> 웹툰<span class="y9-icon__arrow is-right"></span>
        </a>
      </div>
      <div class="y9-accordion__panel">
        <ul class="list contents">
          <li><a href="">복학왕, 기안84</a></li>
          <li><a href="">고수, 류기운/문정후</a></li>
          <li><a href="">연놈, 상하</a></li>
          <li><a href="">격기 3반, 이학</a></li>
          <li><a href="">목욕의 신(재), 하일권</a></li>
        </ul>
      </div>
    </div>

  </div> <!--/ .y9-accordion -->
  ```
</details>

### 2. 아코디언 CSS 스타일링

#### 패턴

아코디언 컴포넌트 스타일은 **기본** 스타일과 **테마** 스타일로 구분하여 작성한다.
다른 테마 제작자가 아코디언 스타일을 쉽게 수정 가능하도록 하기 위함이다.

```html
<!-- 아코디언 CSS 스타일 (필수) -->
<link rel="stylesheet" href="./component/y9.Accordion.css">
<!-- 아코디언 테마 CSS 스타일 (옵션) -->
<link rel="stylesheet" href="./component/theme/y9.Accordion-theme.css">
```

#### 구현

기본 스타일은 아코디언 동작에 필요한 최소한의 것을 작성한다. 상대적으로 테마의 자유도를 높인다. (각 스타일 코드 확인은 `▶︎` 영역을 눌러 확장)

<details>
<summary>2-1. 기본 스타일</summary>

```css
/* 아코디언 */
ul.y9-accordion,
ol.y9-accordion,
ul.is-nested,
ol.is-nested {
  list-style-type: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
}

/* 아코디언 헤더 */
.y9-accordion__heading {
  margin-top: 0;
  margin-bottom: 0;
}

/* 아코디언 해더 버튼 */
.y9-accordion__button {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  text-align: left;
}
a.y9-accordion__button {
  text-decoration: none;
}
button.y9-accordion__button {
  cursor: pointer;
  width: 100%;
  border: 0;
}

/* 아코디언 패널 */
.y9-accordion__panel {
  display: none;
}

/* 비활성화 상태 */
.y9-accordion__item .y9-accordion__button[aria-disabled="true"] {
  cursor: not-allowed;
  color: #999;
}
.y9-accordion__item .y9-accordion__button[aria-disabled="true"] > [class*="y9-icon__"] {
  -webkit-filter: grayscale(0.9);
  -ms-filter: grayscale(0.9);
  filter: grayscale(0.9);
}
```
</details>

<details>
<summary>2-2. 테마 스타일</summary>

```css
/* 아코디언 */
.y9-accordion {
  width: 100%;
  background: #ffffff;
}

/* 아코디언 아이템 */
.y9-accordion__item {}

/* 아코디언 헤더 */
.y9-accordion__heading {}

/* 아코디언 해더 버튼 */
.y9-accordion__item .y9-accordion__button {
  display: block;
  border-bottom: 1px solid #fff;
  padding: 1.4em 1.2em;
  background: #f6f6f6;
  color: #574bff;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
}
.y9-accordion > .y9-accordion__item:last-child .y9-accordion__button {
  border-bottom: none;
}

/* 아코디언 패널 */
.y9-accordion__panel {
  border-bottom: 1px solid #f6f6f6;
}

/* 호버 상태 */
.y9-accordion__button:hover {
  background: #cfd2e4;
}

/* 활성화 상태 */
.is-active .y9-accordion__button {
  background: #ececec;
}

.y9-accordion__heading.is-active .y9-icon__arrow {
  transform: rotate(180deg);
}

/* 포커스 상태 */
.is-active .y9-accordion__button:focus,
.y9-accordion__button:focus {
  outline: 1px solid #574bff;
  border-left: 10px solid #574bff;
}

/* 중첩 상태 */
.is-nested .y9-accordion__button::before {
  padding-left: 0.3em;
  content: '∟';
}


/* 아이콘 디자인
 * -------------------------------------------------------------------- */

/* 확장 아이콘 */
[class*="y9-icon__"] {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: -5px;
}

.y9-icon__arrow {
  width: 16px;
  height: 16px;
  margin-top: 4px;
  background: url("./icons/expand-arrow.svg") no-repeat left top;
}

.y9-icon__news {
  background: url("./icons/news.svg") no-repeat left top;
}
.y9-icon__sports {
  background: url("./icons/running.svg") no-repeat left top;
}
.y9-icon__soccer {
  background: url("./icons/soccer.svg") no-repeat left top;
}
.y9-icon__basketball {
  background: url("./icons/basketball.svg") no-repeat left top;
}
.y9-icon__webtoon {
  background: url("./icons/speech-bubble.svg") no-repeat left top;
}

/* 아이콘 레이아웃 */
.is-right {
  float: right;
}

.is-nested [class*="y9-icon__"]:not(.y9-icon__arrow) {
  margin-left: 0.3em;
}

/* 애니메이션
 * -------------------------------------------------------------------- */

.is-animate .y9-accordion__button {
  transition: all 0.2s ease;
}

.is-animate .y9-icon__arrow {
  transition: transform 0.2s ease-in-out;
}
```
</details>

### 3. 아코디언 스크립팅 with [jQuery](https://jquery.com)

#### 패턴

객체 지향 JavaScript 방식을 사용하여 아코디언 컴포넌트 객체를 생성한다.<br>
✪︎ [JavaScript 디자인패턴](https://addyosmani.com/resources/essentialjsdesignpatterns/book/) 참고.

DOM 스크립트 제어는 jQuery 라이브러리를 활용한다.

##### 생성자(Constructor)

전역(global scope) 오염을 최소화하기 위해 네임스페이스(namespace) 객체에 종속된 생성자(constructor) 함수를 정의한다. 아코디언 컴포넌트에 사용될 생성자는 다음과 같다.

- 아코디언 아이템을 생성하는 `AccordionItem`
- 아코디언 아이템을 통합 관리하는 `Accordion`

```sh
Namepace # {}
├── Accordion # f
└── AccordionItem # f
```

##### 프로토타입(Prototype)

각 생성자에 암시적으로 연결된 프로토타입 객체에, 아코디언 컴포넌트 객체가 사용할 공통 능력을 공개(public)/비공개(private)로 구분하여 설정한다.

```sh
Accordion.prototype
  # private
  ├── _init()
  ├── _setup()
  ├── _bind()
  ├── _updatePreCurrent()
  # public
  ├── items()
  ├── active()
  ├── deactive()
  └── isPanelOnlyOneOpened()


AccordionItem.prototype
  # private
  ├── _init()
  ├── _bind()
  # public
  ├── expand()
  ├── collapse()
  ├── toggle()
  └── isExpanded()
```

#### 구현

`jquery.min.js` 파일을 먼저 로드한 후, `y9.Accordion.js` 파일을 로드해야 한다.

```html
<script src="../assets/jquery.min.js"></script>
<script src="./component/y9.Accordion.js"></script>
```

사용자는 아코디언 컴포넌트 생성하는 구문을 다음과 같이 사용한다.

```html
<script>
  // 첫번째 인자는 컴포넌트화 하고자 하는 DOM 요소의 선택자를 문자열로 설정한다.
  new y9.Accordion('.y9-accordion');
</script>
```

컴포넌트 옵션을 추가할 경우는 아래와 같이 사용한다.

```html
<script>
  // 두번째 인자로 옵션 객체를 제공하면 컴포넌트 초기화 과정에서 반영된다.
  new y9.Accordion('.y9-accordion', {
    // 옵션
    radio: true,
    close_all: false
  });
</script>
```


`y9.Accordion.js` 파일에 작성된 내용을 구분하여 정리하면 다음과 같다.

<details>
  <summary>3-1. 모듈 + 네임스페이스 패턴</summary>

  ```js
  /**
   * y9.Accordion
   * @version 0.0.1
   * @author yamoo9 <yamoo9@naver.com>
   * @todo Accordion, AccordionItem 클래스 정의
   * @todo 활성화 클래스/인덱스 기능 추가
   * @todo 라디오 기능 추가
   * @todo 애니메이션 기능 추가
   */

  ;(function(global, $, y9){
  'use strict';

  })(window, window.jQuery, (window.y9 = window.y9 || {}));
  ```
</details>

<details>
  <summary>3-2. Accordion 생성자 함수 정의 / 기본 옵션 객체</summary>

  ```js
  // 컴포넌트 기본 옵션
  var defaults = {
    // 활성화 클래스 속성
    active_class: 'is-active',
    // 활성화 인덱스
    active_index: null,
    // 모든 패널 접음
    close_all: true,
    // 라디오 기능 활성화
    radio: false,
    // 애니메이션 활성화
    animate: false,
    // 애니메이션 지속시간
    duration: 300,
    // 애니메이션 이징
    // jquery.easing 사용 가능
    // 참고: http://easings.net/ko
    easing: 'swing',
  };

  /**
   * y9.Accordion 컴포넌트 생성.
   * @namespace {Object} y9
   * @class y9.Accordion
   * @public
   * @param {String|HTMLElement|jQueryObject} element - 아코디언 컴포넌트로 생성할 대상
   */
  y9.Accordion = function(element, options){
    /**
     * 컴포넌트 옵션(기본 옵션과 사용자 정의 옵션을 합성)
     * @public
     */
    this.options = $.extend(true, {}, y9.Accordion.defaults, options);

    /**
     * 컴포넌트 요소
     * @public
     */
    this.$el = $(element);

    /**
     * 컴포넌트 현재 활성화 인덱스
     * @protected
     */
    this._current = null;

    /**
     * 컴포넌트 이전 활성화 인덱스
     * @protected
     */
    this._pre = null;

    /**
     * 컴포넌트 아이템 콜렉션
     * @private
     */
    this._items = [];

    this._init();
  };

  /**
   * y9.Accordion 클래스 기본 옵션
   * @public
   */
  y9.Accordion.defaults = defaults;
  ```
</details>

<details>
  <summary>3-3. Accordion 프로토타입 객체 확장</summary>

  ```js
  /**
   * y9.Accordion 프로토타입
   * @protected
   */
  $.extend(y9.Accordion.prototype, {
    /**
     * 컴포넌트 초기화
     * @private
     */
    _init: function(){
      var accordion = this;
      var options = this.options;

      // jQuery UI Easing 값을 사용한 경우, jquery-easing CDN 파일 로드
      if ( options.animate && /In|Out/.test(options.easing) ) {
        $.getScript('https://unpkg.com/jquery-easing@0.0.1/dist/jquery.easing.1.3.umd.min.js');
      }

      accordion.$el.children().each(function(index, element){
        // 아코디언 아이템 생성 및 수집
        accordion._items.push(new y9.AccordionItem(element, index, accordion));
      });

      // 초기 활성화
      var index = options.active_index;
      if ( $.type(index) === 'number' ) {
        this.active(options.active_index);
      }
      if ( $.type(index) !== 'number' && !options.close_all ) {
        this.active(0);
      }

      this._setup();
      this._bind();
    },

    /**
     * 컴포넌트 셋업
     * @private
     */
    _setup: function(){
      if ( this.options.animate ) {
        this.$el.addClass('is-animate');
      }
    },

    /**
     * 컴포넌트 커스텀 이벤트 수신
     * @private
     */
    _bind: function(){
      this.$el.on('deactive', $.proxy(this, 'deactive'));
    },

    /**
     * 컴포넌트 아이템 반환
     * @public
     * @param {Number} index - 개별 아이템 인덱스
     * @returns {AccordionItem}
     */
    items: function(index){
      var type = $.type(index);
      if ( type !== 'undefined' && type !== 'number' ) { throw '.items(n) 숫자를 전달해야 합니다.' }
      if ( type === 'undefined' ) {
        return this._items;
      } else if (index < 0) {
        return this._items[this._items.length - 1];
      } else {
        return this._items[index];
      }
    },

    /**
     * 컴포넌트 아이템 활성화
     * @public
     * @param {Number} index - 개별 아이템 인덱스
     */
    active: function(index){
      var type = $.type(index);
      if ( type === 'undefined' || (type !== 'undefined' && type !== 'number') ) { throw '.active(n) 숫자를 전달해야 합니다.' }
      this.items(index).expand();
    },

    /**
     * 컴포넌트 아이템 비활성화
     * @public
     */
    deactive: function(){
      var pre = this._pre;
      if ( $.type(pre) !== 'null' ) {
        this.items(pre).collapse();
      }
    },

    /**
     * 컴포넌트 아이템 활성화 개수 1개인지 검증
     * @public
     * @returns {Boolean}
     */
    isPanelOnlyOneOpened: function(){
      var expanded_count = 0;
      $.each(this._items, function(index, item){
        if( item.isExpanded() ) { expanded_count += 1; }
      });
      return expanded_count === 1;
    },

    updatePreCurrent: function(index){
      for ( var item, items=this._items, i=0, l=items.length; i<l; i++ ) {
        item = items[i];
        if ( item.isExpanded() ) {
          this._pre = item._index;
          break;
        }
      }
      this._current = index;
    },

  });
  ```
</details>

<details>
  <summary>3-4. AccordionItem 생성자 함수 정의</summary>

  ```js
  /**
   * y9.AccordionItem 컴포넌트 생성.
   * @namespace {Object} y9
   * @class y9.AccordionItem
   * @public
   * @param {jQueryObject} element - 아코디언 아이템 컴포넌트로 생성할 대상
   */
  y9.AccordionItem = function(element, index, accordion){
    /**
     * 컴포넌트 요소
     * @public
     */
    this.$item = $(element);

    /**
     * 컴포넌트 요소 인덱스
     * @private
     */
    this._index = index;

    /**
     * 부모 컴포넌트 요소
     * @private
     */
    this._parent = accordion;

    /**
     * 컴포넌트 아이템 속성
     * @public
     */
    this.options = this._parent.options;

    /**
     * 컴포넌트 아이템 헤더
     * @public
     */
    this.$heading = null;

    /**
     * 컴포넌트 아이템 패널
     * @public
     */
    this.$panel = null;

    this._init();
  };
  ```
</details>

<details>
  <summary>3-5. AccordionItem 프로토타입 객체 확장</summary>

  ```js
  /**
   * y9.AccordionItem 클래스 프로토타입
   * @protected
   */
  $.extend(y9.AccordionItem.prototype, {

    /**
     * 컴포넌트 초기화
     * @private
     */
    _init: function(){
      var $children = this.$item.children();
      // 아코디언 아이템 헤더
      this.$heading = $children.first();
      // 아코디언 아이템 헤더 버튼
      this.$button  = this.$heading.children('a, button');
      // 아코디언 아이템 패널
      this.$panel   = $children.last();

      this._bind();
    },

    /**
     * 컴포넌트 이벤트 바인딩
     * @private
     */
    _bind: function(){
      // 헤더 버튼 클릭하면 toggle() 메서드 실행
      this.$button.on('click', $.proxy(this, 'toggle'));
    },

    /**
     * 패널 펼침
     * @public
     * @method
     */
    expand: function(){
      var parent = this._parent,
          options = this.options;

      // pre, current 인덱스 업데이트
      parent.updatePreCurrent(this._index);

      // 라디오 기능 활성화일 경우, 부모 컴포넌트에 'deactive' 커스텀 이벤트 알림
      if ( options.radio ) {
        parent.$el.trigger('deactive');
      }

      this.$heading.addClass(this.options.active_class);

      if ( !options.animate ) {
        this.$panel.show();
      } else {
        this.$panel.slideDown(options.duration, options.easing);
      }

    },

    /**
     * 패널 접힘
     * @public
     * @method
     */
    collapse: function(){
      var parent  = this._parent,
          options = this.options;

      if (
        // 라디오 비활성화, 모든 패널 닫음(close_all) 조건이 거짓이고, 패널이 한 개만 열린 상태일 경우, 못 닫게 차단
        !options.radio && !options.close_all && parent.isPanelOnlyOneOpened() ||
        // 라디오 활성화, 모든 패널 닫음 조건이 거짓이고, 현재 활성화 인덱스와 컴포넌트 인덱스가 동일한 경우, 못 닫게 차단
        options.radio && !options.close_all && parent._current === this._index
      ) {
        return;
      }

      this.$heading.removeClass(this.options.active_class);

      if ( !options.animate ) {
        this.$panel.hide();
      } else {
        this.$panel.slideUp(options.duration, options.easing);
      }

    },

    /**
     * 패널 토글
     * @public
     * @method
     */
    toggle: function(e){
      e.preventDefault();

      // 패널 초기 활성화가 안되어 있을 경우만 작동
      if ( $.type(this._parent._current) !== 'number' ) {
        this.expand();
        return; // 종료
      }

      if ( this.isExpanded() ) {
        this.collapse();
      } else {
        this.expand();
      }

    },

    /**
     * 패널 펼침/접힘 상태 반환
     * @public
     * @method
     * @return {Boolean}
     */
    isExpanded: function(){
      return this.$panel.is(':visible');
    },

  });
  ```
</details>
