# 접근 가능한 레이어 팝업 만들기 (feat. WAI-ARIA)
 
> 강사 : [지성봉](https://github.com/mulder21c) (콘텐츠연합플랫폼 ㈜)
>
> 발표 자료 : [Online Slide](https://mulder21c.github.io/seminar/20171222) | [PDF Ver](https://mulder21c.github.io/seminar/20171222/%EC%A0%91%EA%B7%BC%20%EA%B0%80%EB%8A%A5%ED%95%9C%20%EB%A0%88%EC%9D%B4%EC%96%B4%ED%8C%9D%EC%97%85%20%EB%A7%8C%EB%93%A4%EA%B8%B0.pdf) | [PDF 흑백 Ver](https://mulder21c.github.io/seminar/20171222/%EC%A0%91%EA%B7%BC%20%EA%B0%80%EB%8A%A5%ED%95%9C%20%EB%A0%88%EC%9D%B4%EC%96%B4%ED%8C%9D%EC%97%85%20%EB%A7%8C%EB%93%A4%EA%B8%B0%28gray%20scale%29.pdf)

Layer-popup 컴포넌트에 WAI-ARIA 국제표준 기술을 반영하는 과정을 단계 별로 실습하며 접근성 향상 
방법을 공부합니다.

---

## Modal Window

<img src="http://mulder21c.github.io/seminar/20171222/images/layerpopup.jpg" alt="modal window layer popup 예시 캡쳐 화면">

사용자 인터페이스 디자인 개념에서 자식 윈도에서 부모 윈도로 돌아가기 전에 사용자의 상호동작을 
요구하는 창. 응용 프로그램의 메인 창의 작업 흐름을 방해한다.

## Native HTML의 한계

- 팝업이 떴다라는 정보를 인지할 수 없다.
    
  \- 화면 상으로는 팝업이 열리는 것이 확인 되지만, 스크린리더 상으로는 어떤 변화가 발생했는지 알 수 없다.

- 팝업 이외의 문서 정보에 접근이 된다.

  \- 스크린리더의 브라우즈모드로 가상커서 운용 시 레이어팝업 이전/이후의 콘텐츠가 접근 가능하다. <br>
  시각적으로 dimmed 처리 되었다라는 것은 사용하지 못함을 의미하나 스크린리더는 사용 가능한 문제가 발생.

- 키보드 <kbd>tab</kbd>키 운용이 팝업을 벗어난다.

  \- 탭 키 운용 시 레이어팝업 이전/이후의 tabbable 요소로 초점이 이동 된다.

- 키보드 트랩 문제 (IE8 ~ 10)

  \- IE 8 ~ 10의 경우, 레이어 팝업이 닫혔을 때 초점을 얻고 있던 요소가 사라짐에 따라 초점을 잃어버리는 
  현상이 발생된다.

### 동영상 설명

00:02.769 --> 00:34.441 <br>
브라우즈모드에서 가상커서로 탐색

00:38.296 --> 00:41.953 <br>
"팝업 열기" 버튼이 초점을 얻은 상태에서
"Enter"키로 버튼 활성화

00:41.953 --> 00:55.734 <br>
레이어 팝업이 열렸지만
스크린리더는 어떠한 정보도 읽어주지 않습니다.

00:55.734 --> 01:12.706 <br>
가상커서로 계속 탐색

01:12.706 --> 01:27.827 <br>
가상커서로 거꾸로(위로) 탐색

01:27.827 --> 01:46.250 <br>
레이어 팝업을 벗어나
다시 본문이 읽혀지는 것이 확인 됩니다.

01:46.250 --> 02:02.558 <br>
Tab 키를 눌러 초점을 이동했을 때,
접근 되지 않아야 할 본문의 "팝업 열기 버튼"에 
접근되는 것이 확인 됩니다.

02:08.553 --> 02:16.515 <br>
레이어 팝업이 닫혀있는 상태에서 
포커스 모드로 탐색할 경우를 테스트 해보겠습니다


02:19.286 --> 02:23.918 <br>
레이어 팝업 안에 초점이 들어와 있는 상태에서
Shfit + Tab 키를 눌렀을 때 
본문 내의 요소로 초점이 이동되는 것이 확인됩니다.

## Modal Window의 접근성 요구사항

- 팝업이 열렸을 때 팝업 내용 인식 가능
- 팝업 아래의 Windows는 비활성화
- <kbd>tab</kbd>키 운용이 팝업 내부에서만 순환
- 팝업이 닫혔을 때 초점이 원래 있던 곳으로 반환

## 실습 - WAI-ARIA를 사용하여 접근성 향상 시키기

### Step 1. 콘텐츠 역할 정의

레이어팝업이 modal windows라는 정보를 제공

1. 대화상자에 해당하는 요소에 `role="dialog"` 적용

  ```html
  <div class="popup-wrap">
    <div class="popup-body" role="dialog">
      <strong class="modal-header">접근 가능한 레이어 팝업</strong>
      <div class="modal-body">
        <p>
          접근 가능한 레이어 팝업이란?
        </p>
        ...
  ```

  >`role="dialog"`
  >
  >사용자가 정보를 입력하거나 응답할 것을 요구하도록 유도하기 위해 어플리케이션의 현재 처리를 
  >중단시키도록 설계된 어플리케이션 윈도우

2. 대화상자의 이름 설정

  `aria-label` 혹은 `aria-labelledby` 속성(property)를 사용

  예제 코드에는 대화상자의 제목에 해당하는 요소가 존재하므로, 해당 요소에 `id`를 부여하고, 이 값을 
  `aria-labelledby`의 값으로 연관짓는다.

  ```html
  <div class="popup-wrap">
    <div class="popup-body" role="dialog" aria-labelledby="pop-title">
      <strong id="pop-title" class="modal-header">접근 가능한 레이어 팝업</strong>
      <div class="modal-body">
        <p>
          접근 가능한 레이어 팝업이란?
        </p>
        ...
  ```

### Step 2. 팝업이 열릴 때 내용 인식

레이어 팝업이 열릴 때 대화 상자 내부로 초점을 이동시키도록 한다. <br>
`window.open`에 의해 팝업이 열렸을 때 초점이 해당 윈도우로 이동되는 것에 대한 구현.

대화 상자 내부로 초점 이동 기준
- 모든 상황에서 초점은 대화 상자 안에 있는 요소로 이동
- 첫 번째 초점을 얻을 수 있는 요소로 이동하는 것이 기본
- 다음 중 하나에 해당하는 경우 정적 요소에 `tabindex="-1"`을 추가하여 이 요소로 초점 이동
  * 첫번째 포커스 가능한 요소로 초점을 이동시키는 것이 콘텐츠의 시작 부분을 스크롤 밖으로 밀어낼 경우
  * 대화상자 안에 초점을 받을 수 있는 요소가 없을 경우

> 자세한 내용은 W3C의 [Dialog (Modal) Design Patterns](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) 참고

예제에서는 주요 내용이 포커스를 얻을 수 있는 요소가 없기 때문에 정적 요소를 하나 두고 여기에 
tabindex를 -1로 설정

```html
<div class="popup-wrap">
  <div class="popup-body" role="dialog" aria-labelledby="pop-title">

    <!-- tabindex="-1"을 가진 정적 요소 추가 -->
    <a class="placeholder" tabindex="-1"></a>

    <strong id="pop-title" class="modal-header">접근 가능한 레이어 팝업</strong>
    <div id="popup-contents" class="modal-body">
      <p>
        접근 가능한 레이어 팝업이란?
      </p>
```

팝업이 오픈 될 때 방금 생성한 요소로 초점이 이동되도록 스크립트를 작성

```javascript
function openPopup () {
  document.documentElement.classList.add("on-popup");

  // 추가된 tabindex="-1"을 가진 정적 요소에 초점 설정
  var popupBody = document.querySelector(".popup-body");
  popupBody.querySelector(".placeholder").focus();
}
```

### Step 3. 팝업 아래 Windows 비활성화

#### Browse mode 진입 차단

- NVDA 2017.4+, NVDA 2017.2 + FireFox, JAWS 18+ 등 최신 major 브라우저에서 `role="dialog"` 적용 시
자동으로 차단 됨.
- ARIA 1.1에서 Modal Window 설정을 위한 `aria-modal="true"` 속성이 제안되었으나, NVDA, JAWS 등에서는 
해당 설정과 상관없이 적용, iOS 10.x / 10.2 에서는 문제가 있는 것으로 리포트 됨 <br>
(대화상자 제목과 지시사항들이 읽는 순서에 따라 접근 가능하지 않게 되는 문제 발생)

차선책으로 대화 상자 외 타 콘텐츠에 `aria-hidden="true"` 설정

> 단, 마크업 순서에 따라 적용이 어려워지는 상황이 발생. <br>
> 가급적 dialog 요소를 level 1 수준으로 위치시키는 것이 좋음

```javascript

// 팝업 오픈 시 aria-hidden="true" 설정
function setSiblingsHidden(currElem){
  var ommits = ["script", "meta", "link", "style", "base"];
  for(var i = -1, node; node = currElem.parentNode.children[++i];){
    if(node == currElem || ommits.indexOf(node.tagName.toLowerCase()) > -1) 
      continue;
    node.setAttribute("aria-hidden", "true");
    node.setAttribute("data-outside-modal", "true");
  }
}

function openPopup(){
  var popupBody = document.querySelector(".popup-body");
  document.documentElement.classList.add("on-popup");
  
  setSiblingsHidden(document.querySelector(".popup-wrap"));
  
  popupBody.querySelector(".placeholder").focus();
}

// 팝업 닫을 시 aria-hidden="true" 설정 해제
function unsetSiblingsHidden(currElem){
  for(var i = -1, node, outsides= document.querySelectorAll("[data-outside-modal]"); node = outsides[++i];){
    node.removeAttribute("aria-hidden");
    node.removeAttribute("data-outside-modal");
  }
}

function closePopup(event){
  event = event || window.event;  
  document.documentElement.classList.remove("on-popup");
  
  unsetSiblingsHidden();
}

```

#### 대화 상자 내에서 tab 이동 순환

tab 이동을 순환시키기 위해서는 두 가지 키스트로크에 대응되어야 한다.
- Tab

  * 대화상자 내 다음 tabbable 요소로 이동
  * 마지막 tabbable 요소에 있는 경우 포커스를 대화상자 내 첫 번째 tabbable 요소로 이동

- Shift + Tab

  * 대화상자 내 이전 tabbable 요소로 이동
  * 첫번째 tabbable 요소에 있는 경우 포커스를 대화상자 내 마지막 tabbable 요소로 이동

```javascript
(function(){
  var focuslock = (function(){
    var firstElem, lastElem;
    return {
      setFirstBtn : function(el){
        firstElem = el;
      },
      setLastBtn : function(el){
        lastElem = el;
      },
      focuslockKeyDown : function(event){
        event = event || window.event;
        var keycode = event.which || event.keyCode;
        if(event.shiftKey && keycode === 9 && event.target === firstElem){
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          lastElem.focus();
        }else if(!event.shiftKey && keycode === 9 && event.target === lastElem){
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          firstElem.focus();
        }
      }
    };
  }());
  window.focuslock = window.focuslock || focuslock;
}());


function openPopup(){
  var popupBody = document.querySelector(".popup-body");
  document.documentElement.classList.add("on-popup");

  // 팝업 열릴 때 tab 순환 처리를 위한 이벤트 등록
  focuslock.setFirstBtn(btnClosePopup);
  focuslock.setLastBtn(btnClosePopup);
  popupBody.addEventListener("keydown", focuslock.focuslockKeyDown);

  setSiblingsHidden(document.querySelector(".popup-wrap"));
  popupBody.querySelector(".placeholder").focus();
}

function closePopup(event){
  event = event || window.event;
  document.documentElement.classList.remove("on-popup");

  // 팝업 닫을 때 tab 순환 처리를 위한 이벤트 해제
  var popupBody = document.querySelector(".popup-body");
  popupBody.removeEventListener("keydown", focuslock.focuslockKeyDown);

  unsetSiblingsHidden();
}
```

### 키보드 트랩 방지

팝업이 열릴 때 초점이 얻어진 요소를 기억해 두었다가 팝업이 닫힐 때 해당 요소에 다시 초점 이동

```javascript
(function () {
  var focusedElem = null;

  var btnOpenPopup = document.getElementById("open-popup");
  var btnClosePopup = document.getElementById("close-popup");

  ...

  function openPopup(){
    var popupBody = document.querySelector(".popup-body");
    document.documentElement.classList.add("on-popup");

    // 팝업 열릴 때 현재 초점을 얻은 요소를 기억
    focusedElem = this;

    focuslock.setFirstBtn(btnClosePopup);
    focuslock.setLastBtn(btnClosePopup);
    popupBody.addEventListener("keydown", focuslock.focuslockKeyDown);

    ...

  }

  ...

  function closePopup(event){
    event = event || window.event;
    var popupBody = document.querySelector(".popup-body");

    ...

    // 팝업 닫을 때 기억된 요소에 초점 반환
    focusedElem.focus();
  }
}());
```

### Esc 키 스트로크에 팝업 닫기 기능 적용

W3C WAI-ARIA Authoring Practices에서는 dialog에 대한 키보드 인터랙션으로 ESC키 역시도 정의를 하고 
있으며, ESC를 눌렀을 경우에는 팝업이 닫혀야 한다라고 기술

```javascript
function openPopup(){
  ...

  // 키 스트로크를 받기 위해 이벤트 등록
  document.addEventListener("keydown", closePopup);
}

function closePopup(event){
  event = event || window.event;
  var popupBody = document.querySelector(".popup-body");

  // Esc키에만 대응되도록 처리
  if(event.type === 'keydown' && event.keyCode !== 27){
    return;
  }

  ...
  
  // 팝업 닫을 때 키 스트로크를 받기 위한 이벤트 해제
  document.removeEventListener("keydown", closePopup);

  focusedElem.focus();
}
```

## Used ARIA Role, Property

| Roles/Property |Description|
|:--------------:|:----------|
| dialog |사용자가 정보를 입력하거나 응답할 것을 요구하도록 유도하기 위해 어플리케이션의 현재 처리를 중단시키도록 설계된 어플리케이션 윈도우|
| aria-label<br> aria-labelledby |해당 객체의 label(이름)을 설정|
| aria-describe<br> aria-describedby |해당 객체에 대한 설명 추가|

## Keyboard Interaction

| Key | Behavior |
|:---:|:---------|
| <kbd>Tab</kbd> |<ul><li>대화 상자 내 다음 tabbable 요소로 초점 이동</li><li>마지막 tabbable 요소에 있는 경우 포커스를 대화상자 내 첫 번째 tabbable 요소로 이동</li></ul> |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> |<ul><li>대화 상자 내 이전 tabbable 요소로 초점 이동</li><li>첫 번째 tabbable 요소에 있는 경우 포커스를 대화상자 내 마지막 tabbable 요소로 이동</li></ul>|
| <kbd>Esc</kbd> |대화상자 닫기|


## References
- [SSB BART group- ARIA Dialog Role](https://labs.ssbbartgroup.com/index.php/ARIA_Dialog_Role)
- [Dialog (Modal) Design Patterns - W3C](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal)