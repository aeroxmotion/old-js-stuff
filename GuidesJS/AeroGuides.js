(function($) {
  'use strict';

  var infoTemplate = function(x, xP, y, yP) {
    return '<strong>X: </strong>' + (x || 0) + 'px (' + (xP || 0) + '%)<br/>' +
           '<strong>Y: </strong>' + (y || 0) + 'px (' + (yP || 0) + '%)';
  };

  var AeroGuides = function() {
    this.$horGuideEl = $('#MainGuide-horizontal');
    this.$verGuideEl = $('#MainGuide-vertical');
    this.$infoEl = $('#info');
    this.newHorPos = this.newVerPos = 0;
  };

  AeroGuides.prototype = {
    constructor: AeroGuides,

    calcPos: function(pos, size) {
      return ((pos / size) * 100).toFixed(3) + '%';
    },

    updateAll: function() {
      var self = this;

      $(document).on('mousemove', function(e) {
        self.newHorPos = self.calcPos(
          e.clientY,
          $(document).height()
        );

        self.newVerPos = self.calcPos(
          e.clientX,
          $(document).width()
        );

        self.setInfo( 
          e.clientX, self.newVerPos, 
          e.clientY, self.newHorPos
        );

        self.setGuides( 
          self.newHorPos, 
          self.newVerPos 
        );
      });
    },

    addGuides: function() {
      var self = this,
          numGuideGroup = 0;

      $(document).on('click', function() {
        var $newGuideHor = $('<div />', {
            'class': 'guide-horizontal',
            'style': 'top:' + self.newHorPos
          }),

          $newGuideVer = $('<div />', {
            'class': 'guide-vertical',
            'style': 'left:' + self.newVerPos
          }),

          $guideGroup = $('<div />', {
            'class': 'guide-group',
            'group': ++numGuideGroup
          });

        $guideGroup.append([ $newGuideHor, $newGuideVer ]);
        $guideGroup.prependTo('body');
      });
    },

    setInfo: function(posX, posXp, posY, posYp) {
      this.$infoEl.html(
        infoTemplate(
          posX, posXp,
          posY, posYp
        )
      );
    },

    setGuides: function(horGuidePos, verGuidePos) {
      this.$horGuideEl.css('top', horGuidePos);
      this.$verGuideEl.css('left', verGuidePos);
    }
  };

  // Initialize Guides
  $(function() {

    // Init Elements
    var $info = $('<div />', {
        'id': 'info',
        'html': infoTemplate()
      }),

      $guideHor = $('<div />', {
        'id': 'MainGuide-horizontal',
        'style': 'top: -1px'
      }),

      $guideVer = $('<div />', {
        'id': 'MainGuide-vertical',
        'style': 'left: -1px'
      });

    $('body').prepend([ $info, $guideHor, $guideVer ]);

    // Init AeroGuides
    var aeroGuides = new AeroGuides(/*options here*/);
    aeroGuides.updateAll();
    aeroGuides.addGuides();

  });

})(jQuery);