###### [Session B] ‣ WAI-ARIA를 반영하여 접근성을 향상시킨 UI 컴포넌트 제작

# 진행 목차

1. [아코디언 컴포넌트 구성](../STEP-1__basic/README.md)
1. [중첩된 아코디언 컴포넌트](../STEP-2__nested/README.md)
1. [아코디언 컴포넌트에 WAI-ARIA 적용](../STEP-3__wai-aria/README.md)
1. [아코디언 컴포넌트에 키보드 인터랙션 적용](../STEP-4__keyboard/README.md)
1. 아코디언 컴포넌트 jQuery 플러그인화

## **아코디언(Accordion) 컴포넌트** 제작 편 **STEP-05**

아코디언 컴포넌트에 다음과 같은 기능을 추가한다.

- jQuery 플러그인으로 사용 가능하도록 플러그인화

### jQuery 플러그인화

<a href="https://github.com/niawa/AOA/blob/master/2017/Session_B/practice/STEP-5__jquery-plugin/component/y9.Accordion@0.0.5.js#L715-L730" target="_blank">y9.Accordion 컴포넌트를 jQuery 플러그인으로 사용할 수 있도록 코드를 추가한다.</a>


### jQuery 플러그인 사용법

jQuery 플러그인의 일반적인 사용법과 동일하다.

```html
<script>
  $('.demo-component').y9Accordion({
    radio: true,
    close_all: false,
    animate: true,
    easing: 'easeOutElastic',
    duration: 800
  });
</script>
```

### jQuery 플러그인 기본 옵션을 바꾸는 방법

jQuery 플러그인이 적용되는 모든 컴포넌트에 일괄 적용되는 옵션을 설정하고자 한다면 아래와 같은 방법을 통해 변경 가능하다.

```html
<script>
  // 기본 값을 바꾸고자 할 경우, 아래 각 속성 값을 변경한다.
    $.fn.y9Accordion.defaults = {
      /// 클래스 속성 -------------------
      // 활성화 클래스 속성
      active_class: 'is-active',
      // 중첩 클래스 속성
      nested_class: 'is-nested',
      // 애니메이션 클래스 속성
      animate_class: 'is-animate',
      // 레벨 클래스 속성
      level_class: 'lv-',
      /// 활성화 인덱스 ------------------
      active_index: null,
      // 모든 헤더 닫기
      close_all: true,
      /// 기능 -------------------------
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
      // WAI-ARIA 활성화
      aria: true,
      // 키보드 인터랙션 활성화
      shortkut_key: true,
      /// 구조 클래스 속성 ---------------
      structure: {
        accordion: 'y9-accordion',
        item: 'item',
        header: 'heading',
        button: 'button',
        panel: 'panel',
        divider: '__'
      },
    };
</script>
```

