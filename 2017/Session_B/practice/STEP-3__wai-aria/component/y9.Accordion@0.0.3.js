/**
 * y9.Accordion
 * @version 0.0.3
 * @author yamoo9 <yamoo9@naver.com>
 * @todo 아코디언 컴포넌트 생성 ID 추가
 * @todo WAI-ARIA 역할(role), 속성/상태(aria-*) 설정/업데이트
 */



;(function(global, $, y9){
  'use strict';

  // 컴포넌트 기본 옵션
  var defaults = {
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

  var generated_id = 0;

  /**
   * y9.Accordion 컴포넌트 생성.
   * @namespace {Object} y9
   * @class y9.Accordion
   * @public
   * @param {String|HTMLElement|jQueryObject} element - 아코디언 컴포넌트로 생성할 대상
   */
  y9.Accordion = function(element, options, level){
    /**
     * 레벨(Level) 인덱스
     * @public
     */
    this.level = level || 1;

    /**
     * 메인 아코디언 컴포넌트 생성 ID
     * @public
     */
    this.g_id = null;

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

    // jQuery UI Easing 값을 사용한 경우, jquery-easing CDN 파일 로드
    if ( this.options.animate && /In|Out/.test(this.options.easing) ) {
      var accordion = this;
      var $el = this.$el;
      $el.css('opacity', 0);
      $.getScript('https://unpkg.com/jquery-easing@0.0.1/dist/jquery.easing.1.3.umd.min.js', function(){
        accordion._init();
        $el.css('opacity', '');
      });
    } else {
      this._init();
    }
  };

  /**
   * y9.Accordion 클래스 프로토타입
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

      if (accordion.level === 1) {
        accordion.g_id = ++generated_id;
      }

      accordion.$el.children().each(function(index, element){
        // 아코디언 아이템 생성 및 수집
        accordion._items.push(new y9.AccordionItem(element, index, accordion));
      });

      // 초기 활성화
      var index = options.active_index;
      // 레벨 인덱스가 1일 경우만 처리
      if ( $.type(index) === 'number' && this.level === 1 ) {
        this.active(options.active_index);
      }
      if ( $.type(index) !== 'number' && !options.close_all) {
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
      var $el = this.$el;
      var options = this.options;
      var structure = options.structure;
      // ——————————————————————————————————————
      // 구조 설정
      if (this.level === 1) {
        $el.data('generated_id', this.g_id);
        $el.addClass(structure.accordion);
      }
      $el.children().addClass(structure.accordion + structure.divider + structure.item);

      // ——————————————————————————————————————
      // 레벨 설정
      $el.addClass(options.level_class + this.level);
      // 레벨 인덱스가 1일 경우만 처리
      // 애니메이션 기능 활성화 시, 처리
      if ( this.level === 1 && options.animate ) {
        $el.addClass(options.animate_class);
      }

      // ——————————————————————————————————————
      // WAI-ARIA 설정
      if ( options.aria ) {
        $el.attr({
          role: 'presentation'
        });
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
     * 컴포넌트 pre, current 업데이트
     * @private
     */
    _updatePreCurrent: function(index){
      for ( var item, items=this._items, i=0, l=items.length; i<l; i++ ) {
        item = items[i];
        if ( item.isExpanded() ) {
          this._pre = item._index;
          break;
        }
      }
      this._current = index;
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
     * 중첩된 아코디언 컴포넌트 아이템 반환
     * @public
     * @param {Number} index - 개별 아이템 인덱스
     * @param {Number} sub_index - 중첩된 아코디언 인덱스
     * @returns {Array|SubAccordion}
     */
    nestedItems: function(index, sub_index){
      var type = $.type(index);
      var nested = [];
      if ( type !== 'undefined' && type !== 'number' ) { throw '.items(n) 숫자를 전달해야 합니다.' }
      if ( type === 'undefined' ) {
        $.each(this.items(), function(index, item){
          nested = nested.concat(item.nested);
        });
      } else if (index < 0) {
        nested = this.items(-1).nested;
      } else {
        nested = this.items(index).nested;
      }
      return $.type(sub_index) !== 'number' ? nested : nested[sub_index];
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

    /**
     * 열린 아이템 카운트 개수 반환
     * @public
     * @returns {Number}
     */
    openedItemsCount: function(){
      var options = this.options;
      var opened_count = 0;
      $.each(this.items(), function(index, item){
        if ( item.$heading.hasClass(options.active_class) ) {
          opened_count++;
        }
      });
      return opened_count;
    },

  });

  /**
   * y9.Accordion 클래스 기본 옵션
   * @public
   */
  y9.Accordion.defaults = defaults;



  /// ------------------------------------------------------------------------------



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

    /**
     * 중첩된 아코디언 컴포넌트
     * @public
     */
    this.nested = [];

    this._init();
  };

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

      this._setup();
      this._bind();
      this._nested();
    },

    /**
     * 컴포넌트 셋업
     * @private
     */
    _setup: function(){
      var options   = this.options;
      var structure = options.structure;
      var prefix    = structure.accordion + structure.divider;
      var $heading  = this.$heading;
      var $button   = this.$button;
      var $panel    = this.$panel;

      // ——————————————————————————————————————
      // 구조 설정
      $heading.addClass(prefix + structure.header);
      $button.addClass(prefix + structure.button);
      $panel.addClass(prefix + structure.panel);

      // ——————————————————————————————————————
      // WAI-ARIA 설정
      if ( options.aria ) {
        var g_id       = this._parent.g_id;
        var level      = this._parent.level;
        var item_index = this._index + 1;

        // Level 1 이 아닐 경우, 부모 요소로 부터 Level 값을 도출
        if ( level !== 1 ) {
          var reg = new RegExp( '--g([0-9]+)' );
          g_id = this._parent.$el.attr('id').match(reg)[1];
        }

        var prefix_button = prefix + structure.button;
        var prefix_panel = prefix + structure.panel;
        // e.g) button.id = 'y9-accordion__button--g1.1.1'
        var suffix = '--g' + g_id + '.' + level + '.' + item_index;
        var button_id  = prefix_button + suffix;
        var panel_id   = prefix_panel + suffix;

        // 헤더
        if ( !$heading.is(':header') ) {
          $heading.attr({
            role: 'heading',
            'aria-level': (level += 2) <= 6 ? level : 6
          });
        }

        // 버튼
        if ( !$button.is('button') ) {
          $button.attr({
            role: 'button',
          });
        }
        $button.attr({
          // 속성 설정
          id: button_id,
          'aria-controls': panel_id,
          // 상태 설정
          'aria-expanded': false
        });

        // 패널
        $panel.attr({
          role: 'region',
          // 속성 설정
          id: panel_id,
          'aria-labelledby': button_id
        });
      }

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
     * 중첩된 컴포넌트 처리
     * @private
     */
    _nested: function(){
      var accordionItem = this;
      var parent = this._parent;
      var options = this.options;
      var $nested = this.$panel.filter('.' + options.nested_class);
      if ( $nested.length > 0 ) {
        $nested.each(function(index, element){
          accordionItem.nested.push( new y9.Accordion(element, options, parent.level + 1) );
        });
      }
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
      parent._updatePreCurrent(this._index);

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

      if (options.aria) {
        this.$button.attr({ 'aria-expanded': true });

        if ( !options.close_all && parent.openedItemsCount() === 1 ) {
          this.$button.attr('aria-disabled', true);
        }
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

      if (options.aria) {
        this.$button.attr({ 'aria-expanded': false });
        if ( !options.close_all ) {
          parent.items(parent._pre).$button.attr('aria-disabled', false);
        }
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


})(window, window.jQuery, (window.y9 = window.y9 || {}));