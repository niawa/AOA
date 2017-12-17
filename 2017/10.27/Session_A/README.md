###### Session A
## WCAG v2.x 지침을 보완하는 WAI-ARIA 표준 기술에 관한 소개

**WAI-ARIA 표준 기술 소개** 및 실습 편 by 강사 [김데레사](https://github.com/seulbinim)

Session A에서는 WAI-ARIA의 기본 개념 및 기술에 대해 소개하고 WCAG 2.x 지침 준수를 위한 WAI-ARIA 적용 방법에 대해 실습합니다.

## WAI-ARIA 란?

**RIA**를 위한 접근성 권고안으로 마크업에 역할(Role), 속성(Property), 상태(State) 정보를 추가하여 스크린 리더 및 보조 기기 등에서 접근성 및 상호 운용성을 향상시키고 보다 나은 사용자 경험(User Experience)을 제공합니다.


<img alt="WAI-ARIA 1.1" src="../../ASSETS/aria.png" width="80%"><br>
> WAI-ARIA 1.1

<img alt="WAI-ARIA API" src="../../ASSETS/aria-api.png" width="80%"><br>
> WAI-ARIA APi

## WAI-ARIA의 3가지 기능

### 역할(Role)
- 특정 요소(Element)에 역할을 정의하는 것
- 역할을 부여하여 사용자에게 정보를 제공
- 부여된 역할은 동적으로 변경할 수 없음
``` HTML
* 메뉴
<div class="user_menu" role="menu">...</div>

* 경고 대화상자
<div class="auth_error" role="alertdialog">...</div>

* 버튼
<div class="btn_01" role="button">...</div>
```
#### 랜드마크(Landmark)
| Landmark Role  | HTML5 섹션 관련 요소 | 
| :------------ | :----------- | 
| role=“application”     | 동일한 역할의 요소 없음. 주로 div 요소와 같이 그룹 역할을 하는 요소로 대체할 수 있다.          |
| role=“banner”    | 동일한 역할의 요소 없음. 비슷한 의미로 header 요소를 사용할 수 있으나 header요소에 banner role을 사용하였다면 한 페이지에서 한 개의 header 요소만 사용하길 권장한다.| 
| role=“navigation”    | nav 요소. 다른 페이지 또는 페이지 내 특정 영역으로 이동하는 링크 콘텐츠 영역으로 주로 메인 메뉴 및 서브 메뉴 등에 사용할 수 있다.| 
| role=“main”    | main 요소. 본문의 주요 콘텐츠 영역으로 한 페이지 내에 1개만 사용이 가능하며, article, aside, footer 요소의 하위 요소로 사용할 수 없다. | 
| role=“complementary”   | aside 요소. 주요 콘텐츠와 연관이 적은 의미있는 콘텐츠 영역으로 종종 사이드바로 표현할 수 있다. aside 영역에는 현재 날씨, 관련된 기사 또는 주식 정보등의 부가 콘텐츠를 포함 할 수 있다. | 
| role=“form”   | form 요소. 폼과 관련된 요소의 모임을 표현하는 영역으로 서버에 전송될 수 있는 콘텐츠를 포함 할 수 있다. | 
| role=“search”    | 동일한 역할의 요소 없음. 검색의 역할을 담당하는 서식 영역임을 의미하며 div 또는 form 요소를 사용하는 것을 권장한다.      | 
| role=“contentinfo”  | 동일한 역할의 요소 없음. 비슷한 의미로 footer 요소를 사용할 수 있으나 footer 요소에 contentinfo role을 사용하였다면 한 페이지에서 한 개의 footer 요소만 사용하길 권장한다. | 

### 속성(Properties)과 상태(States)
- 요소(Element)가 기본적으로 갖고 있는 특징이나 상황 
- 속성과 상태는 “aria-*” 접두어를 가진다. 
- 상태는 요소의 상황을 나타내므로 애플리케이션이 실행 중에 자주 바뀌는 반면, 속성은 상대적으로 바뀌는 경우가 드물다.

#### 속성(Properties) 예
``` HTML
* 필수 항목 
<input type="checkbox" aria-required="true">

* 추가 설명 
<input type="text" aria-describedby="reference">
<div class="user_menu" role="menu">추가 설명</div>

* 그룹 제목 
<div role="group" aria-label="그룹 제목">...</div>
```

#### 상태(States) 예
``` HTML
* 확장되어 있는 상태의 탭 패널
<div role="tabpanel" aria-expanded="true">...</div>

* 오류가 발생한 상태의 입력상자
<input type="text" aria-invalid="true">

* 선택된 상태의 토글버튼
<button aria-pressed="true">...</button>
```

## ARIA적용 유의 사항
``` HTML
* ARIA 역할(role)과 HTML5 구조 관련 요소를 중복해서 사용하지 않는다
<nav role="navigation">
  ...
</nav>
```

``` HTML
* HTML 요소의 기본 기능을 ARIA 역할(Role)을 활용하여 변경하지 않는다.
<h1 role="button">
  ...
</h1>
```

``` HTML
* 마우스로 사용할 수 있는 기능은 키보드로도 사용할 수 있도록 보장하여야 한다.
<span role="button" tabindex="0">
  ...
</span>
```
